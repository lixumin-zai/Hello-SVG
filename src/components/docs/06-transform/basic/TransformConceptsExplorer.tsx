'use client';

import React, { useState } from 'react';
import { RotateCw, Maximize, Axis3d } from 'lucide-react';

export function TransformConceptsExplorer() {
  const [activeTab, setActiveTab] = useState<'rotate' | 'scale' | 'coords'>('rotate');

  return (
    <div className="my-6 rounded-xl border border-border bg-card overflow-hidden">
      <div className="border-b border-border bg-muted/30 p-2 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab('rotate')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'rotate' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'}`}
        >
          <RotateCw className="w-4 h-4" />
          旋转的深坑
        </button>
        <button
          onClick={() => setActiveTab('scale')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'scale' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'}`}
        >
          <Maximize className="w-4 h-4" />
          缩放的深坑
        </button>
        <button
          onClick={() => setActiveTab('coords')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'coords' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'}`}
        >
          <Axis3d className="w-4 h-4" />
          局部坐标系
        </button>
      </div>

      <div className="p-6 min-h-[400px]">
        {activeTab === 'rotate' && <RotateTab />}
        {activeTab === 'scale' && <ScaleTab />}
        {activeTab === 'coords' && <CoordsTab />}
      </div>
    </div>
  );
}

function RotateTab() {
  const [angle, setAngle] = useState(0);
  const [useCenter, setUseCenter] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1 space-y-4">
        <h3 className="text-lg font-semibold m-0">永远的左上角</h3>
        <p className="text-muted-foreground text-sm m-0">
          SVG 的所有变换默认是以画布的绝对原点 <code>(0,0)</code> 为中心进行的！如果不指定中心点，图形会像被绳子拴在左上角一样甩出去。
        </p>
        
        <div className="space-y-4 mt-6">
          <div className="space-y-2">
            <label className="text-sm font-medium flex justify-between">
              <span>旋转角度: {angle}°</span>
            </label>
            <input 
              type="range" 
              min="0" max="360" 
              value={angle} 
              onChange={(e) => setAngle(Number(e.target.value))}
              className="w-full"
            />
          </div>
          
          <label className="flex items-center gap-3 cursor-pointer p-3 border border-border rounded-lg bg-muted/30">
            <input 
              type="checkbox" 
              checked={useCenter} 
              onChange={(e) => setUseCenter(e.target.checked)}
              className="w-4 h-4"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium">指定自身中心点</span>
              <code className="text-xs text-muted-foreground mt-1">
                {useCenter ? `rotate(${angle} 150 150)` : `rotate(${angle})`}
              </code>
            </div>
          </label>
        </div>
      </div>
      
      <div className="w-full md:w-80 aspect-square rounded-xl border border-border bg-muted/20 relative overflow-hidden flex items-start justify-start">
        {/* Origin marker */}
        <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-red-500 z-10" />
        <span className="absolute top-1 left-2 text-[10px] text-red-500 font-mono">(0,0)</span>
        
        <svg viewBox="0 0 300 300" className="w-full h-full overflow-visible">
          {/* Grid */}
          <defs>
            <pattern id="grid1" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid1)" />
          
          {/* Path trace for default rotation */}
          {!useCenter && angle > 0 && (
            <path 
              d="M 125 125 A 176.7 176.7 0 0 1 125 125" 
              fill="none" stroke="red" strokeWidth="1" strokeDasharray="4 4" className="opacity-30" 
            />
          )}

          {/* Target Element */}
          <g transform={useCenter ? `rotate(${angle} 150 150)` : `rotate(${angle})`} className="transition-transform duration-75">
            <rect x="125" y="125" width="50" height="50" rx="4" fill="currentColor" className="text-primary opacity-80" />
            <circle cx="150" cy="150" r="3" fill="white" />
          </g>
          
          {/* Ghost Element */}
          <rect x="125" y="125" width="50" height="50" rx="4" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-primary opacity-30" />
        </svg>
      </div>
    </div>
  );
}

