import mongoose, { Schema, Document, Model } from 'mongoose'; 
import bcrypt from 'bcryptjs';

// Define the User interface
export interface IUser extends Document {
    username: string;
    email?: string;
    password?: string;
    role: 'admin' | 'member';
    matchPassword: (enteredPassword: string) => Promise<boolean>;
} 

const userSchema = new Schema<IUser>(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: false, unique: true, sparse: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['admin', 'member'], default: 'member' },
    },
    { timestamps: true }
);

// Pre-save hook to hash password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    if (this.password) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword: string) {
    if (!this.password) return false;
    return await bcrypt.compare(enteredPassword, this.password);
};

// Check if the model is already defined to prevent overwriting during hot reload
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;