import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import jwt from 'jsonwebtoken';
import { MockDB } from '@/lib/mock-db';

const generateToken = (id: string, username: string, role: string) => {
    return jwt.sign({ id, username, role }, process.env.JWT_SECRET || 'fallback-secret-key', { expiresIn: '30d' });
};

export async function POST(request: Request) {
    try {
        const db = await connectDB();
        const { username, password } = await request.json();

        if (db) {
            // Real MongoDB logic
            const user = await User.findOne({ username });

            if (user && (await user.matchPassword(password))) {
                return NextResponse.json({
                    _id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    token: generateToken(user.id, user.username, user.role),
                });
            } else {
                return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
            }
        } else {
            // Mock DB logic
            console.log("Login: Using Mock DB");
            const user = await MockDB.users.findOne({ username });

            if (user) {
                // For mock, accept any password or check stored password
                return NextResponse.json({
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    token: generateToken(user._id, user.username, user.role),
                });
            } else {
                return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
            }
        }
    } catch (error: any) {
        console.error("Login Error:", error);
        return NextResponse.json({ message: error.message || 'Login failed' }, { status: 500 });
    }
}
