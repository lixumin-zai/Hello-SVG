'use client';

import { useState } from 'react';

export function MatrixPlayground() {
  // matrix(a, b, c, d, e, f)
  const [a, setA] = useState(1); // Scale X
  const [b, setB] = useState(0); // Skew Y
  const [c, setC] = useState(0); // Skew X
  const [d, setD] = useState(1); // Scale Y
  const [e, setE] = useState(0); // Translate X
  const [f, setF] = useState(0); // Translate Y

  const [order, setOrder] = useState<'TR' | 'RT'>('TR');

  // Pre-sets
  const applyPreset = (preset: string) => {
    switch (preset) {
      case 'reset':
        setA(1); setB(0); setC(0); setD(1); setE(0); setF(0);
        break;
      case 'scale2':
        setA(2); setB(0); setC(0); setD(2); setE(0); setF(0);
        break;
      case 'skew45':
        // tan(45deg) = 1
        setA(1); setB(0); setC(1); setD(1); setE(0); setF(0);
        break;
      case 'rotate45':
        // cos(45) ≈ 0.707, sin(45) ≈ 0.707
        const cos = 0.707;
        const sin = 0.707;
        setA(cos); setB(sin); setC(-sin); setD(cos); setE(0); setF(0);
        break;
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Controls */}
        <div className="space-y-6">
          <div className="p-4 border rounded-lg bg-muted/30">
            <h4 className="font-bold text-sm mb-4">终极魔法：Matrix (矩阵)</h4>
            <p className="text-xs text-muted-foreground mb-4">
              底层所有的 translate、rotate、scale，最终都会被浏览器转换为一个 6 个参数的矩阵进行运算。
            </p>
            
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono flex justify-between"><span>a (Scale X)</span> <span>{a.toFixed(2)}</span></label>
                <input type="range" min="-3" max="3" step="0.1" value={a} onChange={ev => setA(Number(ev.target.value))} className="accent-primary" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono flex justify-between"><span>b (Skew Y)</span> <span>{b.toFixed(2)}</span></label>
                <input type="range" min="-3" max="3" step="0.1" value={b} onChange={ev => setB(Number(ev.target.value))} className="accent-primary" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono flex justify-between"><span>c (Skew X)</span> <span>{c.toFixed(2)}</span></label>
                <input type="range" min="-3" max="3" step="0.1" value={c} onChange={ev => setC(Number(ev.target.value))} className="accent-primary" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono flex justify-between"><span>d (Scale Y)</span> <span>{d.toFixed(2)}</span></label>
                <input type="range" min="-3" max="3" step="0.1" value={d} onChange={ev => setD(Number(ev.target.value))} className="accent-primary" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono flex justify-between"><span>e (Translate X)</span> <span>{e.toFixed(0)}</span></label>
                <input type="range" min="-200" max="200" step="1" value={e} onChange={ev => setE(Number(ev.target.value))} className="accent-blue-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono flex justify-between"><span>f (Translate Y)</span> <span>{f.toFixed(0)}</span></label>
                <input type="range" min="-200" max="200" step="1" value={f} onChange={ev => setF(Number(ev.target.value))} className="accent-blue-500" />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
              <button onClick={() => applyPreset('reset')} className="px-2 py-1 bg-secondary text-xs rounded">重置 (单位矩阵)</button>
              <button onClick={() => applyPreset('scale2')} className="px-2 py-1 bg-secondary text-xs rounded">放大2倍</button>
              <button onClick={() => applyPreset('skew45')} className="px-2 py-1 bg-secondary text-xs rounded">倾斜 45°</button>
              <button onClick={() => applyPreset('rotate45')} className="px-2 py-1 bg-secondary text-xs rounded">旋转 45°</button>
            </div>
            
            <div className="mt-4 p-2 bg-background border rounded font-mono text-[11px] text-primary text-center">
              {`transform="matrix(${a.toFixed(2)}, ${b.toFixed(2)}, ${c.toFixed(2)}, ${d.toFixed(2)}, ${e}, ${f})"`}
            </div>
          </div>

          <div className="p-4 border rounded-lg bg-orange-500/10 border-orange-500/30">
            <h4 className="font-bold text-sm text-orange-600 mb-3">组合变换：顺序极其重要！</h4>
            <p className="text-xs text-muted-foreground mb-3">
              在 SVG 中，变换是<strong>从右向左</strong>（或由内向外）累加计算的。先平移后旋转，与先旋转后平移，结果完全不同！
            </p>
            
            <div className="flex gap-2 bg-background p-1 rounded-md border w-full">
              <button 
                onClick={() => setOrder('TR')} 
                className={`flex-1 py-1 text-xs rounded ${order === 'TR' ? 'bg-primary text-primary-foreground' : ''}`}
              >
                1. 平移 → 2. 旋转
              </button>
              <button 
                onClick={() => setOrder('RT')} 
                className={`flex-1 py-1 text-xs rounded ${order === 'RT' ? 'bg-primary text-primary-foreground' : ''}`}
              >
                1. 旋转 → 2. 平移
              </button>
            </div>
            
            <div className="mt-3 p-2 bg-background border rounded font-mono text-xs text-center text-orange-600">
              {order === 'TR' 
                ? `transform="rotate(45) translate(100, 0)"` 
                : `transform="translate(100, 0) rotate(45)"`}
            </div>
          </div>
        </div>

        {/* Display */}
        <div className="flex flex-col gap-4">
          {/* Matrix Display */}
          <div className="relative border-2 border-dashed border-border rounded-lg bg-grid-pattern h-[200px] overflow-hidden bg-background flex items-center justify-center">
            <svg width="100%" height="100%" viewBox="-150 -100 300 200">
              {/* Origin Grid */}
              <g stroke="currentColor" strokeOpacity="0.1" strokeWidth="1">
                <line x1="-1000" y1="0" x2="1000" y2="0" />
                <line x1="0" y1="-1000" x2="0" y2="1000" />
              </g>
              <circle cx="0" cy="0" r="3" fill="#ef4444" />
              
              <rect x="0" y="0" width="50" height="50" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeDasharray="2" />
              
              {/* Matrix Transformed Element */}
              <g transform={`matrix(${a}, ${b}, ${c}, ${d}, ${e}, ${f})`}>
                <rect x="0" y="0" width="50" height="50" fill="rgba(59, 130, 246, 0.5)" stroke="#2563eb" strokeWidth="2" />
                <text x="25" y="25" textAnchor="middle" dominantBaseline="middle" fontSize="10" fill="#1e3a8a">Matrix</text>
              </g>
            </svg>
          </div>

          {/* Order Display */}
          <div className="relative border-2 border-orange-500/30 border-dashed rounded-lg bg-grid-pattern h-[200px] overflow-hidden bg-background flex items-center justify-center">
            <svg width="100%" height="100%" viewBox="-100 -100 200 200">
              <g stroke="currentColor" strokeOpacity="0.1" strokeWidth="1">
                <line x1="-1000" y1="0" x2="1000" y2="0" />
                <line x1="0" y1="-1000" x2="0" y2="1000" />
              </g>
              <circle cx="0" cy="0" r="3" fill="#ef4444" />
              
              {/* Ghost for Step 1 */}
              {order === 'TR' ? (
                // Step 1: Translate (TR reads right to left: translate first, then rotate)
                <rect x="100" y="-15" width="30" height="30" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeDasharray="2" />
              ) : (
                // Step 1: Rotate (RT reads right to left: rotate first, then translate)
                <g transform="rotate(45)">
                  <rect x="0" y="-15" width="30" height="30" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeDasharray="2" />
                </g>
              )}

              {/* Final Result */}
              <g transform={order === 'TR' ? "rotate(45) translate(100, 0)" : "translate(100, 0) rotate(45)"}>
                <rect x="0" y="-15" width="30" height="30" fill="rgba(249, 115, 22, 0.8)" />
                <circle cx="0" cy="0" r="2" fill="white" />
              </g>
              
              {/* Trajectory */}
              {order === 'TR' ? (
                <path d="M 0 0 L 100 0 A 100 100 0 0 1 70.7 70.7" fill="none" stroke="#f97316" strokeDasharray="4" markerEnd="url(#arrow)" />
              ) : (
                <path d="M 0 0 L 70.7 70.7" fill="none" stroke="#f97316" strokeDasharray="4" markerEnd="url(#arrow)" />
              )}
              
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#f97316" />
                </marker>
              </defs>
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
}