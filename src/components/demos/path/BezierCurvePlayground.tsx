'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/cn';

interface Point {
  x: number;
  y: number;
}

export function BezierCurvePlayground() {
  const [curveType, setCurveType] = useState<'quadratic' | 'cubic'>('quadratic');
  
  // Start and End Points
  const [start, setStart] = useState<Point>({ x: 10, y: 80 });
  const [end, setEnd] = useState<Point>({ x: 90, y: 80 });
  
  // Control Points
  const [cp1, setCp1] = useState<Point>({ x: 50, y: 20 });
  const [cp2, setCp2] = useState<Point>({ x: 80, y: 20 }); // Only for cubic

  const [draggingPoint, setDraggingPoint] = useState<string | null>(null);

  const handleMouseDown = (pointName: string) => {
    setDraggingPoint(pointName);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!draggingPoint) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.min(100, Math.max(0, Math.round((e.clientX - rect.left) / rect.width * 100)));
    const y = Math.min(100, Math.max(0, Math.round((e.clientY - rect.top) / rect.height * 100)));

    if (draggingPoint === 'start') setStart({ x, y });
    else if (draggingPoint === 'end') setEnd({ x, y });
    else if (draggingPoint === 'cp1') setCp1({ x, y });
    else if (draggingPoint === 'cp2') setCp2({ x, y });
  };

  const handleMouseUp = () => {
    setDraggingPoint(null);
  };

  const getD = () => {
    if (curveType === 'quadratic') {
      return `M ${start.x} ${start.y} Q ${cp1.x} ${cp1.y} ${end.x} ${end.y}`;
    } else {
      return `M ${start.x} ${start.y} C ${cp1.x} ${cp1.y} ${cp2.x} ${cp2.y} ${end.x} ${end.y}`;
    }
  };

  return (
    <div className="my-8 flex flex-col gap-6 rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-lg">Bezier Curve Playground</h3>
        <p className="text-sm text-muted-foreground">
          Drag the control points (red/green) to reshape the curve.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div className="flex bg-muted rounded p-1 mb-4">
            <button
              onClick={() => setCurveType('quadratic')}
              className={cn(
                "flex-1 px-3 py-1.5 text-sm font-medium rounded transition-colors",
                curveType === 'quadratic' ? "bg-white shadow text-primary" : "text-muted-foreground hover:bg-white/50"
              )}
            >
              Quadratic (Q) - 1 Control Point
            </button>
            <button
              onClick={() => setCurveType('cubic')}
              className={cn(
                "flex-1 px-3 py-1.5 text-sm font-medium rounded transition-colors",
                curveType === 'cubic' ? "bg-white shadow text-primary" : "text-muted-foreground hover:bg-white/50"
              )}
            >
              Cubic (C) - 2 Control Points
            </button>
          </div>

          <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
            <h4 className="font-medium text-sm border-b pb-2 mb-2">Coordinates</h4>
            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div>Start: ({start.x}, {start.y})</div>
              <div>End: ({end.x}, {end.y})</div>
              <div className="text-red-500">Control 1: ({cp1.x}, {cp1.y})</div>
              {curveType === 'cubic' && (
                <div className="text-green-600">Control 2: ({cp2.x}, {cp2.y})</div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-sm">Path Data</h4>
            <div className="rounded bg-zinc-950 p-4 text-sm text-zinc-50 font-mono break-all">
              {`<path d="${getD()}" fill="none" stroke="black" />`}
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex flex-col gap-2">
          <div className="relative aspect-square w-full overflow-hidden rounded border bg-white shadow-inner select-none touch-none">
            <svg
              viewBox="0 0 100 100"
              className="h-full w-full block"
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* Grid */}
              <defs>
                <pattern id="grid-bezier" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="gray" strokeWidth="0.5" strokeOpacity="0.2"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid-bezier)" pointerEvents="none" />
              
              {/* Construction Lines (Visual Guide) */}
              <path 
                d={`M ${start.x} ${start.y} L ${cp1.x} ${cp1.y}`} 
                stroke="red" strokeWidth="0.5" strokeDasharray="2" 
                pointerEvents="none"
              />
              {curveType === 'quadratic' ? (
                <path 
                  d={`M ${cp1.x} ${cp1.y} L ${end.x} ${end.y}`} 
                  stroke="red" strokeWidth="0.5" strokeDasharray="2" 
                  pointerEvents="none"
                />
              ) : (
                <>
                  <path 
                    d={`M ${end.x} ${end.y} L ${cp2.x} ${cp2.y}`} 
                    stroke="green" strokeWidth="0.5" strokeDasharray="2" 
                    pointerEvents="none"
                  />
                  <path 
                    d={`M ${cp1.x} ${cp1.y} L ${cp2.x} ${cp2.y}`} 
                    stroke="gray" strokeWidth="0.5" strokeDasharray="2" 
                    pointerEvents="none"
                  />
                </>
              )}

              {/* The Curve */}
              <path
                d={getD()}
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                pointerEvents="none"
              />

              {/* Handles */}
              <g cursor="move">
                {/* Start Point */}
                <circle 
                  cx={start.x} cy={start.y} r="3" 
                  fill="white" stroke="black" strokeWidth="1.5"
                  onMouseDown={() => handleMouseDown('start')}
                />
                
                {/* End Point */}
                <circle 
                  cx={end.x} cy={end.y} r="3" 
                  fill="white" stroke="black" strokeWidth="1.5"
                  onMouseDown={() => handleMouseDown('end')}
                />
                
                {/* Control Point 1 */}
                <rect 
                  x={cp1.x - 3} y={cp1.y - 3} width="6" height="6" 
                  fill="red" fillOpacity="0.2" stroke="red" strokeWidth="1.5"
                  onMouseDown={() => handleMouseDown('cp1')}
                />
                <text x={cp1.x + 4} y={cp1.y} fontSize="4" fill="red" pointerEvents="none">CP1</text>

                {/* Control Point 2 (Cubic only) */}
                {curveType === 'cubic' && (
                  <>
                    <rect 
                      x={cp2.x - 3} y={cp2.y - 3} width="6" height="6" 
                      fill="green" fillOpacity="0.2" stroke="green" strokeWidth="1.5"
                      onMouseDown={() => handleMouseDown('cp2')}
                    />
                    <text x={cp2.x + 4} y={cp2.y} fontSize="4" fill="green" pointerEvents="none">CP2</text>
                  </>
                )}
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
