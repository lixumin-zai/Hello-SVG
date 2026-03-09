"use client";

import React, { useState, useEffect } from 'react';

export function PathDemo({ initialD = "M 50 50 L 150 50 L 100 150 Z" }: { initialD?: string }) {
  const [d, setD] = useState(initialD);
  const [fill, setFill] = useState('none');
  const [stroke, setStroke] = useState('#3b82f6');
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [fillRule, setFillRule] = useState('nonzero');

  return (
    <div className="flex flex-col gap-6 p-6 border rounded-xl bg-card text-card-foreground shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Preview Area */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg">预览 (Preview)</h3>
          <div className="relative border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg overflow-hidden flex items-center justify-center p-4 h-[300px]">
             <svg width="300" height="200" viewBox="0 0 300 200" className="bg-white dark:bg-zinc-950 shadow-sm border border-zinc-200 dark:border-zinc-800">
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeOpacity="0.1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" className="text-zinc-500" />
                
                <path 
                  d={d} 
                  fill={fill} 
                  stroke={stroke} 
                  strokeWidth={strokeWidth}
                  fillRule={fillRule as any}
                />
                
                {/* Helper: Origin */}
                <circle cx="0" cy="0" r="3" fill="red" />
                <text x="5" y="15" fontSize="10" fill="red" fontFamily="monospace">0,0</text>
             </svg>
             <div className="absolute bottom-2 right-2 text-[10px] text-zinc-400 font-mono">300x200 Canvas</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Path Data (<code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">d</code>)
            </label>
            <textarea
              value={d}
              onChange={(e) => setD(e.target.value)}
              className="w-full h-32 px-3 py-2 font-mono text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="M 10 10 L 50 50 ..."
            />
            <p className="text-xs text-zinc-500">
              尝试修改路径命令。支持: M, L, H, V, C, S, Q, T, A, Z (大小写均可)
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
               <label className="text-xs font-medium text-zinc-500">Fill</label>
               <div className="flex gap-2 items-center">
                 <input 
                   type="color" 
                   value={fill === 'none' ? '#ffffff' : fill} 
                   onChange={(e) => setFill(e.target.value)}
                   className="h-8 w-12 cursor-pointer border border-zinc-200 dark:border-zinc-700 rounded"
                 />
                 <button 
                    onClick={() => setFill(fill === 'none' ? '#3b82f6' : 'none')}
                    className="text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200"
                 >
                   {fill === 'none' ? 'Set Color' : 'No Fill'}
                 </button>
               </div>
            </div>

            <div className="space-y-1">
               <label className="text-xs font-medium text-zinc-500">Stroke</label>
               <div className="flex gap-2 items-center">
                 <input 
                   type="color" 
                   value={stroke} 
                   onChange={(e) => setStroke(e.target.value)}
                   className="h-8 w-12 cursor-pointer border border-zinc-200 dark:border-zinc-700 rounded"
                 />
                 <input 
                   type="range" 
                   min="0" max="20" 
                   value={strokeWidth} 
                   onChange={(e) => setStrokeWidth(Number(e.target.value))}
                   className="flex-1 accent-blue-500"
                 />
               </div>
            </div>
            
             <div className="space-y-1 col-span-2">
               <label className="text-xs font-medium text-zinc-500">Fill Rule</label>
               <div className="flex gap-4">
                  {['nonzero', 'evenodd'].map(rule => (
                    <label key={rule} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="fillRule"
                        value={rule}
                        checked={fillRule === rule}
                        onChange={(e) => setFillRule(e.target.value)}
                        className="accent-blue-500"
                      />
                      <span>{rule}</span>
                    </label>
                  ))}
               </div>
            </div>
          </div>
          
          <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800">
             <div className="bg-zinc-900 rounded-md p-3 overflow-x-auto">
               <code className="text-xs text-zinc-300 font-mono whitespace-pre">
                 {`<svg ...>\n  <path\n    d="${d}"\n    fill="${fill}"\n    stroke="${stroke}"\n    stroke-width="${strokeWidth}"\n    fill-rule="${fillRule}"\n  />\n</svg>`}
               </code>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
