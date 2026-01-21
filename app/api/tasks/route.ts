import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Task from '@/lib/models/Task';
import User from '@/lib/models/User';
import { protect } from '@/lib/auth';
import { MockDB } from '@/lib/mock-db';
import nodemailer from 'nodemailer';


// Nodemailer Setup
const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.EMAIL_USER || "test_user",
        pass: process.env.EMAIL_PASS || "test_pass"
    }
});

const sendAssignmentEmail = async (userEmail: string, taskTitle: string, assignedBy: string) => {
    try {
        if (!userEmail) return;
        await transporter.sendMail({
            from: '"Task Manager" <no-reply@taskmanager.com>',
            to: userEmail,
            subject: `New Task Assigned: ${taskTitle}`,
            text: `You have been assigned a new task: "${taskTitle}" by ${assignedBy}. Log in to view details.`,
            html: `<b>You have been assigned a new task:</b><br/><h3>${taskTitle}</h3><br/>by ${assignedBy}.<br/><a href="${process.env.CLIENT_URL || 'https://team-task-manager-neo-53ue.vercel.app'}/dashboard/tasks">View Task</a>`
        });
        console.log(`Email sent to ${userEmail}`);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

export async function GET(request: Request) {
    try {
        const user = await protect();
        if (!user) {
            return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
        }

        const db = await connectDB();
        const { searchParams } = new URL(request.url);
        const filter = searchParams.get('filter');
        const search = searchParams.get('search');

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const query: any = {};
        const userId = user._id || user.id; // Handle both mongoose and mock object shapes

        if (filter === 'my') {
            query.assignee = userId;
        } else if (filter === 'all' && user.role === 'admin') {
            // No specific user filter
        } else if (filter === 'all') {
            query.assignee = userId;
        } else {
            query.assignee = userId;
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        if (db) {
            // Ensure models are registered
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            User;

            const tasks = await Task.find(query)
                .populate('assignee', 'username email')
                .populate('createdBy', 'username');
            return NextResponse.json(tasks);
        } else {
            console.log("Tasks API: Using Mock DB");
            // Mock DB logic
            const allTasks = await MockDB.tasks.find(query);
            // Simple mock filter impl since MockDB.find is basic
            let filteredTasks = allTasks;

            // Apply mock assignment filter
            if (query.assignee) {
                filteredTasks = filteredTasks.filter((t: any) => t.assignee === query.assignee);
            }

            // Search filter
            if (search) {
                const s = search.toLowerCase();
                filteredTasks = filteredTasks.filter((t: any) =>
                    t.title?.toLowerCase().includes(s) ||
                    t.description?.toLowerCase().includes(s)
                );
            }

            return NextResponse.json(filteredTasks);
        }
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const user = await protect();
        if (!user) {
            return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
        }

        const db = await connectDB(); // Returns null if no DB
        const body = await request.json(); // Read once
        const { title, description, priority, status, assignee, assigneeName, dueDate, subtasks } = body;

        const userId = user._id || user.id || user.sub;

        if (db) {
            // ... Real DB Logic (omitted for brevity, assume unchanged but using 'body' vars) ...
            // Ensure models are registered
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            User;

            const task = await Task.create({
                title,
                description,
                priority,
                status: status || 'pending',
                assignee: assignee || userId,
                assigneeName: assigneeName || user.username,
                dueDate,
                subtasks,
                createdBy: userId,
            });

            const populatedTask = await Task.findById(task._id)
                .populate('assignee', 'username email')
                .populate('createdBy', 'username');

            // Send email if assigned to someone else
            if (assignee && assignee.toString() !== userId.toString()) {
                const assigneeUser = await User.findById(assignee);
                if (assigneeUser && assigneeUser.email) {
                    await sendAssignmentEmail(assigneeUser.email, title, user.username);
                }
            }
            return NextResponse.json(populatedTask, { status: 201 });
        } else {
            // --- MOCK DB LOGIC ---
            console.log("Creating Task in Mock DB:", title);

            const task = await MockDB.tasks.create({
                title,
                description,
                priority,
                status: status || 'pending',
                assignee: assignee || userId,
                assigneeName: assigneeName || user.username || 'Guest',
                dueDate,
                subtasks,
                createdBy: userId,
            });

            return NextResponse.json(task, { status: 201 });
        }
    } catch (error: any) {
        console.error("Task Creation Error:", error);
        return NextResponse.json({ message: error.message || "Failed to create task" }, { status: 500 });
    }
}