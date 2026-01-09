'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user } = useSelector((state: RootState) => state.auth);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        // Simple check to redirect if not logged in (user persistence handled in StoreProvider)
        // We'll give it a moment to hydrate
        const timer = setTimeout(() => {
            setIsLoading(false);
            if (!user && !localStorage.getItem('user')) {
                // Double check localStorage in case redux state isn't ready
                router.push('/login');
            }
        }, 100);
        return () => clearTimeout(timer);
    }, [user, router]);

    if (isLoading) {
        return <div className="flex h-screen items-center justify-center bg-gray-50 text-black">Loading...</div>;
    }

    if (!user) return null; // Or return a redirecting loader

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
