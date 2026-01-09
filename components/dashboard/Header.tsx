'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Bell, Search, UserCircle, Menu } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

interface HeaderProps {
    onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
    const { user } = useSelector((state: RootState) => state.auth);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

    useEffect(() => {
        const handler = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (searchTerm) {
                params.set('search', searchTerm);
            } else {
                params.delete('search');
            }
            router.replace(`?${params.toString()}`);
        }, 300);

        return () => clearTimeout(handler);
    }, [searchTerm, router, searchParams]);

    return (
        <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white/80 dark:bg-black/80 dark:border-gray-800 px-4 sm:px-6 backdrop-blur-md transition-all">
            <div className="flex items-center gap-4 w-full max-w-md">
                {/* Mobile Menu Button */}
                <button
                    onClick={onMenuClick}
                    className="flex items-center justify-center p-2 rounded-lg text-gray-500 hover:bg-gray-100 md:hidden dark:text-gray-400 dark:hover:bg-gray-800"
                >
                    <Menu size={24} />
                </button>

                {/* Search Bar */}
                <div className="flex w-full items-center gap-2 rounded-full border border-gray-300 bg-gray-50 px-4 py-2 transition-all focus-within:border-black focus-within:bg-white focus-within:ring-1 focus-within:ring-black dark:border-gray-700 dark:bg-gray-900 dark:focus-within:border-white dark:focus-within:bg-black dark:focus-within:ring-white">
                    <Search size={18} className="text-gray-400 min-w-[18px]" />
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
                    />
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
                {/* Notifications */}
                <button className="relative rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-black hover:text-white dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white dark:hover:text-black">
                    <Bell size={20} />
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-black ring-2 ring-white dark:bg-white dark:ring-black"></span>
                </button>

                {/* User Profile */}
                <div className="flex items-center gap-3 pl-6 border-l border-gray-200 dark:border-gray-800">
                    <div className="flex flex-col items-end hidden sm:flex">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{user?.username || 'User'}</span>
                        <span className="text-xs text-gray-500 capitalize dark:text-gray-400">{user?.role || 'Member'}</span>
                    </div>
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-black border-2 border-white shadow-sm flex items-center justify-center text-white font-bold dark:bg-white dark:text-black dark:border-gray-800">
                        {user?.username ? user.username.charAt(0).toUpperCase() : <UserCircle size={24} />}
                    </div>
                </div>
            </div>
        </header>
    );
}
