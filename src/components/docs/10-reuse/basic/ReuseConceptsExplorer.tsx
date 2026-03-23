'use client';

import React, { useState } from 'react';

const concepts = [
  {
    id: 'g',
    name: '基础打包: <g>',
    desc: '类似于 HTML 的 <div>。用于统一变换（如整体移动/旋转）和属性继承（如统一填色）。',
    code: `<g transform="translate(50, 50)" fill="blue">\n  <circle cx="0" cy="0" r="20" />\n  <rect x="20" y="20" width="40" height="40" />\n</g>`
  },
  {
    id: 'defs',
    name: '声明变量: <defs>',
    desc: '<defs> 里的内容不会被渲染到屏幕上，而是保存在内存中等待被引用。',
    code: `<defs>\n  <g id="car">\n    <rect x="0" y="20" width="100" height="40" fill="red" />\n    <circle cx="20" cy="60" r="15" fill="black" />\n    <circle cx="80" cy="60" r="15" fill="black" />\n  </g>\n</defs>`
  },
  {
    id: 'use',
    name: '调用函数: <use>',
    desc: '将 <defs> 中声明好的元素“克隆”到画布的指定位置。',
    code: `<!-- 渲染第一辆车 -->\n<use href="#car" x="10" y="20" />\n\n<!-- 渲染第二辆车 -->\n<use href="#car" x="100" y="100" />`
  }
];

export function ReuseConceptsExplorer() {
  const [activeTab, setActiveTab] = useState(concepts[0].id);
  const activeContent = concepts.find(c => c.id === activeTab);

  return (
    <div className="my-6 rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="flex flex-col sm:flex-row border-b border-border bg-muted/30">
        {concepts.map(c => (
          <button
            key={c.id}
            onClick={() => setActiveTab(c.id)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === c.id 
                ? 'border-b-2 border-primary text-primary bg-background' 
                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>
      
      <div className="p-6">
        <div key={activeTab} className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <p className="text-base font-medium">{activeContent?.desc}</p>
          
          <div className="rounded bg-muted p-4 text-xs font-mono overflow-x-auto text-primary">
            <pre><code>{activeContent?.code}</code></pre>
          </div>
          
          <div className="mt-4 rounded-lg bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.2] border border-dashed border-border p-8 min-h-[200px] flex justify-center items-center">
            {activeTab === 'defs' ? (
              <div className="text-center text-muted-foreground border-2 border-dashed border-muted-foreground/30 p-8 rounded-xl">
                <span className="text-4xl block mb-4">🧠</span>
                <p className="text-sm font-medium">保存在内存中<br/>(不会被渲染)</p>
              </div>
            ) : (
              <svg width="200" height="200" viewBox="0 0 200 200" className="overflow-visible">
                {activeTab === 'g' && (
                  <g transform="translate(60, 60)" fill="#3b82f6" className="animate-pulse">
                    <circle cx="0" cy="0" r="30" />
                    <rect x="30" y="30" width="50" height="50" />
                  </g>
                )}
                
                {activeTab === 'use' && (
                  <>
                    <defs>
                      <g id="demo-car">
                        <rect x="0" y="10" width="50" height="20" fill="#ef4444" rx="4" />
                        <rect x="10" y="0" width="30" height="10" fill="#ef4444" rx="2" />
                        <circle cx="10" cy="30" r="8" fill="#1f2937" />
                        <circle cx="40" cy="30" r="8" fill="#1f2937" />
                      </g>
                    </defs>
                    <use href="#demo-car" x="20" y="40" />
                    <use href="#demo-car" x="120" y="100" />
                    <use href="#demo-car" x="50" y="140" transform="scale(0.8)" />
                  </>
                )}
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}