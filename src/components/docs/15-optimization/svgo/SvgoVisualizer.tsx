'use client';

import { useState } from 'react';

const RAW_SVG = `<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 24.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
\t viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve">
<style type="text/css">
\t.st0{fill:#FF0000;}
</style>
<g id="Group_1_">
\t<path class="st0" d="M50.000,10.000 L90.000,90.000 L10.000,90.000 Z"/>
</g>
</svg>`;

const OPTIMIZED_SVG = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path fill="red" d="M50 10l40 80H10z"/>
</svg>`;

export function SvgoVisualizer() {
  const [isOptimized, setIsOptimized] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold">SVG 代码对比</h3>
        <button
          onClick={() => setIsOptimized(!isOptimized)}
          className="px-4 py-2 bg-primary text-primary-foreground text-xs rounded-md shadow-sm transition-transform active:scale-95"
        >
          {isOptimized ? '查看原始代码' : '✨ 一键使用 SVGO 优化'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground px-2">
            <span>{isOptimized ? '优化后 (Optimized)' : '原始导出 (Raw)'}</span>
            <span className={isOptimized ? 'text-green-500 font-bold' : 'text-orange-500'}>
              {isOptimized ? '95 Bytes (-75%)' : '395 Bytes'}
            </span>
          </div>
          <div className="bg-muted p-4 rounded-lg font-mono text-xs overflow-x-auto h-[280px] whitespace-pre transition-colors duration-500">
            {isOptimized ? (
              <span className="text-green-600 dark:text-green-400">{OPTIMIZED_SVG}</span>
            ) : (
              <span className="text-muted-foreground">{RAW_SVG}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="text-xs text-muted-foreground mb-2 px-2">渲染结果 (完全一致)</div>
          <div className="flex-1 border border-dashed border-border rounded-lg bg-grid-pattern flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-32 h-32">
              <path fill="red" d="M50 10l40 80H10z" />
            </svg>
          </div>
          <div className="mt-4 text-xs space-y-2 text-muted-foreground">
            <p><b>优化项列表：</b></p>
            <ul className="list-disc pl-4 space-y-1">
              <li className={isOptimized ? 'text-foreground line-through' : ''}>移除 XML 声明和 Doctype</li>
              <li className={isOptimized ? 'text-foreground line-through' : ''}>移除设计软件生成的注释和元数据</li>
              <li className={isOptimized ? 'text-foreground line-through' : ''}>折叠无用的 <code>&lt;g&gt;</code> 标签</li>
              <li className={isOptimized ? 'text-foreground line-through' : ''}>简化 <code>&lt;path&gt;</code> 数据 (去除多余的小数点和空格)</li>
              <li className={isOptimized ? 'text-foreground line-through' : ''}>将内联 <code>&lt;style&gt;</code> 转换为属性</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
