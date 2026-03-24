'use client';

import { useState } from 'react';

export function SvgVsCss() {
  const [activeTab, setActiveTab] = useState<'circle' | 'triangle' | 'curve'>('curve');

  const shapes = {
    circle: {
      title: '简单的圆',
      css: `div {\n  width: 100px;\n  height: 100px;\n  border-radius: 50%;\n  background: #3b82f6;\n}`,
      svg: `<circle cx="50" cy="50" r="50"\n  fill="#3b82f6"\n/>`,
      renderCss: <div className="w-[100px] h-[100px] rounded-full bg-blue-500"></div>,
      renderSvg: <svg width="100" height="100"><circle cx="50" cy="50" r="50" fill="#3b82f6" /></svg>,
      conclusion: '平局：两者都很简单，CSS 可能更方便。'
    },
    triangle: {
      title: '三角形',
      css: `/* CSS 魔法（利用边框） */\ndiv {\n  width: 0;\n  height: 0;\n  border-left: 50px solid transparent;\n  border-right: 50px solid transparent;\n  border-bottom: 100px solid #10b981;\n}`,
      svg: `<polygon points="50,0 100,100 0,100"\n  fill="#10b981"\n/>`,
      renderCss: <div className="w-0 h-0 border-l-[50px] border-l-transparent border-r-[50px] border-r-transparent border-b-[100px] border-b-emerald-500"></div>,
      renderSvg: <svg width="100" height="100"><polygon points="50,0 100,100 0,100" fill="#10b981" /></svg>,
      conclusion: 'SVG 胜：CSS 需要用 border 的 Hack 技巧，语义不清晰；SVG 是标准的几何多边形。'
    },
    curve: {
      title: '不规则贝塞尔曲线',
      css: `/* 极度困难/几乎不可能纯 CSS 实现 */\n/* 只能借助 clip-path 和 SVG 结合 */\ndiv {\n  clip-path: path('M0,50 Q50,0 100,50 T200,50...');\n}`,
      svg: `<path d="M0,50 Q50,0 100,50 T200,50"\n  fill="none"\n  stroke="#8b5cf6"\n  stroke-width="8"\n/>`,
      renderCss: <div className="text-muted-foreground text-sm text-center">🤯 纯 CSS 难以实现流畅的曲线</div>,
      renderSvg: <svg width="200" height="100"><path d="M0,50 Q50,0 100,50 T200,50" fill="none" stroke="#8b5cf6" strokeWidth="8" /></svg>,
      conclusion: 'SVG 完胜：复杂曲线、路径动画、多图层叠加是 SVG 的绝对主场。'
    }
  };

  const activeData = shapes[activeTab];

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6 overflow-hidden">
      <div className="flex gap-2 mb-6 border-b border-border pb-2">
        {(Object.keys(shapes) as Array<keyof typeof shapes>).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === key ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary text-muted-foreground'
            }`}
          >
            {shapes[key].title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CSS Panel */}
        <div className="flex flex-col gap-4 border rounded-xl p-4 bg-background">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🎨</span>
            <h4 className="font-bold">纯 CSS 方案</h4>
          </div>
          <div className="h-32 flex items-center justify-center bg-secondary/50 rounded-lg overflow-hidden border border-dashed border-border">
            {activeData.renderCss}
          </div>
          <pre className="bg-zinc-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto h-32">
            <code>{activeData.css}</code>
          </pre>
        </div>

        {/* SVG Panel */}
        <div className="flex flex-col gap-4 border rounded-xl p-4 bg-background">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">📐</span>
            <h4 className="font-bold">SVG 方案</h4>
          </div>
          <div className="h-32 flex items-center justify-center bg-secondary/50 rounded-lg overflow-hidden border border-dashed border-border">
            {activeData.renderSvg}
          </div>
          <pre className="bg-zinc-900 text-pink-400 p-4 rounded-lg text-xs overflow-x-auto h-32">
            <code>{activeData.svg}</code>
          </pre>
        </div>
      </div>

      <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg text-sm text-foreground flex items-start gap-3">
        <span className="text-xl">💡</span>
        <div>
          <strong>结论：</strong>{activeData.conclusion}
        </div>
      </div>
    </div>
  );
}
