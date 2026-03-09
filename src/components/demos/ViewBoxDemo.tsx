'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const ALIGN_OPTIONS = [
  'none',
  'xMinYMin', 'xMidYMin', 'xMaxYMin',
  'xMinYMid', 'xMidYMid', 'xMaxYMid',
  'xMinYMax', 'xMidYMax', 'xMaxYMax'
];

const MEET_SLICE_OPTIONS = ['meet', 'slice'];

export function ViewBoxDemo() {
  const [vbX, setVbX] = useState(0);
  const [vbY, setVbY] = useState(0);
  const [vbW, setVbW] = useState(100);
  const [vbH, setVbH] = useState(100);
  const [align, setAlign] = useState('xMidYMid');
  const [meetOrSlice, setMeetOrSlice] = useState('meet');
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(200);

  const preserveAspectRatio = align === 'none' ? 'none' : `${align} ${meetOrSlice}`;
  const viewBox = `${vbX} ${vbY} ${vbW} ${vbH}`;

  return (
    <div className="flex flex-col gap-6 p-6 border rounded-xl bg-card text-card-foreground shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Preview Area */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg">预览 (Viewport)</h3>
          <div className="relative border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg overflow-hidden flex items-center justify-center p-4"
               style={{ width: '100%', height: '350px' }}>
            
            {/* The SVG Container (Viewport) */}
            <div 
              style={{ width: width, height: height, transition: 'width 0.2s, height 0.2s' }}
              className="border-2 border-blue-500 bg-white dark:bg-zinc-950 relative shadow-md flex-shrink-0"
            >
              <span className="absolute -top-6 left-0 text-blue-500 text-xs font-mono">Viewport: {width}x{height}</span>
              
              <svg
                width="100%"
                height="100%"
                viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`}
                preserveAspectRatio={align === 'none' ? 'none' : `${align} ${meetOrSlice}`}
                className="w-full h-full block"
              >
                {/* Grid Pattern */}
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeOpacity="0.1" />
                  </pattern>
                </defs>
                <rect x="-1000" y="-1000" width="2000" height="2000" fill="url(#grid)" className="text-zinc-400" />
                
                {/* Coordinate Axes */}
                <line x1="-1000" y1="0" x2="1000" y2="0" stroke="currentColor" strokeOpacity="0.5" className="text-zinc-500" />
                <line x1="0" y1="-1000" x2="0" y2="1000" stroke="currentColor" strokeOpacity="0.5" className="text-zinc-500" />
                
                {/* Content: A smiley face and some bounds */}
                <circle cx="50" cy="50" r="40" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
                <circle cx="35" cy="40" r="5" fill="#333" />
                <circle cx="65" cy="40" r="5" fill="#333" />
                <path d="M 35 65 Q 50 80 65 65" fill="none" stroke="#333" strokeWidth="3" strokeLinecap="round" />
                
                {/* Reference Box (0,0 to 100,100) */}
                <rect x="0" y="0" width="100" height="100" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 4" />
                <text x="5" y="15" fontSize="10" fill="#ef4444" fontFamily="monospace">0,0</text>
                <text x="60" y="95" fontSize="10" fill="#ef4444" fontFamily="monospace">100,100</text>
              </svg>
            </div>
          </div>
          
          {/* Viewport Controls */}
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-500 flex justify-between">
                  <span>Viewport Width</span>
                  <span>{width}px</span>
                </label>
                <input 
                  type="range" 
                  min="100" 
                  max="400" 
                  value={width} 
                  onChange={e => setWidth(Number(e.target.value))} 
                  className="w-full accent-blue-500"
                />
             </div>
             <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-500 flex justify-between">
                  <span>Viewport Height</span>
                  <span>{height}px</span>
                </label>
                <input 
                  type="range" 
                  min="100" 
                  max="300" 
                  value={height} 
                  onChange={e => setHeight(Number(e.target.value))} 
                  className="w-full accent-blue-500"
                />
             </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-6">
          
          {/* viewBox Controls */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">viewBox</code>
              <span className="text-sm font-normal text-zinc-500">(min-x, min-y, width, height)</span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-500">min-x</label>
                <input
                  type="number"
                  value={vbX}
                  onChange={(e) => setVbX(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-500">min-y</label>
                <input
                  type="number"
                  value={vbY}
                  onChange={(e) => setVbY(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-500">width</label>
                <input
                  type="number"
                  value={vbW}
                  onChange={(e) => setVbW(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-500">height</label>
                <input
                  type="number"
                  value={vbH}
                  onChange={(e) => setVbH(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md text-sm"
                />
              </div>
            </div>
            <p className="text-xs text-zinc-500">
              这定义了 SVG 内部坐标系中可见的矩形区域。
            </p>
          </div>

          <hr className="border-zinc-200 dark:border-zinc-800" />

          {/* preserveAspectRatio Controls */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">preserveAspectRatio</code>
            </h3>
            
            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-500">Align</label>
              <select
                value={align}
                onChange={(e) => setAlign(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md text-sm"
              >
                {ALIGN_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {align !== 'none' && (
              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-500">Meet or Slice</label>
                <div className="flex gap-4">
                  {MEET_SLICE_OPTIONS.map(opt => (
                    <label key={opt} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="meetOrSlice"
                        value={opt}
                        checked={meetOrSlice === opt}
                        onChange={(e) => setMeetOrSlice(e.target.value)}
                        className="accent-indigo-500"
                      />
                      <span className={meetOrSlice === opt ? 'text-indigo-600 font-medium' : ''}>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            
            <p className="text-xs text-zinc-500">
              当 viewBox 的宽高比与 Viewport (width/height) 不一致时，决定如何缩放和对齐。
            </p>
          </div>

          {/* Code Output */}
          <div className="mt-auto bg-zinc-900 rounded-lg p-4 overflow-x-auto">
            <code className="text-xs text-zinc-300 font-mono whitespace-pre">
              {`<svg width="${width}" height="${height}"\n  viewBox="${viewBox}"\n  preserveAspectRatio="${preserveAspectRatio}">\n  ...\n</svg>`}
            </code>
          </div>

        </div>
      </div>
    </div>
  );
}
