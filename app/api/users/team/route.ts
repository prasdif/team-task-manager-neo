import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import { protect } from '@/lib/auth';

export async function GET(request: Request) {
    try {
        const user = await protect();
        if (!user) return NextResponse.json({ message: 'Not authorized' }, { status: 401 });

        // Use MockDB for consistent Guest Mode
        // In a real app we would check if (dbConnected) here
        const { MockDB } = await import('@/lib/mock-db');
        const users = await MockDB.users.find();
        return NextResponse.json(users);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
