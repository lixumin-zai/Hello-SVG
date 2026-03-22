'use client';

import { useState } from 'react';

export function MediaQueriesVisualizer() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-bold">模拟系统主题切换</h3>
        <div className="flex gap-2 bg-muted p-1 rounded-lg">
          <button 
            onClick={() => setTheme('light')}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${theme === 'light' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            🌞 Light
          </button>
          <button 
            onClick={() => setTheme('dark')}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${theme === 'dark' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            🌙 Dark
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SVG Container pretending to be an iframe or standalone img */}
        <div 
          className={`flex items-center justify-center p-8 rounded-lg transition-colors duration-500 border ${
            theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          {/* Note: In real world, this style would be INSIDE the SVG file itself */}
          <svg viewBox="0 0 200 100" className="w-full max-w-[200px]">
            <style>
              {`
                .sky { fill: #87CEEB; transition: fill 0.5s; }
                .sun-moon { fill: #FFD700; transition: all 0.5s; }
                .cloud { fill: white; opacity: 0.9; transition: opacity 0.5s; }
                
                /* We simulate media query by using a wrapper class here, 
                   but in real standalone SVG it would be @media (prefers-color-scheme: dark) */
                .${theme} .sky { fill: #1a1a2e; }
                .${theme} .sun-moon { fill: #e2e8f0; transform: translateX(40px); }
                .${theme} .cloud { opacity: 0.1; }
              `}
            </style>
            
            {/* The actual SVG content using the classes */}
            <g className={theme === 'dark' ? 'dark' : 'light'}>
              <rect width="200" height="100" rx="20" className="sky" />
              <circle cx="50" cy="50" r="20" className="sun-moon" />
              
              <g className="cloud">
                <circle cx="120" cy="60" r="15" />
                <circle cx="140" cy="50" r="20" />
                <circle cx="160" cy="60" r="15" />
              </g>
            </g>
          </svg>
        </div>

        {/* Code Explanation */}
        <div className="bg-muted rounded-lg p-4 font-mono text-xs overflow-x-auto">
          <div className="text-muted-foreground mb-2">/* SVG 内部的独立样式表 */</div>
          <div className="text-blue-500">{"<style>"}</div>
          <div className="text-foreground pl-4">
            .sky {"{"} fill: #87CEEB; {"}"}<br/>
            .sun {"{"} fill: #FFD700; {"}"}
          </div>
          
          <div className="text-purple-500 mt-4 pl-4">
            @media <span className="text-green-600">(prefers-color-scheme: dark)</span> {"{"}
          </div>
          <div className="text-foreground pl-8 border-l-2 border-purple-500/30 ml-4">
            .sky {"{"} fill: #1a1a2e; {"}"} <span className="text-muted-foreground">/* 变成夜空 */</span><br/>
            .sun {"{"} fill: #e2e8f0; {"}"} <span className="text-muted-foreground">/* 变成月亮 */</span>
          </div>
          <div className="text-purple-500 pl-4">{"}"}</div>
          <div className="text-blue-500">{"</style>"}</div>
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground mt-4 text-center">
        即使你通过 <code>&lt;img src="weather.svg"&gt;</code> 引入这个文件，<br/>
        SVG 内部的媒体查询依然会读取操作系统的明暗主题并独立做出响应！
      </p>
    </div>
  );
}
