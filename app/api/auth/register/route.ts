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

        if (!username || !password) {
            return NextResponse.json({ message: 'Please add all fields' }, { status: 400 });
        }

        if (db) {
            // Real MongoDB logic
            const userExists = await User.findOne({ username });
            if (userExists) {
                return NextResponse.json({ message: 'User already exists' }, { status: 400 });
            }

            const user = await User.create({ username, password });

            if (user) {
                return NextResponse.json({
                    _id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    token: generateToken(user.id, user.username, user.role),
                }, { status: 201 });
            } else {
                return NextResponse.json({ message: 'Invalid user data' }, { status: 400 });
            }
        } else {
            // Mock DB logic
            console.log("Register: Using Mock DB");
            const userExists = await MockDB.users.findOne({ username });
            if (userExists) {
                return NextResponse.json({ message: 'User already exists' }, { status: 400 });
            }

            const user = await MockDB.users.create({
                username,
                password,
                role: 'member'
            });

            return NextResponse.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: generateToken(user._id, user.username, user.role),
            }, { status: 201 });
        }
    } catch (error: any) {
        console.error("Register Error:", error);
        return NextResponse.json({ message: error.message || 'Registration failed' }, { status: 500 });
    }
}
