'use client';

import React, { useState } from 'react';
import { ArrowRight, ArrowDown, ArrowUp, MousePointer2 } from 'lucide-react';

export function CoordinateSystem() {
  const [system, setSystem] = useState<'svg' | 'cartesian'>('svg');
  const [yPos, setYPos] = useState(50);

  const isSvg = system === 'svg';

  return (
    <div className="my-6 rounded-lg border border-border bg-card p-6 shadow-sm">
      <div className="mb-4 text-sm text-muted-foreground flex items-center gap-2">
        <MousePointer2 className="h-4 w-4" />
        <span>▶ 拖动滑块或切换坐标系，观察 Y 轴方向差异</span>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Controls */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <div className="flex gap-2 p-1 bg-muted rounded-md w-fit">
            <button
              onClick={() => setSystem('svg')}
              className={`px-3 py-1.5 text-sm font-medium rounded-sm transition-colors ${
                isSvg ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              SVG 坐标系 (Web)
            </button>
            <button
              onClick={() => setSystem('cartesian')}
              className={`px-3 py-1.5 text-sm font-medium rounded-sm transition-colors ${
                !isSvg ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              数学坐标系
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Y 轴坐标值: {yPos}</span>
              <span className="text-muted-foreground">(增加 Y 值)</span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              value={yPos}
              onChange={(e) => setYPos(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          <div className="text-sm space-y-2 mt-4 text-muted-foreground">
            {isSvg ? (
              <>
                <p><strong>原点 (0,0):</strong> 左上角</p>
                <p><strong>X 轴:</strong> 向右为正</p>
                <p><strong>Y 轴:</strong> 向下为正</p>
                <p className="text-primary mt-2">✨ 提示: 在 SVG 中"下落"意味着增加 Y 值。</p>
              </>
            ) : (
              <>
                <p><strong>原点 (0,0):</strong> 左下角 (或中心)</p>
                <p><strong>X 轴:</strong> 向右为正</p>
                <p><strong>Y 轴:</strong> 向上为正</p>
                <p className="text-destructive mt-2">⚠️ 注意: 这与屏幕渲染不同。</p>
              </>
            )}
          </div>
        </div>

        {/* Visualizer */}
        <div className="w-full md:w-2/3 relative h-64 bg-background border border-border rounded-md overflow-hidden flex items-center justify-center">
          {/* Grid background */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          />

          {/* Axes */}
          <div className={`absolute border-primary ${isSvg ? 'top-0 left-0 border-l-2 border-t-2' : 'bottom-0 left-0 border-l-2 border-b-2'} w-full h-full opacity-50 pointer-events-none`}>
            {/* Origin label */}
            <div className={`absolute text-xs font-mono text-primary bg-background/80 px-1 ${isSvg ? 'top-1 left-1' : 'bottom-1 left-1'}`}>
              (0,0)
            </div>

            {/* X Axis Arrow */}
            <div className={`absolute flex items-center text-primary ${isSvg ? 'top-0 left-full -translate-x-full' : 'bottom-0 left-full -translate-x-full -translate-y-1/2'}`}>
              <span className="text-xs font-mono mr-1">X</span>
              <ArrowRight className="h-4 w-4" />
            </div>

            {/* Y Axis Arrow */}
            {isSvg ? (
              <div className="absolute top-full left-0 -translate-y-full flex flex-col items-center text-primary -translate-x-1/2">
                <span className="text-xs font-mono mb-1">Y</span>
                <ArrowDown className="h-4 w-4" />
              </div>
            ) : (
              <div className="absolute top-0 left-0 flex flex-col items-center text-primary -translate-x-1/2">
                <ArrowUp className="h-4 w-4" />
                <span className="text-xs font-mono mt-1">Y</span>
              </div>
            )}
          </div>

          {/* The Object */}
          <div 
            className="absolute w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-200 ease-out"
            style={{
              left: '50%',
              transform: 'translateX(-50%)',
              top: isSvg ? `${yPos}%` : `${100 - yPos}%`,
              marginTop: '-24px'
            }}
          >
            <div className="flex flex-col items-center leading-tight">
              <span className="text-[10px] opacity-80">y={yPos}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
