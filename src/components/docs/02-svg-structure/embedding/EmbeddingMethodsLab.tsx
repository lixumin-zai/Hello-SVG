'use client';

import { useState } from 'react';

type MethodType = 'inline' | 'img' | 'css' | 'object' | 'iframe';

const methodsInfo: Record<MethodType, {
  title: string;
  code: string;
  cssControl: boolean;
  jsInteraction: boolean;
  caching: boolean;
  desc: string;
}> = {
  inline: {
    title: '内联 SVG (Inline)',
    code: `<div>
  <svg viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" />
  </svg>
</div>`,
    cssControl: true,
    jsInteraction: true,
    caching: false,
    desc: '直接将 <svg> 标签写在 HTML 中。最强大，完全暴露在主文档的 DOM 树中，可以被外部 CSS 自由控制颜色，JS 也可以绑定事件。缺点是无法被浏览器单独缓存。'
  },
  img: {
    title: '<img> 标签',
    code: `<img src="icon.svg" alt="Icon" />`,
    cssControl: false,
    jsInteraction: false,
    caching: true,
    desc: '最简单的嵌入方式。但出于安全原因，浏览器会限制外部 CSS 和 JS 对其内部的影响，内部的脚本也不会执行。适合纯静态展示的图标。'
  },
  css: {
    title: 'CSS 背景图',
    code: `.icon {
  background-image: url('icon.svg');
}`,
    cssControl: false,
    jsInteraction: false,
    caching: true,
    desc: '作为纯装饰性图像使用，完全没有语义，无法交互，也无法用外部 CSS 修改内部颜色。'
  },
  object: {
    title: '<object> 标签',
    code: `<object type="image/svg+xml" data="image.svg"></object>`,
    cssControl: false, // Generally true if same origin, but for simplicity in demo we mark false for *external* css
    jsInteraction: true, // Possible but complex (contentDocument)
    caching: true,
    desc: '曾经的标准推荐方式。如果同源，可以通过 object.contentDocument 拿到内部 DOM。适合需要独立缓存但又要保持一定交互能力的复杂 SVG（如互动地图）。'
  },
  iframe: {
    title: '<iframe> 标签',
    code: `<iframe src="image.svg"></iframe>`,
    cssControl: false,
    jsInteraction: true,
    caching: true,
    desc: '与 <object> 类似，创建一个完全隔离的浏览上下文。一般不推荐仅仅为了嵌入图形而使用。'
  }
};

export function EmbeddingMethodsLab() {
  const [activeMethod, setActiveMethod] = useState<MethodType>('inline');
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const info = methodsInfo[activeMethod];

  // Reset states when switching
  const handleMethodChange = (m: MethodType) => {
    setActiveMethod(m);
    setHovered(false);
    setClicked(false);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <p className="text-sm text-muted-foreground mb-4">
        ▶ 切换嵌入方式，尝试鼠标悬停和点击，观察各方式的能力差异
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(Object.keys(methodsInfo) as MethodType[]).map((m) => (
          <button
            key={m}
            onClick={() => handleMethodChange(m)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeMethod === m 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            {methodsInfo[m].title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Interactive Demo Area */}
        <div className="flex flex-col items-center justify-center p-8 border rounded-lg bg-background relative h-64">
          <div className="absolute top-2 left-2 text-xs text-muted-foreground">主页面环境</div>
          
          {/* External CSS Control Simulation */}
          <div className="absolute top-2 right-2 flex items-center gap-2">
            <span className="text-xs">外部 CSS :hover:</span>
            <span className={`w-3 h-3 rounded-full ${info.cssControl ? 'bg-green-500' : 'bg-red-500'}`}></span>
          </div>

          <div 
            className="relative cursor-pointer group"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => {
              if (info.jsInteraction) {
                setClicked(!clicked);
              } else {
                alert('此嵌入方式下，主页面的 JS 无法轻易响应 SVG 内部的精准点击（或只能响应整个容器边框）');
              }
            }}
          >
            {/* Simulation of the rendering result */}
            <svg 
              width="120" 
              height="120" 
              viewBox="0 0 100 100"
              style={{
                // Simulate CSS styling working or failing
                fill: info.cssControl && hovered ? '#f59e0b' : '#3b82f6',
                transform: clicked && info.jsInteraction ? 'scale(1.2)' : 'scale(1)',
                transition: 'all 0.3s ease',
                // For img/css, it behaves like a solid block
                filter: (!info.cssControl && hovered) ? 'brightness(0.9)' : 'none'
              }}
            >
              {/* Outer boundary representation for replaced elements */}
              {!info.cssControl && <rect width="100" height="100" fill="transparent" stroke="#ccc" strokeDasharray="4" />}
              
              <polygon points="50,10 90,90 10,90" />
            </svg>
            
            {clicked && info.jsInteraction && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-green-500 whitespace-nowrap bg-background p-1 rounded shadow">
                JS 点击事件触发!
              </div>
            )}
          </div>

          <div className="absolute bottom-4 text-sm text-center text-muted-foreground max-w-[80%]">
            {hovered && info.cssControl && "✨ 外部 CSS 成功修改了 SVG 填充色"}
            {hovered && !info.cssControl && "❌ 外部 CSS 无法穿透，只能整体变暗"}
          </div>
        </div>

        {/* Capabilities Panel */}
        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold mb-2">能力雷达图</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span>外部 CSS 控制 (如修改 fill):</span>
                <span className={info.cssControl ? 'text-green-500 font-bold' : 'text-red-500'}>
                  {info.cssControl ? '✅ 支持' : '❌ 阻断'}
                </span>
              </li>
              <li className="flex justify-between">
                <span>JS 事件交互:</span>
                <span className={info.jsInteraction ? 'text-green-500 font-bold' : 'text-red-500'}>
                  {info.jsInteraction ? '✅ 支持' : '❌ 受限'}
                </span>
              </li>
              <li className="flex justify-between">
                <span>浏览器独立缓存:</span>
                <span className={info.caching ? 'text-green-500 font-bold' : 'text-orange-500'}>
                  {info.caching ? '✅ 支持' : '⚠️ 不支持 (随HTML)'}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-1">代码示例</h4>
            <pre className="text-xs bg-secondary p-3 rounded overflow-x-auto">
              <code>{info.code}</code>
            </pre>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {info.desc}
          </p>
        </div>
      </div>
    </div>
  );
}