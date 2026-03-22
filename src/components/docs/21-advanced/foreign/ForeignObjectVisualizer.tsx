'use client';

import { useState } from 'react';

export function ForeignObjectVisualizer() {
  const [text, setText] = useState('SVG 里的 HTML');
  const [rotation, setRotation] = useState(0);

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="flex flex-col space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">改变 HTML 输入框的内容：</label>
            <input 
              type="text" 
              value={text} 
              onChange={(e) => setText(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-background"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 flex justify-between">
              <span>旋转整个 SVG 坐标系：</span>
              <span>{rotation}°</span>
            </label>
            <input 
              type="range" 
              min="-180" 
              max="180" 
              value={rotation} 
              onChange={(e) => setRotation(Number(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div className="bg-muted p-4 rounded-lg font-mono text-xs overflow-x-auto">
            <span className="text-blue-500">{"<svg>"}</span><br/>
            <span className="text-purple-500 pl-4">{"<foreignObject width='200' height='100'>"}</span><br/>
            <span className="text-muted-foreground pl-8">{"<!-- 里面是纯正的 HTML -->"}</span><br/>
            <span className="text-green-600 pl-8">{"<div xmlns='http://www.w3.org/1999/xhtml'>"}</span><br/>
            <span className="text-foreground pl-12">{"<input type='text' />"}</span><br/>
            <span className="text-green-600 pl-8">{"</div>"}</span><br/>
            <span className="text-purple-500 pl-4">{"</foreignObject>"}</span><br/>
            <span className="text-blue-500">{"</svg>"}</span>
          </div>
        </div>

        <div className="flex items-center justify-center border-2 border-dashed border-border rounded-lg bg-slate-50 dark:bg-slate-900 p-8 overflow-hidden relative">
          <div className="absolute top-2 left-2 text-[10px] text-muted-foreground font-mono">SVG Boundary</div>
          <svg 
            viewBox="0 0 300 300" 
            className="w-full max-w-[250px] overflow-visible transition-transform duration-300"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {/* Background elements */}
            <circle cx="150" cy="150" r="140" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="10 10" />
            <path d="M 0 150 L 300 150 M 150 0 L 150 300" stroke="#e2e8f0" strokeWidth="1" />
            
            {/* SVG Text */}
            <text x="150" y="40" textAnchor="middle" fill="#94a3b8" fontSize="12">
              我是一个普通的 SVG Text
            </text>

            {/* Foreign Object */}
            <foreignObject x="50" y="100" width="200" height="100">
              {/* Note: xmlns is implicitly handled by React/browser, but important in raw SVG */}
              <div 
                className="w-full h-full flex flex-col items-center justify-center bg-white/80 dark:bg-black/80 backdrop-blur border border-primary/30 rounded-lg p-4 shadow-lg"
              >
                <span className="text-xs font-bold text-primary mb-2">我是 HTML div</span>
                <input 
                  type="text" 
                  value={text} 
                  onChange={(e) => setText(e.target.value)}
                  className="w-full text-center border rounded px-2 py-1 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </foreignObject>
            
            {/* Overlaying SVG Element */}
            <circle cx="250" cy="200" r="20" fill="#f59e0b" opacity="0.8" />
          </svg>
        </div>

      </div>
    </div>
  );
}
