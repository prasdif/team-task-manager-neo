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
    BarChart2
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

    const stats = [
        {
            label: 'Total Tasks',
            value: totalTasks.toString(),
            icon: ListTodo,
            iconColor: 'text-gray-700 dark:text-gray-300',
            iconBg: 'bg-gray-100 dark:bg-gray-700'
        },
        {
            label: 'In Progress',
            value: inProgressTasks.toString(),
            icon: Clock,
            iconColor: 'text-orange-600 dark:text-orange-400',
            iconBg: 'bg-orange-50 dark:bg-orange-900/20'
        },
        {
            label: 'Completed',
            value: completedTasks.toString(),
            icon: CheckCircle2,
            iconColor: 'text-green-600 dark:text-green-400',
            iconBg: 'bg-green-50 dark:bg-green-900/20'
        },
        {
            label: 'Pending Review',
            value: pendingTasks.toString(),
            icon: BarChart2,
            iconColor: 'text-blue-600 dark:text-blue-400',
            iconBg: 'bg-blue-50 dark:bg-blue-900/20'
        },
    ];

    const recentTasks = [...tasks].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 4);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[500px]">
                <div className="text-center">
                    <div className="inline-block h-10 w-10 animate-spin rounded-full border-3 border-solid border-gray-300 border-t-gray-900 dark:border-gray-600 dark:border-t-white"></div>
                    <p className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-400">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-[1400px]">
            {/* Header Section */}
            <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Dashboard</h1>
                    <p className="mt-1.5 text-sm text-gray-600 dark:text-gray-400">Welcome back to your project management dashboard.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/dashboard/calendar"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all shadow-sm"
                    >
                        <Calendar size={16} />
                        View Calendar
                    </Link>
                    <Link
                        href="/dashboard/tasks"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-sm"
                    >
                        <span className="text-base font-bold">+</span>
                        New Task
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
                    >
                        <div className="flex items-center gap-3">
                            <div className={`${stat.iconBg} rounded-lg p-2.5 flex items-center justify-center`}>
                                <stat.icon className={`h-5 w-5 ${stat.iconColor}`} strokeWidth={2} />
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                            <p className="mt-1.5 text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Recent Tasks */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Tasks</h2>
                            <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-400">Your most recent tasks and their status</p>
                        </div>
                        <Link
                            href="/dashboard/tasks"
                            className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center gap-1.5 group"
                        >
                            View All
                            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {recentTasks.length === 0 && (
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center border border-gray-200 dark:border-gray-700">
                                <ListTodo className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600" strokeWidth={1.5} />
                                <p className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-400">No tasks found</p>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">Create one to get started!</p>
                            </div>
                        )}
                        {recentTasks.map((task) => (
                            <div
                                key={task._id}
                                className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all group cursor-pointer"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-3 flex-1 min-w-0">
                                        <div className={`flex-shrink-0 px-2.5 py-1 rounded-md text-xs font-semibold uppercase ${task.priority === 'High'
                                            ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                                            : task.priority === 'Medium'
                                                ? 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400'
                                                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                                            }`}>
                                            {task.priority || 'low'}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-900 dark:text-white text-base group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors truncate">
                                                {task.title}
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                Due {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'No date set'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex-shrink-0">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold ${task.status === 'completed'
                                            ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                                            : task.status === 'in-progress'
                                                ? 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400'
                                                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                                            }`}>
                                            {task.status === 'in-progress' ? 'In Progress' : task.status === 'completed' ? 'Completed' : 'Backlog'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column - Team & Activity */}
                <div className="lg:col-span-1 space-y-6">

                    {/* Team Members */}
                    {/* Team Members */}
                    <div>
                        <div className="mb-4">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Team Members</h2>
                            <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-400">People working on this project</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                            <div className="space-y-1">
                                <div className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm flex-shrink-0">
                                        JD
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">John Doe</p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">john@example.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm flex-shrink-0">
                                        JS
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">Jane Smith</p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">jane@example.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm flex-shrink-0">
                                        BJ
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">Bob Johnson</p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">bob@example.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div>
                        <div className="mb-4">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h2>
                            <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-400">Latest updates from the project</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="h-2 w-2 rounded-full bg-gray-900 dark:bg-white mt-2 flex-shrink-0"></div>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">Task moved to In Progress</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DashboardLoading() {
    return (
        <div className="flex items-center justify-center h-full min-h-[500px]">
            <div className="text-center">
                <div className="inline-block h-10 w-10 animate-spin rounded-full border-3 border-solid border-gray-300 border-t-gray-900 dark:border-gray-600 dark:border-t-white"></div>
                <p className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-400">Loading dashboard...</p>
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
