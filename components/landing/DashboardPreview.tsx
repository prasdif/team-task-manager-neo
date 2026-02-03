'use client';

import { Users, BarChart3 } from 'lucide-react';

export default function DashboardPreview() {
    return (
        <section className="relative -mt-8 pb-32 px-6 lg:px-12">
            {/* Subtle grid background */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                    }}
                ></div>
            </div>

            <div className="relative mx-auto max-w-7xl">
                {/* Main Dashboard Card Container */}
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-10 lg:p-12 hover:shadow-3xl transition-shadow duration-500">

                    {/* Dashboard Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                        <div>
                            <h3 className="text-2xl font-bold text-black mb-1">Product Launch</h3>
                            <p className="text-sm text-gray-500">12 tasks · 4 team members</p>
                        </div>

                        {/* Team Members Avatars */}
                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border-2 border-white shadow-sm flex items-center justify-center text-white text-xs font-medium">JD</div>
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 border-2 border-white shadow-sm flex items-center justify-center text-white text-xs font-medium">AK</div>
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 border-2 border-white shadow-sm flex items-center justify-center text-white text-xs font-medium">ML</div>
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 border-2 border-white shadow-sm flex items-center justify-center text-white text-xs font-medium">+2</div>
                            </div>
                        </div>
                    </div>

                    {/* Kanban Board Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                        {/* Left Sidebar - Team Stats */}
                        <div className="lg:col-span-3">
                            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg">
                                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-4">
                                    <Users size={24} className="text-white" />
                                </div>
                                <div className="text-3xl font-bold text-black mb-1">24</div>
                                <div className="text-sm text-gray-500">Team Members</div>
                            </div>
                        </div>

                        {/* Kanban Columns - 3 columns */}
                        <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-4">

                            {/* Column 1: To Do */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-sm font-semibold text-gray-900">To Do</h4>
                                    <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">3</span>
                                </div>

                                {/* Task Card 1 */}
                                <div className="group bg-white rounded-xl p-4 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer">
                                    <div className="flex items-start gap-3 mb-3">
                                        <input type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-300 text-black focus:ring-black focus:ring-offset-0" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900 mb-2">Design new landing page</p>
                                            <span className="inline-block px-2 py-1 text-xs font-medium text-red-700 bg-red-50 rounded-md">High Priority</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Task Card 2 */}
                                <div className="group bg-white rounded-xl p-4 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer">
                                    <div className="flex items-start gap-3 mb-3">
                                        <input type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-300 text-black focus:ring-black focus:ring-offset-0" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900 mb-2">User research interviews</p>
                                            <span className="inline-block px-2 py-1 text-xs font-medium text-yellow-700 bg-yellow-50 rounded-md">Medium</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Task Card 3 */}
                                <div className="group bg-white rounded-xl p-4 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer">
                                    <div className="flex items-start gap-3 mb-3">
                                        <input type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-300 text-black focus:ring-black focus:ring-offset-0" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900 mb-2">Competitor analysis</p>
                                            <span className="inline-block px-2 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-md">Low</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Column 2: In Progress */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-sm font-semibold text-gray-900">In Progress</h4>
                                    <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">2</span>
                                </div>

                                {/* Task Card 1 */}
                                <div className="group bg-white rounded-xl p-4 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer">
                                    <div className="flex items-start gap-3 mb-3">
                                        <input type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-300 text-black focus:ring-black focus:ring-offset-0" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900 mb-2">Develop API endpoints</p>
                                            <span className="inline-block px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-md">In Review</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Task Card 2 */}
                                <div className="group bg-white rounded-xl p-4 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer">
                                    <div className="flex items-start gap-3 mb-3">
                                        <input type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-300 text-black focus:ring-black focus:ring-offset-0" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900 mb-2">Create marketing assets</p>
                                            <span className="inline-block px-2 py-1 text-xs font-medium text-purple-700 bg-purple-50 rounded-md">Active</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Column 3: Done */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-sm font-semibold text-gray-900">Done</h4>
                                    <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">4</span>
                                </div>

                                {/* Completion Rate Card */}
                                <div className="group bg-gradient-to-br from-black to-gray-900 rounded-xl p-5 mb-3 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:scale-105">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                                            <BarChart3 size={20} className="text-white" />
                                        </div>
                                    </div>
                                    <div className="text-4xl font-bold text-white mb-1">92%</div>
                                    <div className="text-xs text-gray-300">Completion Rate</div>
                                </div>

                                {/* Task Card 1 */}
                                <div className="group bg-white rounded-xl p-4 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer opacity-60">
                                    <div className="flex items-start gap-3 mb-3">
                                        <input type="checkbox" checked readOnly className="mt-1 w-4 h-4 rounded border-gray-300 text-black focus:ring-black focus:ring-offset-0" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-500 line-through mb-2">Setup project repo</p>
                                            <span className="inline-block px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-md">Completed</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Task Card 2 */}
                                <div className="group bg-white rounded-xl p-4 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer opacity-60">
                                    <div className="flex items-start gap-3 mb-3">
                                        <input type="checkbox" checked readOnly className="mt-1 w-4 h-4 rounded border-gray-300 text-black focus:ring-black focus:ring-offset-0" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-500 line-through mb-2">Initial wireframes</p>
                                            <span className="inline-block px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-md">Completed</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
