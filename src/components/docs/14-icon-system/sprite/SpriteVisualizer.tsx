'use client';

import { useState } from 'react';

export function SpriteVisualizer() {
  const [activeIcon, setActiveIcon] = useState<'heart' | 'star' | 'bell'>('heart');

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      {/* 隐形的 Sprite 容器 */}
      <svg width="0" height="0" className="hidden">
        <defs>
          <symbol id="icon-heart" viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </symbol>
          <symbol id="icon-star" viewBox="0 0 24 24">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </symbol>
          <symbol id="icon-bell" viewBox="0 0 24 24">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </symbol>
        </defs>
      </svg>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-sm font-bold mb-4">1. 页面顶部隐藏的 Sprite (defs/symbol)</h3>
          <div className="bg-muted p-4 rounded-lg font-mono text-xs overflow-x-auto h-48 opacity-80">
            <div className="text-muted-foreground">{"<svg width='0' height='0' style='display: none;'>"}</div>
            <div className="pl-4 text-purple-500">{"<defs>"}</div>
            
            {/* Heart */}
            <div className={`pl-8 transition-colors ${activeIcon === 'heart' ? 'text-foreground font-bold bg-primary/10' : 'text-muted-foreground'}`}>
              {"<symbol id='icon-heart' viewBox='0 0 24 24'>\n"}
              {"  <path d='...' />\n"}
              {"</symbol>"}
            </div>
            
            {/* Star */}
            <div className={`pl-8 transition-colors ${activeIcon === 'star' ? 'text-foreground font-bold bg-primary/10' : 'text-muted-foreground'}`}>
              {"<symbol id='icon-star' viewBox='0 0 24 24'>\n"}
              {"  <polygon points='...' />\n"}
              {"</symbol>"}
            </div>

            {/* Bell */}
            <div className={`pl-8 transition-colors ${activeIcon === 'bell' ? 'text-foreground font-bold bg-primary/10' : 'text-muted-foreground'}`}>
              {"<symbol id='icon-bell' viewBox='0 0 24 24'>\n"}
              {"  <path d='...' />\n"}
              {"</symbol>"}
            </div>

            <div className="pl-4 text-purple-500">{"</defs>"}</div>
            <div className="text-muted-foreground">{"</svg>"}</div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold mb-4">2. 页面中通过 use 随处调用</h3>
          <div className="flex gap-2 mb-4">
            {(['heart', 'star', 'bell'] as const).map(icon => (
              <button
                key={icon}
                onClick={() => setActiveIcon(icon)}
                className={`px-3 py-1.5 text-xs rounded-md border ${activeIcon === icon ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-muted'}`}
              >
                调用 #{icon}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6 bg-grid-pattern border border-dashed border-border rounded-lg p-6">
            <div className="flex-1 bg-muted p-4 rounded-lg font-mono text-xs">
              <div className="text-blue-500">{"<svg width='48' height='48'>"}</div>
              <div className="pl-4 text-green-500">
                {"<use href='#icon-"}{activeIcon}{"' />"}
              </div>
              <div className="text-blue-500">{"</svg>"}</div>
            </div>

            <div className="w-24 h-24 flex items-center justify-center bg-background rounded-xl shadow-sm border">
              {/* 真正的 use 调用 */}
              <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary animate-in zoom-in duration-300" key={activeIcon}>
                <use href={`#icon-${activeIcon}`} />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
