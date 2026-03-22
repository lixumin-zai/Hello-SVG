'use client';

import { useState } from 'react';

export function BlurPlayground() {
  const [stdDeviation, setStdDeviation] = useState(5);
  const [stdDeviationY, setStdDeviationY] = useState(5);
  const [separateXY, setSeparateXY] = useState(false);
  
  // To demonstrate the filter bounding box issue
  const [filterWidth, setFilterWidth] = useState(120);
  const [filterHeight, setFilterHeight] = useState(120);
  const [filterX, setFilterX] = useState(-10);
  const [filterY, setFilterY] = useState(-10);

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Controls */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
            <h4 className="font-bold text-sm">模糊强度 (stdDeviation)</h4>
            
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-muted-foreground flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={separateXY} 
                  onChange={e => {
                    setSeparateXY(e.target.checked);
                    if (!e.target.checked) setStdDeviationY(stdDeviation);
                  }}
                  className="accent-primary"
                />
                分离 X / Y 轴
              </label>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-xs w-4">X</label>
              <input type="range" min="0" max="30" value={stdDeviation} onChange={e => {
                setStdDeviation(Number(e.target.value));
                if (!separateXY) setStdDeviationY(Number(e.target.value));
              }} className="flex-1 accent-primary" />
              <span className="text-xs w-6 text-right">{stdDeviation}</span>
            </div>

            {separateXY && (
              <div className="flex items-center gap-3">
                <label className="text-xs w-4">Y</label>
                <input type="range" min="0" max="30" value={stdDeviationY} onChange={e => setStdDeviationY(Number(e.target.value))} className="flex-1 accent-primary" />
                <span className="text-xs w-6 text-right">{stdDeviationY}</span>
              </div>
            )}
          </div>

          <div className="space-y-4 p-4 border rounded-lg bg-orange-500/10 border-orange-500/30">
            <h4 className="font-bold text-sm text-orange-600">滤镜作用域 (Filter Region)</h4>
            <p className="text-[10px] text-muted-foreground">
              这是初学者最常遇到的坑：当模糊太大时，图形边缘会被“一刀切”。这是因为滤镜的计算区域（Bounding Box）不够大！
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs">x (%)</label>
                <input type="range" min="-50" max="0" value={filterX} onChange={e => setFilterX(Number(e.target.value))} className="accent-orange-500" />
                <span className="text-[10px]">{filterX}%</span>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs">y (%)</label>
                <input type="range" min="-50" max="0" value={filterY} onChange={e => setFilterY(Number(e.target.value))} className="accent-orange-500" />
                <span className="text-[10px]">{filterY}%</span>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs">width (%)</label>
                <input type="range" min="100" max="200" value={filterWidth} onChange={e => setFilterWidth(Number(e.target.value))} className="accent-orange-500" />
                <span className="text-[10px]">{filterWidth}%</span>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs">height (%)</label>
                <input type="range" min="100" max="200" value={filterHeight} onChange={e => setFilterHeight(Number(e.target.value))} className="accent-orange-500" />
                <span className="text-[10px]">{filterHeight}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Display */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="p-3 bg-muted rounded-lg border font-mono text-[11px] text-primary whitespace-pre overflow-x-auto h-36">
{`<filter id="blur" 
  x="${filterX}%" y="${filterY}%" 
  width="${filterWidth}%" height="${filterHeight}%"
>
  <feGaussianBlur stdDeviation="${stdDeviation}${separateXY ? ` ${stdDeviationY}` : ''}" />
</filter>

<circle fill="#3b82f6" filter="url(#blur)" />`}
          </div>

          <div className="relative border-2 border-dashed border-border rounded-lg bg-grid-pattern flex-1 min-h-[300px] flex items-center justify-center bg-background">
            <svg width="100%" height="100%" viewBox="0 0 300 300">
              <defs>
                <filter id="demoBlur" x={`${filterX}%`} y={`${filterY}%`} width={`${filterWidth}%`} height={`${filterHeight}%`}>
                  <feGaussianBlur stdDeviation={separateXY ? `${stdDeviation} ${stdDeviationY}` : stdDeviation} />
                </filter>
              </defs>

              <g transform="translate(150, 150)">
                {/* Visualize the object bounding box */}
                <rect x="-50" y="-50" width="100" height="100" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeDasharray="2" />
                <text x="-50" y="-55" fontSize="10" fill="currentColor" opacity="0.4">Object Box (0%,0%,100%,100%)</text>
                
                {/* Visualize the filter bounding box */}
                <rect 
                  x={`${-50 + (filterX / 100) * 100}`} 
                  y={`${-50 + (filterY / 100) * 100}`} 
                  width={`${(filterWidth / 100) * 100}`} 
                  height={`${(filterHeight / 100) * 100}`} 
                  fill="none" stroke="#f97316" strokeWidth="1" strokeDasharray="4" 
                />
                <text 
                  x={`${-50 + (filterX / 100) * 100}`} 
                  y={`${-50 + (filterY / 100) * 100 - 5}`} 
                  fontSize="10" fill="#f97316" fontWeight="bold"
                >
                  Filter Region
                </text>

                {/* The Object */}
                <circle cx="0" cy="0" r="50" fill="#3b82f6" filter="url(#demoBlur)" />
              </g>
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
}