'use client';

import React, { useState } from 'react';
import { Layers } from 'lucide-react';

export function BlendConceptsVisualizer() {
  const [activeTab, setActiveTab] = useState<'blend' | 'isolation'>('blend');

  return (
    <div className="my-6 rounded-xl border border-border bg-card overflow-hidden">
      <div className="border-b border-border bg-muted/30 p-2 flex gap-2">
        <button
          onClick={() => setActiveTab('blend')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'blend' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'}`}
        >
          <Layers className="w-4 h-4" />
          常用混合模式
        </button>
        <button
          onClick={() => setActiveTab('isolation')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'isolation' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'}`}
        >
          <Layers className="w-4 h-4" />
          isolation: isolate
        </button>
      </div>

      <div className="p-6 min-h-[350px]">
        {activeTab === 'blend' && <BlendTab />}
        {activeTab === 'isolation' && <IsolationTab />}
      </div>
    </div>
  );
}

function BlendTab() {
  const modes = [
    { type: 'multiply', desc: '正片叠底：总是比原来暗。' },
    { type: 'screen', desc: '滤色：总是比原来亮。' },
    { type: 'overlay', desc: '叠加：增加对比度。' },
    { type: 'difference', desc: '差值：反色效果。' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold m-0">常用混合模式</h3>
          <p className="text-muted-foreground text-sm m-0">不仅可用于 SVG 内部元素，还能与页面背景混合。</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {modes.map((mode) => (
          <div key={mode.type} className="flex flex-col items-center gap-2">
            <div className="w-full aspect-square rounded-lg border border-border overflow-hidden relative bg-white dark:bg-zinc-800 flex items-center justify-center">
              {/* Checkerboard background to see blending */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(-45deg, #000 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #000 75%), linear-gradient(-45deg, transparent 75%, #000 75%)',
                backgroundSize: '10px 10px',
                backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0px'
              }} />
              
              <svg viewBox="0 0 100 100" className="w-[80%] h-[80%] z-10">
                <circle cx="40" cy="40" r="25" fill="#ef4444" style={{ mixBlendMode: mode.type as any }} />
                <circle cx="60" cy="40" r="25" fill="#3b82f6" style={{ mixBlendMode: mode.type as any }} />
                <circle cx="50" cy="60" r="25" fill="#22c55e" style={{ mixBlendMode: mode.type as any }} />
              </svg>
            </div>
            <code className="text-xs px-2 py-1">{mode.type}</code>
            <span className="text-xs text-muted-foreground text-center px-1">{mode.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function IsolationTab() {
  const [isIsolated, setIsIsolated] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-8 items-center h-full">
      <div className="flex-1 space-y-4">
        <h3 className="text-lg font-semibold m-0">隔离上下文 (isolation: isolate)</h3>
        <p className="text-muted-foreground text-sm m-0">
          当你希望 SVG 内部元素之间相互混合，但<strong>不与外部网页背景混合</strong>时，需要用到它。
        </p>
        
        <div className="p-4 border border-border rounded-lg bg-muted/30 mt-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              checked={isIsolated} 
              onChange={(e) => setIsIsolated(e.target.checked)}
              className="w-4 h-4 text-primary rounded border-border"
            />
            <span className="text-sm font-medium">开启 <code>isolation: isolate</code></span>
          </label>
        </div>
        
        <p className="text-xs text-muted-foreground">
          ▶ 观察右侧图案：未开启时，圆圈的颜色会受到深色条纹背景的影响；开启后，圆圈之间的混合独立计算，整体作为一个图像贴在背景上。
        </p>
      </div>
      
      <div className="w-64 h-64 rounded-xl overflow-hidden relative border border-border flex flex-col items-center justify-center">
        {/* Striped background to demonstrate blending with background */}
        <div className="absolute inset-0" style={{
          background: 'repeating-linear-gradient(45deg, #f87171, #f87171 10px, #60a5fa 10px, #60a5fa 20px)'
        }} />
        
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center" />
        
        <svg 
          viewBox="0 0 100 100" 
          className="w-48 h-48 z-10" 
          style={{ isolation: isIsolated ? 'isolate' : 'auto' }}
        >
          <g>
            <circle cx="40" cy="40" r="25" fill="#ef4444" style={{ mixBlendMode: 'multiply' }} />
            <circle cx="60" cy="40" r="25" fill="#3b82f6" style={{ mixBlendMode: 'multiply' }} />
            <circle cx="50" cy="60" r="25" fill="#22c55e" style={{ mixBlendMode: 'multiply' }} />
          </g>
        </svg>
      </div>
    </div>
  );
}
