import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import { protect } from '@/lib/auth';

export async function GET(request: Request) {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const user: any = await protect();
        if (!user) return NextResponse.json({ message: 'Not authorized' }, { status: 401 });

        if (user.role !== 'admin') {
            return NextResponse.json({ message: 'Access denied. Admin only.' }, { status: 403 });
        }

        await connectDB();
        const users = await User.find({}).select('-password');
        return NextResponse.json(users);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
