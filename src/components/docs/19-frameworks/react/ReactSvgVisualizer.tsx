'use client';

import { useState } from 'react';

export function ReactSvgVisualizer() {
  const [size, setSize] = useState(64);
  const [color, setColor] = useState('#3b82f6');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [isSpinning, setIsSpinning] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Controls */}
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Props 注入测试
            </label>
            <div className="space-y-4 p-4 bg-muted rounded-lg">
              <div>
                <div className="text-xs text-muted-foreground mb-1">size={size}</div>
                <input type="range" min="24" max="120" value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">color="{color}"</div>
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-full h-8 cursor-pointer" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">strokeWidth={strokeWidth}</div>
                <input type="range" min="1" max="5" step="0.5" value={strokeWidth} onChange={(e) => setStrokeWidth(Number(e.target.value))} className="w-full" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="spin" checked={isSpinning} onChange={(e) => setIsSpinning(e.target.checked)} />
                <label htmlFor="spin" className="text-xs text-muted-foreground cursor-pointer">className="animate-spin"</label>
              </div>
            </div>
          </div>

          {/* Code View */}
          <div className="bg-[#1e1e1e] p-4 rounded-lg font-mono text-[11px] overflow-x-auto text-blue-300 shadow-inner">
            <span className="text-purple-400">export function</span> <span className="text-yellow-200">SettingsIcon</span>({`{ `}
            <span className="text-blue-200">size</span>, <span className="text-blue-200">color</span>, <span className="text-blue-200">className</span>, ...<span className="text-blue-200">props</span>
            {` }`}
            <span className="text-muted-foreground"> /* : SVGProps&lt;SVGSVGElement&gt; */</span>) {'{\n'}
            {'  '}<span className="text-purple-400">return</span> (\n
            {'    '}&lt;<span className="text-red-400">svg</span>\n
            {'      '}<span className="text-blue-200">width</span>={<span className="text-green-300">{size}</span>}\n
            {'      '}<span className="text-blue-200">height</span>={<span className="text-green-300">{size}</span>}\n
            {'      '}<span className="text-blue-200">stroke</span>=<span className="text-green-300">"{color}"</span>\n
            {'      '}<span className="text-blue-200">strokeWidth</span>={<span className="text-green-300">{strokeWidth}</span>}\n
            <span className="text-muted-foreground">      {/* React 特有的驼峰命名法 */}</span>\n
            {'      '}<span className="text-blue-200 bg-blue-500/20 px-1 rounded">strokeLinecap</span>=<span className="text-green-300">"round"</span>\n
            {'      '}<span className="text-blue-200 bg-blue-500/20 px-1 rounded">strokeLinejoin</span>=<span className="text-green-300">"round"</span>\n
            {'      '}<span className="text-blue-200 bg-blue-500/20 px-1 rounded">className</span>={`{className}`}\n
            {'      '}{`{...props}`}\n
            {'    '}&gt;\n
            {'      '}&lt;<span className="text-red-400">path</span> <span className="text-blue-200">d</span>=<span className="text-green-300">"M12.22 2h..."</span> /&gt;\n
            {'      '}&lt;<span className="text-red-400">circle</span> <span className="text-blue-200">cx</span>=<span className="text-green-300">"12"</span> <span className="text-blue-200">cy</span>=<span className="text-green-300">"12"</span> <span className="text-blue-200">r</span>=<span className="text-green-300">"3"</span> /&gt;\n
            {'    '}&lt;/<span className="text-red-400">svg</span>&gt;\n
            {'  '})\n
            {'}'}
          </div>
        </div>

        {/* Result View */}
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg bg-grid-pattern min-h-[300px]">
          <svg 
            width={size} 
            height={size} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke={color} 
            strokeWidth={strokeWidth} 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={`transition-colors ${isSpinning ? 'animate-spin' : 'transition-transform duration-300'}`}
          >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </div>

      </div>
    </div>
  );
}
