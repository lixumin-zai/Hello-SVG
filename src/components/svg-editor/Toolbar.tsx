'use client';

import {
    Download,
    Copy,
    Trash2,
    Code2,
    Image as ImageIcon,
    Check,
    Loader2,
    Play
} from 'lucide-react';
import { useState } from 'react';

interface ToolbarProps {
    svgCode: string;
    setSvgCode: (code: string) => void;
}

export function Toolbar({ svgCode, setSvgCode }: ToolbarProps) {
    const [copied, setCopied] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);
    const [isOptimizing, setIsOptimizing] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(svgCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };

    const handleClear = () => {
        if (confirm('Are you sure you want to clear the editor?')) {
            setSvgCode('');
        }
    };

    const downloadSVG = () => {
        if (!svgCode) return;
        const blob = new Blob([svgCode], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `hello-svg-\${Date.now()}.svg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const downloadPNG = () => {
        if (!svgCode) return;

        const svgBlob = new Blob([svgCode], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);
        const img = new Image();

        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width || 800;
            canvas.height = img.height || 600;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0);
                const pngUrl = canvas.toDataURL('image/png');
                const a = document.createElement('a');
                a.href = pngUrl;
                a.download = `hello-svg-\${Date.now()}.png`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
            URL.revokeObjectURL(url);
        };
        img.src = url;
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setSvgCode('');
        setIsStreaming(true);

        try {
            const stream = file.stream();
            const reader = stream.getReader();
            const decoder = new TextDecoder();
            
            let result = '';
            
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                
                const chunk = decoder.decode(value, { stream: true });
                
                // Simulate streaming by breaking chunk into smaller pieces
                // because local file read is usually too fast to see the effect
                const chunkSize = 50; 
                for (let i = 0; i < chunk.length; i += chunkSize) {
                    result += chunk.slice(i, i + chunkSize);
                    setSvgCode(result);
                    await new Promise(r => setTimeout(r, 10));
                }
            }
        } catch (error) {
            console.error('Error streaming file:', error);
        } finally {
            setIsStreaming(false);
            e.target.value = '';
        }
    };

    const handleOptimize = async () => {
        if (!svgCode || isOptimizing) return;
        setIsOptimizing(true);
        try {
            const { optimizeSvgAction } = await import('@/app/actions');
            const optimized = await optimizeSvgAction(svgCode);
            setSvgCode(optimized);
        } catch (e) {
            console.error("Failed to optimize SVG", e);
            alert("Failed to optimize SVG. Please make sure svgo is installed.");
        } finally {
            setIsOptimizing(false);
        }
    };

    const handleDemoStream = async () => {
        if (isStreaming || !svgCode) return;
        
        const codeToStream = svgCode;

        setSvgCode('');
        setIsStreaming(true);

        try {
            let current = '';
            // Chunk size simulates typing speed
            const chunkSize = 3; 
            for (let i = 0; i < codeToStream.length; i += chunkSize) {
                current += codeToStream.slice(i, i + chunkSize);
                setSvgCode(current);
                await new Promise(r => setTimeout(r, 15));
            }
        } finally {
            setIsStreaming(false);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between px-5 py-4 bg-transparent border-b-0 space-y-4 sm:space-y-0">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 rounded-xl relative overflow-hidden group">
                    <input
                        type="file"
                        accept=".svg"
                        onChange={handleUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        title="Upload SVG file"
                    />
                    <Code2 className="w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                    <h2 className="font-bold text-zinc-800 dark:text-zinc-100 leading-tight">SVG Renderer</h2>
                    <div className="flex items-center gap-2">
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Real-time vector graphics</p>
                        {isStreaming && (
                            <span className="flex items-center gap-1 text-xs font-medium text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded-full">
                                <Loader2 className="w-3 h-3 animate-spin" />
                                Streaming...
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto justify-end custom-scrollbar">

                <button
                    onClick={handleDemoStream}
                    disabled={isStreaming}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20 rounded-xl transition-all disabled:opacity-50"
                    title="Simulate Stream Load"
                >
                    <Play className="w-4 h-4" />
                    <span className="hidden lg:inline">Stream</span>
                </button>

                <button
                    onClick={handleOptimize}
                    disabled={isOptimizing}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 rounded-xl transition-all disabled:opacity-50"
                    title="Optimize & Format"
                >
                    {isOptimizing ? <Loader2 className="w-4 h-4 animate-spin" /> : <span className="hidden lg:inline">Optimize</span>}
                    {!isOptimizing && <span className="lg:hidden">✨</span>}
                </button>

                <button
                    onClick={handleClear}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-zinc-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
                    title="Clear Editor"
                >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden lg:inline">Clear</span>
                </button>

                <div className="hidden sm:block w-px h-6 bg-zinc-200 dark:bg-zinc-800 mx-2" />

                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-200 bg-zinc-100/80 hover:bg-zinc-200/80 dark:bg-zinc-800/80 dark:hover:bg-zinc-700/80 rounded-xl transition-all shadow-sm"
                >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>

                <button
                    onClick={downloadSVG}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-200 bg-zinc-100/80 hover:bg-zinc-200/80 dark:bg-zinc-800/80 dark:hover:bg-zinc-700/80 rounded-xl transition-all shadow-sm"
                >
                    <Download className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                    <span>SVG</span>
                </button>

                <button
                    onClick={downloadPNG}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-indigo-500 hover:bg-indigo-600 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 ml-1"
                >
                    <ImageIcon className="w-4 h-4 text-indigo-100" />
                    <span>PNG</span>
                </button>
            </div>
        </div>
    );
}
