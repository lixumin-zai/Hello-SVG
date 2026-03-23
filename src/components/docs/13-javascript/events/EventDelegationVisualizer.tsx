'use client';

import React, { useState, MouseEvent as ReactMouseEvent } from 'react';

export function EventDelegationVisualizer() {
  const [logs, setLogs] = useState<{id: number, msg: string, target: string, currentTarget: string}[]>([]);
  const [logCounter, setLogCounter] = useState(0);

  const handleGroupClick = (e: ReactMouseEvent<SVGGElement>) => {
    // 获取实际被点击的元素 (target)
    const target = e.target as SVGElement;
    const currentTarget = e.currentTarget as SVGElement;
    
    let targetName = target.tagName;
    if (target.id) targetName += `#${target.id}`;
    
    let currentTargetName = currentTarget.tagName;
    if (currentTarget.id) currentTargetName += `#${currentTarget.id}`;

    // 如果点击的是 path（省份），则高亮它
    if (target.tagName.toLowerCase() === 'path') {
      const provinceName = target.getAttribute('data-name') || '未知省份';
      
      setLogs(prev => [{
        id: logCounter,
        msg: `捕获点击！高亮 [${provinceName}]`,
        target: targetName,
        currentTarget: currentTargetName
      }, ...prev].slice(0, 5));
      setLogCounter(c => c + 1);

      // 重置所有省份颜色
      const paths = currentTarget.querySelectorAll('path');
      paths.forEach(p => {
        p.style.fill = 'hsl(var(--muted))';
        p.style.stroke = 'hsl(var(--background))';
      });

      // 设置当前省份颜色
      (target as SVGPathElement).style.fill = 'hsl(var(--primary))';
    } else {
      setLogs(prev => [{
        id: logCounter,
        msg: `点击了空白组区域，无操作`,
        target: targetName,
        currentTarget: currentTargetName
      }, ...prev].slice(0, 5));
      setLogCounter(c => c + 1);
    }
  };

  const handleClear = () => {
    setLogs([]);
    const paths = document.querySelectorAll('.map-path');
    paths.forEach(p => {
      (p as SVGPathElement).style.fill = 'hsl(var(--muted))';
    });
  };

  return (
    <div className="flex flex-col gap-6 p-6 rounded-xl border border-border bg-card my-6">
      <div className="text-sm text-muted-foreground flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        ▶ 点击下方的“假地图”色块，观察事件是如何冒泡到父级 &lt;g&gt; 上并被统一处理的（事件委托）。
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 左侧：可视化 */}
        <div className="relative aspect-video w-full rounded-lg border border-border bg-muted/30 overflow-hidden flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
            {/* 只在父级 <g> 绑定一个 onClick 事件 */}
            <g id="map-group" onClick={handleGroupClick} className="cursor-pointer">
              {/* 背景框，用于接收空白区域点击 */}
              <rect width="200" height="200" fill="transparent" />
              
              {/* 模拟地图省份的 path */}
              <path 
                id="province-a"
                className="map-path transition-colors duration-300"
                d="M 20 20 L 100 20 L 80 80 L 20 100 Z" 
                fill="hsl(var(--muted))" 
                stroke="hsl(var(--background))" 
                strokeWidth="2"
                data-name="A省"
              />
              <path 
                id="province-b"
                className="map-path transition-colors duration-300"
                d="M 100 20 L 180 20 L 180 100 L 120 120 L 80 80 Z" 
                fill="hsl(var(--muted))" 
                stroke="hsl(var(--background))" 
                strokeWidth="2"
                data-name="B省"
              />
              <path 
                id="province-c"
                className="map-path transition-colors duration-300"
                d="M 20 100 L 80 80 L 120 120 L 100 180 L 20 180 Z" 
                fill="hsl(var(--muted))" 
                stroke="hsl(var(--background))" 
                strokeWidth="2"
                data-name="C省"
              />
              <path 
                id="province-d"
                className="map-path transition-colors duration-300"
                d="M 120 120 L 180 100 L 180 180 L 100 180 Z" 
                fill="hsl(var(--muted))" 
                stroke="hsl(var(--background))" 
                strokeWidth="2"
                data-name="D省"
              />
            </g>
          </svg>
        </div>

        {/* 右侧：日志与代码 */}
        <div className="flex flex-col gap-4 justify-center">
          <div className="bg-muted/50 p-4 rounded-lg border border-border h-[200px] flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-mono text-sm font-semibold">Event Logs</h3>
              <button onClick={handleClear} className="text-xs text-muted-foreground hover:text-foreground">清除</button>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-2 font-mono text-xs">
              {logs.length === 0 && <div className="text-muted-foreground/50 italic">请点击左侧地图区块...</div>}
              {logs.map((log) => (
                <div key={log.id} className="p-2 bg-background border border-border rounded animate-in fade-in slide-in-from-left-2">
                  <div className="text-primary font-bold mb-1">{log.msg}</div>
                  <div className="grid grid-cols-[80px_1fr] gap-1 text-muted-foreground">
                    <span>target:</span> <span className="text-foreground">{log.target}</span>
                    <span>currentTarget:</span> <span className="text-foreground">{log.currentTarget}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary/10 text-primary border border-primary/20 rounded-lg p-3 text-xs font-mono">
            <p className="mb-1 font-semibold text-muted-foreground uppercase">JavaScript 核心逻辑：</p>
{`mapGroup.addEventListener('click', (e) => {
  // target 是你真正点到的图形 (比如 path)
  // currentTarget 是绑定事件的容器 (g)
  if (e.target.tagName === 'path') {
    e.target.style.fill = 'red';
  }
});`}
          </div>
        </div>
      </div>
    </div>
  );
}
