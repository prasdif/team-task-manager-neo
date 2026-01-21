'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { useState } from 'react';

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
                <Header onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-background p-6 md:p-8 transition-colors duration-300">
                    {children}
                </main>
            </div>
        </div>
    );
}
