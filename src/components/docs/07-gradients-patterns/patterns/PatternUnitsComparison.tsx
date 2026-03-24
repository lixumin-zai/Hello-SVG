'use client';
import { useState } from 'react';

const OPTIONS = [
  {
    id: 'userSpaceOnUse',
    label: 'userSpaceOnUse (推荐)',
    color: 'emerald',
    icon: '📏',
    desc: '尺寸相对于整个 SVG 画布（像素）。width="20" 就是 20px。',
    width: 20,
    widthStr: '"20"',
    code: `<pattern id="p1" width="20" height="20" \n  patternUnits="userSpaceOnUse">\n  <circle cx="10" cy="10" r="5" fill="blue" />\n</pattern>`,
  },
  {
    id: 'objectBoundingBox',
    label: 'objectBoundingBox (默认)',
    color: 'amber',
    icon: '📦',
    desc: '尺寸相对于目标图形的百分比。width="0.1" 代表图形宽度的 10%。在 200x200 的矩形上相当于 20px。',
    width: 0.1,
    widthStr: '"0.1"',
    code: `<pattern id="p2" width="0.1" height="0.1" \n  patternUnits="objectBoundingBox">\n  <circle cx="10" cy="10" r="5" fill="blue" />\n</pattern>`,
  },
  {
    id: 'objectBoundingBox-error',
    label: '常见错误',
    color: 'rose',
    icon: '⚠️',
    desc: '忘记设置 patternUnits，直接写了像素值 width="20"。图案瓷砖被放大了 20 倍（4000px），导致图案无法平铺！',
    width: 20,
    widthStr: '"20"',
    code: `<pattern id="p3" width="20" height="20" \n  patternUnits="objectBoundingBox"> <!-- 默认 -->\n  <circle cx="10" cy="10" r="5" fill="blue" />\n</pattern>`,
  }
];

export function PatternUnitsComparison() {
  const [active, setActive] = useState('userSpaceOnUse');
  const current = OPTIONS.find(o => o.id === active)!;
  const colorMap: Record<string, string> = { 
    emerald: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30',
    amber: 'bg-amber-500/10 text-amber-600 border-amber-500/30',
    rose: 'bg-rose-500/10 text-rose-500 border-rose-500/30'
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <p className="text-sm text-muted-foreground mb-4">▶ 切换查看 <code>patternUnits</code> 不同取值的影响</p>

      {/* 切换按钮 */}
      <div className="flex flex-wrap gap-2 mb-6 p-1 bg-muted rounded-lg w-fit">
        {OPTIONS.map(o => (
          <button key={o.id}
            onClick={() => setActive(o.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              active === o.id
                ? 'bg-card shadow text-foreground scale-105'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {o.icon} {o.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* 左：说明与代码 */}
        <div className="flex flex-col gap-4">
          <div className={`rounded-lg border p-4 transition-all duration-300 ${colorMap[current.color]}`}>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              {current.icon} 表现行为
            </h4>
            <p className="text-sm">{current.desc}</p>
          </div>
          <pre className="rounded-lg bg-muted p-4 text-sm font-mono overflow-x-auto transition-all duration-300 border border-border flex-1">
            {current.code}
          </pre>
        </div>

        {/* 右：可视化预览 */}
        <div className="rounded-lg border-2 border-dashed border-border bg-background p-4 flex flex-col items-center justify-center relative min-h-[250px]">
          <p className="text-xs text-muted-foreground absolute top-2 left-2">目标图形：200x200 矩形</p>
          <div className="relative w-[200px] h-[200px] shadow-sm">
            <svg width="100%" height="100%" className="border border-foreground/20 rounded">
              <defs>
                <pattern 
                  id={`pattern-${active}`} 
                  width={current.width} 
                  height={current.width} 
                  patternUnits={active.startsWith('objectBoundingBox') ? 'objectBoundingBox' : 'userSpaceOnUse'}
                >
                  <rect width="100%" height="100%" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
                  <circle cx="10" cy="10" r="5" fill="#3b82f6" />
                </pattern>
              </defs>
              <rect width="200" height="200" fill={`url(#pattern-${active})`} />
            </svg>
            
            {active === 'objectBoundingBox-error' && (
              <div className="absolute inset-0 bg-rose-500/10 flex items-center justify-center p-4 text-center pointer-events-none">
                <span className="bg-background/90 text-rose-500 text-xs font-bold p-2 rounded shadow-sm mt-16">
                  ⚠️ 瓷砖尺寸变成了 4000x4000！<br/>虽然左上角有一个蓝点，但完全失去了平铺效果。
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
