'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';

export function ViewBoxPlayground() {
  const [viewBoxX, setViewBoxX] = useState(0);
  const [viewBoxY, setViewBoxY] = useState(0);
  const [viewBoxW, setViewBoxW] = useState(100);
  const [viewBoxH, setViewBoxH] = useState(100);
  const [preserveAspectRatio, setPreserveAspectRatio] = useState('xMidYMid meet');
  const [align, setAlign] = useState('xMidYMid');
  const [meetOrSlice, setMeetOrSlice] = useState('meet');

  // Handle preserveAspectRatio changes
  const handleAlignChange = (val: string) => {
    setAlign(val);
    setPreserveAspectRatio(`${val} ${meetOrSlice}`);
  };

  const handleMeetSliceChange = (val: string) => {
    setMeetOrSlice(val);
    setPreserveAspectRatio(`${align} ${val}`);
  };

  return (
    <div className="my-8 flex flex-col gap-6 rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-lg">ViewBox Interactive Playground</h3>
        <p className="text-sm text-muted-foreground">
          Adjust the ViewBox parameters to see how the "camera" moves over the content.
          The content is a fixed 100x100 grid with a circle at (50,50).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="flex flex-col gap-6">
          <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
            <h4 className="font-medium text-sm">viewBox Parameters</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium">min-x: {viewBoxX}</label>
                <input
                  type="range"
                  min="-50"
                  max="150"
                  value={viewBoxX}
                  onChange={(e) => setViewBoxX(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium">min-y: {viewBoxY}</label>
                <input
                  type="range"
                  min="-50"
                  max="150"
                  value={viewBoxY}
                  onChange={(e) => setViewBoxY(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium">width: {viewBoxW}</label>
                <input
                  type="range"
                  min="10"
                  max="200"
                  value={viewBoxW}
                  onChange={(e) => setViewBoxW(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium">height: {viewBoxH}</label>
                <input
                  type="range"
                  min="10"
                  max="200"
                  value={viewBoxH}
                  onChange={(e) => setViewBoxH(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
            </div>
            
            <div className="pt-2 text-xs font-mono bg-muted p-2 rounded">
              viewBox="{viewBoxX} {viewBoxY} {viewBoxW} {viewBoxH}"
            </div>
          </div>

          <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
            <h4 className="font-medium text-sm">preserveAspectRatio</h4>
            
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-medium">Alignment</label>
                <select 
                  value={align}
                  onChange={(e) => handleAlignChange(e.target.value)}
                  className="w-full rounded border bg-background px-2 py-1 text-sm"
                >
                  <option value="none">none (Stretch to fit)</option>
                  <option value="xMinYMin">xMinYMin (Top Left)</option>
                  <option value="xMidYMid">xMidYMid (Center)</option>
                  <option value="xMaxYMax">xMaxYMax (Bottom Right)</option>
                  <option value="xMinYMid">xMinYMid (Left Center)</option>
                  <option value="xMaxYMid">xMaxYMid (Right Center)</option>
                </select>
              </div>

              {align !== 'none' && (
                <div className="space-y-1">
                  <label className="text-xs font-medium">Meet or Slice</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-sm">
                      <input 
                        type="radio" 
                        name="meetSlice" 
                        value="meet" 
                        checked={meetOrSlice === 'meet'}
                        onChange={(e) => handleMeetSliceChange(e.target.value)}
                      />
                      meet (Contain)
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input 
                        type="radio" 
                        name="meetSlice" 
                        value="slice" 
                        checked={meetOrSlice === 'slice'}
                        onChange={(e) => handleMeetSliceChange(e.target.value)}
                      />
                      slice (Cover)
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Visualizer */}
        <div className="flex flex-col gap-2">
          <div className="relative aspect-square w-full overflow-hidden rounded border bg-white shadow-inner ring-1 ring-black/5">
            {/* The SVG being manipulated */}
            <svg
              viewBox={`${viewBoxX} ${viewBoxY} ${viewBoxW} ${viewBoxH}`}
              preserveAspectRatio={preserveAspectRatio}
              className="h-full w-full block"
            >
              {/* Background Grid (The "World") */}
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="gray" strokeWidth="0.5" strokeOpacity="0.2"/>
                </pattern>
              </defs>
              
              {/* Coordinate System Origin Marker */}
              <rect x="-100" y="-100" width="300" height="300" fill="url(#grid)" />
              
              {/* Content */}
              <circle cx="50" cy="50" r="40" fill="#3b82f6" opacity="0.8" />
              <rect x="45" y="45" width="10" height="10" fill="white" />
              <text x="50" y="50" textAnchor="middle" dy="-10" fontSize="8" fill="white">Center (50,50)</text>
              
              {/* Origin Point */}
              <circle cx="0" cy="0" r="2" fill="red" />
              <text x="2" y="10" fontSize="8" fill="red">(0,0)</text>
              
              {/* Border of the 100x100 logical area */}
              <rect x="0" y="0" width="100" height="100" fill="none" stroke="black" strokeDasharray="4" strokeWidth="1" />
            </svg>

            {/* Overlay explaining what we see */}
            <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded pointer-events-none">
              Viewport (HTML Container)
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground text-center">
            The blue circle is fixed at (50,50) in the user coordinate system.
            <br/>Changing viewBox moves the "window" looking at it.
          </div>
        </div>
      </div>
    </div>
  );
}
