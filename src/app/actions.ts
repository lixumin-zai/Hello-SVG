'use server';

import { optimize } from 'svgo';
import katex from 'katex';

export async function latexToSvgAction(latex: string): Promise<string> {
    try {
        // KaTeX standard rendering produces HTML
        const htmlString = katex.renderToString(latex, {
            displayMode: true,
            throwOnError: false,
        });
        
        // Wrap the HTML output in an SVG <foreignObject> so it can be used as an SVG.
        // Note: To render properly in <foreignObject>, the client needs KaTeX CSS.
        const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <foreignObject width="100%" height="100%">
    <div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">
      ${htmlString}
    </div>
  </foreignObject>
</svg>`;

        return svgString;
    } catch (error) {
        console.error('Failed to convert LaTeX to SVG via KaTeX:', error);
        return `<svg viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
            <text x="20" y="50" fill="red" font-family="monospace">Error converting LaTeX</text>
        </svg>`;
    }
}

export async function optimizeSvgAction(svgCode: string): Promise<string> {
    try {
        const result = optimize(svgCode, {
            multipass: true,
            plugins: [
                {
                    name: 'preset-default',
                    params: {
                        overrides: {
                            removeViewBox: false,
                        },
                    },
                } as any,
                'sortAttrs',
            ],
        });

        return result.data;
    } catch (error) {
        console.error('Failed to optimize SVG:', error);
        throw new Error('Failed to optimize SVG');
    }
}
