'use client';

import React, { useState } from 'react';
import { MousePointer2, PaintBucket, Type } from 'lucide-react';

export function FillConceptsExplorer() {
  const [activeTab, setActiveTab] = useState<'fill' | 'transparent' | 'currentcolor'>('fill');

  return (
    <div className="my-6 rounded-xl border border-border bg-card overflow-hidden">
      <div className="border-b border-border bg-muted/30 p-2 flex gap-2">
        <button
          onClick={() => setActiveTab('fill')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'fill' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'}`}
        >
          <PaintBucket className="w-4 h-4" />
          Fill 基础
        </button>
        <button
          onClick={() => setActiveTab('transparent')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'transparent' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'}`}
        >
          <MousePointer2 className="w-4 h-4" />
          none vs transparent
        </button>
        <button
          onClick={() => setActiveTab('currentcolor')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'currentcolor' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'}`}
        >
          <Type className="w-4 h-4" />
          currentColor
        </button>
      </div>

      <div className="p-6 min-h-[300px]">
        {activeTab === 'fill' && <FillTab />}
        {activeTab === 'transparent' && <TransparentTab />}
        {activeTab === 'currentcolor' && <CurrentColorTab />}
      </div>
    </div>
  );
}

function FillTab() {
  const colors = [
    { label: '关键词 (red)', value: 'red' },
    { label: '十六进制 (#10b981)', value: '#10b981' },
    { label: 'RGBA (rgba(59,130,246,0.5))', value: 'rgba(59,130,246,0.5)' },
  ];
  const [activeColor, setActiveColor] = useState(colors[0].value);

  return (
    <div className="flex flex-col md:flex-row gap-8 items-center">
      <div className="flex-1 space-y-4">
        <h3 className="text-lg font-semibold m-0">fill (填充色)</h3>
        <p className="text-muted-foreground text-sm m-0">
          决定了图形内部的颜色。可以接受的值与 CSS 完全一致，包括关键词、十六进制、RGB/HSL 等，甚至可以是指向渐变或图案的链接。
        </p>
        <div className="flex flex-col gap-2">
          {colors.map((c) => (
            <button
              key={c.value}
              onClick={() => setActiveColor(c.value)}
              className={`text-left px-3 py-2 rounded border text-sm transition-colors ${activeColor === c.value ? 'border-primary bg-primary/10' : 'border-border hover:bg-muted'}`}
            >
              <code className="bg-transparent p-0">{c.label}</code>
            </button>
          ))}
        </div>
      </div>
      <div className="w-48 h-48 rounded-xl border border-border bg-muted/20 flex items-center justify-center p-4">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm transition-all duration-300">
          <rect x="10" y="10" width="80" height="80" rx="16" fill={activeColor} stroke="currentColor" strokeWidth="2" className="text-foreground/20" />
        </svg>
      </div>
    </div>
  );
}

function TransparentTab() {
  const [hoverNone, setHoverNone] = useState(false);
  const [hoverTrans, setHoverTrans] = useState(false);

  return (
    <div className="flex flex-col space-y-6">
      <div>
        <h3 className="text-lg font-semibold m-0">none 与 transparent 的交互区别</h3>
        <p className="text-muted-foreground text-sm mt-2 mb-0">
          在视觉上，它们看起来都是透明的。但在交互上：<code>none</code> 的内部是“空”的，鼠标事件会穿透；而 <code>transparent</code> 的内部是有颜色的（只是透明），<strong>可以接收鼠标事件</strong>！尝试将鼠标悬停在下方两个圆的<strong>内部区域</strong>（不要碰到边框）。
        </p>
      </div>
      
      <div className="flex gap-8 justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-32 h-32 relative group">
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
              <circle 
                cx="50" cy="50" r="40" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="4" 
                className="text-primary transition-all duration-300"
                onMouseEnter={() => setHoverNone(true)}
                onMouseLeave={() => setHoverNone(false)}
              />
            </svg>
            <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs px-2 py-1 rounded bg-primary text-primary-foreground transition-opacity ${hoverNone ? 'opacity-100' : 'opacity-0'}`}>
              Hover 触发!
            </div>
          </div>
          <code className="text-sm">fill="none"</code>
          <span className="text-xs text-muted-foreground text-center max-w-[120px]">只有悬停在边框上才会触发事件</span>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="w-32 h-32 relative group">
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
              <circle 
                cx="50" cy="50" r="40" 
                fill="transparent" 
                stroke="currentColor" 
                strokeWidth="4" 
                className="text-blue-500 transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoverTrans(true)}
                onMouseLeave={() => setHoverTrans(false)}
              />
            </svg>
            <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs px-2 py-1 rounded bg-blue-500 text-white transition-opacity ${hoverTrans ? 'opacity-100' : 'opacity-0'}`}>
              Hover 触发!
            </div>
          </div>
          <code className="text-sm">fill="transparent"</code>
          <span className="text-xs text-muted-foreground text-center max-w-[120px]">悬停在圆形内部任意位置均可触发</span>
        </div>
      </div>
    </div>
  );
}

function CurrentColorTab() {
  const [parentColor, setParentColor] = useState('#f97316');

  return (
    <div className="flex flex-col md:flex-row gap-8 items-center">
      <div className="flex-1 space-y-4">
        <h3 className="text-lg font-semibold m-0">神奇的 currentColor</h3>
        <p className="text-muted-foreground text-sm m-0">
          当 SVG 的 <code>fill</code> 或 <code>stroke</code> 设置为 <code>currentColor</code> 时，它会自动继承其父级 HTML 元素的文字颜色。这是构建现代 SVG 图标库的核心技术。
        </p>
        <div className="flex items-center gap-3 mt-4">
          <span className="text-sm font-medium">改变父级容器颜色:</span>
          <input 
            type="color" 
            value={parentColor} 
            onChange={(e) => setParentColor(e.target.value)}
            className="w-8 h-8 rounded cursor-pointer border-0 p-0"
          />
        </div>
      </div>
      
      <div 
        className="w-full md:w-64 p-6 rounded-xl border border-border bg-muted/20 flex flex-col items-center justify-center gap-4 transition-colors duration-300"
        style={{ color: parentColor }}
      >
        <span className="text-sm font-medium opacity-80 border border-current px-2 py-1 rounded-md">外层 div (带有 color)</span>
        
        <svg viewBox="0 0 24 24" className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
        
        <code className="text-xs bg-transparent p-0">stroke="currentColor"</code>
      </div>
    </div>
  );
}
