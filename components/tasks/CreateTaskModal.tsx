'use client';

import { useState } from 'react';
import { X, Sparkles, Plus, Crown, User as UserIcon } from 'lucide-react';
import { Task, User } from '@/lib/features/tasks/taskApi';

interface CreateTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateTask: (task: Partial<Task>) => void;
    teamMembers: User[];
    isAdmin: boolean;
    currentUser: any;
}

export default function CreateTaskModal({
    isOpen,
    onClose,
    onCreateTask,
    teamMembers,
    isAdmin,
    currentUser
}: CreateTaskModalProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
    const [assigneeId, setAssigneeId] = useState(currentUser?._id || '');
    const [dueDate, setDueDate] = useState('');
    const [subtasks, setSubtasks] = useState<string[]>([]);
    const [newSubtask, setNewSubtask] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const selectedAssignee = teamMembers.find(m => m._id === assigneeId);

        onCreateTask({
            title,
            description,
            priority,
            assignee: assigneeId,
            assigneeName: selectedAssignee?.username || currentUser?.username,
            dueDate,
            status: 'pending',
            subtasks: subtasks.length > 0 ? subtasks : undefined,
        });

        // Reset form
        setTitle('');
        setDescription('');
        setPriority('Medium');
        setAssigneeId(currentUser?._id || '');
        setDueDate('');
        setSubtasks([]);
        setNewSubtask('');
    };

    const handleAddSubtask = () => {
        if (newSubtask.trim()) {
            setSubtasks([...subtasks, newSubtask.trim()]);
            setNewSubtask('');
        }
    };

    const handleRemoveSubtask = (index: number) => {
        setSubtasks(subtasks.filter((_, i) => i !== index));
    };

    const handleSuggestPriority = () => {
        const urgentKeywords = ['urgent', 'asap', 'critical', 'emergency', 'immediately', 'now'];
        const highKeywords = ['important', 'high', 'priority', 'deadline', 'soon'];

        const text = (title + ' ' + description).toLowerCase();

        if (urgentKeywords.some(keyword => text.includes(keyword))) {
            setPriority('High');
        } else if (highKeywords.some(keyword => text.includes(keyword))) {
            setPriority('High');
        } else {
            setPriority('Medium');
        }
    };

    const handleAIBreakdown = () => {
        if (title.trim()) {
            const suggestions = [
                `Research and gather requirements for "${title}"`,
                `Create initial draft/prototype`,
                `Review and get feedback from team`,
                `Make final adjustments and polish`,
                `Deploy and monitor results`,
            ];
            setSubtasks(suggestions);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-slideUp">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white">
                    <div className="flex items-center gap-3">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Create New Task</h2>
                            <p className="text-xs text-gray-500 mt-0.5">
                                {isAdmin ? 'Assign to any team member' : 'Create a task for yourself'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-black transition-colors rounded-lg p-2 hover:bg-gray-100"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Modal Body */}
                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-180px)] custom-scrollbar">
                    <div className="space-y-5">
                        {/* Task Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-bold text-gray-900 mb-2">
                                Task Title <span className="text-black">*</span>
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="What needs to be done?"
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-sm font-medium"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="description" className="block text-sm font-bold text-gray-900">
                                    Description
                                </label>
                                <button
                                    type="button"
                                    onClick={handleSuggestPriority}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-black bg-gray-100 hover:bg-gray-200 rounded-lg transition-all hover:scale-105"
                                >
                                    <Sparkles size={14} />
                                    Suggest Priority
                                </button>
                            </div>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe the task details..."
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-sm resize-none"
                            />
                        </div>

                        {/* Priority and Assignee */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="priority" className="block text-sm font-bold text-gray-900 mb-2">
                                    Priority
                                </label>
                                <select
                                    id="priority"
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value as 'Low' | 'Medium' | 'High')}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-sm font-medium bg-white cursor-pointer"
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="assignee" className="block text-sm font-bold text-gray-900 mb-2">
                                    Assign To {isAdmin && <Crown className="inline h-3 w-3 text-black" />}
                                </label>
                                <select
                                    id="assignee"
                                    value={assigneeId}
                                    onChange={(e) => setAssigneeId(e.target.value)}
                                    disabled={!isAdmin}
                                    className={`w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-sm font-medium bg-white ${isAdmin ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
                                        }`}
                                >
                                    {isAdmin ? (
                                        <>
                                            <option value="">Select team member...</option>
                                            {teamMembers.map((member) => (
                                                <option key={member._id} value={member._id}>
                                                    {member.username} {member.role === 'admin' ? '👑' : '👤'} ({member.role})
                                                </option>
                                            ))}
                                        </>
                                    ) : (
                                        <option value={currentUser?._id}>
                                            {currentUser?.username} (You)
                                        </option>
                                    )}
                                </select>
                                {!isAdmin && (
                                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                        <UserIcon size={10} />
                                        Only admins can assign tasks to others
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Due Date */}
                        <div>
                            <label htmlFor="dueDate" className="block text-sm font-bold text-gray-900 mb-2">
                                Due Date
                            </label>
                            <input
                                type="date"
                                id="dueDate"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-sm font-medium"
                            />
                        </div>

                        {/* Sub-Tasks */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-bold text-gray-900">
                                    Sub-Tasks
                                </label>
                                <button
                                    type="button"
                                    onClick={handleAIBreakdown}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-black bg-gray-100 hover:bg-gray-200 rounded-lg transition-all hover:scale-105"
                                >
                                    <Sparkles size={14} />
                                    AI Breakdown
                                </button>
                            </div>

                            {/* Subtask List */}
                            {subtasks.length > 0 && (
                                <div className="space-y-2 mb-3">
                                    {subtasks.map((subtask, index) => (
                                        <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg group border border-gray-200">
                                            <span className="flex-1 text-sm text-gray-700 font-medium">{subtask}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveSubtask(index)}
                                                className="text-gray-400 hover:text-black opacity-0 group-hover:opacity-100 transition-all p-1 hover:bg-gray-100 rounded"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Add Subtask */}
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newSubtask}
                                    onChange={(e) => setNewSubtask(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSubtask())}
                                    placeholder="Add a sub-task..."
                                    className="flex-1 px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddSubtask}
                                    className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold text-white bg-black hover:bg-gray-900 rounded-xl transition-all hover:scale-105"
                                >
                                    <Plus size={16} />
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

                {/* Modal Footer */}
                <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 text-sm font-bold text-gray-700 hover:text-black hover:bg-gray-200 rounded-xl transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-8 py-2.5 text-sm font-bold text-white bg-black hover:bg-gray-900 rounded-xl shadow-lg transition-all hover:scale-105"
                    >
                        Create Task
                    </button>
                </div>
            </div>
        </div>
    );
}
