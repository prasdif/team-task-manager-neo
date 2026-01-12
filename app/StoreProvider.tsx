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

    useEffect(() => {
        if (storeRef.current) {
            storeRef.current.dispatch(initializeAuth())
        }
    }, [])

    return (
        <Provider store={storeRef.current}>
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
                {children}
            </GoogleOAuthProvider>
        </Provider>
    )
}
