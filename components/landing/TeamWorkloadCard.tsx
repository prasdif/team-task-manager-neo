'use client';

import { useEffect, useState } from 'react';

export default function TeamWorkloadCard() {
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setAnimated(true), 300);
        return () => clearTimeout(timer);
    }, []);

    const teamMembers = [
        { name: 'Jordan Davis', initials: 'JD', tasks: 8, completed: 6, color: 'bg-purple-500', progress: 75 },
        { name: 'Sarah Miller', initials: 'SM', tasks: 12, completed: 10, color: 'bg-blue-500', progress: 83 },
        { name: 'Alex Kumar', initials: 'AK', tasks: 6, completed: 5, color: 'bg-green-500', progress: 83 },
        { name: 'Ryan Kim', initials: 'RK', tasks: 10, completed: 7, color: 'bg-orange-500', progress: 70 }
    ];

    return (
        <div className="relative w-full max-w-lg mx-auto">
            <div className="bg-white rounded-3xl shadow-lg p-8 sm:p-10 border border-gray-100">

                {/* Header */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Team Workload</h3>
                    <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-4xl font-bold text-gray-900">36</span>
                        <span className="text-lg font-medium text-gray-500">active tasks</span>
                    </div>
                    <p className="text-sm text-gray-500">Across 4 team members</p>
                </div>

                {/* Team Member List */}
                <div className="space-y-4 mb-8">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className={`${animated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                                } transition-all duration-700 ease-out`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className={`w-10 h-10 rounded-full ${member.color} flex items-center justify-center text-sm font-medium text-white flex-shrink-0`}>
                                    {member.initials}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-medium text-gray-900">{member.name}</span>
                                        <span className="text-xs font-semibold text-gray-900">{member.completed}/{member.tasks}</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${member.color} rounded-full transition-all duration-1000 ease-out`}
                                            style={{
                                                width: animated ? `${member.progress}%` : '0%',
                                                transitionDelay: `${(index * 100) + 200}ms`
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                    <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">Avg. Load</div>
                        <div className="text-2xl font-bold text-gray-900">9</div>
                        <div className="text-xs text-gray-500">tasks</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">Completion</div>
                        <div className="text-2xl font-bold text-green-500">78%</div>
                        <div className="text-xs text-gray-500">rate</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">Capacity</div>
                        <div className="text-2xl font-bold text-blue-500">85%</div>
                        <div className="text-xs text-gray-500">used</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
