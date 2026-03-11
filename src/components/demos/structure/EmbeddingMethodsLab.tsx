'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';

const METHODS = [
  {
    id: 'inline',
    label: 'Inline SVG',
    code: '<svg>...</svg>',
    pros: ['Styleable with CSS', 'Interactive with JS', 'Fast (no extra HTTP request)'],
    cons: ['Can bloat HTML', 'No browser caching', 'CORS restricted for external files'],
    icon: '⚡'
  },
  {
    id: 'img',
    label: '<img> Tag',
    code: '<img src="icon.svg" />',
    pros: ['Cached by browser', 'Easy to use', 'Alt text for accessibility'],
    cons: ['No CSS styling inside', 'No scripting', 'Limited interaction'],
    icon: '🖼️'
  },
  {
    id: 'bg',
    label: 'CSS Background',
    code: 'background-image: url("icon.svg")',
    pros: ['Clean HTML', 'Good for decorative icons', 'Repeatable'],
    cons: ['Hardest to style', 'No accessibility', 'No scripts'],
    icon: '🎨'
  },
  {
    id: 'object',
    label: '<object> Tag',
    code: '<object data="icon.svg"></object>',
    pros: ['Cached', 'Supports internal scripts/CSS', 'Fallback content'],
    cons: ['Complex to manage', 'Not popular in modern web', 'SEO suboptimal'],
    icon: '📦'
  }
];

export function EmbeddingMethodsLab() {
  const [selected, setSelected] = useState(METHODS[0]);

  return (
    <div className="my-8 rounded-xl border bg-card p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-2">
        <h3 className="font-semibold text-lg">SVG Embedding Methods Explorer</h3>
        <p className="text-sm text-muted-foreground">
          Compare different ways to put SVG on your webpage.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {METHODS.map((m) => (
          <button
            key={m.id}
            onClick={() => setSelected(m)}
            className={cn(
              "flex flex-col items-center gap-2 rounded-lg border p-4 text-center transition-all hover:bg-muted/50",
              selected.id === m.id ? "border-primary bg-primary/5 ring-1 ring-primary" : "bg-background"
            )}
          >
            <span className="text-2xl">{m.icon}</span>
            <span className="text-xs font-medium">{m.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 animate-in fade-in slide-in-from-top-4 duration-300">
        <div className="rounded-lg bg-muted/40 p-6 border border-l-4 border-primary">
          <div className="flex flex-col gap-4">
            <div>
              <h4 className="font-bold text-primary flex items-center gap-2 mb-2">
                {selected.label}
                <span className="text-[10px] font-mono bg-primary/10 px-2 py-0.5 rounded text-primary uppercase">
                  {selected.code}
                </span>
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-green-600 flex items-center gap-1">
                  ✅ Pros
                </span>
                <ul className="list-disc list-inside text-sm space-y-1 text-foreground/80">
                  {selected.pros.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-red-600 flex items-center gap-1">
                  ❌ Cons
                </span>
                <ul className="list-disc list-inside text-sm space-y-1 text-foreground/80">
                  {selected.cons.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
