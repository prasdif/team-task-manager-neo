import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Task from '@/lib/models/Task';
import User from '@/lib/models/User';
import { protect } from '@/lib/auth';
import { MockDB } from '@/lib/mock-db';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function PUT(request: Request, { params }: { params: any }) {
    try {
        const user = await protect();
        if (!user) return NextResponse.json({ message: 'Not authorized' }, { status: 401 });

        const db = await connectDB();
        const resolvedParams = await params;
        const { id } = resolvedParams;
        const body = await request.json();

        if (db) {
            // Real MongoDB logic
            const task = await Task.findById(id);
            if (!task) {
                return NextResponse.json({ message: 'Task not found' }, { status: 404 });
            }

            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            User;

            const updatedTask = await Task.findByIdAndUpdate(
                id,
                body,
                { new: true }
            ).populate('assignee', 'username email').populate('createdBy', 'username');

            return NextResponse.json(updatedTask);
        } else {
            // Mock DB logic
            console.log("Updating task in Mock DB:", id);
            const task = await MockDB.tasks.findById(id);
            if (!task) {
                return NextResponse.json({ message: 'Task not found' }, { status: 404 });
            }

            const updatedTask = await MockDB.tasks.findByIdAndUpdate(id, body);
            return NextResponse.json(updatedTask);
        }
    } catch (error: any) {
        console.error("Task Update Error:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function DELETE(request: Request, { params }: { params: any }) {
    try {
        const user = await protect();
        if (!user) return NextResponse.json({ message: 'Not authorized' }, { status: 401 });

        const db = await connectDB();
        const resolvedParams = await params;
        const { id } = resolvedParams;

        if (db) {
            // Real MongoDB logic
            const task = await Task.findById(id);
            if (!task) {
                return NextResponse.json({ message: 'Task not found' }, { status: 404 });
            }

            await Task.findByIdAndDelete(id);
            return NextResponse.json({ message: 'Task deleted' });
        } else {
            // Mock DB logic
            console.log("Deleting task in Mock DB:", id);
            const task = await MockDB.tasks.findById(id);
            if (!task) {
                return NextResponse.json({ message: 'Task not found' }, { status: 404 });
            }

            await MockDB.tasks.findByIdAndDelete(id);
            return NextResponse.json({ message: 'Task deleted' });
        }
    } catch (error: any) {
        console.error("Task Delete Error:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
