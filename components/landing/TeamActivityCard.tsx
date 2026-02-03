'use client';

import { useEffect, useState } from 'react';

export default function TeamActivityCard() {
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setAnimated(true), 300);
        return () => clearTimeout(timer);
    }, []);

    const activities = [
        { label: 'Design', value: 156, color: 'bg-blue-500', width: 85 },
        { label: 'Dev', value: 203, color: 'bg-blue-400', width: 100 },
        { label: 'QA', value: 89, color: 'bg-blue-300', width: 55 }
    ];

    return (
        <div className="relative w-full max-w-lg mx-auto">
            {/* Main Card */}
            <div className="bg-white rounded-3xl shadow-lg p-8 sm:p-10 border border-gray-100">

                {/* Header */}
                <div className="mb-8">
                    <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">
                        Team Performance
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Active Projects</h3>
                    <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-4xl font-bold text-gray-900">448</span>
                        <span className="text-lg font-semibold text-green-500">↑ 12.3%</span>
                    </div>
                    <div className="text-sm text-gray-500">Total tasks completed</div>
                </div>

                {/* Horizontal Bar Chart */}
                <div className="space-y-5 mb-8">
                    {activities.map((activity, index) => (
                        <div key={index}>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-700">{activity.label}</span>
                                <span className="text-sm font-semibold text-gray-900">{activity.value}</span>
                            </div>
                            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full ${activity.color} rounded-full transition-all duration-1000 ease-out`}
                                    style={{
                                        width: animated ? `${activity.width}%` : '0%',
                                        transitionDelay: `${index * 150}ms`
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                    <div>
                        <div className="text-xs text-gray-500 mb-1">Avg. Time</div>
                        <div className="text-lg font-bold text-gray-900">4.2h</div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-500 mb-1">Members</div>
                        <div className="text-lg font-bold text-gray-900">24</div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-500 mb-1">Due Soon</div>
                        <div className="text-lg font-bold text-gray-900">8</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
