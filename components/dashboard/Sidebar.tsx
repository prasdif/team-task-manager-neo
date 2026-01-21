'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    FolderKanban,
    CheckSquare,
    LogOut,
    X
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
        { name: 'My Tasks', href: '/dashboard/tasks', icon: CheckSquare },
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
                className={`fixed inset-y-0 left-0 z-50 flex h-full w-64 flex-col bg-black text-white shadow-xl transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } border-r border-gray-800`}
            >
                {/* Logo */}
                <div className="flex h-16 items-center justify-between px-6 font-bold text-2xl tracking-wider text-white">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black shadow-lg">
                            <FolderKanban size={20} />
                        </div>
                        <span>Tasker</span>
                    </div>
                    {/* Close Button Mobile */}
                    <button onClick={onClose} className="text-gray-400 hover:text-white md:hidden">
                        <X size={24} />
                    </button>
                </div>
                {/* Navigation Links */}
                <nav className="flex-1 space-y-1 px-3 py-6">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => onClose()} // Close on navigation on mobile
                                className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${isActive
                                    ? 'bg-white text-black shadow-md'
                                    : 'text-gray-400 hover:bg-gray-900 hover:text-white'
                                    }`}
                            >
                                <item.icon
                                    size={20}
                                    className={`transition-colors ${isActive ? 'text-black' : 'text-gray-500 group-hover:text-white'
                                        }`}
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* User / Logout Section */}
                <div className="border-t border-gray-800 p-4">
                    <button
                        onClick={handleLogout}
                        className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-400 transition-all hover:bg-white hover:text-black"
                    >
                        <LogOut size={20} className="text-gray-500 transition-colors group-hover:text-black" />
                        Sign out
                    </button>
                </div>
            </div>
        </>
    );
}