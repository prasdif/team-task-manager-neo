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
                return 'bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700';
            case 'in-progress':
                return 'bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600';
            case 'completed':
                return 'bg-gray-50 dark:bg-black border-b border-gray-200 dark:border-gray-900';
            default:
                return 'bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700';
        }
    };

    const getTextColor = () => {
        return 'text-gray-900 dark:text-gray-100';
    };

    const getCountBadgeColor = () => {
        switch (status) {
            case 'pending':
                return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
            case 'in-progress':
                return 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400';
            case 'completed':
                return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
            default:
                return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    return (
        <div className="flex flex-col h-full bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
            {/* Column Header */}
            <div className={`${getColumnColor()} px-4 py-3.5`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <h2 className={`text-sm font-bold uppercase tracking-wide ${getTextColor()}`}>{title}</h2>
                        <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${getCountBadgeColor()}`}>
                            {count}
                        </span>
                    </div>
                    <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors p-1.5 rounded-lg">
                        <Plus size={16} strokeWidth={2.5} />
                    </button>
                </div>
            </div>

            {/* Tasks List */}
            <div className="flex-1 p-3 space-y-2.5 overflow-y-auto custom-scrollbar bg-gray-50 dark:bg-gray-800">
                {tasks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-12">
                        <div className="h-14 w-14 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-3">
                            <Repeat className="h-7 w-7 text-gray-400 dark:text-gray-500" strokeWidth={1.5} />
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">No tasks here yet</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Tasks will appear when added</p>
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
