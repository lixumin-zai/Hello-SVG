'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/cn';

export function RasterVsVector() {
  const [zoom, setZoom] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw a circle on the low-res canvas
    // Canvas size is small (e.g., 50x50) to exaggerate pixelation
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, 50, 50);
    
    ctx.beginPath();
    ctx.arc(25, 25, 20, 0, 2 * Math.PI);
    ctx.fillStyle = '#3b82f6'; // blue-500
    ctx.fill();
    
    // Add some text
    ctx.fillStyle = 'white';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SVG', 25, 25);
  }, []);

  return (
    <div className="my-8 rounded-xl border bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">Raster vs. Vector Zoom</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Zoom: {zoom.toFixed(1)}x</span>
          <input
            type="range"
            min="1"
            max="10"
            step="0.1"
            value={zoom}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            className="w-32 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Raster Side */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Raster (Pixels)</span>
          <div className="relative h-48 w-48 overflow-hidden rounded border bg-white shadow-inner">
            <div 
              className="absolute left-1/2 top-1/2 origin-center"
              style={{ 
                transform: `translate(-50%, -50%) scale(${zoom * 4})`, // base scale 4 to fill 200px from 50px
                imageRendering: 'pixelated' 
              }}
            >
              <canvas 
                ref={canvasRef} 
                width={50} 
                height={50} 
                className="block"
              />
            </div>
            {/* Grid overlay to show pixels */}
            {zoom > 4 && (
              <div 
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px),
                                    linear-gradient(to bottom, #000 1px, transparent 1px)`,
                  backgroundSize: `${4 * zoom}px ${4 * zoom}px`,
                  backgroundPosition: `center`
                }}
              />
            )}
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Pixels become visible as you zoom in.
            <br/>Fixed resolution (50x50).
          </p>
        </div>

        {/* Vector Side */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Vector (Math)</span>
          <div className="relative h-48 w-48 overflow-hidden rounded border bg-white shadow-inner">
            <svg
              viewBox="0 0 50 50"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block"
              style={{ 
                width: 50 * zoom * 4,
                height: 50 * zoom * 4,
              }}
            >
              <circle cx="25" cy="25" r="20" fill="#3b82f6" />
              <text 
                x="25" 
                y="25" 
                textAnchor="middle" 
                dominantBaseline="middle" 
                fill="white" 
                fontSize="10" 
                fontFamily="sans-serif"
              >
                SVG
              </text>
            </svg>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Curves stay smooth at any scale.
            <br/>Mathematical definition.
          </p>
        </div>
      </div>
    </div>
  );
}
