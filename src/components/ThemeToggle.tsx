'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-10 h-10 rounded-full bg-zinc-800/50 flex flex-col items-center justify-center border border-zinc-700/50" />
        );
    }

    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    const toggleTheme = () => {
        // 膜效果过渡 (View Transitions API)
        if (!document.startViewTransition) {
            setTheme(isDark ? 'light' : 'dark');
            return;
        }

        // 获取点击位置，用于圆形展开动画 (如果想要全局膜效果)
        const transition = document.startViewTransition(() => {
            setTheme(isDark ? 'light' : 'dark');
        });

        transition.ready.then(() => {
            const clipPath = [
                `circle(0px at 100% 0%)`,
                `circle(${Math.hypot(window.innerWidth, window.innerHeight)}px at 100% 0%)`
            ];

            document.documentElement.animate(
                {
                    clipPath: isDark ? clipPath : [...clipPath].reverse(),
                },
                {
                    duration: 500,
                    easing: 'ease-in-out',
                    pseudoElement: isDark ? '::view-transition-new(root)' : '::view-transition-old(root)',
                }
            );
        });
    };

    return (
        <button
            onClick={toggleTheme}
            className={`relative w-14 h-8 rounded-full transition-colors duration-300 ease-in-out flex items-center shadow-inner border \${
        isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-200 border-zinc-300'
      }`}
            aria-label="Toggle dark mode"
        >
            <div
                className={`absolute w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-500 ease-in-out transform shadow-sm \${
          isDark 
            ? 'translate-x-7 bg-zinc-950 text-zinc-300' 
            : 'translate-x-1 bg-white text-zinc-600'
        }`}
            >
                {isDark ? (
                    <Moon className="w-3.5 h-3.5 transition-opacity duration-300" />
                ) : (
                    <Sun className="w-3.5 h-3.5 transition-opacity duration-300" />
                )}
            </div>
        </button>
    );
}
