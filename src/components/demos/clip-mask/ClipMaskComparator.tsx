'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';

export function ClipMaskComparator() {
  const [mode, setMode] = useState<'clip' | 'mask'>('clip');
  
  // Clip Path params
  const [clipShape, setClipShape] = useState<'circle' | 'rect' | 'text'>('circle');
  
  // Mask params
  const [maskType, setMaskType] = useState<'linear' | 'radial' | 'text'>('linear');
  const [maskColorStart, setMaskColorStart] = useState('#ffffff');
  const [maskColorEnd, setMaskColorEnd] = useState('#000000');

  return (
    <div className="my-8 flex flex-col gap-6 rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-lg">ClipPath vs. Mask</h3>
        <p className="text-sm text-muted-foreground">
          Compare how Clipping (vector crop) and Masking (luminance transparency) work.
        </p>
      </div>

      <div className="flex bg-muted rounded p-1">
        <button
          onClick={() => setMode('clip')}
          className={cn(
            "flex-1 px-3 py-1.5 text-sm font-medium rounded transition-colors",
            mode === 'clip' ? "bg-white shadow text-primary" : "text-muted-foreground"
          )}
        >
          clip-path (Hard Edge)
        </button>
        <button
          onClick={() => setMode('mask')}
          className={cn(
            "flex-1 px-3 py-1.5 text-sm font-medium rounded transition-colors",
            mode === 'mask' ? "bg-white shadow text-primary" : "text-muted-foreground"
          )}
        >
          mask (Soft Edge)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          {mode === 'clip' ? (
            <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
              <h4 className="font-medium text-sm border-b pb-2 mb-2">Clip Shape</h4>
              <div className="flex gap-2">
                {(['circle', 'rect', 'text'] as const).map(s => (
                  <button
                    key={s}
                    onClick={() => setClipShape(s)}
                    className={cn(
                      "px-3 py-1 text-xs rounded border transition-colors capitalize",
                      clipShape === s ? "bg-primary text-primary-foreground border-primary" : "bg-background"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Clipping only cares about the <strong>geometry</strong>. Everything inside the shape is visible; everything outside is hidden. Colors don't matter.
              </p>
            </div>
          ) : (
            <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
              <h4 className="font-medium text-sm border-b pb-2 mb-2">Mask Content</h4>
              <div className="flex gap-2 mb-4">
                {(['linear', 'radial', 'text'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setMaskType(t)}
                    className={cn(
                      "px-3 py-1 text-xs rounded border transition-colors capitalize",
                      maskType === t ? "bg-primary text-primary-foreground border-primary" : "bg-background"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium">Start Color (White=Opaque)</label>
                  <input 
                    type="color" 
                    value={maskColorStart} 
                    onChange={(e) => setMaskColorStart(e.target.value)}
                    className="w-full h-8 rounded cursor-pointer"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium">End Color (Black=Transparent)</label>
                  <input 
                    type="color" 
                    value={maskColorEnd} 
                    onChange={(e) => setMaskColorEnd(e.target.value)}
                    className="w-full h-8 rounded cursor-pointer"
                  />
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground mt-2">
                Masking uses <strong>luminance</strong> (brightness). <br/>
                White = Fully Visible <br/>
                Black = Fully Transparent <br/>
                Gray = Semi-transparent
              </p>
            </div>
          )}

          <div className="space-y-2">
            <h4 className="font-medium text-sm">Code</h4>
            <div className="rounded bg-zinc-950 p-4 text-xs text-zinc-50 font-mono overflow-x-auto whitespace-pre">
              {mode === 'clip' ? 
`<clipPath id="myClip">
  ${clipShape === 'circle' ? '<circle cx="100" cy="100" r="80" />' : 
    clipShape === 'rect' ? '<rect x="50" y="50" width="100" height="100" />' : 
    '<text x="100" y="120" fontSize="80" fontWeight="bold">SVG</text>'}
</clipPath>

<image clip-path="url(#myClip)" ... />` 
: 
`<mask id="myMask">
  ${maskType === 'linear' ? 
    `<linearGradient id="g">
    <stop offset="0" stop-color="${maskColorStart}" />
    <stop offset="1" stop-color="${maskColorEnd}" />
  </linearGradient>
  <rect width="100%" height="100%" fill="url(#g)" />` : 
  maskType === 'radial' ?
    `<radialGradient id="g">
    <stop offset="0" stop-color="${maskColorStart}" />
    <stop offset="1" stop-color="${maskColorEnd}" />
  </radialGradient>
  <rect width="100%" height="100%" fill="url(#g)" />` :
    `<text x="100" y="120" fontSize="80" fontWeight="bold" fill="white">SVG</text>`}
</mask>

<image mask="url(#myMask)" ... />`}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square w-full overflow-hidden rounded border bg-white shadow-inner">
             {/* Checkerboard for transparency */}
             <div 
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: `linear-gradient(45deg, #000 25%, transparent 25%), 
                                  linear-gradient(-45deg, #000 25%, transparent 25%), 
                                  linear-gradient(45deg, transparent 75%, #000 75%), 
                                  linear-gradient(-45deg, transparent 75%, #000 75%)`,
                backgroundSize: `20px 20px`,
                backgroundPosition: `0 0, 0 10px, 10px -10px, -10px 0px`
              }}
            />

            <svg
              viewBox="0 0 200 200"
              className="absolute inset-0 h-full w-full block"
            >
              <defs>
                <clipPath id="demo-clip">
                  {clipShape === 'circle' && <circle cx="100" cy="100" r="80" />}
                  {clipShape === 'rect' && <rect x="50" y="50" width="100" height="100" rx="10" />}
                  {clipShape === 'text' && <text x="100" y="130" fontSize="100" fontWeight="bold" textAnchor="middle">SVG</text>}
                </clipPath>

                <mask id="demo-mask">
                  {maskType === 'linear' && (
                    <>
                      <linearGradient id="mask-grad-l" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0" stopColor={maskColorStart} />
                        <stop offset="1" stopColor={maskColorEnd} />
                      </linearGradient>
                      <rect width="200" height="200" fill="url(#mask-grad-l)" />
                    </>
                  )}
                  {maskType === 'radial' && (
                    <>
                      <radialGradient id="mask-grad-r" cx="0.5" cy="0.5" r="0.5">
                        <stop offset="0" stopColor={maskColorStart} />
                        <stop offset="1" stopColor={maskColorEnd} />
                      </radialGradient>
                      <rect width="200" height="200" fill="url(#mask-grad-r)" />
                    </>
                  )}
                  {maskType === 'text' && (
                    <>
                       {/* Background for mask is usually black (transparent) */}
                       <rect width="200" height="200" fill="black" />
                       <text x="100" y="130" fontSize="100" fontWeight="bold" textAnchor="middle" fill="white">SVG</text>
                    </>
                  )}
                </mask>
              </defs>

              {/* The Target Image */}
              <image 
                href="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                width="200" 
                height="200" 
                preserveAspectRatio="xMidYMid slice"
                clipPath={mode === 'clip' ? 'url(#demo-clip)' : undefined}
                mask={mode === 'mask' ? 'url(#demo-mask)' : undefined}
              />
              
              {/* Optional: Show outline of the shape for clarity */}
              {mode === 'clip' && (
                 <g pointerEvents="none" stroke="red" strokeWidth="1" strokeDasharray="4 2" fill="none" opacity="0.5">
                    {clipShape === 'circle' && <circle cx="100" cy="100" r="80" />}
                    {clipShape === 'rect' && <rect x="50" y="50" width="100" height="100" rx="10" />}
                 </g>
              )}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
