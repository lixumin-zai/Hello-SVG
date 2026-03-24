'use client';

import { useMemo, useState, useRef, useEffect, useCallback } from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';
import { toReactStyle, toReactNative, toDataUri } from '@/lib/svg-utils';

/** Same set as used in Editor — must stay in sync */
const SVG_ELEMENT_TAGS = new Set([
    'svg', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon',
    'path', 'text', 'tspan', 'g', 'use', 'image', 'foreignobject',
    'clippath', 'mask', 'pattern', 'marker', 'symbol',
]);

interface ViewerProps {
    svgCode: string;
    hoveredTagIndex?: number | null;
    onHoverTag?: (index: number | null) => void;
}

type TabMode = 'preview' | 'react' | 'reactNative' | 'dataUri';
type BgMode = 'checkerboard' | 'white' | 'black';

export function Viewer({ svgCode, hoveredTagIndex, onHoverTag }: ViewerProps) {
    const [activeTab, setActiveTab] = useState<TabMode>('preview');
    const [bgMode, setBgMode] = useState<BgMode>('checkerboard');
    const [zoom, setZoom] = useState(100);
    const svgContainerRef = useRef<HTMLDivElement>(null);

    const processedContent = useMemo(() => {
        if (!svgCode || (!svgCode.includes('<svg') && !svgCode.includes('<SVG'))) {
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

    // Collect SVG elements helper
    const getSvgElements = useCallback(() => {
        const container = svgContainerRef.current;
        if (!container) return [];
        const allElements = container.querySelectorAll('*');
        const svgElements: Element[] = [];
        allElements.forEach((el) => {
            if (SVG_ELEMENT_TAGS.has(el.tagName.toLowerCase())) {
                svgElements.push(el);
            }
        });
        return svgElements;
    }, []);

    // Highlight the hovered element in the rendered SVG
    const applyHighlight = useCallback(() => {
        const svgElements = getSvgElements();

        // Remove previous highlights
        svgElements.forEach((el) => {
            (el as HTMLElement | SVGElement).classList.remove('svg-hover-highlight');
        });

        // Apply highlight to the target element
        if (hoveredTagIndex != null && hoveredTagIndex < svgElements.length) {
            const target = svgElements[hoveredTagIndex] as HTMLElement | SVGElement;
            target.classList.add('svg-hover-highlight');
        }
    }, [hoveredTagIndex, getSvgElements]);

    useEffect(() => {
        if (activeTab === 'preview') {
            requestAnimationFrame(applyHighlight);
        }
    }, [hoveredTagIndex, processedContent, activeTab, applyHighlight]);

    // Attach mouseover/mouseout listeners to the container for event delegation
    useEffect(() => {
        const container = svgContainerRef.current;
        if (!container || activeTab !== 'preview' || !onHoverTag) return;

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as Element;
            if (target && target.tagName && SVG_ELEMENT_TAGS.has(target.tagName.toLowerCase())) {
                const svgElements = getSvgElements();
                const index = svgElements.indexOf(target);
                if (index !== -1) {
                    onHoverTag(index);
                }
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            const related = e.relatedTarget as Element | null;
            // If the mouse is moving to another element INSIDE the container, do nothing.
            // The subsequent mouseover will handle highlighting the new element.
            if (container.contains(related)) {
                return;
            }
            // Otherwise, the mouse just left the container entirely
            onHoverTag(null);
        };

        container.addEventListener('mouseover', handleMouseOver);
        container.addEventListener('mouseout', handleMouseOut);

        return () => {
            container.removeEventListener('mouseover', handleMouseOver);
            container.removeEventListener('mouseout', handleMouseOut);
        };
    }, [activeTab, onHoverTag, getSvgElements]);

    const cleanupRef = useRef<(() => void) | null>(null);

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
            {/* Injected highlight styles */}
            <style>{`
                .svg-hover-highlight {
                    outline: 2px dashed rgba(99, 102, 241, 0.8) !important;
                    outline-offset: 2px;
                    filter: drop-shadow(0 0 6px rgba(99, 102, 241, 0.5));
                    transition: outline 0.15s ease, filter 0.15s ease;
                }
            `}</style>

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
                                ref={svgContainerRef}
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
                                className="w-24 h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-indigo-500 mx-1"
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
