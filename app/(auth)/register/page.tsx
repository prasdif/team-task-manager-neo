'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRegisterMutation, setCredentials } from '@/lib/features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { User, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

import toast from 'react-hot-toast';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const dispatch = useDispatch();
    const [register, { isLoading, error }] = useRegisterMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Attempting to register with:", { username, password });
        try {
            const user = await register({ username, password }).unwrap();
            console.log("Registration success:", user);
            dispatch(setCredentials(user));
            toast.success("Registration successful!");
            router.push('/dashboard');
        } catch (err: any) {
            console.error('Failed to register:', err);
            const errorMessage = err?.data?.message || err?.error || "Registration failed. Check your connection.";
            toast.error(errorMessage);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-3xl shadow-xl ring-1 ring-gray-100">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                        Create an account
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Join our team and start managing tasks efficiently
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                Username
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    className="block w-full rounded-xl border-0 py-3 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 transition-all"
                                    placeholder="Choose a username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </div>



                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="block w-full rounded-xl border-0 py-3 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 transition-all"
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-500 text-center">
                            {(error as any)?.data?.message || 'Failed to register'}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-black px-3 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-gray-800 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin h-5 w-5" />
                            ) : (
                                <>
                                    Sign up <ArrowRight className="h-4 w-4" />
                                </>
                            )}
                        </button>
                    </div>

                    <div className="text-center text-sm">
                        <span className="text-gray-500">Already have an account? </span>
                        <Link href="/login" className="font-semibold text-black hover:underline transition-all">
                            Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
