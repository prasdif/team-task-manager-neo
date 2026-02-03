'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    FolderKanban,
    CheckSquare,
    LogOut,
    X,
    Calendar,
    Users,
    BarChart3,
    Settings
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '@/lib/features/auth/authSlice';
import { useRouter } from 'next/navigation';
interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();
    const dispatch = useDispatch();
    const router = useRouter();

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Task Board', href: '/dashboard/tasks', icon: FolderKanban },
    ];

    const handleLogout = () => {
        dispatch(logout());
        router.push('/login');
    };

    return (
        <>
            {/* Mobile Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-50 flex h-full w-64 flex-col bg-white dark:bg-black shadow-xl transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } border-r border-gray-200 dark:border-gray-800`}
            >
                {/* Logo */}
                <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 dark:bg-white text-white dark:text-black shadow-sm font-bold text-sm">
                            TF
                        </div>
                        <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">TaskFlow</span>
                    </div>
                    {/* Close Button Mobile */}
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white md:hidden">
                        <X size={24} />
                    </button>
                </div>
                {/* Navigation Links */}
                <nav className="flex-1 space-y-1 px-3 py-4">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => onClose()} // Close on navigation on mobile
                                className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${isActive
                                    ? 'bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                            >
                                <item.icon
                                    size={18}
                                    className={`transition-colors ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white'
                                        }`}
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Profile Section */}
                <div className="border-t border-gray-200 dark:border-gray-800 p-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm flex-shrink-0">
                            JD
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">John Doe</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">Project Manager</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}