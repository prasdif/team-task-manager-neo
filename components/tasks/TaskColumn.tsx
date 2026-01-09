'use client';

import { Plus, User, Repeat } from 'lucide-react';
import { Task } from '@/lib/features/tasks/taskApi';
import TaskCard from './TaskCard';

interface TaskColumnProps {
    title: string;
    count: number;
    tasks: Task[];
    onDeleteTask: (taskId: string) => void;
    onMoveTask: (taskId: string, newStatus: Task['status']) => void;
    status: Task['status'];
    isAdmin: boolean;
    currentUserId: string;
}

export default function TaskColumn({
    title,
    count,
    tasks,
    onDeleteTask,
    onMoveTask,
    status,
    isAdmin,
    currentUserId
}: TaskColumnProps) {
    const getColumnColor = () => {
        switch (status) {
            case 'pending':
                return 'bg-gray-100 border-b border-gray-200';
            case 'in-progress':
                return 'bg-gray-200 border-b border-gray-300';
            case 'completed':
                return 'bg-black text-white border-b border-black';
            default:
                return 'bg-gray-50 border-b border-gray-200';
        }
    };

    const getTextColor = () => {
        if (status === 'completed') return 'text-white';
        return 'text-black';
    };

    return (
        <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Column Header */}
            <div className={`${getColumnColor()} p-4`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h2 className={`text-base font-bold ${getTextColor()}`}>{title}</h2>
                        <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${status === 'completed' ? 'bg-white text-black' : 'bg-black text-white'
                            }`}>
                            {count}
                        </span>
                    </div>
                    <button className={`${status === 'completed' ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:text-black hover:bg-gray-200'} transition-colors p-1 rounded-lg`}>
                        <Plus size={18} />
                    </button>
                </div>
            </div>

            {/* Tasks List */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto custom-scrollbar bg-gray-50">
                {tasks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-12">
                        <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                            <Repeat className="h-8 w-8 text-gray-300" />
                        </div>
                        <p className="text-sm text-gray-400 font-medium">No tasks here yet</p>
                        <p className="text-xs text-gray-300 mt-1">Tasks will appear when added</p>
                    </div>
                ) : (
                    tasks.map((task) => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            onDelete={onDeleteTask}
                            onMove={onMoveTask}
                            isAdmin={isAdmin}
                            currentUserId={currentUserId}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
