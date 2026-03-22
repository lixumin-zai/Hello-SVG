'use client';

import { useState } from 'react';

export function FillStylePlayground() {
  const [fillColor, setFillColor] = useState('#3b82f6');
  const [fillOpacity, setFillOpacity] = useState(1);
  const [globalOpacity, setGlobalOpacity] = useState(1);
  const [currentColorEnabled, setCurrentColorEnabled] = useState(false);
  const [parentColor, setParentColor] = useState('#ef4444');

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Controls */}
        <div className="space-y-6">
          <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
            <h4 className="font-bold text-sm">1. 基础填充 (fill)</h4>
            
            <div className="flex items-center gap-3">
              <label className="text-sm w-24">颜色值</label>
              <input 
                type="color" 
                value={fillColor} 
                onChange={e => setFillColor(e.target.value)} 
                disabled={currentColorEnabled}
                className="cursor-pointer disabled:opacity-50"
              />
              <span className="text-sm font-mono">{fillColor}</span>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-sm w-24">填充透明度<br/><span className="text-[10px] text-muted-foreground">(fill-opacity)</span></label>
              <input 
                type="range" min="0" max="1" step="0.1" 
                value={fillOpacity} 
                onChange={e => setFillOpacity(Number(e.target.value))} 
                className="flex-1 accent-primary"
              />
              <span className="text-sm w-8 text-right">{fillOpacity}</span>
            </div>
          </div>

          <div className="space-y-4 p-4 border rounded-lg bg-orange-500/10 border-orange-500/30">
            <h4 className="font-bold text-sm text-orange-600">2. currentColor 魔法</h4>
            <p className="text-xs text-muted-foreground">让 SVG 继承父级 HTML 元素的文字颜色。这是制作响应式图标的最佳实践！</p>
            
            <label className="flex items-center gap-2 text-sm cursor-pointer font-bold">
              <input 
                type="checkbox" 
                checked={currentColorEnabled} 
                onChange={e => setCurrentColorEnabled(e.target.checked)}
                className="accent-orange-500"
              />
              使用 fill="currentColor"
            </label>

            {currentColorEnabled && (
              <div className="flex items-center gap-3 pt-2">
                <label className="text-sm">父级文字颜色:</label>
                <input 
                  type="color" 
                  value={parentColor} 
                  onChange={e => setParentColor(e.target.value)} 
                  className="cursor-pointer"
                />
              </div>
            )}
          </div>

          <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
            <h4 className="font-bold text-sm">3. 整体透明度 (opacity)</h4>
            <div className="flex items-center gap-3">
              <input 
                type="range" min="0" max="1" step="0.1" 
                value={globalOpacity} 
                onChange={e => setGlobalOpacity(Number(e.target.value))} 
                className="flex-1 accent-primary"
              />
              <span className="text-sm w-8 text-right">{globalOpacity}</span>
            </div>
          </div>

        </div>

        {/* Display */}
        <div className="flex flex-col gap-4">
          <div className="p-4 bg-muted rounded-lg border font-mono text-xs text-primary overflow-x-auto whitespace-pre">
{`<div style="color: ${currentColorEnabled ? parentColor : 'black'}">
  <svg opacity="${globalOpacity}">
    <rect 
      fill="${currentColorEnabled ? 'currentColor' : fillColor}" 
      fill-opacity="${fillOpacity}" 
      stroke="black"
      stroke-width="4"
    />
  </svg>
</div>`}
          </div>

          <div 
            className="relative border-2 border-dashed border-border rounded-lg bg-grid-pattern flex-1 min-h-[250px] flex items-center justify-center transition-colors"
            style={{ color: currentColorEnabled ? parentColor : 'inherit' }}
          >
            {/* Background elements to show opacity effect clearly */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
              <div className="w-full h-12 bg-red-500 transform -rotate-12"></div>
              <div className="w-full h-12 bg-green-500 transform rotate-12 absolute"></div>
            </div>

            <svg width="150" height="150" viewBox="0 0 100 100" style={{ opacity: globalOpacity }}>
              <rect 
                x="10" y="10" width="80" height="80" rx="10"
                fill={currentColorEnabled ? 'currentColor' : fillColor}
                fillOpacity={fillOpacity}
                stroke="black"
                strokeWidth="4"
              />
              <text x="50" y="55" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" style={{ mixBlendMode: 'difference' }}>
                SVG Shape
              </text>
            </svg>
          </div>
          
          <div className="text-xs text-muted-foreground p-2 bg-secondary/50 rounded">
            <strong>注意：</strong>调节 <code>fill-opacity</code> 只会让内部填充变透明，黑色的描边（stroke）不受影响。而调节底部的整体 <code>opacity</code>，则会让填充和描边同时变透明。
          </div>
        </div>

      </div>
    </div>
  );
}