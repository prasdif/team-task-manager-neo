'use client';

import { User, Calendar, Trash2, ArrowRight, ArrowLeft, Crown } from 'lucide-react';
import { Task } from '@/lib/features/tasks/taskApi';

interface TaskCardProps {
    task: Task;
    onDelete: (taskId: string) => void;
    onMove: (taskId: string, newStatus: Task['status']) => void;
    isAdmin: boolean;
    currentUserId: string;
}

export default function TaskCard({ task, onDelete, onMove, isAdmin, currentUserId }: TaskCardProps) {
    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'High':
                return 'bg-black text-white border-black';
            case 'Medium':
                return 'bg-gray-200 text-black border-gray-300';
            case 'Low':
                return 'bg-white text-black border-gray-300';
            default:
                return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    const getNextStatus = (): Task['status'] | null => {
        if (task.status === 'pending') return 'in-progress';
        if (task.status === 'in-progress') return 'completed';
        return null;
    };

    const getPreviousStatus = (): Task['status'] | null => {
        if (task.status === 'completed') return 'in-progress';
        if (task.status === 'in-progress') return 'pending';
        return null;
    };

    const canModifyTask = isAdmin || task.createdBy._id === currentUserId;
    const isAssignedToMe = task.assignee?._id === currentUserId;

    return (
        <div className={`group bg-white rounded-xl p-4 shadow-sm border transition-all cursor-pointer ${isAssignedToMe
            ? 'border-gray-400 shadow-md'
            : 'border-gray-200 hover:border-black hover:shadow-md'
            }`}>
            {/* Priority Badge and Actions */}
            <div className="flex items-start justify-between mb-3">
                <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                </span>
                {canModifyTask && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(task._id);
                        }}
                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-black transition-all p-1 hover:bg-gray-100 rounded-lg"
                        title="Delete task"
                    >
                        <Trash2 size={14} />
                    </button>
                )}
            </div>

            {/* Task Title */}
            <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-black transition-colors">
                {task.title}
            </h3>

            {/* Task Description */}
            {task.description && (
                <p className="text-xs text-gray-500 mb-3 line-clamp-2 leading-relaxed">
                    {task.description}
                </p>
            )}

            {/* Subtasks Preview */}
            {task.subtasks && task.subtasks.length > 0 && (
                <div className="mb-3 p-2 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="text-xs text-black font-semibold mb-1">
                        Subtasks ({task.subtasks.length})
                    </p>
                    <div className="space-y-1">
                        {task.subtasks.slice(0, 2).map((subtask, index) => (
                            <p key={index} className="text-xs text-gray-500 truncate">
                                • {subtask}
                            </p>
                        ))}
                        {task.subtasks.length > 2 && (
                            <p className="text-xs text-gray-900 font-medium">
                                +{task.subtasks.length - 2} more
                            </p>
                        )}
                    </div>
                </div>
            )}

            {/* Task Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2">
                    <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium ${isAssignedToMe
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-black'
                        }`}>
                        <User size={12} />
                        <span className="truncate max-w-[80px]">
                            {task.assignee?.username || task.assigneeName || 'Unassigned'}
                        </span>
                    </div>
                    {task.createdBy.role === 'admin' && (
                        <div className="flex items-center gap-1 text-black" title="Created by Admin">
                            <Crown size={12} />
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar size={12} />
                    <span>{task.dueDate || 'No date'}</span>
                </div>
            </div>

            {/* Move Actions - Always Visible */}
            <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                {getPreviousStatus() && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            const prevStatus = getPreviousStatus();
                            if (prevStatus) onMove(task._id, prevStatus);
                        }}
                        className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors border border-gray-200"
                    >
                        <ArrowLeft size={12} />
                        Back
                    </button>
                )}
                {getNextStatus() && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            const nextStatus = getNextStatus();
                            if (nextStatus) onMove(task._id, nextStatus);
                        }}
                        className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 text-xs font-semibold text-white bg-black hover:bg-gray-900 rounded-lg transition-colors shadow-sm"
                    >
                        Next
                        <ArrowRight size={12} />
                    </button>
                )}
            </div>

            {/* Created by info (for admins viewing all tasks) */}
            {isAdmin && task.createdBy._id !== currentUserId && (
                <div className="mt-2 pt-2 border-t border-gray-100">
                    <p className="text-xs text-gray-400">
                        Created by <span className="font-medium text-gray-600">{task.createdBy.username}</span>
                    </p>
                </div>
            )}
        </div>
    );
}
