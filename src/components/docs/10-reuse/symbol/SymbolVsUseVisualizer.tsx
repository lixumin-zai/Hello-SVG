'use client';

import React, { useState } from 'react';

export function SymbolVsUseVisualizer() {
  const [size, setSize] = useState(48);

  return (
    <div className="my-6 rounded-xl border border-border bg-card p-6 shadow-sm">
      <p className="mb-4 text-sm text-muted-foreground">
        ▶ 拖动滑块改变克隆图形的尺寸。观察 &lt;use&gt; 和 &lt;symbol&gt; 的不同表现。
      </p>

      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex-1 space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <label className="text-sm font-medium">设置克隆实例的宽高</label>
              <span className="text-sm text-muted-foreground">{size}x{size}</span>
            </div>
            <input 
              type="range" 
              min="24" max="100" 
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="rounded bg-muted p-4 text-xs font-mono text-muted-foreground">
            {`<!-- 使用普通 <g> 克隆 -->`}<br/>
            <span className="text-red-400">{`<use href="#normal-g" width="${size}" height="${size}" />`}</span><br/><br/>
            
            {`<!-- 使用带 viewBox 的 <symbol> 克隆 -->`}<br/>
            <span className="text-green-400">{`<use href="#smart-symbol" width="${size}" height="${size}" />`}</span>
          </div>
        </div>

        <div className="flex flex-1 gap-4">
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="text-sm font-medium text-red-500">仅使用 &lt;g&gt; (会被裁剪)</div>
            <div className="flex-1 w-full rounded-lg bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.2] border border-dashed border-border flex justify-center items-center overflow-hidden">
              <svg width="100%" height="100%">
                <defs>
                  <g id="demo-normal-g">
                    {/* A 48x48 icon */}
                    <circle cx="24" cy="24" r="20" fill="#3b82f6" />
                    <rect x="14" y="14" width="20" height="20" fill="white" />
                  </g>
                </defs>
                {/* Wrap in a group to center it visually in the container */}
                <g transform="translate(50, 50)">
                  <rect x={-size/2} y={-size/2} width={size} height={size} fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
                  <use href="#demo-normal-g" x={-size/2} y={-size/2} width={size} height={size} />
                </g>
              </svg>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="text-sm font-medium text-green-500">使用 &lt;symbol&gt; (完美缩放)</div>
            <div className="flex-1 w-full rounded-lg bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.2] border border-dashed border-border flex justify-center items-center overflow-hidden">
              <svg width="100%" height="100%">
                <defs>
                  <symbol id="demo-smart-symbol" viewBox="0 0 48 48">
                    <circle cx="24" cy="24" r="20" fill="#22c55e" />
                    <rect x="14" y="14" width="20" height="20" fill="white" />
                  </symbol>
                </defs>
                <g transform="translate(50, 50)">
                  <rect x={-size/2} y={-size/2} width={size} height={size} fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="4 4" />
                  <use href="#demo-smart-symbol" x={-size/2} y={-size/2} width={size} height={size} />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}