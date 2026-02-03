'use client';

import { useEffect, useState } from 'react';

export default function TaskActivityCard() {
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setAnimated(true), 300);
        return () => clearTimeout(timer);
    }, []);

    const activities = [
        { user: 'SM', action: 'completed', task: 'Homepage redesign', time: '2m ago', color: 'bg-blue-500' },
        { user: 'JD', action: 'started', task: 'API documentation', time: '15m ago', color: 'bg-purple-500' },
        { user: 'AK', action: 'reviewed', task: 'Authentication flow', time: '1h ago', color: 'bg-green-500' },
        { user: 'RK', action: 'commented on', task: 'Database schema', time: '2h ago', color: 'bg-orange-500' }
    ];

    const todayStats = [
        { label: 'Tasks Today', value: 18, change: '+3', changeColor: 'text-green-500' },
        { label: 'Active Users', value: 4, change: '●', changeColor: 'text-green-500' }
    ];

    return (
        <div className="relative w-full max-w-lg mx-auto">
            <div className="bg-white rounded-3xl shadow-lg p-8 sm:p-10 border border-gray-100">

                {/* Header */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Today's Activity</h3>
                    <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-4xl font-bold text-gray-900">24</span>
                        <span className="text-lg font-medium text-gray-500">updates</span>
                    </div>
                    <p className="text-sm text-gray-500">Last updated 2 minutes ago</p>
                </div>

                {/* Today Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    {todayStats.map((stat, index) => (
                        <div
                            key={index}
                            className={`p-4 rounded-xl bg-gray-50 border border-gray-100 ${animated ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                                } transition-all duration-500 ease-out`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className="text-xs font-medium text-gray-500 mb-2">{stat.label}</div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                                <span className={`text-sm font-semibold ${stat.changeColor}`}>{stat.change}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Activity Feed */}
                <div className="space-y-3 mb-6">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
                        Recent Activity
                    </div>
                    {activities.map((activity, index) => (
                        <div
                            key={index}
                            className={`flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors ${animated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                                } transition-all duration-700 ease-out`}
                            style={{ transitionDelay: `${(index * 100) + 200}ms` }}
                        >
                            <div className={`w-8 h-8 rounded-full ${activity.color} flex items-center justify-center text-xs font-medium text-white flex-shrink-0`}>
                                {activity.user}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-900">
                                    <span className="font-medium">{activity.user}</span>
                                    {' '}
                                    <span className="text-gray-600">{activity.action}</span>
                                    {' '}
                                    <span className="font-medium text-gray-900">{activity.task}</span>
                                </p>
                                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Status Indicator */}
                <div className="pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-sm text-gray-600">All systems operational</span>
                        </div>
                        <span className="text-xs text-gray-500">Updated live</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
