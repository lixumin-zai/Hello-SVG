'use client';

import { useState } from 'react';

export function WhatIsSvg() {
  const [activeTab, setActiveTab] = useState<'xml' | 'scalable'>('xml');

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col w-full md:w-1/3 gap-3">
          <h3 className="text-xl font-bold text-foreground mb-2">核心特性</h3>
          <button
            onClick={() => setActiveTab('xml')}
            className={`p-4 text-left rounded-xl border transition-all ${
              activeTab === 'xml'
                ? 'bg-primary/10 border-primary shadow-sm'
                : 'bg-background hover:bg-secondary border-border'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">📝</span>
              <span className="font-semibold text-foreground">基于 XML</span>
            </div>
            <p className="text-sm text-muted-foreground">纯文本描述，人类可读，搜索引擎友好，易于修改和压缩。</p>
          </button>
          
          <button
            onClick={() => setActiveTab('scalable')}
            className={`p-4 text-left rounded-xl border transition-all ${
              activeTab === 'scalable'
                ? 'bg-primary/10 border-primary shadow-sm'
                : 'bg-background hover:bg-secondary border-border'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">🔍</span>
              <span className="font-semibold text-foreground">无损缩放</span>
            </div>
            <p className="text-sm text-muted-foreground">基于数学几何计算，无论放大多少倍，边缘依然锐利清晰。</p>
          </button>
        </div>

        <div className="flex-1 min-h-[250px] border rounded-xl bg-background flex items-center justify-center p-6 relative overflow-hidden">
          {activeTab === 'xml' ? (
            <div className="w-full h-full flex flex-col justify-center">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center border-2 border-blue-500">
                    <svg width="32" height="32" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="#3b82f6" />
                    </svg>
                  </div>
                  <span className="text-muted-foreground text-sm">➡️ 渲染对应 ➡️</span>
                </div>
                <div className="flex-1 bg-zinc-900 rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto">
                  <span className="text-pink-400">&lt;svg</span> viewBox=<span className="text-yellow-300">"0 0 100 100"</span><span className="text-pink-400">&gt;</span><br />
                  &nbsp;&nbsp;<span className="text-pink-400">&lt;circle</span> cx=<span className="text-yellow-300">"50"</span> cy=<span className="text-yellow-300">"50"</span> r=<span className="text-yellow-300">"40"</span> fill=<span className="text-yellow-300">"#3b82f6"</span> <span className="text-pink-400">/&gt;</span><br />
                  <span className="text-pink-400">&lt;/svg&gt;</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center">SVG 并不是二进制的图片文件，而是一段描述图形的 XML 代码。</p>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4">
              <div className="flex gap-8 items-end justify-center h-32">
                <div className="flex flex-col items-center gap-2">
                  <svg width="30" height="30" viewBox="0 0 100 100">
                    <path d="M50 10 L90 90 L10 90 Z" fill="#10b981" />
                  </svg>
                  <span className="text-xs text-muted-foreground">30x30</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <svg width="60" height="60" viewBox="0 0 100 100">
                    <path d="M50 10 L90 90 L10 90 Z" fill="#10b981" />
                  </svg>
                  <span className="text-xs text-muted-foreground">60x60</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <svg width="100" height="100" viewBox="0 0 100 100">
                    <path d="M50 10 L90 90 L10 90 Z" fill="#10b981" />
                  </svg>
                  <span className="text-xs text-muted-foreground">100x100</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-4">同一段代码，无论渲染在多大尺寸的容器中，都能完美自适应，没有锯齿。</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
