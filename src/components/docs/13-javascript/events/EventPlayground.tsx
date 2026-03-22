'use client';

import { useState } from 'react';

export function EventPlayground() {
  const [logs, setLogs] = useState<string[]>([]);
  const [pointerEvents, setPointerEvents] = useState<
    'visiblePainted' | 'visibleFill' | 'visibleStroke' | 'none' | 'all'
  >('visiblePainted');

  const logEvent = (msg: string) => {
    setLogs((prev) => [msg, ...prev].slice(0, 5));
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="text-sm font-medium mb-2 block">
            设置圆形元素的 pointer-events 属性：
          </label>
          <div className="flex flex-wrap gap-2 mb-6">
            {(['visiblePainted', 'visibleFill', 'visibleStroke', 'all', 'none'] as const).map((val) => (
              <button
                key={val}
                onClick={() => setPointerEvents(val)}
                className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                  pointerEvents === val
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background hover:bg-muted'
                }`}
              >
                {val}
              </button>
            ))}
          </div>

          <div className="bg-muted rounded-lg p-4 h-40 overflow-y-auto font-mono text-xs">
            <div className="text-muted-foreground mb-2">事件日志 (Event Logs):</div>
            {logs.length === 0 && <div className="text-muted-foreground/50 italic">尚未触发事件...</div>}
            {logs.map((log, i) => (
              <div key={i} className="animate-in fade-in slide-in-from-left-2">
                &gt; {log}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <svg 
            viewBox="0 0 200 200" 
            className="w-full max-w-[200px] border border-dashed border-border rounded-lg bg-grid-pattern cursor-crosshair"
            onPointerDown={() => logEvent('画布 (SVG) 触发：pointerdown')}
          >
            <circle
              cx="100"
              cy="100"
              r="60"
              fill="rgba(59, 130, 246, 0.2)"
              stroke="#3b82f6"
              strokeWidth="20"
              pointerEvents={pointerEvents}
              onPointerEnter={(e) => {
                e.stopPropagation();
                logEvent(`圆形触发：pointerenter`);
              }}
              onPointerLeave={(e) => {
                e.stopPropagation();
                logEvent(`圆形触发：pointerleave`);
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                logEvent(`圆形触发：pointerdown`);
              }}
              className="hover:stroke-blue-400 hover:fill-blue-400/40 transition-colors"
            />
          </svg>
          <p className="text-xs text-muted-foreground mt-4 text-center">
            ▶ 尝试把鼠标悬停在圆形的<b>边缘（描边）</b>或<b>内部（填充）</b>并点击。<br/>
            注意不同 <code>pointer-events</code> 下响应区域的区别。
          </p>
        </div>
      </div>
    </div>
  );
}
