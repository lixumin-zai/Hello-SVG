'use client';

import { useMemo, useState } from 'react';
import { Grid2X2, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { toReactStyle, toReactNative, toDataUri } from '@/lib/svg-utils';

interface ViewerProps {
    svgCode: string;
}

type TabMode = 'preview' | 'react' | 'reactNative' | 'dataUri';
type BgMode = 'checkerboard' | 'white' | 'black';

export function Viewer({ svgCode }: ViewerProps) {
    const [activeTab, setActiveTab] = useState<TabMode>('preview');
    const [bgMode, setBgMode] = useState<BgMode>('checkerboard');
    const [zoom, setZoom] = useState(100);

    const processedContent = useMemo(() => {
        if (!svgCode || !svgCode.trim().startsWith('<svg')) {
            return {
                type: 'error',
                content: 'No valid SVG tag found'
            };
        }

        try {
            switch (activeTab) {
                case 'preview': {
                    return { type: 'html', content: svgCode };
                }
                case 'react':
                    return { type: 'code', content: toReactStyle(svgCode) };
                case 'reactNative':
                    return { type: 'code', content: toReactNative(svgCode) };
                case 'dataUri':
                    return { type: 'code', content: toDataUri(svgCode) };
                default:
                    return { type: 'html', content: svgCode };
            }
        } catch {
            return { type: 'error', content: 'Error processing SVG' };
        }
    }, [svgCode, activeTab]);

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 500));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 25));
    const handleZoomReset = () => setZoom(100);

    const getBgClass = () => {
        if (activeTab !== 'preview') return 'bg-white/20 dark:bg-zinc-950/20';
        if (bgMode === 'checkerboard') {
            return "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iI2ZmZiIvaT4KPHJlY3QgeD0iMTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2YyZjJmMiIvaT4KPHJlY3QgeT0iMTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2YyZjJmMiIvaT4KPHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmZmYiL2k+Cjwvc3ZnPg==')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iIzE4MThFiIvaT4KPHJlY3QgeD0iMTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iIzJDMkMzNSIvaT4KPHJlY3QgeT0iMTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iIzJDMkMzNSIvaT4KPHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiMxODE4MUUiL2k+Cjwvc3ZnPg==')]";
        }
        return '';
    };

    const getBgStyle = () => {
        if (activeTab !== 'preview') return {};
        if (bgMode === 'white') return { backgroundColor: '#ffffff', backgroundImage: 'none' };
        if (bgMode === 'black') return { backgroundColor: '#000000', backgroundImage: 'none' };
        return {};
    };

    const tabs: { id: TabMode, label: string }[] = [
        { id: 'preview', label: 'Preview' },
        { id: 'react', label: 'React' },
        { id: 'reactNative', label: 'React Native' },
        { id: 'dataUri', label: 'Data URI' },
    ];

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        if (activeTab === 'preview' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            // Map deltaY positive to zoom out, negative to zoom in
            const zoomDelta = e.deltaY > 0 ? -10 : 10;
            setZoom(prev => {
                const newZoom = Math.min(Math.max(prev + zoomDelta, 10), 500);
                return newZoom;
            });
        }
    };

    return (
        <div className="flex flex-col flex-1 h-full w-full relative group/viewer">
            {/* Top Tabs */}
            <div className="flex items-center gap-1 px-3 py-2 border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-sm overflow-x-auto custom-scrollbar">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                            activeTab === tab.id 
                            ? 'bg-zinc-800 text-white dark:bg-zinc-200 dark:text-zinc-900 shadow-sm' 
                            : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/50'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Main Display Area */}
            <div 
                className={`flex-1 relative w-full h-full flex flex-col overflow-hidden ${getBgClass()} transition-colors duration-300`}
                style={getBgStyle()}
                onWheel={handleWheel}
            >

                {/* Scrollable container for content */}
                <div className="flex-1 overflow-auto custom-scrollbar relative p-4 flex items-center justify-center">
                    {processedContent.type === 'error' && (
                        <div className="text-zinc-400 font-medium">{processedContent.content}</div>
                    )}

                    {processedContent.type === 'html' && (
                        <div
                            style={{ zoom: zoom / 100 }}
                            className="transition-all duration-200 ease-out flex items-center justify-center"
                        >
                            <div
                                className="filter drop-shadow-md bg-transparent [&>svg]:w-full [&>svg]:h-auto [&>svg]:max-w-[none] [&>svg]:max-h-[none]"
                                dangerouslySetInnerHTML={{ __html: processedContent.content }}
                            />
                        </div>
                    )}

                    {processedContent.type === 'code' && (
                        <div className="absolute inset-0 w-full h-full p-6">
                            <textarea
                                readOnly
                                value={processedContent.content}
                                className="w-full h-full resize-none outline-none font-mono text-[13px] sm:text-sm leading-relaxed 
                                bg-transparent text-zinc-700 dark:text-zinc-300 custom-scrollbar"
                            />
                        </div>
                    )}
                </div>

                {/* Bottom Canvas Controls (Only show in Preview mode) */}
                {activeTab === 'preview' && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md rounded-xl border border-zinc-200/50 dark:border-zinc-700/50 shadow-sm opacity-0 group-hover/viewer:opacity-100 transition-opacity">

                        {/* Zoom Controls */}
                        <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 rounded-lg p-0.5">
                            <button onClick={handleZoomOut} className="p-1 text-zinc-500 hover:bg-white dark:hover:bg-zinc-800 rounded-md transition-colors"><ZoomOut className="w-4 h-4" /></button>
                            <input
                                type="range"
                                min="10"
                                max="500"
                                step="1"
                                value={zoom}
                                onChange={(e) => setZoom(Number(e.target.value))}
                                className="w-24 accent-indigo-500 mx-1 cursor-pointer"
                            />
                            <button onClick={handleZoomReset} className="px-2 text-xs font-medium text-zinc-600 dark:text-zinc-300 min-w-[3rem] text-center hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded transition">{zoom}%</button>
                            <button onClick={handleZoomIn} className="p-1 text-zinc-500 hover:bg-white dark:hover:bg-zinc-800 rounded-md transition-colors"><ZoomIn className="w-4 h-4" /></button>
                        </div>

                        <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-600 mx-1" />

                        {/* BG Controls */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setBgMode('checkerboard')}
                                className={`w-5 h-5 rounded-full border \${bgMode === 'checkerboard' ? 'ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-zinc-800' : 'border-zinc-300 dark:border-zinc-600'} bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iI2ZmZiIvaT4KPHJlY3QgeD0iMTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2YyZjJmMiIvaT4KPHJlY3QgeT0iMTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2YyZjJmMiIvaT4KPHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmZmYiL2k+Cjwvc3ZnPg==')]`}
                                title="Checkerboard"
                            />
                            <button
                                onClick={() => setBgMode('white')}
                                className={`w-5 h-5 rounded-full border bg-white \${bgMode === 'white' ? 'ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-zinc-800' : 'border-zinc-300 dark:border-zinc-600'}`}
                                title="White"
                            />
                            <button
                                onClick={() => setBgMode('black')}
                                className={`w-5 h-5 rounded-full border bg-black \${bgMode === 'black' ? 'ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-zinc-800' : 'border-zinc-300 dark:border-zinc-600'}`}
                                title="Black"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
