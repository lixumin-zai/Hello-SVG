'use client';

import React, { useState } from 'react';

export function MarkerApplicationVisualizer() {
  const [useStart, setUseStart] = useState(true);
  const [useMid, setUseMid] = useState(true);
  const [useEnd, setUseEnd] = useState(true);

  return (
    <div className="flex flex-col gap-6 p-6 rounded-xl border border-border bg-card">
      <div className="text-sm text-muted-foreground flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        ▶ 勾选不同属性，观察 Marker 在多节点路径上的应用位置。
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 左侧：可视化 */}
        <div className="relative aspect-video md:aspect-square w-full rounded-lg border border-border bg-muted/30 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-20 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '20px 20px' }} />
          
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
            <defs>
              <marker
                id="app-arrow"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="8"
                markerHeight="8"
                orient="auto"
              >
                <circle cx="5" cy="5" r="5" fill="hsl(var(--primary))" />
                <path d="M 3 2 L 8 5 L 3 8 Z" fill="white" />
              </marker>
            </defs>

            {/* 路径底图辅助线，显示所有节点 */}
            <path
              d="M 30 150 L 80 50 L 130 150 L 180 50"
              fill="none"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            
            <circle cx="30" cy="150" r="3" fill="hsl(var(--muted-foreground))" />
            <circle cx="80" cy="50" r="3" fill="hsl(var(--muted-foreground))" />
            <circle cx="130" cy="150" r="3" fill="hsl(var(--muted-foreground))" />
            <circle cx="180" cy="50" r="3" fill="hsl(var(--muted-foreground))" />

            {/* 主路径，应用 marker */}
            <path
              d="M 30 150 L 80 50 L 130 150 L 180 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              markerStart={useStart ? "url(#app-arrow)" : undefined}
              markerMid={useMid ? "url(#app-arrow)" : undefined}
              markerEnd={useEnd ? "url(#app-arrow)" : undefined}
              className="text-foreground"
            />
          </svg>
        </div>

        {/* 右侧：控制 */}
        <div className="flex flex-col gap-4 justify-center">
          <div className="space-y-4 bg-muted/50 p-4 rounded-lg border border-border">
            <h3 className="font-mono text-sm font-semibold mb-4 text-primary">SVG Code</h3>
            
            <div className="font-mono text-sm flex flex-col gap-2 overflow-x-auto whitespace-pre">
              <span className="text-muted-foreground">{'<path'}</span>
              <span className="text-muted-foreground">{'  d="M 30 150 L 80 50 L 130 150 L 180 50"'}</span>
              
              <label className="flex items-center gap-2 cursor-pointer hover:bg-background/50 p-1 rounded -ml-1 transition-colors">
                <input type="checkbox" checked={useStart} onChange={e => setUseStart(e.target.checked)} className="accent-primary" />
                <span className={useStart ? "text-foreground" : "text-muted-foreground/50"}>
                  {'  marker-start="url(#arrow)"'}
                </span>
                <span className="text-xs text-muted-foreground ml-auto">起点</span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer hover:bg-background/50 p-1 rounded -ml-1 transition-colors">
                <input type="checkbox" checked={useMid} onChange={e => setUseMid(e.target.checked)} className="accent-primary" />
                <span className={useMid ? "text-foreground" : "text-muted-foreground/50"}>
                  {'  marker-mid="url(#arrow)"'}
                </span>
                <span className="text-xs text-muted-foreground ml-auto">中间节点</span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer hover:bg-background/50 p-1 rounded -ml-1 transition-colors">
                <input type="checkbox" checked={useEnd} onChange={e => setUseEnd(e.target.checked)} className="accent-primary" />
                <span className={useEnd ? "text-foreground" : "text-muted-foreground/50"}>
                  {'  marker-end="url(#arrow)"'}
                </span>
                <span className="text-xs text-muted-foreground ml-auto">终点</span>
              </label>

              <span className="text-muted-foreground">{`/>`}</span>
            </div>
          </div>
          
          <div className="bg-primary/10 text-primary border border-primary/20 rounded-lg p-3 text-sm">
            <p className="font-semibold mb-1">💡 知识点</p>
            <p><strong>marker-mid</strong> 仅在路径的“中间折点”生效，不包含起点和终点。如果只是一条简单的直线 <code>M 0 0 L 100 100</code>，它是没有 <code>marker-mid</code> 的。</p>
          </div>
        </div>
      </div>
    </div>
  );
}
