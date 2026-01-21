import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import jwt from 'jsonwebtoken';

const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: '30d' });
};

export async function POST(request: Request) {
    try {
        await connectDB();
        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json({ message: 'Please add all fields' }, { status: 400 });
        }

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
                token: generateToken(user.id),
            }, { status: 201 });
        } else {
            return NextResponse.json({ message: 'Invalid user data' }, { status: 400 });
        }
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
