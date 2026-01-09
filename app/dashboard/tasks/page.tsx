'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Plus, Sparkles, Filter, Users as UsersIcon, User, CheckCircle2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import TaskColumn from '@/components/tasks/TaskColumn';
import CreateTaskModal from '@/components/tasks/CreateTaskModal';
import { toast } from 'react-hot-toast';
import {
    useGetTasksQuery,
    useGetTeamMembersQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
    Task,
} from '@/lib/features/tasks/taskApi';

export default function TasksPage() {
    const { user } = useSelector((state: RootState) => state.auth);
    const searchParams = useSearchParams();
    const searchTerm = searchParams.get('search') || '';

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskFilter, setTaskFilter] = useState<'my' | 'all'>('my');

    // Fetch tasks based on filter and search
    const { data: tasks = [], isLoading, refetch } = useGetTasksQuery({
        filter: taskFilter,
        search: searchTerm
    });
    const { data: teamMembers = [] } = useGetTeamMembersQuery();
    const [createTask] = useCreateTaskMutation();
    const [updateTask] = useUpdateTaskMutation();
    const [deleteTask] = useDeleteTaskMutation();

    const isAdmin = user?.role === 'admin';

    const handleCreateTask = async (newTask: Partial<Task>) => {
        try {
            await createTask(newTask).unwrap();
            setIsModalOpen(false);
            toast.success('Task created successfully!');
            refetch();
        } catch (error) {
            console.error('Failed to create task:', error);
            toast.error('Failed to create task');
        }
    };

    const handleDeleteTask = async (taskId: string) => {
        try {
            await deleteTask(taskId).unwrap();
            toast.success('Task deleted');
            refetch();
        } catch (error) {
            console.error('Failed to delete task:', error);
            toast.error('Failed to delete task');
        }
    };

    const handleMoveTask = async (taskId: string, newStatus: Task['status']) => {
        try {
            await updateTask({ id: taskId, data: { status: newStatus } }).unwrap();
            toast.success(`Task moved to ${newStatus.replace('-', ' ')}`);
            refetch();
        } catch (error) {
            console.error('Failed to move task:', error);
            toast.error('Failed to update task status');
        }
    };

    const pendingTasks = tasks.filter(task => task.status === 'pending');
    const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
    const completedTasks = tasks.filter(task => task.status === 'completed');

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">TaskFlow AI</h1>
                            <p className="text-sm text-gray-500">
                                {isAdmin ? 'Admin Dashboard' : 'My Workspace'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                    {/* Filter Toggle - Only show for Admin */}
                    {isAdmin && (
                        <div className="flex items-center gap-2 bg-white rounded-xl p-1 shadow-sm border border-gray-200">
                            <button
                                onClick={() => setTaskFilter('my')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${taskFilter === 'my'
                                    ? 'bg-black text-white shadow-md'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <User size={16} />
                                My Tasks
                            </button>
                            <button
                                onClick={() => setTaskFilter('all')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${taskFilter === 'all'
                                    ? 'bg-black text-white shadow-md'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <UsersIcon size={16} />
                                All Tasks
                            </button>
                        </div>
                    )}

                    {/* Team Avatars */}
                    <div className="flex -space-x-2">
                        {teamMembers.slice(0, 4).map((member) => (
                            <div
                                key={member._id}
                                className="h-10 w-10 rounded-full border-2 border-white shadow-sm bg-black flex items-center justify-center text-white font-bold text-sm hover:scale-110 transition-transform cursor-pointer"
                                title={`${member.username} (${member.role})`}
                            >
                                {member.username.charAt(0).toUpperCase()}
                            </div>
                        ))}
                        {teamMembers.length > 4 && (
                            <div className="h-10 w-10 rounded-full border-2 border-white shadow-sm bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-xs">
                                +{teamMembers.length - 4}
                            </div>
                        )}
                    </div>

                    {/* New Task Button */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-gray-900 hover:shadow-xl transition-all hover:scale-105"
                    >
                        <Plus size={18} />
                        New Task
                    </button>
                </div>
            </div>

            {/* Stats Bar - Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Pending</p>
                            <p className="text-2xl font-bold text-black mt-1">{pendingTasks.length}</p>
                        </div>
                        <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200">
                            <Filter className="h-6 w-6 text-black" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">In Progress</p>
                            <p className="text-2xl font-bold text-black mt-1">{inProgressTasks.length}</p>
                        </div>
                        <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center border border-gray-300">
                            <Sparkles className="h-6 w-6 text-black" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Completed</p>
                            <p className="text-2xl font-bold text-black mt-1">{completedTasks.length}</p>
                        </div>
                        <div className="h-12 w-12 rounded-lg bg-black flex items-center justify-center shadow-md">
                            <CheckCircle2 className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-black border-r-transparent"></div>
                        <p className="mt-4 text-sm text-gray-500">Loading tasks...</p>
                    </div>
                </div>
            )}

            {/* Kanban Board */}
            {!isLoading && (
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
                    <TaskColumn
                        title="Pending"
                        count={pendingTasks.length}
                        tasks={pendingTasks}
                        onDeleteTask={handleDeleteTask}
                        onMoveTask={handleMoveTask}
                        status="pending"
                        isAdmin={isAdmin}
                        currentUserId={user?._id || ''}
                    />
                    <TaskColumn
                        title="In Progress"
                        count={inProgressTasks.length}
                        tasks={inProgressTasks}
                        onDeleteTask={handleDeleteTask}
                        onMoveTask={handleMoveTask}
                        status="in-progress"
                        isAdmin={isAdmin}
                        currentUserId={user?._id || ''}
                    />
                    <TaskColumn
                        title="Completed"
                        count={completedTasks.length}
                        tasks={completedTasks}
                        onDeleteTask={handleDeleteTask}
                        onMoveTask={handleMoveTask}
                        status="completed"
                        isAdmin={isAdmin}
                        currentUserId={user?._id || ''}
                    />
                </div>
            )}

            {/* Create Task Modal */}
            <CreateTaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreateTask={handleCreateTask}
                teamMembers={teamMembers}
                isAdmin={isAdmin}
                currentUser={user}
            />
        </div>
    );
}
