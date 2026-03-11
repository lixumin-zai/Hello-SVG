'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';

interface Point {
  x: number;
  y: number;
}

export function PathBuilder() {
  const [points, setPoints] = useState<Point[]>([{ x: 20, y: 80 }]);
  const [isClosed, setIsClosed] = useState(false);
  const [commandType, setCommandType] = useState<'absolute' | 'relative'>('absolute');

  const addPoint = (x: number, y: number) => {
    setPoints([...points, { x, y }]);
  };

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round((e.clientX - rect.left) / rect.width * 100);
    const y = Math.round((e.clientY - rect.top) / rect.height * 100);
    addPoint(x, y);
  };

  const reset = () => {
    setPoints([{ x: 20, y: 80 }]);
    setIsClosed(false);
  };

  const generateD = () => {
    if (points.length === 0) return '';
    
    if (commandType === 'absolute') {
      let d = `M ${points[0].x} ${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
        d += ` L ${points[i].x} ${points[i].y}`;
      }
      if (isClosed) d += ' Z';
      return d;
    } else {
      // Relative
      let d = `M ${points[0].x} ${points[0].y}`;
      let cx = points[0].x;
      let cy = points[0].y;
      
      for (let i = 1; i < points.length; i++) {
        const dx = points[i].x - cx;
        const dy = points[i].y - cy;
        d += ` l ${dx} ${dy}`;
        cx = points[i].x;
        cy = points[i].y;
      }
      if (isClosed) d += ' z';
      return d;
    }
  };

  return (
    <div className="my-8 flex flex-col gap-6 rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-lg">Linear Path Builder</h3>
        <p className="text-sm text-muted-foreground">
          Click on the canvas to add points. See how "L" (LineTo) commands are generated.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
            <h4 className="font-medium text-sm border-b pb-2 mb-2">Options</h4>
            
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input 
                  type="checkbox" 
                  checked={isClosed}
                  onChange={(e) => setIsClosed(e.target.checked)}
                  className="rounded border-primary"
                />
                Close Path (Z)
              </label>

              <div className="flex bg-muted rounded p-1">
                <button
                  onClick={() => setCommandType('absolute')}
                  className={cn(
                    "px-3 py-1 text-xs rounded transition-colors",
                    commandType === 'absolute' ? "bg-white shadow text-primary" : "text-muted-foreground"
                  )}
                >
                  Absolute (M/L)
                </button>
                <button
                  onClick={() => setCommandType('relative')}
                  className={cn(
                    "px-3 py-1 text-xs rounded transition-colors",
                    commandType === 'relative' ? "bg-white shadow text-primary" : "text-muted-foreground"
                  )}
                >
                  Relative (m/l)
                </button>
              </div>
            </div>

            <button
              onClick={reset}
              className="px-4 py-2 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded border border-red-200 transition-colors"
            >
              Reset Points
            </button>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-sm">Generated Path Data (d)</h4>
            <div className="rounded bg-zinc-950 p-4 text-sm text-zinc-50 font-mono break-all">
              {generateD()}
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex flex-col gap-2">
          <div className="relative aspect-square w-full overflow-hidden rounded border bg-white shadow-inner cursor-crosshair group">
            <svg
              viewBox="0 0 100 100"
              className="h-full w-full block"
              onClick={handleSvgClick}
            >
              {/* Grid */}
              <defs>
                <pattern id="grid-path" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="gray" strokeWidth="0.5" strokeOpacity="0.2"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid-path)" pointerEvents="none" />
              
              {/* The Path */}
              <path
                d={generateD()}
                fill={isClosed ? "rgba(59, 130, 246, 0.2)" : "none"}
                stroke="#3b82f6"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                pointerEvents="none"
              />

              {/* Points */}
              {points.map((p, i) => (
                <g key={i} pointerEvents="none">
                  <circle cx={p.x} cy={p.y} r="1.5" fill="white" stroke="#3b82f6" strokeWidth="1" />
                  <text x={p.x + 2} y={p.y - 2} fontSize="4" fill="#666">
                    {i === 0 ? 'Start' : i}
                  </text>
                </g>
              ))}

              {/* Ghost Line (Hint) */}
              {/* This would require tracking mouse move, skipping for simplicity but good for UX */}
            </svg>
            <div className="absolute top-2 right-2 text-[10px] text-muted-foreground bg-white/80 px-2 py-1 rounded pointer-events-none">
              Click to add points
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
