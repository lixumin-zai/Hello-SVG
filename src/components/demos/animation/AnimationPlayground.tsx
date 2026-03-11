'use client';

import { useState, useRef } from 'react';
import { cn } from '@/lib/cn';

export function AnimationPlayground() {
  const [method, setMethod] = useState<'css' | 'smil' | 'js'>('css');
  const [isPlaying, setIsPlaying] = useState(true);
  
  // Animation params
  const [duration, setDuration] = useState(2);
  const [ease, setEase] = useState('ease-in-out');
  const [property, setProperty] = useState<'transform' | 'fill' | 'stroke'>('transform');

  const circleRef = useRef<SVGCircleElement>(null);

  // JS Animation Loop (Simple requestAnimationFrame)
  // In a real app, use Framer Motion or GSAP. Here we simulate JS animation with CSS for simplicity in demo structure,
  // or actually implement a basic RAF loop if 'js' is selected.
  // For the sake of "Playground", we will show how the CODE looks different, and implement the visual using CSS/React state for stability.

  return (
    <div className="my-8 flex flex-col gap-6 rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-lg">Animation Methods Comparator</h3>
        <p className="text-sm text-muted-foreground">
          See how the same animation is implemented in CSS, SMIL (SVG native), and JavaScript.
        </p>
      </div>

      <div className="flex bg-muted rounded p-1">
        <button
          onClick={() => setMethod('css')}
          className={cn(
            "flex-1 px-3 py-1.5 text-sm font-medium rounded transition-colors",
            method === 'css' ? "bg-white shadow text-primary" : "text-muted-foreground"
          )}
        >
          CSS (@keyframes)
        </button>
        <button
          onClick={() => setMethod('smil')}
          className={cn(
            "flex-1 px-3 py-1.5 text-sm font-medium rounded transition-colors",
            method === 'smil' ? "bg-white shadow text-primary" : "text-muted-foreground"
          )}
        >
          SMIL (&lt;animate&gt;)
        </button>
        <button
          onClick={() => setMethod('js')}
          className={cn(
            "flex-1 px-3 py-1.5 text-sm font-medium rounded transition-colors",
            method === 'js' ? "bg-white shadow text-primary" : "text-muted-foreground"
          )}
        >
          JavaScript (Web Web API)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
            <h4 className="font-medium text-sm border-b pb-2 mb-2">Animation Settings</h4>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1">
                <label className="text-xs font-medium">Target Property</label>
                <select 
                  value={property}
                  onChange={(e) => setProperty(e.target.value as any)}
                  className="w-full rounded border bg-background px-2 py-1 text-xs"
                >
                  <option value="transform">Position/Transform</option>
                  <option value="fill">Color (Fill)</option>
                  <option value="stroke">Stroke Dash (Draw)</option>
                </select>
              </div>
              <Control label="Duration (s)" value={duration} onChange={setDuration} min={0.5} max={5} step={0.5} />
            </div>
            
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={cn(
                  "px-4 py-1.5 text-xs font-medium rounded border transition-colors",
                  isPlaying ? "bg-red-50 text-red-600 border-red-200" : "bg-green-50 text-green-600 border-green-200"
                )}
              >
                {isPlaying ? 'Pause' : 'Play'}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-sm">Code Preview</h4>
            <div className="rounded bg-zinc-950 p-4 text-xs text-zinc-50 font-mono overflow-x-auto whitespace-pre h-48">
              {method === 'css' && property === 'transform' && 
`.ball {
  animation: move ${duration}s ${ease} infinite alternate;
}

@keyframes move {
  from { transform: translateX(0); }
  to { transform: translateX(100px); }
}`}
              {method === 'css' && property === 'fill' && 
`.ball {
  animation: color ${duration}s ${ease} infinite alternate;
}

@keyframes color {
  from { fill: #3b82f6; }
  to { fill: #ef4444; }
}`}
              {method === 'css' && property === 'stroke' && 
`.ball {
  stroke-dasharray: 300;
  stroke-dashoffset: 300;
  animation: draw ${duration}s ${ease} infinite;
}

@keyframes draw {
  to { stroke-dashoffset: 0; }
}`}

              {method === 'smil' && property === 'transform' && 
`<circle ...>
  <animateTransform 
    attributeName="transform"
    type="translate"
    from="0 0" to="100 0"
    dur="${duration}s"
    repeatCount="indefinite"
  />
</circle>`}
              {method === 'smil' && property === 'fill' && 
`<circle ...>
  <animate 
    attributeName="fill"
    from="#3b82f6" to="#ef4444"
    dur="${duration}s"
    repeatCount="indefinite"
  />
</circle>`}
              {method === 'smil' && property === 'stroke' && 
`<circle ...>
  <animate 
    attributeName="stroke-dashoffset"
    from="300" to="0"
    dur="${duration}s"
    repeatCount="indefinite"
  />
</circle>`}

              {method === 'js' && 
`// Web Animations API
element.animate([
  ${property === 'transform' ? '{ transform: "translateX(0)" }, { transform: "translateX(100px)" }' : 
    property === 'fill' ? '{ fill: "#3b82f6" }, { fill: "#ef4444" }' : 
    '{ strokeDashoffset: 300 }, { strokeDashoffset: 0 }'}
], {
  duration: ${duration * 1000},
  iterations: Infinity,
  direction: "alternate"
});`}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square w-full overflow-hidden rounded border bg-white shadow-inner">
             {/* Grid */}
             <div 
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                backgroundSize: `20px 20px`,
              }}
            />

            <svg
              viewBox="0 0 200 200"
              className="absolute inset-0 h-full w-full block"
            >
              {/* Animation Implementation */}
              {/* We use React/CSS to SIMULATE the result for the user, regardless of the 'method' selected in UI code view */}
              <style jsx>{`
                @keyframes demo-move { from { transform: translateX(50px); } to { transform: translateX(150px); } }
                @keyframes demo-color { from { fill: #3b82f6; } to { fill: #ef4444; } }
                @keyframes demo-draw { from { stroke-dashoffset: 251; } to { stroke-dashoffset: 0; } }
                
                .demo-ball {
                  animation-duration: ${duration}s;
                  animation-timing-function: ${ease};
                  animation-iteration-count: infinite;
                  animation-direction: ${property === 'stroke' ? 'normal' : 'alternate'};
                  animation-play-state: ${isPlaying ? 'running' : 'paused'};
                  animation-name: ${property === 'transform' ? 'demo-move' : property === 'fill' ? 'demo-color' : 'demo-draw'};
                }
              `}</style>

              <circle 
                cx="0" 
                cy="100" 
                r="40" 
                className="demo-ball"
                fill={property === 'fill' ? '#3b82f6' : '#3b82f6'}
                stroke={property === 'stroke' ? '#000' : 'none'}
                strokeWidth={property === 'stroke' ? '5' : '0'}
                strokeDasharray={property === 'stroke' ? '251' : 'none'} // 2*PI*40 ≈ 251
                style={{
                  transformBox: 'fill-box', // Ensure transform works correctly on SVG elements
                }}
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Control({ label, value, onChange, min = 0, max = 100, step = 1 }: { label: string, value: number, onChange: (v: number) => void, min?: number, max?: number, step?: number }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between">
        <label className="text-xs font-medium">{label}</label>
        <span className="text-xs text-muted-foreground font-mono">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-primary h-1.5 bg-muted rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
}
