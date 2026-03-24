'use client';

import { useState } from 'react';

export function PathLinesPlayground() {
  const [commands, setCommands] = useState<string>('M 50 50 L 200 50 L 200 150 H 50 V 50 Z');
  const [fill, setFill] = useState<string>('none');
  const [showGrid, setShowGrid] = useState<boolean>(true);

  // Parse commands to find points for visualization
  const getPoints = () => {
    try {
      const parts = commands.trim().split(/\s+/);
      const pts: Array<{x: number, y: number, cmd: string}> = [];
      let currentX = 0;
      let currentY = 0;
      
      for (let i = 0; i < parts.length; i++) {
        const cmd = parts[i].toUpperCase();
        if (cmd === 'M' || cmd === 'L') {
          if (i + 2 < parts.length) {
            currentX = parseFloat(parts[i+1]);
            currentY = parseFloat(parts[i+2]);
            pts.push({ x: currentX, y: currentY, cmd });
            i += 2;
          }
        } else if (cmd === 'H') {
          if (i + 1 < parts.length) {
            currentX = parseFloat(parts[i+1]);
            pts.push({ x: currentX, y: currentY, cmd });
            i += 1;
          }
        } else if (cmd === 'V') {
          if (i + 1 < parts.length) {
            currentY = parseFloat(parts[i+1]);
            pts.push({ x: currentX, y: currentY, cmd });
            i += 1;
          }
        } else if (cmd === 'Z') {
          pts.push({ ...pts[0], cmd: 'Z' }); // Close to first point
        }
      }
      return pts;
    } catch (e) {
      return [];
    }
  };

  const points = getPoints();

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-primary">路径数据 (d 属性)</label>
            <textarea 
              value={commands}
              onChange={(e) => setCommands(e.target.value)}
              className="w-full p-3 bg-background border rounded-md font-mono text-sm h-32 resize-none focus:ring-2 focus:ring-primary"
              spellCheck="false"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <label className="text-sm">填充色</label>
              <select 
                value={fill} 
                onChange={e => setFill(e.target.value)}
                className="p-1 bg-background border rounded-md text-sm"
              >
                <option value="none">none (无)</option>
                <option value="rgba(59, 130, 246, 0.2)">蓝色半透明</option>
                <option value="#f59e0b">橙色实心</option>
              </select>
            </div>
            
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input 
                type="checkbox" 
                checked={showGrid} 
                onChange={e => setShowGrid(e.target.checked)}
                className="accent-primary"
              />
              显示辅助网格与锚点
            </label>
          </div>

          <div className="bg-muted p-4 rounded-lg text-sm space-y-2">
            <h4 className="font-bold text-foreground mb-3">常用命令速查</h4>
            <ul className="space-y-2 text-muted-foreground font-mono">
              <li><span className="text-primary font-bold inline-block w-8">M</span> x y (MoveTo): 移动画笔，不画线</li>
              <li><span className="text-primary font-bold inline-block w-8">L</span> x y (LineTo): 画直线到指定坐标</li>
              <li><span className="text-primary font-bold inline-block w-8">H</span> x (Horizontal): 画水平线到 x 坐标</li>
              <li><span className="text-primary font-bold inline-block w-8">V</span> y (Vertical): 画垂直线到 y 坐标</li>
              <li><span className="text-primary font-bold inline-block w-8">Z</span> (ClosePath): 闭合路径回到起点</li>
            </ul>
            <p className="text-xs mt-4 pt-2 border-t border-border">
              * 提示：大写字母表示绝对坐标，小写字母表示相对坐标。试试把上面的 L 200 50 改成 l 150 0！
            </p>
          </div>
        </div>

        {/* Canvas Display */}
        <div className="relative border-2 border-dashed border-border rounded-lg h-[400px] overflow-hidden bg-background">
          <svg width="100%" height="100%" viewBox="0 0 300 300" className="absolute inset-0">
            {/* Grid */}
            {showGrid && (
              <defs>
                <pattern id="path-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeOpacity="0.1" />
                  <text x="2" y="12" fontSize="8" fill="currentColor" fillOpacity="0.3">50</text>
                </pattern>
              </defs>
            )}
            {showGrid && <rect width="100%" height="100%" fill="url(#path-grid)" />}

            {/* The Path */}
            <path 
              d={commands} 
              fill={fill} 
              stroke="currentColor" 
              strokeWidth="3" 
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Visualization Points */}
            {showGrid && points.map((pt, idx) => (
              <g key={idx}>
                <circle cx={pt.x} cy={pt.y} r="4" fill={pt.cmd === 'M' ? "#ef4444" : "#3b82f6"} />
                <text 
                  x={pt.x + 8} 
                  y={pt.y - 8} 
                  fontSize="12" 
                  fill={pt.cmd === 'M' ? "#ef4444" : "#3b82f6"}
                  fontWeight="bold"
                >
                  {pt.cmd}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}