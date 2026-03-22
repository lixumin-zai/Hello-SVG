'use client';

import { useState, useRef, useEffect } from 'react';

export function PathLengthVisualizer() {
  const [progress, setProgress] = useState(50);
  const [totalLength, setTotalLength] = useState(0);
  const [point, setPoint] = useState({ x: 0, y: 0 });
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setTotalLength(length);
      const pt = pathRef.current.getPointAtLength((progress / 100) * length);
      setPoint({ x: pt.x, y: pt.y });
    }
  }, [progress]);

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <div className="mb-6 flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            在路径上的位置 (进度：{progress}%)
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm font-mono bg-muted p-4 rounded-lg">
          <div>
            <span className="text-muted-foreground">getTotalLength():</span>
            <br />
            {totalLength.toFixed(2)} px
          </div>
          <div>
            <span className="text-muted-foreground">getPointAtLength({((progress / 100) * totalLength).toFixed(0)}):</span>
            <br />
            x: {point.x.toFixed(2)}, y: {point.y.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="relative aspect-video max-w-2xl mx-auto border rounded-lg bg-grid-pattern overflow-hidden">
        <svg viewBox="0 0 400 200" className="w-full h-full overflow-visible">
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" className="text-muted/20" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* The Path */}
          <path
            ref={pathRef}
            d="M 40,100 C 100,-50 250,250 360,100"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-primary"
          />
          
          {/* Highlighted segment up to current point */}
          <path
            d="M 40,100 C 100,-50 250,250 360,100"
            fill="none"
            stroke="#ef4444"
            strokeWidth="4"
            strokeDasharray={totalLength}
            strokeDashoffset={totalLength - (progress / 100) * totalLength}
          />

          {/* The Point */}
          <g transform={`translate(${point.x}, ${point.y})`}>
            <circle r="6" fill="#ef4444" />
            <circle r="12" fill="#ef4444" fillOpacity="0.2" />
            <text 
              y="-15" 
              textAnchor="middle" 
              className="text-[10px] fill-foreground font-mono"
            >
              {point.x.toFixed(0)}, {point.y.toFixed(0)}
            </text>
          </g>
        </svg>
      </div>
      <p className="text-sm text-muted-foreground mt-4 text-center">
        ▶ 拖动滑块，观察 JavaScript 如何通过 SVG API 精确计算曲线上的任意坐标。
      </p>
    </div>
  );
}
