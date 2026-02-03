'use client';

import { useEffect, useState } from 'react';

export default function SprintProgressCard() {
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setAnimated(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // Matches the "79/93" stats in the header
    const totalTasks = 93;
    const completedTasks = 79;
    const inProgressTasks = 9;
    const remainingTasks = 5;
    const daysRemaining = 5;

    // Data mapped to the 79 completed tasks logic
    const weeklyData = [
        { day: 'Mon', completed: 12 },
        { day: 'Tue', completed: 18 },
        { day: 'Wed', completed: 15 },
        { day: 'Thu', completed: 22 },
        { day: 'Fri', completed: 8 },
        { day: 'Sat', completed: 2 },
        { day: 'Sun', completed: 2 },
    ];

    const maxDaily = 25; // Scale max

    return (
        <div className="relative w-full max-w-lg mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col h-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Sprint Timeline</h3>
                        <div className="flex items-baseline gap-2 mt-2">
                            <span className="text-4xl font-bold text-gray-900 dark:text-white">{completedTasks}</span>
                            <span className="text-base text-gray-500 dark:text-gray-400 font-medium">/ {totalTasks} tasks</span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{daysRemaining} days remaining in sprint</p>
                    </div>
                    <div className="px-3 py-1 bg-green-50 dark:bg-emerald-900/30 rounded-full border border-green-100 dark:border-emerald-800">
                        <span className="text-xs font-semibold text-green-700 dark:text-green-400">On Track</span>
                    </div>
                </div>

                {/* Graph Area */}
                <div className="flex-1 min-h-[180px] flex flex-col justify-end mb-6">
                    <div className="flex items-end justify-between gap-3 h-[140px]">
                        {weeklyData.map((data, index) => {
                            const heightPercentage = Math.round((data.completed / maxDaily) * 100);

                            return (
                                <div key={data.day} className="flex flex-col items-center justify-end h-full flex-1 group gap-2">
                                    {/* Bar Container */}
                                    <div className="w-full max-w-[32px] h-full bg-gray-50 dark:bg-gray-700/50 rounded-lg relative overflow-hidden flex items-end">
                                        {/* The Bar */}
                                        <div
                                            className="w-full rounded-md relative z-10 transition-all duration-700 ease-out group-hover:opacity-90"
                                            style={{
                                                height: animated ? `${heightPercentage}%` : '4%',
                                                backgroundColor: '#10b981', // emerald-500
                                                minHeight: '4px',
                                                transitionDelay: `${index * 100}ms`
                                            }}
                                        >
                                            {/* Highlight/Sheen effect */}
                                            <div className="absolute top-0 inset-x-0 h-[10%] bg-white/20 rounded-t-md"></div>
                                        </div>

                                        {/* Tooltip */}
                                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                                            {data.completed} tasks
                                        </div>
                                    </div>

                                    {/* Label */}
                                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{data.day}</span>
                                </div>
                            );
                        })}
                    </div>

                    <div className="text-center mt-6">
                        <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">Daily task completion</p>
                    </div>
                </div>

                {/* Footer Summary */}
                <div className="space-y-3 pt-6 border-t border-gray-100 dark:border-gray-700/50">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors cursor-default">
                        <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#10b981' }}></div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Completed</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{completedTasks}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors cursor-default">
                        <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">In Progress</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{inProgressTasks}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors cursor-default">
                        <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-gray-400"></div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Remaining</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{remainingTasks}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
