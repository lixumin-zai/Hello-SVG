'use client';

import { useState } from 'react';

export function TextAnchorVisualizer() {
  const [anchor, setAnchor] = useState<'start' | 'middle' | 'end'>('start');

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6 overflow-hidden">
      <p className="text-sm text-muted-foreground mb-6">▶ 点击切换 `text-anchor` 属性，观察文本如何相对于红色锚点对齐。</p>

      <div className="flex gap-4 justify-center mb-8">
        <button 
          onClick={() => setAnchor('start')}
          className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${anchor === 'start' ? 'bg-primary text-primary-foreground shadow-md' : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'}`}
        >
          start (左对齐)
        </button>
        <button 
          onClick={() => setAnchor('middle')}
          className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${anchor === 'middle' ? 'bg-primary text-primary-foreground shadow-md' : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'}`}
        >
          middle (居中对齐)
        </button>
        <button 
          onClick={() => setAnchor('end')}
          className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${anchor === 'end' ? 'bg-primary text-primary-foreground shadow-md' : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'}`}
        >
          end (右对齐)
        </button>
      </div>

      <div className="relative bg-grid-slate-100 dark:bg-grid-slate-900 rounded-lg border flex flex-col items-center justify-center p-8 overflow-hidden h-[200px]">
        
        <svg viewBox="0 0 400 150" className="w-full max-w-[400px] overflow-visible">
          {/* Guide lines */}
          <line x1="200" y1="20" x2="200" y2="130" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-muted-foreground/30" />
          <line x1="50" y1="80" x2="350" y2="80" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-muted-foreground/30" />
          
          {/* Anchor point */}
          <circle cx="200" cy="80" r="5" fill="currentColor" className="text-red-500 animate-pulse" />
          <text x="210" y="70" fontSize="12" className="fill-red-500 font-mono">锚点 (x, y)</text>
          
          {/* The Text */}
          <text 
            x="200" 
            y="80" 
            textAnchor={anchor} 
            fontSize="36" 
            fontWeight="bold"
            className="fill-primary transition-all duration-500 ease-in-out"
          >
            SVG 文本对齐
          </text>
          
          {/* Visual bounding box to show alignment */}
          <rect 
            x={anchor === 'start' ? 200 : anchor === 'middle' ? 200 - 120 : 200 - 240}
            y="45"
            width="240"
            height="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-blue-500/50 transition-all duration-500 ease-in-out"
            rx="4"
          />
        </svg>

        <div className="mt-6 p-3 bg-muted rounded-md font-mono text-sm inline-block">
          &lt;text x="200" y="80" <span className="text-blue-500 font-bold transition-colors">text-anchor="{anchor}"</span>&gt;SVG 文本对齐&lt;/text&gt;
        </div>
      </div>
    </div>
  );
}
