'use client';

import { useState } from 'react';

export function VueSvgVisualizer() {
  const [percent, setPercent] = useState(65);

  // Math for the circle stroke
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="flex flex-col">
          <h3 className="text-sm font-bold mb-4">Vue 模板语法与 SVG</h3>
          <p className="text-xs text-muted-foreground mb-6">
            Vue 的模板系统处理 SVG 非常自然，不需要改写属性名为驼峰式，直接使用 <code>:</code> 绑定数据即可。
          </p>

          <div className="bg-[#1e1e1e] p-4 rounded-lg font-mono text-[11px] overflow-x-auto text-blue-300 shadow-inner flex-1">
            <span className="text-muted-foreground">&lt;template&gt;</span>\n
            {'  '}&lt;<span className="text-red-400">svg</span> <span className="text-blue-200">viewBox</span>=<span className="text-green-300">"0 0 100 100"</span>&gt;\n
            {'    '}<span className="text-muted-foreground">&lt;!-- 背景圆环 --&gt;</span>\n
            {'    '}&lt;<span className="text-red-400">circle</span> <span className="text-blue-200">cx</span>=<span className="text-green-300">"50"</span> <span className="text-blue-200">cy</span>=<span className="text-green-300">"50"</span> <span className="text-blue-200">r</span>=<span className="text-green-300">"40"</span> <span className="text-blue-200">stroke</span>=<span className="text-green-300">"#eee"</span> /&gt;\n\n
            {'    '}<span className="text-muted-foreground">&lt;!-- 进度圆环 --&gt;</span>\n
            {'    '}&lt;<span className="text-red-400">circle</span> \n
            {'      '}<span className="text-blue-200">cx</span>=<span className="text-green-300">"50"</span> <span className="text-blue-200">cy</span>=<span className="text-green-300">"50"</span> <span className="text-blue-200">r</span>=<span className="text-green-300">"40"</span>\n
            {'      '}<span className="text-blue-200 bg-blue-500/20 px-1 rounded">stroke-dasharray</span>=<span className="text-green-300">"251.2"</span> <span className="text-muted-foreground">&lt;!-- 保留原生连字符 --&gt;</span>\n
            {'      '}<span className="text-blue-200 bg-purple-500/20 px-1 rounded">:stroke-dashoffset</span>=<span className="text-yellow-200">"offsetValue"</span> <span className="text-muted-foreground">&lt;!-- Vue 数据绑定 --&gt;</span>\n
            {'    '}/&gt;\n\n
            {'    '}<span className="text-muted-foreground">&lt;!-- 动态文本 --&gt;</span>\n
            {'    '}&lt;<span className="text-red-400">text</span> <span className="text-blue-200">x</span>=<span className="text-green-300">"50"</span> <span className="text-blue-200">y</span>=<span className="text-green-300">"50"</span>&gt;\n
            {'      '}<span className="text-yellow-200 bg-purple-500/20 px-1 rounded">{`{{ percent }}%`}</span>\n
            {'    '}&lt;/<span className="text-red-400">text</span>&gt;\n
            {'  '}&lt;/<span className="text-red-400">svg</span>&gt;\n
            <span className="text-muted-foreground">&lt;/template&gt;</span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg bg-slate-50 dark:bg-slate-900 p-8">
          <div className="w-full mb-8">
            <label className="text-xs font-bold text-muted-foreground mb-2 flex justify-between">
              <span>模拟 Vue 响应式数据 (percent):</span>
              <span className="text-primary">{percent}</span>
            </label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={percent} 
              onChange={(e) => setPercent(Number(e.target.value))} 
              className="w-full"
            />
          </div>

          <svg viewBox="0 0 100 100" className="w-48 h-48 -rotate-90">
            {/* Background Track */}
            <circle 
              cx="50" cy="50" r={radius} 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="8" 
              className="text-muted/30"
            />
            {/* Progress Track */}
            <circle 
              cx="50" cy="50" r={radius} 
              fill="none" 
              stroke="#10b981" 
              strokeWidth="8" 
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-300 ease-out"
            />
            {/* Text */}
            <text 
              x="50" y="50" 
              textAnchor="middle" 
              dominantBaseline="middle" 
              fill="currentColor" 
              fontSize="20" 
              fontWeight="bold"
              className="rotate-90 origin-center"
            >
              {percent}%
            </text>
          </svg>
        </div>

      </div>
    </div>
  );
}
