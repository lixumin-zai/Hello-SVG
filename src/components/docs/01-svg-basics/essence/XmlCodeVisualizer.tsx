'use client';

import { useState } from 'react';

export function XmlCodeVisualizer() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const handleMouseEnter = (node: string) => setHoveredNode(node);
  const handleMouseLeave = () => setHoveredNode(null);

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6 overflow-hidden">
      <p className="text-sm text-muted-foreground mb-4">
        ▶ 将鼠标悬停在 XML 代码或图形元素上，观察它们之间的映射关系
      </p>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Rendered SVG */}
        <div className="w-full md:w-1/2 min-h-[250px] border rounded-xl bg-[#f8fafc] dark:bg-zinc-900/50 flex items-center justify-center p-6 relative">
          <svg width="200" height="200" viewBox="0 0 200 200" className="overflow-visible">
            <rect 
              x="20" y="20" width="160" height="160" rx="20" 
              fill={hoveredNode === 'rect' ? '#93c5fd' : '#e2e8f0'} 
              stroke={hoveredNode === 'rect' ? '#3b82f6' : '#cbd5e1'}
              strokeWidth="4"
              className="transition-colors duration-300 cursor-pointer"
              onMouseEnter={() => handleMouseEnter('rect')}
              onMouseLeave={handleMouseLeave}
            />
            <circle 
              cx="100" cy="80" r="40" 
              fill={hoveredNode === 'circle' ? '#fca5a5' : '#ef4444'} 
              className="transition-colors duration-300 cursor-pointer"
              onMouseEnter={() => handleMouseEnter('circle')}
              onMouseLeave={handleMouseLeave}
            />
            <path 
              d="M60 140 Q100 170 140 140" 
              fill="none" 
              stroke={hoveredNode === 'path' ? '#fcd34d' : '#f59e0b'} 
              strokeWidth="12" 
              strokeLinecap="round"
              className="transition-colors duration-300 cursor-pointer"
              onMouseEnter={() => handleMouseEnter('path')}
              onMouseLeave={handleMouseLeave}
            />
            <text 
              x="100" y="195" 
              textAnchor="middle" 
              fontSize="16" 
              fontWeight="bold"
              fill={hoveredNode === 'text' ? '#a78bfa' : '#8b5cf6'}
              className="transition-colors duration-300 cursor-pointer select-none"
              onMouseEnter={() => handleMouseEnter('text')}
              onMouseLeave={handleMouseLeave}
            >
              Hello SVG!
            </text>
          </svg>
        </div>

        {/* XML Code */}
        <div className="w-full md:w-1/2 rounded-xl bg-[#1e1e1e] p-6 font-mono text-sm overflow-x-auto relative shadow-inner text-gray-300">
          <div className="absolute top-2 right-4 text-xs text-gray-500">source.svg</div>
          
          <div className="mt-2">
            <div><span className="text-pink-400">&lt;svg</span> <span className="text-blue-300">viewBox</span>=<span className="text-yellow-300">"0 0 200 200"</span> <span className="text-blue-300">xmlns</span>=<span className="text-yellow-300">"http://www.w3.org/2000/svg"</span><span className="text-pink-400">&gt;</span></div>
            
            <div 
              className={`pl-4 py-1 my-1 rounded transition-colors ${hoveredNode === 'rect' ? 'bg-blue-500/20 border-l-2 border-blue-500' : 'border-l-2 border-transparent hover:bg-white/5'}`}
              onMouseEnter={() => handleMouseEnter('rect')}
              onMouseLeave={handleMouseLeave}
            >
              <span className="text-gray-500">&lt;!-- 背景圆角矩形 --&gt;</span><br />
              <span className="text-pink-400">&lt;rect</span> <span className="text-blue-300">x</span>=<span className="text-yellow-300">"20"</span> <span className="text-blue-300">y</span>=<span className="text-yellow-300">"20"</span> <span className="text-blue-300">width</span>=<span className="text-yellow-300">"160"</span> <span className="text-blue-300">height</span>=<span className="text-yellow-300">"160"</span> <span className="text-blue-300">rx</span>=<span className="text-yellow-300">"20"</span> <span className="text-blue-300">fill</span>=<span className="text-yellow-300">"#e2e8f0"</span> <span className="text-pink-400">/&gt;</span>
            </div>
            
            <div 
              className={`pl-4 py-1 my-1 rounded transition-colors ${hoveredNode === 'circle' ? 'bg-red-500/20 border-l-2 border-red-500' : 'border-l-2 border-transparent hover:bg-white/5'}`}
              onMouseEnter={() => handleMouseEnter('circle')}
              onMouseLeave={handleMouseLeave}
            >
              <span className="text-gray-500">&lt;!-- 红色圆脸 --&gt;</span><br />
              <span className="text-pink-400">&lt;circle</span> <span className="text-blue-300">cx</span>=<span className="text-yellow-300">"100"</span> <span className="text-blue-300">cy</span>=<span className="text-yellow-300">"80"</span> <span className="text-blue-300">r</span>=<span className="text-yellow-300">"40"</span> <span className="text-blue-300">fill</span>=<span className="text-yellow-300">"#ef4444"</span> <span className="text-pink-400">/&gt;</span>
            </div>
            
            <div 
              className={`pl-4 py-1 my-1 rounded transition-colors ${hoveredNode === 'path' ? 'bg-yellow-500/20 border-l-2 border-yellow-500' : 'border-l-2 border-transparent hover:bg-white/5'}`}
              onMouseEnter={() => handleMouseEnter('path')}
              onMouseLeave={handleMouseLeave}
            >
              <span className="text-gray-500">&lt;!-- 微笑曲线 --&gt;</span><br />
              <span className="text-pink-400">&lt;path</span> <span className="text-blue-300">d</span>=<span className="text-yellow-300">"M60 140 Q100 170 140 140"</span> <span className="text-blue-300">fill</span>=<span className="text-yellow-300">"none"</span> <span className="text-blue-300">stroke</span>=<span className="text-yellow-300">"#f59e0b"</span> <span className="text-blue-300">stroke-width</span>=<span className="text-yellow-300">"12"</span> <span className="text-pink-400">/&gt;</span>
            </div>
            
            <div 
              className={`pl-4 py-1 my-1 rounded transition-colors ${hoveredNode === 'text' ? 'bg-purple-500/20 border-l-2 border-purple-500' : 'border-l-2 border-transparent hover:bg-white/5'}`}
              onMouseEnter={() => handleMouseEnter('text')}
              onMouseLeave={handleMouseLeave}
            >
              <span className="text-gray-500">&lt;!-- 文字标签 --&gt;</span><br />
              <span className="text-pink-400">&lt;text</span> <span className="text-blue-300">x</span>=<span className="text-yellow-300">"100"</span> <span className="text-blue-300">y</span>=<span className="text-yellow-300">"195"</span> <span className="text-blue-300">text-anchor</span>=<span className="text-yellow-300">"middle"</span><span className="text-pink-400">&gt;</span><span className="text-white">Hello SVG!</span><span className="text-pink-400">&lt;/text&gt;</span>
            </div>

            <div><span className="text-pink-400">&lt;/svg&gt;</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