function ScaleTab() {
  const [scale, setScale] = useState(1);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1 space-y-4">
        <h3 className="text-lg font-semibold m-0">缩放也会“跑走”</h3>
        <p className="text-muted-foreground text-sm m-0">
          缩放同样是以 <code>(0,0)</code> 为中心的。放大一个不在原点的图形，不仅变大，<strong>它距离原点的坐标也会成倍增加</strong>！
        </p>
        
        <div className="space-y-4 mt-6">
          <div className="space-y-2">
            <label className="text-sm font-medium flex justify-between">
              <span>缩放比例: {scale}x</span>
            </label>
            <input 
              type="range" 
              min="0.5" max="3" step="0.1"
              value={scale} 
              onChange={(e) => setScale(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="p-3 bg-muted/30 border border-border rounded-lg">
            <code className="text-xs block">
              &lt;rect x="100" y="50" transform="scale({scale})" /&gt;
            </code>
            <div className="text-xs text-muted-foreground mt-2 space-y-1">
              <div>实际渲染的 X: 100 × {scale} = {100 * scale}</div>
              <div>实际渲染的 Y: 50 × {scale} = {50 * scale}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full md:w-80 aspect-square rounded-xl border border-border bg-muted/20 relative overflow-hidden">
        <svg viewBox="0 0 300 300" className="w-full h-full overflow-visible">
          <defs>
            <pattern id="grid2" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid2)" />
          
          {/* Ghost Element */}
          <rect x="100" y="50" width="50" height="50" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-primary opacity-30" />
          
          {/* Target Element */}
          <g transform={`scale(${scale})`} className="transition-transform duration-75">
            <rect x="100" y="50" width="50" height="50" fill="currentColor" className="text-primary opacity-80" />
          </g>
          
          {/* Distance lines */}
          <line x1="0" y1="50" x2={100 * scale} y2="50" stroke="red" strokeWidth="1" strokeDasharray="2 2" className="transition-all duration-75" />
          <line x1="100" y1="0" x2="100" y2={50 * scale} stroke="red" strokeWidth="1" strokeDasharray="2 2" className="transition-all duration-75" />
        </svg>
      </div>
    </div>
  );
}

function CoordsTab() {
  const [scale, setScale] = useState(1);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1 space-y-4">
        <h3 className="text-lg font-semibold m-0">局部坐标系的真相</h3>
        <p className="text-muted-foreground text-sm m-0">
          <code>transform</code> 改变的并不是图形本身，而是<strong>改变了绘制这个图形的坐标系</strong>！
          放大坐标系时，网格（刻度）也被放大了，图形只是在新的网格中寻找自己的位置。
        </p>
        
        <div className="space-y-4 mt-6">
          <div className="space-y-2">
            <label className="text-sm font-medium flex justify-between">
              <span>放大坐标系: {scale}x</span>
            </label>
            <input 
              type="range" 
              min="1" max="3" step="0.1"
              value={scale} 
              onChange={(e) => setScale(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>
      
      <div className="w-full md:w-80 aspect-square rounded-xl border border-border bg-muted/20 relative overflow-hidden">
        <svg viewBox="0 0 300 300" className="w-full h-full overflow-visible">
          {/* Base Grid */}
          <defs>
            <pattern id="grid3" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
            </pattern>
            <pattern id="grid_local" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#3b82f6" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid3)" />
          
          {/* Local Transformed Coordinate System */}
          <g transform={`scale(${scale})`} className="transition-transform duration-75">
            <rect width="300" height="300" fill="url(#grid_local)" className="opacity-20" />
            
            <rect x="50" y="50" width="50" height="50" fill="currentColor" className="text-blue-500 opacity-80" />
            <text x="50" y="45" fontSize="10" fill="#3b82f6" fontWeight="bold">x=50, y=50</text>
          </g>
        </svg>
      </div>
    </div>
  );
}
