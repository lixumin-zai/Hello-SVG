'use client';

import React, { useState } from 'react';

const concepts = [
  {
    id: 'define',
    name: '1. 定义 <pattern>',
    desc: '在 <defs> 中指定瓷砖尺寸。内部可以放置任意 SVG 图形。',
    code: `<defs>\n  <pattern id="myDots" width="20" height="20" patternUnits="userSpaceOnUse">\n    <circle cx="10" cy="10" r="5" fill="blue" />\n  </pattern>\n</defs>`
  },
  {
    id: 'units',
    name: '2. 坐标系 (Units)',
    desc: '强烈建议使用 patternUnits="userSpaceOnUse"，确保尺寸以像素为单位，而不是基于目标图形比例。',
    code: `<!-- 正确：明确像素 -->\npatternUnits="userSpaceOnUse"\n\n<!-- 默认且容易出错：基于目标比例 -->\npatternUnits="objectBoundingBox"`
  },
  {
    id: 'transform',
    name: '3. 图案变换 (Transform)',
    desc: '使用 patternTransform 可以在平铺前整体变换（如旋转 45 度画斜纹）。',
    code: `<pattern id="stripe" width="10" height="10" patternTransform="rotate(45)">\n  <line x1="0" y1="0" x2="0" y2="10" stroke="black" />\n</pattern>`
  }
];

export function PatternConceptsExplorer() {
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
            <svg width="200" height="100" viewBox="0 0 200 100" className="overflow-visible">
              <defs>
                <pattern id="demo-dots" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect width="20" height="20" fill="none" stroke="#e5e7eb" strokeDasharray="2 2" />
                  <circle cx="10" cy="10" r="5" fill="#3b82f6" />
                </pattern>
                
                <pattern id="demo-stripes" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <rect width="20" height="20" fill="none" stroke="#e5e7eb" strokeDasharray="2 2" />
                  <line x1="10" y1="0" x2="10" y2="20" stroke="#ef4444" strokeWidth="4" />
                </pattern>
              </defs>

              {activeTab === 'define' && (
                <rect x="0" y="0" width="200" height="100" fill="url(#demo-dots)" />
              )}
              
              {activeTab === 'units' && (
                <g>
                  <rect x="0" y="0" width="90" height="100" fill="url(#demo-dots)" />
                  <text x="45" y="55" fill="black" fontSize="12" textAnchor="middle" fontWeight="bold" className="bg-white/80 px-1 rounded">userSpace</text>
                  <rect x="110" y="0" width="90" height="100" fill="#3b82f6" opacity="0.3" />
                  <text x="155" y="55" fill="black" fontSize="12" textAnchor="middle" fontWeight="bold" className="bg-white/80 px-1 rounded">objectBoundingBox</text>
                  <text x="155" y="70" fill="black" fontSize="10" textAnchor="middle">(容易变形)</text>
                </g>
              )}
              
              {activeTab === 'transform' && (
                <rect x="0" y="0" width="200" height="100" fill="url(#demo-stripes)" />
              )}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}