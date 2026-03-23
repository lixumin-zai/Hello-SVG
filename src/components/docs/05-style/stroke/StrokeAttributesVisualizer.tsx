'use client';

import React from 'react';

export function StrokeAttributesVisualizer() {
  return (
    <div className="my-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LinecapCard />
        <LinejoinCard />
      </div>
    </div>
  );
}

function LinecapCard() {
  const caps = [
    { type: 'butt', desc: '切平，停在端点' },
    { type: 'round', desc: '圆角，超出半个线宽' },
    { type: 'square', desc: '方角，超出半个线宽' }
  ] as const;

  return (
    <div className="p-5 rounded-xl border border-border bg-card flex flex-col">
      <h3 className="text-base font-semibold m-0 mb-1">线端形状 (stroke-linecap)</h3>
      <p className="text-xs text-muted-foreground mb-4 m-0">决定开放路径端点的样式。红线代表实际几何路径。</p>
      
      <div className="flex-1 flex flex-col gap-6 justify-center">
        {caps.map((cap) => (
          <div key={cap.type} className="flex items-center gap-4">
            <div className="w-16 text-right">
              <code className="text-xs">{cap.type}</code>
            </div>
            <div className="flex-1 h-12 relative flex items-center">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 20">
                {/* SVG Stroke */}
                <line 
                  x1="20" y1="10" 
                  x2="80" y2="10" 
                  stroke="currentColor" 
                  strokeWidth="12" 
                  strokeLinecap={cap.type} 
                  className="text-primary/80"
                />
                {/* Actual geometric path (red line) */}
                <line 
                  x1="20" y1="10" 
                  x2="80" y2="10" 
                  stroke="red" 
                  strokeWidth="1" 
                  className="pointer-events-none"
                />
                {/* End points */}
                <circle cx="20" cy="10" r="1.5" fill="red" />
                <circle cx="80" cy="10" r="1.5" fill="red" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LinejoinCard() {
  const joins = [
    { type: 'miter', desc: '尖角延伸相交' },
    { type: 'round', desc: '平滑圆弧连接' },
    { type: 'bevel', desc: '直接切平拐角' }
  ] as const;

  return (
    <div className="p-5 rounded-xl border border-border bg-card flex flex-col">
      <h3 className="text-base font-semibold m-0 mb-1">转角形状 (stroke-linejoin)</h3>
      <p className="text-xs text-muted-foreground mb-4 m-0">决定两条线相交时的拐角样式。</p>
      
      <div className="flex-1 flex justify-between px-2 items-center">
        {joins.map((join) => (
          <div key={join.type} className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 relative mt-4">
              <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 50 50">
                {/* SVG Stroke */}
                <polyline 
                  points="10,40 25,10 40,40" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="12" 
                  strokeLinejoin={join.type}
                  className="text-primary/80"
                />
                {/* Geometric path */}
                <polyline 
                  points="10,40 25,10 40,40" 
                  fill="none" 
                  stroke="red" 
                  strokeWidth="1" 
                  className="pointer-events-none" 
                />
                <circle cx="25" cy="10" r="1.5" fill="red" />
              </svg>
            </div>
            <code className="text-xs">{join.type}</code>
          </div>
        ))}
      </div>
    </div>
  );
}
