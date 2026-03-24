'use client';

import { useState } from 'react';

type SectionType = 'xml' | 'svg' | 'xmlns' | 'viewport' | 'viewbox' | 'content';

export function StructureVisualizer() {
  const [activeSection, setActiveSection] = useState<SectionType | null>(null);

  const sections: Record<SectionType, { title: string; desc: string; color: string }> = {
    xml: {
      title: 'XML 声明',
      desc: '告诉解析器这是一个 XML 1.0 文档。内联在 HTML5 中时这一行可以省略。',
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/30'
    },
    svg: {
      title: '<svg> 根元素',
      desc: '所有 SVG 绘图的容器。如果作为独立文件使用，它是必不可少的。',
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/30'
    },
    xmlns: {
      title: 'xmlns 命名空间',
      desc: '声明这个 XML 属于 SVG 规范。虽然 HTML5 会自动推断，但独立文件强烈建议保留。',
      color: 'text-pink-500 bg-pink-500/10 border-pink-500/30'
    },
    viewport: {
      title: 'Viewport (视口)',
      desc: '决定了你在网页上能看到多大面积的景色，相当于“窗户”的大小。',
      color: 'text-orange-500 bg-orange-500/10 border-orange-500/30'
    },
    viewbox: {
      title: 'viewBox (用户坐标系)',
      desc: '决定内部世界是如何缩放、平移来适应外面的“窗户”。初学者最容易踩坑的地方！',
      color: 'text-green-500 bg-green-500/10 border-green-500/30'
    },
    content: {
      title: '图形内容',
      desc: '所有的路径、形状、文本等元素都放在这里。',
      color: 'text-teal-500 bg-teal-500/10 border-teal-500/30'
    }
  };

  const getHighlightClass = (section: SectionType) => {
    if (!activeSection) return 'text-muted-foreground transition-all duration-300';
    return activeSection === section
      ? 'font-bold bg-primary/20 text-foreground px-1 rounded transition-all duration-300'
      : 'opacity-40 transition-all duration-300';
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6 overflow-hidden shadow-sm">
      <p className="text-sm text-muted-foreground mb-6 flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
        将鼠标悬停在代码或下方的卡片上观察对应关系
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Code Block */}
        <div className="bg-[#1e1e1e] text-[#d4d4d4] p-5 rounded-lg font-mono text-sm leading-relaxed overflow-x-auto shadow-inner">
          <div 
            className={getHighlightClass('xml')}
            onMouseEnter={() => setActiveSection('xml')}
            onMouseLeave={() => setActiveSection(null)}
          >
            {'<?xml version="1.0" encoding="utf-8"?>'}
          </div>
          <div className="flex flex-wrap">
            <span 
              className={getHighlightClass('svg')}
              onMouseEnter={() => setActiveSection('svg')}
              onMouseLeave={() => setActiveSection(null)}
            >
              {'<svg '}
            </span>
            <span 
              className={getHighlightClass('xmlns')}
              onMouseEnter={() => setActiveSection('xmlns')}
              onMouseLeave={() => setActiveSection(null)}
            >
              {' xmlns="http://www.w3.org/2000/svg" '}
            </span>
            <span 
              className={getHighlightClass('viewport')}
              onMouseEnter={() => setActiveSection('viewport')}
              onMouseLeave={() => setActiveSection(null)}
            >
              {' width="200" height="200" '}
            </span>
            <span 
              className={getHighlightClass('viewbox')}
              onMouseEnter={() => setActiveSection('viewbox')}
              onMouseLeave={() => setActiveSection(null)}
            >
              {' viewBox="0 0 200 200"'}
            </span>
            <span
              className={getHighlightClass('svg')}
              onMouseEnter={() => setActiveSection('svg')}
              onMouseLeave={() => setActiveSection(null)}
            >
              {'>'}
            </span>
          </div>
          <div 
            className={`pl-4 ${getHighlightClass('content')}`}
            onMouseEnter={() => setActiveSection('content')}
            onMouseLeave={() => setActiveSection(null)}
          >
            {'  <rect x="50" y="50" width="100" height="100" fill="blue" />'}
          </div>
          <div 
            className={getHighlightClass('svg')}
            onMouseEnter={() => setActiveSection('svg')}
            onMouseLeave={() => setActiveSection(null)}
          >
            {'</svg>'}
          </div>
        </div>

        {/* Explanation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
          {(Object.entries(sections) as [SectionType, typeof sections[SectionType]][]).map(([key, info]) => (
            <div
              key={key}
              onMouseEnter={() => setActiveSection(key)}
              onMouseLeave={() => setActiveSection(null)}
              className={`p-4 rounded-lg border cursor-default transition-all duration-300 ${
                activeSection === key 
                  ? `${info.color} scale-105 shadow-md` 
                  : activeSection
                    ? 'opacity-40 bg-muted/50 border-transparent'
                    : 'bg-muted/50 border-border hover:bg-muted'
              }`}
            >
              <h4 className="font-bold mb-2 text-sm flex items-center gap-2">
                {activeSection === key && <span className="w-1.5 h-1.5 rounded-full bg-current"></span>}
                {info.title}
              </h4>
              <p className="text-xs leading-relaxed opacity-90">{info.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
