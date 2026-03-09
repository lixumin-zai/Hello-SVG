"use client";

import React, { useState } from 'react';

export function TransformDemo() {
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [rotate, setRotate] = useState(0);
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);
  const [skewX, setSkewX] = useState(0);
  const [skewY, setSkewY] = useState(0);
  
  // Order of transforms matters!
  const [order, setOrder] = useState<'TRS' | 'SRT'>('TRS'); // Translate -> Rotate -> Scale vs Scale -> Rotate -> Translate

  const getTransformString = () => {
    const t = `translate(${translateX}, ${translateY})`;
    const r = `rotate(${rotate})`;
    const s = `scale(${scaleX}, ${scaleY})`;
    const sk = `skewX(${skewX}) skewY(${skewY})`;
    
    if (order === 'TRS') {
      return `${t} ${r} ${s} ${sk}`;
    } else {
      return `${s} ${r} ${t} ${sk}`;
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 border rounded-xl bg-card text-card-foreground shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Preview Area */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg">预览 (Preview)</h3>
          <div className="relative border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg overflow-hidden flex items-center justify-center p-4 h-[350px]">
             <svg width="300" height="300" viewBox="-150 -150 300 300" className="bg-white dark:bg-zinc-950 shadow-sm border border-zinc-200 dark:border-zinc-800">
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeOpacity="0.1" />
                  </pattern>
                </defs>
                
                {/* Coordinate System */}
                <rect x="-150" y="-150" width="300" height="300" fill="url(#grid)" className="text-zinc-500" />
                <line x1="-150" y1="0" x2="150" y2="0" stroke="currentColor" strokeOpacity="0.3" />
                <line x1="0" y1="-150" x2="0" y2="150" stroke="currentColor" strokeOpacity="0.3" />
                <circle cx="0" cy="0" r="2" fill="currentColor" opacity="0.5" />
                
                {/* Original Shape (Ghost) */}
                <rect x="-40" y="-40" width="80" height="80" fill="none" stroke="currentColor" strokeDasharray="4 4" opacity="0.3" />
                
                {/* Transformed Shape */}
                <g transform={getTransformString()}>
                  <rect x="-40" y="-40" width="80" height="80" fill="#3b82f6" fillOpacity="0.5" stroke="#1e3a8a" strokeWidth="2" />
                  {/* Origin of the shape */}
                  <circle cx="0" cy="0" r="3" fill="red" />
                  {/* Direction indicator */}
                  <line x1="0" y1="0" x2="30" y2="0" stroke="white" strokeWidth="2" />
                </g>
             </svg>
             <div className="absolute bottom-2 right-2 text-[10px] text-zinc-400 font-mono">Center is (0,0)</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-6 max-h-[400px] overflow-y-auto pr-2">
          
          <div className="space-y-4">
             {/* Translate */}
             <div className="space-y-2 pb-4 border-b border-zinc-100 dark:border-zinc-800">
               <div className="flex justify-between">
                 <h4 className="font-medium text-sm">Translate (平移)</h4>
                 <span className="text-xs font-mono text-zinc-500">{translateX}, {translateY}</span>
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1">
                   <label className="text-xs text-zinc-500">X</label>
                   <input type="range" min="-100" max="100" value={translateX} onChange={e => setTranslateX(Number(e.target.value))} className="w-full accent-blue-500" />
                 </div>
                 <div className="space-y-1">
                   <label className="text-xs text-zinc-500">Y</label>
                   <input type="range" min="-100" max="100" value={translateY} onChange={e => setTranslateY(Number(e.target.value))} className="w-full accent-blue-500" />
                 </div>
               </div>
             </div>

             {/* Rotate */}
             <div className="space-y-2 pb-4 border-b border-zinc-100 dark:border-zinc-800">
               <div className="flex justify-between">
                 <h4 className="font-medium text-sm">Rotate (旋转)</h4>
                 <span className="text-xs font-mono text-zinc-500">{rotate}°</span>
               </div>
               <input type="range" min="-180" max="180" value={rotate} onChange={e => setRotate(Number(e.target.value))} className="w-full accent-blue-500" />
             </div>

             {/* Scale */}
             <div className="space-y-2 pb-4 border-b border-zinc-100 dark:border-zinc-800">
               <div className="flex justify-between">
                 <h4 className="font-medium text-sm">Scale (缩放)</h4>
                 <span className="text-xs font-mono text-zinc-500">{scaleX}, {scaleY}</span>
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1">
                   <label className="text-xs text-zinc-500">X</label>
                   <input type="range" min="0.1" max="3" step="0.1" value={scaleX} onChange={e => setScaleX(Number(e.target.value))} className="w-full accent-blue-500" />
                 </div>
                 <div className="space-y-1">
                   <label className="text-xs text-zinc-500">Y</label>
                   <input type="range" min="0.1" max="3" step="0.1" value={scaleY} onChange={e => setScaleY(Number(e.target.value))} className="w-full accent-blue-500" />
                 </div>
               </div>
             </div>

             {/* Skew */}
             <div className="space-y-2 pb-4 border-b border-zinc-100 dark:border-zinc-800">
               <div className="flex justify-between">
                 <h4 className="font-medium text-sm">Skew (倾斜)</h4>
                 <span className="text-xs font-mono text-zinc-500">{skewX}°, {skewY}°</span>
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1">
                   <label className="text-xs text-zinc-500">X</label>
                   <input type="range" min="-45" max="45" value={skewX} onChange={e => setSkewX(Number(e.target.value))} className="w-full accent-blue-500" />
                 </div>
                 <div className="space-y-1">
                   <label className="text-xs text-zinc-500">Y</label>
                   <input type="range" min="-45" max="45" value={skewY} onChange={e => setSkewY(Number(e.target.value))} className="w-full accent-blue-500" />
                 </div>
               </div>
             </div>
             
             {/* Order */}
             <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-500">Transform Order (变换顺序)</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="radio" name="order" value="TRS" checked={order === 'TRS'} onChange={() => setOrder('TRS')} className="accent-blue-500" />
                    <span>Translate → Rotate → Scale</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="radio" name="order" value="SRT" checked={order === 'SRT'} onChange={() => setOrder('SRT')} className="accent-blue-500" />
                    <span>Scale → Rotate → Translate</span>
                  </label>
                </div>
                <p className="text-[10px] text-zinc-400">注意：变换顺序会显著影响最终结果。</p>
             </div>
          </div>

          <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800">
             <div className="bg-zinc-900 rounded-md p-3 overflow-x-auto">
               <code className="text-xs text-zinc-300 font-mono whitespace-pre">
                 {`<g transform="${getTransformString()}">\n  <rect ... />\n</g>`}
               </code>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
