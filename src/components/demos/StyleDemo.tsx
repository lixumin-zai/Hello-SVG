"use client";

import React, { useState } from 'react';

export function StyleDemo() {
  const [fill, setFill] = useState('#3b82f6');
  const [fillOpacity, setFillOpacity] = useState(1);
  const [stroke, setStroke] = useState('#1e3a8a');
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [strokeOpacity, setStrokeOpacity] = useState(1);
  const [strokeLinecap, setStrokeLinecap] = useState('butt');
  const [strokeLinejoin, setStrokeLinejoin] = useState('miter');
  const [strokeDasharray, setStrokeDasharray] = useState('');
  const [strokeDashoffset, setStrokeDashoffset] = useState(0);
  const [shape, setShape] = useState('path');

  return (
    <div className="flex flex-col gap-6 p-6 border rounded-xl bg-card text-card-foreground shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Preview Area */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg">预览 (Preview)</h3>
          <div className="relative border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg overflow-hidden flex items-center justify-center p-4 h-[350px]">
             <svg width="300" height="250" viewBox="0 0 300 250" className="bg-white dark:bg-zinc-950 shadow-sm border border-zinc-200 dark:border-zinc-800">
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeOpacity="0.1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" className="text-zinc-500" />
                
                {shape === 'path' ? (
                   <path 
                     d="M 50 150 L 100 50 L 200 50 L 250 150" 
                     fill={fill} 
                     fillOpacity={fillOpacity}
                     stroke={stroke} 
                     strokeWidth={strokeWidth}
                     strokeOpacity={strokeOpacity}
                     strokeLinecap={strokeLinecap as any}
                     strokeLinejoin={strokeLinejoin as any}
                     strokeDasharray={strokeDasharray}
                     strokeDashoffset={strokeDashoffset}
                   />
                ) : (
                   <rect 
                     x="50" y="50" width="200" height="150"
                     fill={fill} 
                     fillOpacity={fillOpacity}
                     stroke={stroke} 
                     strokeWidth={strokeWidth}
                     strokeOpacity={strokeOpacity}
                     strokeLinecap={strokeLinecap as any}
                     strokeLinejoin={strokeLinejoin as any}
                     strokeDasharray={strokeDasharray}
                     strokeDashoffset={strokeDashoffset}
                   />
                )}
                
                {/* Reference points for linecap visualization */}
                {shape === 'path' && (
                  <g fill="red" opacity="0.5">
                    <circle cx="50" cy="150" r="2" />
                    <circle cx="100" cy="50" r="2" />
                    <circle cx="200" cy="50" r="2" />
                    <circle cx="250" cy="150" r="2" />
                  </g>
                )}
             </svg>
             
             {/* Shape Switcher */}
             <div className="absolute top-2 right-2 flex gap-1">
                <button 
                  onClick={() => setShape('path')}
                  className={`px-2 py-1 text-xs rounded ${shape === 'path' ? 'bg-blue-500 text-white' : 'bg-zinc-200 dark:bg-zinc-800'}`}
                >
                  Path (Open)
                </button>
                <button 
                  onClick={() => setShape('rect')}
                  className={`px-2 py-1 text-xs rounded ${shape === 'rect' ? 'bg-blue-500 text-white' : 'bg-zinc-200 dark:bg-zinc-800'}`}
                >
                  Rect (Closed)
                </button>
             </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-6 max-h-[400px] overflow-y-auto pr-2">
          {/* Fill Controls */}
          <div className="space-y-3">
             <h4 className="font-medium text-sm border-b pb-1">Fill (填充)</h4>
             <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1">
                 <label className="text-xs text-zinc-500">Color</label>
                 <div className="flex gap-2">
                   <input type="color" value={fill} onChange={e => setFill(e.target.value)} className="h-8 w-10 cursor-pointer border rounded" />
                   <input type="text" value={fill} onChange={e => setFill(e.target.value)} className="flex-1 text-xs border rounded px-2" />
                 </div>
               </div>
               <div className="space-y-1">
                 <label className="text-xs text-zinc-500">Opacity: {fillOpacity}</label>
                 <input type="range" min="0" max="1" step="0.1" value={fillOpacity} onChange={e => setFillOpacity(Number(e.target.value))} className="w-full accent-blue-500" />
               </div>
             </div>
          </div>

          {/* Stroke Controls */}
          <div className="space-y-3">
             <h4 className="font-medium text-sm border-b pb-1">Stroke (描边)</h4>
             <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1">
                 <label className="text-xs text-zinc-500">Color</label>
                 <div className="flex gap-2">
                   <input type="color" value={stroke} onChange={e => setStroke(e.target.value)} className="h-8 w-10 cursor-pointer border rounded" />
                   <input type="text" value={stroke} onChange={e => setStroke(e.target.value)} className="flex-1 text-xs border rounded px-2" />
                 </div>
               </div>
               <div className="space-y-1">
                 <label className="text-xs text-zinc-500">Width: {strokeWidth}</label>
                 <input type="range" min="0" max="40" value={strokeWidth} onChange={e => setStrokeWidth(Number(e.target.value))} className="w-full accent-blue-500" />
               </div>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-zinc-500">Linecap (端点)</label>
                  <select value={strokeLinecap} onChange={e => setStrokeLinecap(e.target.value)} className="w-full text-sm border rounded px-2 py-1">
                    <option value="butt">butt (直角)</option>
                    <option value="round">round (圆角)</option>
                    <option value="square">square (延伸)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-zinc-500">Linejoin (连接)</label>
                  <select value={strokeLinejoin} onChange={e => setStrokeLinejoin(e.target.value)} className="w-full text-sm border rounded px-2 py-1">
                    <option value="miter">miter (尖角)</option>
                    <option value="round">round (圆角)</option>
                    <option value="bevel">bevel (斜角)</option>
                  </select>
                </div>
             </div>

             <div className="space-y-1">
                <label className="text-xs text-zinc-500">Dasharray (虚线) - e.g. "10 5"</label>
                <input 
                  type="text" 
                  value={strokeDasharray} 
                  onChange={e => setStrokeDasharray(e.target.value)} 
                  placeholder="e.g. 10 5 5 5"
                  className="w-full text-sm border rounded px-2 py-1" 
                />
             </div>
             
             {strokeDasharray && (
                <div className="space-y-1">
                  <label className="text-xs text-zinc-500">Dashoffset: {strokeDashoffset}</label>
                  <input type="range" min="-100" max="100" value={strokeDashoffset} onChange={e => setStrokeDashoffset(Number(e.target.value))} className="w-full accent-blue-500" />
                </div>
             )}
          </div>

          <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800">
             <div className="bg-zinc-900 rounded-md p-3 overflow-x-auto">
               <code className="text-xs text-zinc-300 font-mono whitespace-pre">
                 {`<path\n  fill="${fill}"\n  stroke="${stroke}"\n  stroke-width="${strokeWidth}"\n  stroke-linecap="${strokeLinecap}"\n  stroke-linejoin="${strokeLinejoin}"\n  ${strokeDasharray ? `stroke-dasharray="${strokeDasharray}"\n  stroke-dashoffset="${strokeDashoffset}"` : ''}\n/>`}
               </code>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
