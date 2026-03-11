'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';

const SCENARIOS = [
  {
    id: 'icon',
    label: 'Icons & Logos',
    tech: 'SVG',
    reason: 'Resolution independence, small file size, CSS styling support.',
    icon: '🎨'
  },
  {
    id: 'chart',
    label: 'Interactive Charts',
    tech: 'SVG (D3.js)',
    reason: 'DOM elements allow easy event handling (hover, click) and accessibility.',
    icon: '📊'
  },
  {
    id: 'game-2d',
    label: 'High-Performance 2D Game',
    tech: 'Canvas',
    reason: 'Raster-based, optimized for rendering thousands of sprites per frame.',
    icon: '🎮'
  },
  {
    id: 'game-3d',
    label: '3D Experience',
    tech: 'WebGL / WebGPU',
    reason: 'Hardware acceleration for 3D geometry and shaders.',
    icon: '🧊'
  },
  {
    id: 'text',
    label: 'Typography Effects',
    tech: 'SVG',
    reason: 'Text remains selectable and searchable, path effects available.',
    icon: '🔤'
  }
];

export function TechComparisonExplorer() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="my-8 rounded-xl border bg-card p-6 shadow-sm">
      <h3 className="mb-4 font-semibold">Which technology should I use?</h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelected(s.id)}
            className={cn(
              "flex flex-col items-center gap-2 rounded-lg border p-4 text-center transition-colors hover:bg-muted/50",
              selected === s.id ? "border-primary bg-primary/5 ring-1 ring-primary" : "bg-background"
            )}
          >
            <span className="text-2xl">{s.icon}</span>
            <span className="text-sm font-medium">{s.label}</span>
          </button>
        ))}
      </div>

      {selected && (
        <div className="mt-6 animate-in fade-in slide-in-from-top-2">
          {SCENARIOS.filter(s => s.id === selected).map(s => (
            <div key={s.id} className="rounded-lg bg-muted/50 p-4 border-l-4 border-primary">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-lg text-primary">{s.tech}</span>
                <span className="text-muted-foreground text-sm">is recommended</span>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {s.reason}
              </p>
            </div>
          ))}
        </div>
      )}
      
      {!selected && (
        <div className="mt-6 p-4 text-center text-sm text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
          Select a scenario above to see the recommendation.
        </div>
      )}
    </div>
  );
}
