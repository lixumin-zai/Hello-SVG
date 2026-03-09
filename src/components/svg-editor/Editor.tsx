'use client';

import { Code2, ClipboardPaste } from 'lucide-react';

interface EditorProps {
    value: string;
    onChange: (value: string) => void;
}

export function Editor({ value, onChange }: EditorProps) {
    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            if (text) {
                onChange(text);
            }
        } catch (err) {
            console.error('Failed to read clipboard text: ', err);
        }
    };

    return (
        <div className="flex flex-col flex-1 h-full w-full relative group/editor">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-indigo-500" />
                    <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 tracking-wide">
                        SVG Source
                    </span>
                </div>
                <button
                    onClick={handlePaste}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-md transition-all"
                    title="Paste from Clipboard"
                >
                    <ClipboardPaste className="w-3.5 h-3.5" />
                    <span>Paste</span>
                </button>
            </div>

            {/* Editor Area */}
            <div className="flex-1 relative bg-white/20 dark:bg-zinc-950/20 backdrop-blur-md">
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="absolute inset-0 w-full h-full p-5 resize-none outline-none font-mono text-[13px] sm:text-sm leading-relaxed 
                       bg-transparent text-zinc-700 dark:text-zinc-300
                       placeholder:text-zinc-400 dark:placeholder:text-zinc-600
                       focus:ring-0 focus:outline-none custom-scrollbar transition-colors"
                    placeholder="Paste your <svg> code here..."
                    spellCheck="false"
                />
            </div>
        </div>
    );
}
