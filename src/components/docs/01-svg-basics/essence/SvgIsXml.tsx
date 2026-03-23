'use client';

import { useState } from 'react';

export function SvgIsXml() {
  const defaultCode = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <!-- 试试修改 cx 或 fill 的值 -->
  <circle cx="50" cy="50" r="40" fill="#3b82f6" />
  
  <text x="50" y="55" 
        font-size="14" 
        text-anchor="middle" 
        fill="white">
    Hello SVG
  </text>
</svg>`;

  const [code, setCode] = useState(defaultCode);

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <p className="text-sm text-muted-foreground mb-4">
        ▶ SVG 本质上是一段 XML 文本。你可以直接在左侧编辑代码，右侧会实时渲染。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Code Editor */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center px-2">
            <span className="font-semibold text-primary">XML 代码</span>
            <span className="text-xs text-muted-foreground">人类可读、可编辑</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 p-4 font-mono text-sm bg-zinc-950 text-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            spellCheck={false}
          />
        </div>

        {/* Render Preview */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center px-2">
            <span className="font-semibold text-primary">渲染结果</span>
            <span className="text-xs text-muted-foreground">DOM 节点</span>
          </div>
          <div className="w-full h-64 border rounded-lg bg-background flex items-center justify-center p-4">
            <div 
              className="w-full h-full max-w-[200px] max-h-[200px]"
              dangerouslySetInnerHTML={{ __html: code }}
            />
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          文本压缩率极高
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          文字可被搜索引擎抓取
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          可通过 CSS/JS 操作
        </div>
      </div>
    </div>
  );
}