'use client';
import { useState } from 'react';

const OPTIONS = [
  {
    id: 'css',
    label: 'CSS 变换',
    color: 'blue',
    icon: '🌐',
    desc: 'HTML 元素的默认行为',
    pros: ['默认以元素中心点 (50% 50%) 旋转', '直观符合人类直觉'],
    cons: ['依赖外部样式表或内联 style'],
    code: `<div style="transform: rotate(45deg);"></div>`,
    visual: 'rotate-css'
  },
  {
    id: 'svg',
    label: 'SVG 变换',
    color: 'orange',
    icon: '🎨',
    desc: 'SVG 图形的默认行为',
    pros: ['不依赖 CSS，纯属性控制', '代码精简，易于程序生成'],
    cons: ['永远以画布左上角 (0,0) 为原点！', '初学者极其容易踩坑'],
    code: `<rect transform="rotate(45)" />`,
    visual: 'rotate-svg'
  },
];

export function CssVsSvgTransform() {
  const [active, setActive] = useState('svg');
  const current = OPTIONS.find(o => o.id === active)!;
  const colorMap: Record<string, string> = { 
    blue: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
    orange: 'bg-orange-500/10 text-orange-500 border-orange-500/30' 
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <p className="text-sm text-muted-foreground mb-4 flex items-center gap-1">
        <span>▶</span> 切换查看 CSS 与 SVG 旋转行为的核心差异
      </p>

      {/* 切换按钮 */}
      <div className="flex gap-2 mb-6 p-1 bg-muted rounded-lg w-fit">
        {OPTIONS.map(o => (
          <button key={o.id}
            onClick={() => setActive(o.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              active === o.id
                ? 'bg-card shadow text-foreground scale-105'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span>{o.icon}</span> {o.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className={`rounded-lg border p-4 transition-all duration-300 ${colorMap[current.color]}`}>
            <h4 className="font-semibold mb-2 text-sm">{current.desc}</h4>
            <div className="space-y-1 mt-3">
              {current.pros.map(p => <p key={p} className="text-sm">✅ {p}</p>)}
              {current.cons.map(c => <p key={c} className="text-sm opacity-80">⚠️ {c}</p>)}
            </div>
          </div>
          
          <pre className="rounded-lg bg-muted p-4 text-sm font-mono overflow-x-auto transition-all duration-300 border border-border">
            {current.code}
          </pre>
        </div>

        {/* 可视化演示 */}
        <div className="rounded-lg border border-border bg-background overflow-hidden relative h-48 flex items-center justify-center">
          <svg width="100%" height="100%" viewBox="-50 -50 200 200" className="overflow-visible">
            {/* 网格和原点 */}
            <g stroke="currentColor" strokeOpacity="0.1" strokeWidth="1">
              <line x1="-1000" y1="0" x2="1000" y2="0" />
              <line x1="0" y1="-1000" x2="0" y2="1000" />
            </g>
            <circle cx="0" cy="0" r="3" fill="#ef4444" />
            <text x="5" y="-5" fontSize="10" fill="#ef4444">(0,0) 画布原点</text>

            {/* 目标图形原始位置轮廓 */}
            <rect x="50" y="50" width="40" height="40" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeDasharray="2" />
            
            {/* 旋转动画展示 */}
            {current.id === 'css' ? (
              <g transform="translate(50, 50)">
                <rect 
                  x="0" y="0" width="40" height="40" 
                  fill="rgba(59, 130, 246, 0.5)" stroke="#3b82f6" strokeWidth="2"
                  style={{ transformOrigin: '20px 20px', animation: 'spin-center 4s linear infinite' }}
                />
                <circle cx="20" cy="20" r="3" fill="#3b82f6" />
                <text x="20" y="60" fontSize="10" fill="#3b82f6" textAnchor="middle">中心点旋转</text>
              </g>
            ) : (
              <g style={{ animation: 'spin-origin 4s linear infinite' }}>
                <rect 
                  x="50" y="50" width="40" height="40" 
                  fill="rgba(249, 115, 22, 0.5)" stroke="#f97316" strokeWidth="2"
                />
                <line x1="0" y1="0" x2="50" y2="50" stroke="#f97316" strokeDasharray="2" />
                <text x="70" y="110" fontSize="10" fill="#f97316" textAnchor="middle">绕原点公转</text>
              </g>
            )}
          </svg>

          {/* 注入动画关键帧 */}
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes spin-center {
              0% { transform: rotate(0deg); }
              10% { transform: rotate(45deg); }
              50% { transform: rotate(45deg); }
              60% { transform: rotate(0deg); }
              100% { transform: rotate(0deg); }
            }
            @keyframes spin-origin {
              0% { transform: rotate(0deg); }
              10% { transform: rotate(45deg); }
              50% { transform: rotate(45deg); }
              60% { transform: rotate(0deg); }
              100% { transform: rotate(0deg); }
            }
          `}} />
        </div>
      </div>
    </div>
  );
}
