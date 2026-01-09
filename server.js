const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// --- Database Connection ---
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};
connectDB();

// --- Models ---
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'member'], default: 'member' },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

const nodemailer = require('nodemailer');

// Task Schema
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    assigneeName: { type: String },
    dueDate: { type: String },
    subtasks: [{ type: String }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

// --- Nodemailer Setup ---
// NOTE: For production, use environment variables for credentials
const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.EMAIL_USER || "test_user", // Placeholder
        pass: process.env.EMAIL_PASS || "test_pass"  // Placeholder
    }
});

const sendAssignmentEmail = async (userEmail, taskTitle, assignedBy) => {
    try {
        if (!userEmail) return;
        await transporter.sendMail({
            from: '"Task Manager" <no-reply@taskmanager.com>',
            to: userEmail,
            subject: `New Task Assigned: ${taskTitle}`,
            text: `You have been assigned a new task: "${taskTitle}" by ${assignedBy}. Log in to view details.`,
            html: `<b>You have been assigned a new task:</b><br/><h3>${taskTitle}</h3><br/>by ${assignedBy}.<br/><a href="http://localhost:3000/dashboard/tasks">View Task</a>`
        });
        console.log(`Email sent to ${userEmail}`);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

// --- Middleware ---
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// --- Utilities ---
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// --- Routes ---

// Get all users (admin only)
app.get('/api/users', protect, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin only.' });
        }
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get team members (all users can see)
app.get('/api/users/team', protect, async (req, res) => {
    try {
        const users = await User.find({}).select('_id username email role');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all tasks or user's tasks
app.get('/api/tasks', protect, async (req, res) => {
    try {
        const { filter, search } = req.query; // 'my' or 'all', search text
        let query = {};

        if (filter === 'my') {
            query.assignee = req.user._id;
        } else if (filter === 'all' && req.user.role === 'admin') {
            // No specific user filter
        } else if (filter === 'all') {
            query.assignee = req.user._id;
        } else {
            query.assignee = req.user._id;
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const tasks = await Task.find(query).populate('assignee', 'username email').populate('createdBy', 'username');
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create task
app.post('/api/tasks', protect, async (req, res) => {
    try {
        const { title, description, priority, status, assignee, assigneeName, dueDate, subtasks } = req.body;

        const task = await Task.create({
            title,
            description,
            priority,
            status: status || 'pending',
            assignee: assignee || req.user._id,
            assigneeName: assigneeName || req.user.username,
            dueDate,
            subtasks,
            createdBy: req.user._id,
        });

        const populatedTask = await Task.findById(task._id).populate('assignee', 'username email').populate('createdBy', 'username');

        // Send email if assigned to someone else
        if (assignee && assignee.toString() !== req.user._id.toString()) {
            const assigneeUser = await User.findById(assignee);
            if (assigneeUser) {
                sendAssignmentEmail(assigneeUser.email, title, req.user.username);
            }
        }

        res.status(201).json(populatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update task
app.put('/api/tasks/:id', protect, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Check if user is admin or task owner
        if (req.user.role !== 'admin' && task.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this task' });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate('assignee', 'username email').populate('createdBy', 'username');

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete task
app.delete('/api/tasks/:id', protect, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Check if user is admin or task owner
        if (req.user.role !== 'admin' && task.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this task' });
        }

        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/auth/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) return res.status(400).json({ message: 'Please add all fields' });

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({ username, email, password });
        if (user) {
            res.status(201).json({
                _id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: generateToken(user.id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: generateToken(user.id),
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
