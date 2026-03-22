'use client';

import { useState } from 'react';

export function CurrentColorVisualizer() {
  const [textColor, setTextColor] = useState('#3b82f6'); // default blue
  const [fontSize, setFontSize] = useState(24);

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block">
              外层容器的颜色 (CSS color)
            </label>
            <input 
              type="color" 
              value={textColor} 
              onChange={(e) => setTextColor(e.target.value)}
              className="w-full h-10 cursor-pointer rounded-md border"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">
              外层容器的字号 (CSS font-size): {fontSize}px
            </label>
            <input 
              type="range" 
              min="16" 
              max="64" 
              value={fontSize} 
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div className="bg-muted p-4 rounded-lg font-mono text-xs overflow-x-auto">
            <div className="text-muted-foreground mb-1">{"<div style={{ color: '"}{textColor}{"', fontSize: '"}{fontSize}{"px' }}>"}</div>
            <div className="pl-4">{"<span>确认支付</span>"}</div>
            <div className="pl-4 text-blue-500">{"<svg width='1em' height='1em' fill='currentColor'>"}</div>
            <div className="pl-8 text-blue-500">{"<path d='...' />"}</div>
            <div className="pl-4 text-blue-500">{"</svg>"}</div>
            <div className="text-muted-foreground mt-1">{"</div>"}</div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center border border-dashed border-border rounded-lg bg-grid-pattern p-8">
          <div 
            className="flex items-center gap-3 transition-all duration-300 border-2 border-transparent hover:border-border p-4 rounded-lg"
            style={{ color: textColor, fontSize: `${fontSize}px` }}
          >
            <span>确认支付</span>
            <svg 
              width="1em" 
              height="1em" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="transition-all duration-300"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          
          <p className="text-xs text-muted-foreground mt-8 text-center max-w-[200px]">
            ▶ 图标设置了 <code>width="1em"</code> 和 <code>stroke="currentColor"</code>。<br/>
            它会自动完美继承外层文本的颜色和大小！
          </p>
        </div>
      </div>
    </div>
  );
}
