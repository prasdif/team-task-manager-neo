'use client';

import { Suspense } from 'react';
import {
    Clock,
    CheckCircle2,
    ListTodo,
    TrendingUp,
    MoreHorizontal,
    Calendar,
    ArrowRight,
    Users,
    Filter
} from 'lucide-react';
import { useGetTasksQuery } from '@/lib/features/tasks/taskApi';
import Link from 'next/link';

function DashboardContent() {
    const { data: tasks = [], isLoading } = useGetTasksQuery({ filter: 'all' });

    // Calculate Stats
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;
    const pendingTasks = tasks.filter(t => t.status === 'pending').length;

    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const stats = [
        {
            label: 'Total Tasks',
            value: totalTasks.toString(),
            change: '', // Dynamic change requires history, skipping for now
            icon: ListTodo,
            color: 'text-black',
            bg: 'bg-gray-100'
        },
        {
            label: 'In Progress',
            value: inProgressTasks.toString(),
            change: '',
            icon: Clock,
            color: 'text-black',
            bg: 'bg-gray-200'
        },
        {
            label: 'Completed',
            value: completedTasks.toString(),
            change: '',
            icon: CheckCircle2,
            color: 'text-black',
            bg: 'bg-gray-100'
        },
        {
            label: 'Pending',
            value: pendingTasks.toString(),
            change: '',
            icon: Filter,
            color: 'text-black',
            bg: 'bg-gray-200'
        },
    ];

    const recentTasks = [...tasks].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3);
    const pendingTasksList = tasks.filter(t => t.status === 'pending').slice(0, 4);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[400px]">
                <div className="text-center">
                    <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-black border-r-transparent"></div>
                    <p className="mt-4 text-sm text-gray-500">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Dashboard Overview</h1>
                <p className="mt-2 text-base text-gray-500">Welcome back! Here's what's happening with your tasks today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-md hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                            <div className={`${stat.bg} rounded-lg p-3`}>
                                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-sm font-medium text-gray-500">{stat.label}</h3>
                            <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Recent Tasks */}
                <div className="lg:col-span-2">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-gray-900">Recent Tasks</h2>
                        <Link href="/dashboard/tasks" className="text-sm font-medium text-black hover:text-gray-700 flex items-center gap-1">
                            View All <ArrowRight size={16} />
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {recentTasks.length === 0 && (
                            <div className="p-8 text-center bg-white rounded-xl border border-gray-200">
                                <p className="text-gray-500">No tasks found. Create one to get started!</p>
                            </div>
                        )}
                        {recentTasks.map((task) => (
                            <div key={task._id} className="group flex flex-col gap-4 rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${task.priority === 'High' ? 'bg-red-100 text-red-600' : task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'
                                        } font-bold text-lg`}>
                                        {task.title.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 group-hover:text-black transition-colors">{task.title}</h3>
                                        <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <Calendar size={12} /> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Due Date'}
                                            </span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1">
                                                <Users size={12} /> {task.assigneeName || 'Unassigned'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 sm:w-1/3 justify-end">
                                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${task.status === 'completed' ? 'bg-black text-white' :
                                        task.status === 'in-progress' ? 'bg-gray-200 text-black' :
                                            'bg-gray-100 text-gray-600'
                                        }`}>
                                        {task.status.replace('-', ' ')}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pending Tasks Quick List */}
                <div className="lg:col-span-1">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-gray-900">Pending</h2>
                        <Link href="/dashboard/tasks" className="rounded-lg bg-black px-3 py-1 text-xs font-semibold text-white hover:bg-gray-900">
                            View All
                        </Link>
                    </div>
                    <div className="rounded-2xl bg-white p-2 shadow-sm ring-1 ring-gray-200">
                        {pendingTasksList.length === 0 && (
                            <div className="p-4 text-center">
                                <p className="text-sm text-gray-500">No pending tasks!</p>
                            </div>
                        )}
                        {pendingTasksList.map((task) => (
                            <div key={task._id} className="flex items-start gap-3 rounded-xl p-3 hover:bg-gray-50 transition-colors cursor-pointer group">
                                <div className="mt-1">
                                    <div className="h-5 w-5 rounded border-2 border-gray-300 group-hover:border-black transition-colors"></div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900 group-hover:text-black line-clamp-1">{task.title}</p>
                                    <p className="text-xs text-gray-500">{task.assigneeName || 'Unassigned'}</p>
                                </div>
                            </div>
                        ))}
                        <div className="my-2 border-t border-gray-100"></div>
                        <Link href="/dashboard/tasks" className="block w-full py-2 text-center text-sm font-medium text-gray-500 hover:text-gray-900">
                            View all tasks
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DashboardLoading() {
    return (
        <div className="flex items-center justify-center h-full min-h-[400px]">
            <div className="text-center">
                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-black border-r-transparent"></div>
                <p className="mt-4 text-sm text-gray-500">Loading dashboard...</p>
            </div>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <Suspense fallback={<DashboardLoading />}>
            <DashboardContent />
        </Suspense>
    );
}
