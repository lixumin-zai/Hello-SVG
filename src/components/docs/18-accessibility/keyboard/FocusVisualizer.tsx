'use client';

import { useState } from 'react';

export function FocusVisualizer() {
  const [focusState, setFocusState] = useState<string | null>(null);
  const [clickedNodes, setClickedNodes] = useState<string[]>([]);

  const handleAction = (nodeId: string) => {
    setClickedNodes(prev => [...prev, nodeId].slice(-3));
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-sm font-bold mb-4">使用 Tab 键导航</h3>
          <p className="text-xs text-muted-foreground mb-6">
            点击下方区域，然后按键盘上的 <b>Tab</b> 键和 <b>Enter</b> 键，体验如何让 SVG 内部的图形变得像按钮一样可操作。
          </p>

          <div 
            className="border-2 border-dashed border-border rounded-lg p-6 bg-slate-50 dark:bg-slate-900 flex justify-center"
            tabIndex={-1} // Catch focus initially
          >
            <svg viewBox="0 0 200 80" className="w-full max-w-[250px]">
              <defs>
                <style>
                  {`
                    .interactive-node {
                      transition: all 0.2s ease;
                      cursor: pointer;
                    }
                    /* 这是让键盘导航可见的关键 CSS！ */
                    .interactive-node:focus-visible {
                      outline: none;
                      stroke: #3b82f6;
                      stroke-width: 4px;
                      stroke-dasharray: 4;
                      animation: dash 1s linear infinite;
                    }
                    @keyframes dash {
                      to { stroke-dashoffset: -8; }
                    }
                  `}
                </style>
              </defs>

              {/* Node 1 */}
              <g 
                className="interactive-node"
                tabIndex={0}
                role="button"
                aria-label="节点 A"
                onFocus={() => setFocusState('A')}
                onBlur={() => setFocusState(null)}
                onClick={() => handleAction('A')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleAction('A');
                  }
                }}
              >
                <circle cx="40" cy="40" r="30" fill={focusState === 'A' ? '#bfdbfe' : 'white'} stroke="#94a3b8" strokeWidth="2" />
                <text x="40" y="45" textAnchor="middle" fill="#1e293b" fontWeight="bold">A</text>
              </g>

              {/* Connecting Line */}
              <line x1="70" y1="40" x2="130" y2="40" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4" />

              {/* Node 2 */}
              <g 
                className="interactive-node"
                tabIndex={0}
                role="button"
                aria-label="节点 B"
                onFocus={() => setFocusState('B')}
                onBlur={() => setFocusState(null)}
                onClick={() => handleAction('B')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleAction('B');
                  }
                }}
              >
                <circle cx="160" cy="40" r="30" fill={focusState === 'B' ? '#bfdbfe' : 'white'} stroke="#94a3b8" strokeWidth="2" />
                <text x="160" y="45" textAnchor="middle" fill="#1e293b" fontWeight="bold">B</text>
              </g>
            </svg>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="bg-muted rounded-lg p-4 font-mono text-xs flex-1 flex flex-col">
            <div className="text-muted-foreground mb-4 border-b border-border pb-2">操作日志：</div>
            
            <div className="space-y-2 flex-1">
              <div className="text-blue-500">
                当前焦点: {focusState ? `节点 [${focusState}]` : <span className="text-muted-foreground italic">未聚焦 SVG 内元素</span>}
              </div>
              
              <div className="mt-4 pt-4 border-t border-border border-dashed">
                <div className="text-muted-foreground mb-2">触发 (Enter/点击) 记录:</div>
                {clickedNodes.length === 0 && <div className="italic opacity-50">暂无记录</div>}
                {clickedNodes.map((node, i) => (
                  <div key={i} className="text-green-600 animate-in slide-in-from-left-2">
                    &gt; 执行了 节点 {node} 的动作
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-background rounded border border-border">
              <p className="text-muted-foreground font-sans">
                <b>关键实现：</b><br/>
                1. <code>tabindex="0"</code> 使 <code>&lt;g&gt;</code> 可被键盘选中<br/>
                2. <code>role="button"</code> 告诉读屏器这是一个按钮<br/>
                3. CSS <code>:focus-visible</code> 提供可见的高亮虚线框
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
