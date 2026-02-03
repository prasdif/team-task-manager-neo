'use client';

import { useEffect, useState } from 'react';

export default function TaskBoardCard() {
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setAnimated(true), 300);
        return () => clearTimeout(timer);
    }, []);

    const columns = [
        {
            title: 'To Do',
            count: 8,
            tasks: [
                { title: 'Design new landing page', assignee: 'JD', color: 'bg-purple-500' },
                { title: 'Update documentation', assignee: 'SM', color: 'bg-blue-500' },
                { title: 'Code review session', assignee: 'AK', color: 'bg-green-500' }
            ]
        },
        {
            title: 'In Progress',
            count: 5,
            tasks: [
                { title: 'Build user dashboard', assignee: 'JD', color: 'bg-purple-500' },
                { title: 'API integration', assignee: 'RK', color: 'bg-orange-500' }
            ]
        },
        {
            title: 'Completed',
            count: 12,
            tasks: [
                { title: 'Setup authentication', assignee: 'SM', color: 'bg-blue-500' },
                { title: 'Database migration', assignee: 'AK', color: 'bg-green-500' }
            ]
        }
    ];

    return (
        <div className="relative w-full max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 border border-gray-100">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Active Sprint Board</h3>
                        <p className="text-sm text-gray-500 mt-1">25 total tasks</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-white flex items-center justify-center text-xs font-medium text-white">JD</div>
                            <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-xs font-medium text-white">SM</div>
                            <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-white flex items-center justify-center text-xs font-medium text-white">AK</div>
                            <div className="w-8 h-8 rounded-full bg-orange-500 border-2 border-white flex items-center justify-center text-xs font-medium text-white">RK</div>
                        </div>
                    </div>
                </div>

                {/* Kanban Columns */}
                <div className="grid grid-cols-3 gap-4">
                    {columns.map((column, colIndex) => (
                        <div
                            key={colIndex}
                            className={`${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                } transition-all duration-700 ease-out`}
                            style={{ transitionDelay: `${colIndex * 150}ms` }}
                        >
                            <div className="bg-gray-50 rounded-xl p-3">
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">{column.title}</h4>
                                    <span className="text-xs font-bold text-gray-500">{column.count}</span>
                                </div>

                                <div className="space-y-2">
                                    {column.tasks.map((task, taskIndex) => (
                                        <div
                                            key={taskIndex}
                                            className="bg-white rounded-lg p-3 shadow-sm border border-gray-100"
                                        >
                                            <p className="text-xs font-medium text-gray-900 mb-2 line-clamp-2">{task.title}</p>
                                            <div className="flex items-center gap-2">
                                                <div className={`w-5 h-5 rounded-full ${task.color} flex items-center justify-center text-[10px] font-medium text-white`}>
                                                    {task.assignee}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Progress Bar */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Sprint Progress</span>
                        <span className="text-sm font-bold text-gray-900">68%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: animated ? '68%' : '0%' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
