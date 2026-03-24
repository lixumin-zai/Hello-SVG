'use client';

import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { Code2, ClipboardPaste, Calculator, Loader2, ArrowRight } from 'lucide-react';
import { latexToSvgAction } from '@/app/actions';

interface EditorProps {
    value: string;
    onChange: (value: string) => void;
    hoveredTagIndex?: number | null;
    onHoverTag?: (index: number | null) => void;
}

/** SVG element tag names we want to make hoverable */
const SVG_ELEMENT_TAGS = new Set([
    'svg', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon',
    'path', 'text', 'tspan', 'g', 'use', 'image', 'foreignObject',
    'clipPath', 'mask', 'pattern', 'marker', 'symbol',
]);

interface TagSegment {
    type: 'tag' | 'text';
    content: string;
    tagIndex?: number; // only for 'tag' segments that are SVG element open tags
}

/**
 * Parse SVG source code into segments, assigning an index to each
 * opening SVG element tag (self-closing counts too).
 * Closing tags and non-element tags (like <defs>, <linearGradient>) are
 * treated as plain text so that only renderable elements get indices.
 */
function parseSvgSegments(code: string): TagSegment[] {
    // Match any XML/SVG tag (opening, closing, self-closing)
    const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)[^>]*\/?>/g;
    const segments: TagSegment[] = [];
    let lastIndex = 0;
    let elementIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = tagRegex.exec(code)) !== null) {
        // Push text before this tag
        if (match.index > lastIndex) {
            segments.push({ type: 'text', content: code.slice(lastIndex, match.index) });
        }

        const fullTag = match[0];
        const tagName = match[1].toLowerCase();
        const isClosing = fullTag.startsWith('</');

        if (!isClosing && SVG_ELEMENT_TAGS.has(tagName)) {
            segments.push({ type: 'tag', content: fullTag, tagIndex: elementIndex });
            elementIndex++;
        } else {
            segments.push({ type: 'text', content: fullTag });
        }

        lastIndex = match.index + fullTag.length;
    }

    // Remaining text after last tag
    if (lastIndex < code.length) {
        segments.push({ type: 'text', content: code.slice(lastIndex) });
    }

    return segments;
}

export function Editor({ value, onChange, hoveredTagIndex, onHoverTag }: EditorProps) {
    const [isLatexMode, setIsLatexMode] = useState(false);
    const [latexInput, setLatexInput] = useState('E = mc^2');
    const [isConverting, setIsConverting] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

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

    // Synchronize scroll between textarea and overlay
    const syncScroll = useCallback(() => {
        if (textareaRef.current && overlayRef.current) {
            overlayRef.current.scrollTop = textareaRef.current.scrollTop;
            overlayRef.current.scrollLeft = textareaRef.current.scrollLeft;
        }
    }, []);

    // Also sync on value change
    useEffect(() => {
        syncScroll();
    }, [value, syncScroll]);

    // Parse segments for the overlay
    const segments = useMemo(() => {
        if (isLatexMode) return [];
        return parseSvgSegments(value);
    }, [value, isLatexMode]);

    const currentValue = isLatexMode ? latexInput : value;

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
                {/* Actual textarea — sits underneath the overlay, receives keyboard input */}
                <textarea
                    ref={textareaRef}
                    value={currentValue}
                    onChange={(e) => isLatexMode ? setLatexInput(e.target.value) : onChange(e.target.value)}
                    onScroll={syncScroll}
                    className={`absolute inset-0 z-0 w-full h-full p-5 resize-none outline-none font-mono text-[13px] sm:text-sm leading-relaxed 
                       bg-transparent
                       placeholder:text-zinc-400 dark:placeholder:text-zinc-600
                       focus:ring-0 focus:outline-none custom-scrollbar transition-colors
                       ${!isLatexMode ? 'text-transparent caret-zinc-700 dark:caret-zinc-300' : 'text-zinc-700 dark:text-zinc-300'}`}
                    placeholder={isLatexMode ? "Type your LaTeX formula here (e.g., E = mc^2)..." : "Paste your <svg> code here..."}
                    spellCheck="false"
                    style={!isLatexMode ? { caretColor: undefined } : undefined}
                />

                {/* Syntax-highlighted overlay — on top of textarea for hover detection */}
                {!isLatexMode && (
                    <div
                        ref={overlayRef}
                        aria-hidden="true"
                        className="absolute inset-0 z-10 w-full h-full p-5 overflow-hidden font-mono text-[13px] sm:text-sm leading-relaxed whitespace-pre-wrap break-words pointer-events-none"
                        style={{ overflowWrap: 'break-word' }}
                    >
                        {segments.map((seg, i) => {
                            if (seg.type === 'tag' && seg.tagIndex !== undefined) {
                                const isHovered = hoveredTagIndex === seg.tagIndex;
                                return (
                                    <span
                                        key={i}
                                        className={`pointer-events-auto cursor-default rounded-sm transition-colors duration-150 ${
                                            isHovered
                                                ? 'bg-indigo-500/20 dark:bg-indigo-400/25 text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-400/40'
                                                : 'text-sky-700 dark:text-sky-400 hover:bg-indigo-500/10 dark:hover:bg-indigo-400/10'
                                        }`}
                                        onMouseEnter={() => onHoverTag?.(seg.tagIndex!)}
                                        onMouseLeave={() => onHoverTag?.(null)}
                                    >
                                        {seg.content}
                                    </span>
                                );
                            }
                            // Plain text — render with default color, pass clicks through
                            return (
                                <span key={i} className="text-zinc-700 dark:text-zinc-300">
                                    {seg.content}
                                </span>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
