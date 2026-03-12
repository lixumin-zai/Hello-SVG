'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';

export function ReusePlayground() {
  // Source definition state
  const [defColor, setDefColor] = useState('#3b82f6');
  const [defShape, setDefShape] = useState<'circle' | 'rect' | 'star'>('circle');
  
  // Instance state
  const [instances, setInstances] = useState([
    { id: 1, x: 50, y: 50, color: '', scale: 1 },
    { id: 2, x: 150, y: 50, color: '#ef4444', scale: 0.8 }, // Override color
    { id: 3, x: 100, y: 130, color: '#22c55e', scale: 1.2 }  // Override color
  ]);

  return (
    <div className="my-8 flex flex-col gap-6 rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-lg">The Cloning Machine (&lt;use&gt;)</h3>
        <p className="text-sm text-muted-foreground">
          Edit the Master Definition (Source) and watch all Instances update instantly.
          Instances can also have their own position and transformations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
            <h4 className="font-medium text-sm border-b pb-2 mb-2 flex items-center gap-2">
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Master</span>
              Definition (in &lt;defs&gt;)
            </h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium">Shape</label>
                <div className="flex bg-muted rounded p-1">
                  {(['circle', 'rect', 'star'] as const).map(s => (
                    <button
                      key={s}
                      onClick={() => setDefShape(s)}
                      className={cn(
                        "flex-1 px-2 py-1 text-xs rounded transition-colors capitalize",
                        defShape === s ? "bg-white shadow text-primary" : "text-muted-foreground"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium">Default Color</label>
                <input 
                  type="color" 
                  value={defColor}
                  onChange={(e) => setDefColor(e.target.value)}
                  className="w-full h-8 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-sm">Code Preview</h4>
            <div className="rounded bg-zinc-950 p-4 text-xs text-zinc-50 font-mono overflow-x-auto whitespace-pre">
{`<svg>
  <defs>
    <${defShape === 'circle' ? 'circle r="20"' : defShape === 'rect' ? 'rect width="40" height="40" x="-20" y="-20"' : 'polygon points="..."'} 
      id="master-shape" 
      fill="${defColor}" 
    />
  </defs>

  <!-- Instances -->
${instances.map(inst => `  <use href="#master-shape" 
       x="${inst.x}" y="${inst.y}" 
       transform="scale(${inst.scale})" 
       ${inst.color ? `style="fill: ${inst.color}"` : ''} 
  />`).join('\n')}
</svg>`}
            </div>
            <p className="text-[10px] text-muted-foreground">
              Note: <code className="bg-muted px-1 rounded">style="fill: ..."</code> on &lt;use&gt; only works if the master shape DOES NOT have a fill attribute, or uses <code className="bg-muted px-1 rounded">fill="currentColor"</code>. 
              In this demo, we simulate inheritance rules.
            </p>
          </div>
        </div>

        {/* Preview */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square w-full overflow-hidden rounded border bg-white shadow-inner">
            <svg
              viewBox="0 0 200 200"
              className="h-full w-full block"
            >
              <defs>
                {/* The Master Shape */}
                <g id="master-shape">
                  {defShape === 'circle' && <circle r="20" />}
                  {defShape === 'rect' && <rect width="40" height="40" x="-20" y="-20" rx="5" />}
                  {defShape === 'star' && <polygon points="0,-20 6,-7 20,-7 9,2 13,16 0,8 -13,16 -9,2 -20,-7 -6,-7" />}
                </g>
              </defs>

              {/* Grid */}
              <defs>
                <pattern id="grid-reuse" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="gray" strokeWidth="0.5" strokeOpacity="0.2"/>
                </pattern>
              </defs>
              <rect width="200" height="200" fill="url(#grid-reuse)" pointerEvents="none" />

              {instances.map(inst => (
                <g key={inst.id} transform={`translate(${inst.x}, ${inst.y}) scale(${inst.scale})`}>
                  {/* We use a Group to simulate the <use> element for React rendering, 
                      but visually it behaves same as <use> */}
                  
                  {/* Connecting line to show origin (Visual Aid) */}
                  <line x1={-inst.x/inst.scale} y1={-inst.y/inst.scale} x2="0" y2="0" stroke="blue" strokeOpacity="0.1" strokeDasharray="2" />
                  
                  <use 
                    href="#master-shape" 
                    fill={inst.color || defColor} // React way of simulating CSS inheritance for demo
                    // In real SVG: if master has fill="red", <use fill="blue"> won't override it unless master has fill="currentColor" or no fill.
                    // For this playground, we assume users want to see the override effect.
                  />
                  
                  <text y="35" fontSize="10" textAnchor="middle" fill="#666">Instance {inst.id}</text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
