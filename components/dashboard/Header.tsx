'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Bell, Search, UserCircle, Menu, Moon, Sun } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { useTheme } from 'next-themes';

interface HeaderProps {
    onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
    const { user } = useSelector((state: RootState) => state.auth);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handler = window.setTimeout(() => {
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
        <header className="flex h-16 w-full items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 w-full max-w-2xl">
                {/* Mobile Menu Button */}
                <button
                    onClick={onMenuClick}
                    className="flex items-center justify-center p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors md:hidden"
                >
                    <Menu size={20} />
                </button>

                {/* Search Bar */}
                <div className="flex w-full items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-4 py-2.5 transition-all focus-within:border-gray-400 dark:focus-within:border-gray-500 focus-within:bg-white dark:focus-within:bg-black focus-within:shadow-sm">
                    <Search size={18} className="text-gray-400 dark:text-gray-500 flex-shrink-0" strokeWidth={2} />
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
            <div className="flex items-center gap-4">
                {/* Theme Toggle */}
                {mounted && (
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="flex items-center justify-center p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <Sun size={18} strokeWidth={2} /> : <Moon size={18} strokeWidth={2} />}
                    </button>
                )}

                {/* Notifications */}
                <button className="relative flex items-center justify-center p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <Bell size={18} strokeWidth={2} />
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-black"></span>
                </button>

                {/* User Profile */}
                <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-800">
                    <div className="hidden sm:flex flex-col items-end">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{user?.username || 'User'}</span>
                        <span className="text-xs text-gray-600 dark:text-gray-400 capitalize">{user?.role || 'Member'}</span>
                    </div>
                    <div className="h-9 w-9 overflow-hidden rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                        {user?.username ? user.username.charAt(0).toUpperCase() : <UserCircle size={20} />}
                    </div>
                </div>
            </div>
        </header>
    );
}  
   

//fix that shit 