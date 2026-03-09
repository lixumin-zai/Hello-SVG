"use client";

import React, { useState } from 'react';

type GradientType = 'linear' | 'radial';

interface GradientStop {
  id: string;
  offset: number;
  color: string;
  opacity: number;
}

export function GradientDemo() {
  const [type, setType] = useState<GradientType>('linear');
  const [stops, setStops] = useState<GradientStop[]>([
    { id: '1', offset: 0, color: '#3b82f6', opacity: 1 },
    { id: '2', offset: 100, color: '#ec4899', opacity: 1 },
  ]);
  
  // Linear Gradient Attributes
  const [x1, setX1] = useState(0);
  const [y1, setY1] = useState(0);
  const [x2, setX2] = useState(100);
  const [y2, setY2] = useState(0);
  
  // Radial Gradient Attributes
  const [cx, setCx] = useState(50);
  const [cy, setCy] = useState(50);
  const [r, setR] = useState(50);
  const [fx, setFx] = useState(50);
  const [fy, setFy] = useState(50);
  
  // Spread Method
  const [spreadMethod, setSpreadMethod] = useState<'pad' | 'reflect' | 'repeat'>('pad');

  const addStop = () => {
    const newStop: GradientStop = {
      id: Math.random().toString(36).substr(2, 9),
      offset: 50,
      color: '#ffffff',
      opacity: 1
    };
    setStops([...stops, newStop].sort((a, b) => a.offset - b.offset));
  };

  const removeStop = (id: string) => {
    if (stops.length <= 2) return;
    setStops(stops.filter(s => s.id !== id));
  };

  const updateStop = (id: string, updates: Partial<GradientStop>) => {
    setStops(stops.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const gradientId = "demo-gradient";

  return (
    <div className="flex flex-col gap-6 p-6 border rounded-xl bg-card text-card-foreground shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Preview Area */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg">预览 (Preview)</h3>
          <div className="relative border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg overflow-hidden flex items-center justify-center p-4 h-[350px]">
             <svg width="300" height="300" viewBox="0 0 300 300" className="bg-white dark:bg-zinc-950 shadow-sm border border-zinc-200 dark:border-zinc-800">
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeOpacity="0.1" />
                  </pattern>
                  
                  {type === 'linear' ? (
                    <linearGradient 
                      id={gradientId} 
                      x1={`${x1}%`} y1={`${y1}%`} 
                      x2={`${x2}%`} y2={`${y2}%`}
                      spreadMethod={spreadMethod}
                    >
                      {stops.sort((a,b) => a.offset - b.offset).map(stop => (
                        <stop 
                          key={stop.id} 
                          offset={`${stop.offset}%`} 
                          stopColor={stop.color} 
                          stopOpacity={stop.opacity} 
                        />
                      ))}
                    </linearGradient>
                  ) : (
                    <radialGradient 
                      id={gradientId} 
                      cx={`${cx}%`} cy={`${cy}%`} 
                      r={`${r}%`} 
                      fx={`${fx}%`} fy={`${fy}%`}
                      spreadMethod={spreadMethod}
                    >
                      {stops.sort((a,b) => a.offset - b.offset).map(stop => (
                        <stop 
                          key={stop.id} 
                          offset={`${stop.offset}%`} 
                          stopColor={stop.color} 
                          stopOpacity={stop.opacity} 
                        />
                      ))}
                    </radialGradient>
                  )}
                </defs>
                
                {/* Background Grid */}
                <rect width="100%" height="100%" fill="url(#grid)" className="text-zinc-500" />
                
                {/* Gradient Filled Shape */}
                <rect x="25" y="25" width="250" height="250" fill={`url(#${gradientId})`} rx="15" />
                
                {/* Helper lines for Linear Gradient */}
                {type === 'linear' && (
                  <g className="text-zinc-400" pointerEvents="none">
                    <line 
                      x1={`${x1*3}`} y1={`${y1*3}`} 
                      x2={`${x2*3}`} y2={`${y2*3}`} 
                      stroke="currentColor" 
                      strokeDasharray="4 4" 
                      strokeWidth="2"
                    />
                    <circle cx={`${x1*3}`} cy={`${y1*3}`} r="4" fill="white" stroke="currentColor" strokeWidth="2" />
                    <circle cx={`${x2*3}`} cy={`${y2*3}`} r="4" fill="currentColor" />
                  </g>
                )}
             </svg>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-6 max-h-[400px] overflow-y-auto pr-2">
          {/* Type Selector */}
          <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
             {(['linear', 'radial'] as const).map(t => (
               <button
                 key={t}
                 onClick={() => setType(t)}
                 className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${
                   type === t 
                     ? 'bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-zinc-100' 
                     : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                 }`}
               >
                 {t === 'linear' ? 'Linear Gradient' : 'Radial Gradient'}
               </button>
             ))}
          </div>

          {/* Coordinates Controls */}
          <div className="space-y-4 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <h4 className="font-medium text-sm">Coordinates (%)</h4>
            {type === 'linear' ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                   <label className="text-xs text-zinc-500 flex justify-between">x1 <span>{x1}%</span></label>
                   <input type="range" min="0" max="100" value={x1} onChange={e => setX1(Number(e.target.value))} className="w-full accent-blue-500" />
                </div>
                <div className="space-y-1">
                   <label className="text-xs text-zinc-500 flex justify-between">y1 <span>{y1}%</span></label>
                   <input type="range" min="0" max="100" value={y1} onChange={e => setY1(Number(e.target.value))} className="w-full accent-blue-500" />
                </div>
                <div className="space-y-1">
                   <label className="text-xs text-zinc-500 flex justify-between">x2 <span>{x2}%</span></label>
                   <input type="range" min="0" max="100" value={x2} onChange={e => setX2(Number(e.target.value))} className="w-full accent-blue-500" />
                </div>
                <div className="space-y-1">
                   <label className="text-xs text-zinc-500 flex justify-between">y2 <span>{y2}%</span></label>
                   <input type="range" min="0" max="100" value={y2} onChange={e => setY2(Number(e.target.value))} className="w-full accent-blue-500" />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                   <label className="text-xs text-zinc-500 flex justify-between">cx (Center X) <span>{cx}%</span></label>
                   <input type="range" min="0" max="100" value={cx} onChange={e => setCx(Number(e.target.value))} className="w-full accent-blue-500" />
                </div>
                <div className="space-y-1">
                   <label className="text-xs text-zinc-500 flex justify-between">cy (Center Y) <span>{cy}%</span></label>
                   <input type="range" min="0" max="100" value={cy} onChange={e => setCy(Number(e.target.value))} className="w-full accent-blue-500" />
                </div>
                <div className="space-y-1 col-span-2">
                   <label className="text-xs text-zinc-500 flex justify-between">r (Radius) <span>{r}%</span></label>
                   <input type="range" min="0" max="100" value={r} onChange={e => setR(Number(e.target.value))} className="w-full accent-blue-500" />
                </div>
                <div className="space-y-1">
                   <label className="text-xs text-zinc-500 flex justify-between">fx (Focal X) <span>{fx}%</span></label>
                   <input type="range" min="0" max="100" value={fx} onChange={e => setFx(Number(e.target.value))} className="w-full accent-blue-500" />
                </div>
                <div className="space-y-1">
                   <label className="text-xs text-zinc-500 flex justify-between">fy (Focal Y) <span>{fy}%</span></label>
                   <input type="range" min="0" max="100" value={fy} onChange={e => setFy(Number(e.target.value))} className="w-full accent-blue-500" />
                </div>
              </div>
            )}
            
            <div className="space-y-1">
               <label className="text-xs text-zinc-500">Spread Method</label>
               <select 
                 value={spreadMethod} 
                 onChange={(e) => setSpreadMethod(e.target.value as any)}
                 className="w-full px-2 py-1 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded"
               >
                 <option value="pad">pad (默认)</option>
                 <option value="reflect">reflect (镜像)</option>
                 <option value="repeat">repeat (重复)</option>
               </select>
            </div>
          </div>

          {/* Stops Controls */}
          <div className="space-y-4">
             <div className="flex justify-between items-center">
               <h4 className="font-medium text-sm">Gradient Stops (色标)</h4>
               <button onClick={addStop} className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900/50">
                 + Add Stop
               </button>
             </div>
             
             <div className="space-y-3">
               {stops.map((stop, index) => (
                 <div key={stop.id} className="flex gap-2 items-center bg-zinc-50 dark:bg-zinc-900 p-2 rounded border border-zinc-100 dark:border-zinc-800">
                   <input 
                     type="color" 
                     value={stop.color} 
                     onChange={e => updateStop(stop.id, { color: e.target.value })}
                     className="h-8 w-8 rounded cursor-pointer border-none"
                   />
                   <div className="flex-1 space-y-1">
                     <div className="flex justify-between text-xs text-zinc-500">
                       <span>Offset</span>
                       <span>{stop.offset}%</span>
                     </div>
                     <input 
                       type="range" 
                       min="0" max="100" 
                       value={stop.offset} 
                       onChange={e => updateStop(stop.id, { offset: Number(e.target.value) })}
                       className="w-full accent-blue-500 h-1"
                     />
                   </div>
                   <div className="flex flex-col gap-1">
                     <button 
                       onClick={() => removeStop(stop.id)} 
                       disabled={stops.length <= 2}
                       className="text-zinc-400 hover:text-red-500 disabled:opacity-30"
                     >
                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                     </button>
                   </div>
                 </div>
               ))}
             </div>
          </div>

          <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800">
             <div className="bg-zinc-900 rounded-md p-3 overflow-x-auto">
               <code className="text-xs text-zinc-300 font-mono whitespace-pre">
                 {type === 'linear' 
                   ? `<linearGradient id="grad"\n  x1="${x1}%" y1="${y1}%"\n  x2="${x2}%" y2="${y2}%"\n  spreadMethod="${spreadMethod}">\n${stops.sort((a,b)=>a.offset-b.offset).map(s => `  <stop offset="${s.offset}%" stop-color="${s.color}" />`).join('\n')}\n</linearGradient>`
                   : `<radialGradient id="grad"\n  cx="${cx}%" cy="${cy}%" r="${r}%"\n  fx="${fx}%" fy="${fy}%"\n  spreadMethod="${spreadMethod}">\n${stops.sort((a,b)=>a.offset-b.offset).map(s => `  <stop offset="${s.offset}%" stop-color="${s.color}" />`).join('\n')}\n</radialGradient>`
                 }
               </code>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
