"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div className="w-16 h-8 rounded-full bg-gray-200 animate-pulse" />
    }

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    return (
        <button
            onClick={toggleTheme}
            className={`relative h-8 w-16 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white border ${theme === "dark" ? "bg-black border-gray-700" : "bg-gray-100 border-gray-300"
                }`}
            aria-label="Toggle Theme"
        >
            {/* Background Icons */}
            <div className="absolute inset-0 flex items-center justify-between px-2">
                <Sun className={`h-4 w-4 text-gray-400 transition-opacity duration-300 ${theme === "light" ? "opacity-0" : "opacity-100"}`} />
                <Moon className={`h-4 w-4 text-gray-400 transition-opacity duration-300 ${theme === "dark" ? "opacity-0" : "opacity-100"}`} />
            </div>

            {/* Knob */}
            <div
                className={`absolute top-0.5 left-0.5 flex h-[26px] w-[26px] transform items-center justify-center rounded-full shadow-sm transition-transform duration-300 ${theme === "dark" ? "translate-x-8 bg-gray-800" : "translate-x-0 bg-white"
                    }`}
            >
                {theme === "dark" ? (
                    <Moon className="h-4 w-4 text-white" />
                ) : (
                    <Sun className="h-4 w-4 text-black" />
                )}
            </div>
        </button>
    )
}
