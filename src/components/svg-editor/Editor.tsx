'use client';

import { useState } from 'react';
import { Code2, ClipboardPaste, Calculator, Loader2, ArrowRight } from 'lucide-react';
import { latexToSvgAction } from '@/app/actions';

interface EditorProps {
    value: string;
    onChange: (value: string) => void;
}

export function Editor({ value, onChange }: EditorProps) {
    const [isLatexMode, setIsLatexMode] = useState(false);
    const [latexInput, setLatexInput] = useState('E = mc^2');
    const [isConverting, setIsConverting] = useState(false);

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            if (text) {
                if (isLatexMode) {
                    setLatexInput(text);
                } else {
                    onChange(text);
                }
            }
        } catch (err) {
            console.error('Failed to read clipboard text: ', err);
        }
    };

    const handleConvertToSvg = async () => {
        if (!latexInput.trim()) return;
        setIsConverting(true);
        try {
            const svgResult = await latexToSvgAction(latexInput);
            onChange(svgResult);
        } catch (error) {
            console.error('Failed to convert LaTeX:', error);
            alert('Failed to convert LaTeX to SVG.');
        } finally {
            setIsConverting(false);
        }
    };

    return (
        <div className="flex flex-col flex-1 h-full w-full relative group/editor">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        {isLatexMode ? (
                            <Calculator className="w-4 h-4 text-emerald-500" />
                        ) : (
                            <Code2 className="w-4 h-4 text-indigo-500" />
                        )}
                        <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 tracking-wide">
                            {isLatexMode ? 'LaTeX Source' : 'SVG Source'}
                        </span>
                    </div>
                    
                    {/* Mode Switcher */}
                    <button
                        onClick={() => setIsLatexMode(!isLatexMode)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                            isLatexMode 
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' 
                                : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                        }`}
                        title="Toggle LaTeX Mode"
                    >
                        <Calculator className="w-3.5 h-3.5" />
                        <span>LaTeX Mode</span>
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    {isLatexMode && (
                        <button
                            onClick={handleConvertToSvg}
                            disabled={isConverting}
                            className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-md transition-all disabled:opacity-50"
                        >
                            {isConverting ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                                <ArrowRight className="w-3.5 h-3.5" />
                            )}
                            <span>Convert to SVG</span>
                        </button>
                    )}
                    <button
                        onClick={handlePaste}
                        className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-md transition-all"
                        title="Paste from Clipboard"
                    >
                        <ClipboardPaste className="w-3.5 h-3.5" />
                        <span>Paste</span>
                    </button>
                </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1 relative bg-white/20 dark:bg-zinc-950/20 backdrop-blur-md">
                <textarea
                    value={isLatexMode ? latexInput : value}
                    onChange={(e) => isLatexMode ? setLatexInput(e.target.value) : onChange(e.target.value)}
                    className="absolute inset-0 w-full h-full p-5 resize-none outline-none font-mono text-[13px] sm:text-sm leading-relaxed 
                       bg-transparent text-zinc-700 dark:text-zinc-300
                       placeholder:text-zinc-400 dark:placeholder:text-zinc-600
                       focus:ring-0 focus:outline-none custom-scrollbar transition-colors"
                    placeholder={isLatexMode ? "Type your LaTeX formula here (e.g., E = mc^2)..." : "Paste your <svg> code here..."}
                    spellCheck="false"
                />
            </div>
        </div>
    );
}
