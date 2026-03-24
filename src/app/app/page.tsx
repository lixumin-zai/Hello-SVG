'use client';

import { useState } from 'react';
import { Editor } from '@/components/svg-editor/Editor';
import { Viewer } from '@/components/svg-editor/Viewer';
import { Toolbar } from '@/components/svg-editor/Toolbar';
import { ThemeToggle } from '@/components/ThemeToggle';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const DEFAULT_SVG = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="180" height="180" rx="30" fill="url(#grad1)" />
  <circle cx="100" cy="100" r="50" fill="#ffffff" opacity="0.2" />
  <path d="M 100 60 L 130 130 L 70 130 Z" fill="#ffffff" opacity="0.9" />
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#818cf8" />
      <stop offset="100%" stopColor="#c084fc" />
    </linearGradient>
  </defs>
</svg>`;

export default function SvgEditorPage() {
    const [svgCode, setSvgCode] = useState(DEFAULT_SVG);
    const [hoveredTagIndex, setHoveredTagIndex] = useState<number | null>(null);

    return (
        <div className="flex flex-col min-h-screen w-full relative bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-indigo-500/30 font-sans transition-colors duration-500">
            {/* Ambient Background */}
            <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-indigo-500/10 dark:from-indigo-500/20 via-transparent to-transparent pointer-events-none blur-3xl transition-colors duration-500" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-[128px] pointer-events-none transition-colors duration-500" />

            {/* Header / Navigation */}
            <header className="relative z-10 flex items-center justify-between px-6 py-4">
                <Link href="/" className="group flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
                    <div className="p-2 rounded-full bg-zinc-200/50 dark:bg-zinc-800/50 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-800 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    Back to Home
                </Link>
                <ThemeToggle />
            </header>

            {/* Main Workspace Workspace */}
            <main className="relative z-10 flex-1 flex flex-col px-4 sm:px-6 pb-6 max-w-[1600px] mx-auto w-full gap-4">
                {/* Floating Toolbar Card */}
                <div className="w-full rounded-2xl bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm overflow-hidden transition-colors duration-500">
                    <Toolbar svgCode={svgCode} setSvgCode={setSvgCode} />
                </div>

                {/* Editor / Viewer Split Grid */}
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[600px]">
                    {/* Editor Card */}
                    <div className="flex flex-col rounded-2xl bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm overflow-hidden transition-colors duration-500 group relative">
                        {/* Decorative glow inside card */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-500/10 transition-colors duration-700" />
                        <Editor value={svgCode} onChange={setSvgCode} hoveredTagIndex={hoveredTagIndex} onHoverTag={setHoveredTagIndex} />
                    </div>

                    {/* Viewer Card */}
                    <div className="flex flex-col rounded-2xl bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm overflow-hidden transition-colors duration-500">
                        <Viewer svgCode={svgCode} hoveredTagIndex={hoveredTagIndex} onHoverTag={setHoveredTagIndex} />
                    </div>
                </div>
            </main>
        </div>
    );
}
