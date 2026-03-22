'use client';

import { useState } from 'react';

export function StrokePlayground() {
  const [strokeWidth, setStrokeWidth] = useState(10);
  const [strokeLinecap, setStrokeLinecap] = useState<'butt' | 'round' | 'square'>('butt');
  const [strokeLinejoin, setStrokeLinejoin] = useState<'miter' | 'round' | 'bevel'>('miter');
  const [strokeMiterlimit, setStrokeMiterlimit] = useState(4);
  const [dashArray, setDashArray] = useState('0'); // 0 means none
  const [dashOffset, setDashOffset] = useState(0);

  // Pre-defined dash patterns
  const dashPatterns = [
    { label: '实线 (None)', value: '0' },
    { label: '短虚线', value: '10, 10' },
    { label: '长虚线', value: '30, 15' },
    { label: '点划线', value: '30, 10, 5, 10' },
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Controls */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <label className="text-sm font-bold w-24">线宽<br/><span className="text-[10px] text-muted-foreground font-normal">(stroke-width)</span></label>
              <input type="range" min="1" max="30" value={strokeWidth} onChange={e => setStrokeWidth(Number(e.target.value))} className="flex-1 accent-primary" />
              <span className="w-6 text-right text-sm">{strokeWidth}</span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-bold">线端形状 (stroke-linecap)</label>
            <div className="flex gap-2">
              {(['butt', 'round', 'square'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setStrokeLinecap(type)}
                  className={`flex-1 py-1.5 text-xs rounded border transition-colors ${strokeLinecap === type ? 'bg-primary text-primary-foreground border-primary' : 'bg-background hover:bg-secondary'}`}
                >
                  {type}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground h-4">
              {strokeLinecap === 'butt' && '默认值。线条精确地在端点处结束。'}
              {strokeLinecap === 'round' && '端点增加一个半圆（半径为线宽一半），非常适合平滑的图标。'}
              {strokeLinecap === 'square' && '端点增加一个矩形（长度为线宽一半），使得线看起来比实际长。'}
            </p>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-bold">转角形状 (stroke-linejoin)</label>
            <div className="flex gap-2">
              {(['miter', 'round', 'bevel'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setStrokeLinejoin(type)}
                  className={`flex-1 py-1.5 text-xs rounded border transition-colors ${strokeLinejoin === type ? 'bg-primary text-primary-foreground border-primary' : 'bg-background hover:bg-secondary'}`}
                >
                  {type}
                </button>
              ))}
            </div>
            {strokeLinejoin === 'miter' && (
              <div className="flex items-center gap-2 mt-2 bg-orange-500/10 p-2 rounded">
                <label className="text-xs w-24">miterlimit:</label>
                <input type="range" min="1" max="10" step="0.5" value={strokeMiterlimit} onChange={e => setStrokeMiterlimit(Number(e.target.value))} className="flex-1 accent-orange-500" />
                <span className="text-xs w-6">{strokeMiterlimit}</span>
              </div>
            )}
          </div>

          <div className="space-y-3 border-t pt-4">
            <label className="block text-sm font-bold text-blue-600">虚线魔法 (Dash)</label>
            <div className="space-y-2">
              <select 
                value={dashArray} 
                onChange={e => setDashArray(e.target.value)}
                className="w-full p-2 bg-background border rounded text-sm"
              >
                {dashPatterns.map(p => (
                  <option key={p.value} value={p.value}>{p.label} ({p.value})</option>
                ))}
              </select>
              
              <div className="flex items-center gap-3 pt-2">
                <label className="text-xs w-20">偏移量<br/><span className="text-[10px] text-muted-foreground">(dashoffset)</span></label>
                <input type="range" min="-100" max="100" value={dashOffset} onChange={e => setDashOffset(Number(e.target.value))} className="flex-1 accent-blue-500" disabled={dashArray === '0'} />
                <span className="w-8 text-right text-xs">{dashOffset}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Display */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="p-3 bg-muted rounded-lg border font-mono text-[11px] text-primary overflow-x-auto whitespace-pre">
{`<path 
  stroke-width="${strokeWidth}"
  stroke-linecap="${strokeLinecap}"
  stroke-linejoin="${strokeLinejoin}"${strokeLinejoin === 'miter' ? `\n  stroke-miterlimit="${strokeMiterlimit}"` : ''}${dashArray !== '0' ? `\n  stroke-dasharray="${dashArray}"\n  stroke-dashoffset="${dashOffset}"` : ''}
/>`}
          </div>

          <div className="relative border-2 border-dashed border-border rounded-lg bg-grid-pattern flex-1 min-h-[300px] bg-background p-4">
            <svg width="100%" height="100%" viewBox="0 0 400 300">
              
              {/* Group 1: Demonstrating Linecap */}
              <g transform="translate(0, 20)">
                <text x="20" y="20" fontSize="12" fill="currentColor" opacity="0.5">Linecap 演示</text>
                
                {/* The actual thick line */}
                <line 
                  x1="50" y1="50" x2="350" y2="50" 
                  stroke="#3b82f6" 
                  strokeWidth={strokeWidth} 
                  strokeLinecap={strokeLinecap}
                  strokeDasharray={dashArray === '0' ? 'none' : dashArray}
                  strokeDashoffset={dashOffset}
                />
                
                {/* Visualizing the exact mathematical path (thin red line) */}
                <line x1="50" y1="50" x2="350" y2="50" stroke="#ef4444" strokeWidth="1" />
                <circle cx="50" cy="50" r="3" fill="#ef4444" />
                <circle cx="350" cy="50" r="3" fill="#ef4444" />
                
                {/* Guide lines showing exactly where x1 and x2 are */}
                <line x1="50" y1="30" x2="50" y2="70" stroke="#ef4444" strokeWidth="1" strokeDasharray="2" opacity="0.5" />
                <line x1="350" y1="30" x2="350" y2="70" stroke="#ef4444" strokeWidth="1" strokeDasharray="2" opacity="0.5" />
              </g>

              {/* Group 2: Demonstrating Linejoin & Miterlimit */}
              <g transform="translate(0, 100)">
                <text x="20" y="40" fontSize="12" fill="currentColor" opacity="0.5">Linejoin 演示 (锐角测试)</text>
                
                {/* A path with a very sharp angle to test miterlimit */}
                <path 
                  d="M 50 150 L 200 60 L 350 150" 
                  fill="none" 
                  stroke="#10b981" 
                  strokeWidth={strokeWidth} 
                  strokeLinecap={strokeLinecap}
                  strokeLinejoin={strokeLinejoin}
                  strokeMiterlimit={strokeMiterlimit}
                  strokeDasharray={dashArray === '0' ? 'none' : dashArray}
                  strokeDashoffset={dashOffset}
                />
                
                {/* Visualizing the exact mathematical path */}
                <path d="M 50 150 L 200 60 L 350 150" fill="none" stroke="#ef4444" strokeWidth="1" />
                <circle cx="50" cy="150" r="3" fill="#ef4444" />
                <circle cx="200" cy="60" r="3" fill="#ef4444" />
                <circle cx="350" cy="150" r="3" fill="#ef4444" />
              </g>

            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}