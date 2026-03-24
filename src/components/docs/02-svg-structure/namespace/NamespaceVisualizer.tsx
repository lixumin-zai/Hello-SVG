'use client';

import { useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export function NamespaceVisualizer() {
  const [hasNamespace, setHasNamespace] = useState(true);

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <p className="text-sm text-muted-foreground mb-4">
        ▶ 切换 xmlns 属性，观察浏览器对 XML 文档的解析差异（模拟独立 .svg 文件环境）
      </p>

      <div className="flex items-center gap-4 mb-6 p-4 bg-muted/50 rounded-lg">
        <label className="flex items-center gap-2 cursor-pointer font-medium">
          <input 
            type="checkbox" 
            checked={hasNamespace} 
            onChange={(e) => setHasNamespace(e.target.checked)}
            className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
          />
          包含 xmlns="http://www.w3.org/2000/svg"
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Code View */}
        <div className="bg-[#1e1e1e] text-[#d4d4d4] p-4 rounded-lg font-mono text-sm overflow-x-auto relative">
          <div className="text-gray-500 mb-2">{'<!-- document.svg -->'}</div>
          <div>{'<svg '}</div>
          <div className={`pl-4 transition-all duration-300 ${hasNamespace ? 'text-pink-400 font-bold' : 'text-gray-600 line-through opacity-50'}`}>
            {'xmlns="http://www.w3.org/2000/svg"'}
          </div>
          <div className="pl-4">{'viewBox="0 0 100 100"'}</div>
          <div>{'>'}</div>
          <div className="pl-4 text-blue-400">{'<circle cx="50" cy="50" r="40" fill="currentColor" />'}</div>
          <div>{'</svg>'}</div>
        </div>

        {/* Browser Render Simulation */}
        <div className="border rounded-lg bg-background p-4 relative flex flex-col items-center justify-center min-h-[200px]">
          <div className="absolute top-2 left-2 text-xs font-medium text-muted-foreground flex items-center gap-1">
            浏览器渲染结果
          </div>
          
          {hasNamespace ? (
            <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">
              <svg viewBox="0 0 100 100" className="w-24 h-24 text-blue-500">
                <circle cx="50" cy="50" r="40" fill="currentColor" />
              </svg>
              <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> 识别为 SVG 图形
              </span>
            </div>
          ) : (
            <div className="w-full text-left bg-muted/30 p-2 rounded text-xs font-mono text-muted-foreground animate-in fade-in duration-300">
              <span className="text-red-500 font-bold flex items-center gap-1 mb-2">
                <AlertCircle className="w-4 h-4" /> 仅作为纯文本或未知 XML 树渲染
              </span>
              &lt;svg viewBox="0 0 100 100"&gt;<br/>
              &nbsp;&nbsp;&lt;circle cx="50" cy="50" r="40" fill="currentColor"/&gt;<br/>
              &lt;/svg&gt;
            </div>
          )}
        </div>
      </div>
    </div>
  );
}