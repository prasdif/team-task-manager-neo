'use client';

import { Suspense } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { useState } from 'react';

function HeaderLoading() {
    return (
        <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white/80 dark:bg-black/80 dark:border-gray-800 px-4 sm:px-6 backdrop-blur-md">
            <div className="flex items-center gap-4 w-full max-w-md">
                <div className="flex w-full items-center gap-2 rounded-full border border-gray-300 bg-gray-50 px-4 py-2">
                    <div className="h-4 w-4 bg-gray-300 rounded animate-pulse"></div>
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                </div>
            </div>
        </header>
    );
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // No auth check - allow direct access to dashboard
    return (
        <div className="flex h-screen w-full bg-gray-50 dark:bg-background dark:text-foreground overflow-hidden font-sans transition-colors duration-300">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <div className="flex flex-1 flex-col overflow-hidden">
                <Suspense fallback={<HeaderLoading />}>
                    <Header onMenuClick={() => setIsSidebarOpen(true)} />
                </Suspense>
                <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-background p-6 md:p-8 transition-colors duration-300">
                    {children}
                </main>
            </div>
        </div>
    );
}
