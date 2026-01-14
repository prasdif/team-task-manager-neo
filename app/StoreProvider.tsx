'use client'
import { useRef, useEffect } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../lib/store'
import { initializeAuth } from '../lib/features/auth/authSlice'

import { GoogleOAuthProvider } from '@react-oauth/google';

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const storeRef = useRef<AppStore | null>(null)
    if (!storeRef.current) {
        storeRef.current = makeStore()
    }

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    useEffect(() => {
        if (storeRef.current) {
            storeRef.current.dispatch(initializeAuth())
        }
        if (!clientId) {
            console.error("Google Client ID is missing. Check your .env file and restart the server.");
        } else {
            console.log("Google Client ID loaded:", clientId);
        }
    }, [clientId])

    return (
        <Provider store={storeRef.current}>
            <GoogleOAuthProvider clientId={clientId || ''}>
                {children}
            </GoogleOAuthProvider>
        </Provider>
    )
}
