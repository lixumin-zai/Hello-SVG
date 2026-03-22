'use client';

import { useState } from 'react';

// Simplified map data for demo purposes (A fictional continent)
const REGIONS = [
  { id: 'north', name: '北部高地', d: 'M150,50 L250,50 L280,120 L180,150 L120,100 Z', value: 85, color: '#3b82f6' },
  { id: 'east', name: '东方半岛', d: 'M280,120 L380,130 L350,220 L240,200 Z', value: 42, color: '#10b981' },
  { id: 'south', name: '南方群岛', d: 'M180,150 L240,200 L200,280 L100,250 L130,180 Z', value: 96, color: '#f59e0b' },
  { id: 'west', name: '西部荒野', d: 'M120,100 L180,150 L130,180 L50,150 Z', value: 15, color: '#ef4444' },
];

export function MapInteractiveVisualizer() {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* The SVG Map */}
        <div className="relative border rounded-lg bg-slate-50 dark:bg-slate-900 overflow-hidden">
          <svg viewBox="0 0 400 320" className="w-full h-full drop-shadow-xl">
            {/* Draw regions */}
            {REGIONS.map((region) => {
              const isHovered = hoveredRegion === region.id;
              // Dim others when one is hovered
              const opacity = hoveredRegion ? (isHovered ? 1 : 0.3) : 0.8;
              
              return (
                <path
                  key={region.id}
                  d={region.d}
                  fill={region.color}
                  stroke={isHovered ? "white" : "rgba(255,255,255,0.2)"}
                  strokeWidth={isHovered ? 3 : 1}
                  opacity={opacity}
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredRegion(region.id)}
                  onMouseLeave={() => setHoveredRegion(null)}
                />
              );
            })}
            
            {/* Draw labels on top */}
            <g className="pointer-events-none">
              <text x="200" y="100" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" className="drop-shadow-md">北部</text>
              <text x="310" y="170" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" className="drop-shadow-md">东方</text>
              <text x="170" y="230" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" className="drop-shadow-md">南方</text>
              <text x="100" y="145" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" className="drop-shadow-md">西部</text>
            </g>
          </svg>
        </div>

        {/* Data Dashboard */}
        <div className="flex flex-col justify-center">
          <h3 className="text-lg font-bold mb-6">实时数据大屏</h3>
          
          {hoveredRegion ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
              {REGIONS.filter(r => r.id === hoveredRegion).map(region => (
                <div key={region.id} className="p-4 rounded-xl border" style={{ borderColor: region.color, backgroundColor: `${region.color}15` }}>
                  <div className="text-sm text-muted-foreground mb-1">当前选中区域</div>
                  <div className="text-2xl font-bold" style={{ color: region.color }}>{region.name}</div>
                  
                  <div className="mt-4 pt-4 border-t border-current/20">
                    <div className="flex justify-between text-sm mb-1">
                      <span>经济活跃度</span>
                      <span className="font-mono font-bold">{region.value}/100</span>
                    </div>
                    <div className="h-2 w-full bg-background rounded-full overflow-hidden">
                      <div 
                        className="h-full transition-all duration-1000 ease-out" 
                        style={{ width: `${region.value}%`, backgroundColor: region.color }} 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-32 flex items-center justify-center border-2 border-dashed border-muted rounded-xl text-muted-foreground">
              请把鼠标悬停在左侧地图的色块上
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
