'use client';

import { Zap, Users, BarChart3, Clock, Shield, FolderKanban } from 'lucide-react';

const features = [
    {
        icon: Zap,
        title: 'Lightning Fast',
        description: 'Built for speed. Navigate, create, and manage tasks in milliseconds with our optimized interface.',
        iconBg: 'bg-gradient-to-br from-gray-900 to-black',
        decorativeShape: 'top-right',
        metrics: { value: '<50ms', label: 'response time' },
        accentIntensity: 'strong' // darker accent
    },
    {
        icon: Users,
        title: 'Team Collaboration',
        description: 'Work together seamlessly. Share tasks, assign work, and keep everyone in sync effortlessly.',
        iconBg: 'bg-gradient-to-br from-gray-800 to-gray-900',
        decorativeShape: 'left-bottom',
        metrics: { value: '24/7', label: 'real-time sync' },
        accentIntensity: 'medium'
    },
    {
        icon: BarChart3,
        title: 'Analytics & Insights',
        description: 'Track progress and productivity. Get insights into team performance and project timelines.',
        iconBg: 'bg-gradient-to-br from-gray-700 to-gray-800',
        decorativeShape: 'top-left',
        metrics: { value: '15+', label: 'key metrics' },
        accentIntensity: 'light'
    },
    {
        icon: Clock,
        title: 'Smart Scheduling',
        description: 'Never miss a deadline. Intelligent reminders and scheduling keep your projects on track.',
        iconBg: 'bg-gradient-to-br from-gray-900 to-gray-700',
        decorativeShape: 'center',
        metrics: { value: '100%', label: 'on-time rate' },
        accentIntensity: 'strong'
    },
    {
        icon: Shield,
        title: 'Secure & Private',
        description: 'Your data is encrypted and secure. Enterprise-grade security you can trust.',
        iconBg: 'bg-gradient-to-br from-black to-gray-800',
        decorativeShape: 'diagonal',
        metrics: { value: 'AES-256', label: 'encryption' },
        accentIntensity: 'medium'
    },
    {
        icon: FolderKanban,
        title: 'Kanban Boards',
        description: 'Visualize your workflow. Drag, drop, and organize tasks with beautiful kanban boards.',
        iconBg: 'bg-gradient-to-br from-gray-800 to-black',
        decorativeShape: 'bottom-right',
        metrics: { value: 'Unlimited', label: 'boards' },
        accentIntensity: 'light'
    }
];

export default function PremiumFeatures() {
    return (
        <section className="py-32 px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50 to-white">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
                        Everything you need
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Powerful features to help your team stay productive
                    </p>
                </div>

                {/* Premium Feature Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="group relative bg-white rounded-3xl p-8 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl border border-gray-200 hover:border-gray-300 shadow-md overflow-hidden"
                            >
                                {/* Decorative Background Elements - Monochrome */}
                                {feature.decorativeShape === 'top-right' && (
                                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-50 rounded-full opacity-60 blur-2xl group-hover:opacity-80 transition-opacity duration-500" />
                                )}
                                {feature.decorativeShape === 'left-bottom' && (
                                    <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-tr from-gray-100 to-gray-50 rounded-full opacity-60 blur-xl group-hover:opacity-80 transition-opacity duration-500" />
                                )}
                                {feature.decorativeShape === 'top-left' && (
                                    <div className="absolute -top-6 -left-6 w-28 h-28 bg-gradient-to-br from-gray-50 to-white rounded-full opacity-60 blur-xl group-hover:opacity-80 transition-opacity duration-500" />
                                )}
                                {feature.decorativeShape === 'center' && (
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-br from-gray-100 to-gray-50 rounded-full opacity-40 blur-3xl group-hover:opacity-60 transition-opacity duration-500" />
                                )}
                                {feature.decorativeShape === 'diagonal' && (
                                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-gray-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                )}
                                {feature.decorativeShape === 'bottom-right' && (
                                    <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-gradient-to-tl from-gray-100 to-gray-50 rounded-full opacity-60 blur-2xl group-hover:opacity-80 transition-opacity duration-500" />
                                )}

                                {/* Inner Highlight */}
                                <div className="absolute inset-0 bg-gradient-to-b from-white/90 to-transparent rounded-3xl pointer-events-none" />

                                {/* Content Container */}
                                <div className="relative z-10">
                                    {/* Premium Icon Container - Black/Gray Theme */}
                                    <div className="mb-6 flex items-start justify-between">
                                        <div className="relative">
                                            {/* Icon Glow Effect - Subtle Black Glow */}
                                            <div className="absolute inset-0 bg-black rounded-2xl opacity-10 blur-md group-hover:opacity-20 transition-opacity duration-500" />

                                            {/* Main Icon Container - Black Gradient */}
                                            <div className={`relative w-16 h-16 ${feature.iconBg} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}
                                            >
                                                <Icon size={28} className="text-white" strokeWidth={2.5} />
                                            </div>

                                            {/* Subtle corner accent - varies by intensity */}
                                            {feature.accentIntensity === 'strong' && (
                                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            )}
                                            {feature.accentIntensity === 'medium' && (
                                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gray-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            )}
                                            {feature.accentIntensity === 'light' && (
                                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gray-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            )}
                                        </div>

                                        {/* Micro Metric Badge - Monochrome */}
                                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                                            <div className="bg-gray-100 border border-gray-200 rounded-full px-3 py-1">
                                                <div className="text-xs font-bold text-gray-900">{feature.metrics.value}</div>
                                                <div className="text-[10px] text-gray-600 text-center whitespace-nowrap">{feature.metrics.label}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Typography */}
                                    <div className="space-y-3">
                                        <h3 className="text-2xl font-bold text-gray-900 tracking-tight leading-tight">
                                            {feature.title}
                                        </h3>
                                        <p className="text-base text-gray-600 leading-relaxed font-normal">
                                            {feature.description}
                                        </p>
                                    </div>

                                    {/* Subtle Accent Line - Black */}
                                    <div className="mt-6 h-1 w-0 group-hover:w-16 bg-gradient-to-r from-black to-gray-700 rounded-full transition-all duration-700 ease-out" />
                                </div>

                                {/* Hover Border Glow - Black Theme */}
                                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_30px_rgba(0,0,0,0.15)]" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
