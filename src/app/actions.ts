'use server';

import { optimize } from 'svgo';

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
                },
                'sortAttrs',
            ],
        });

        return result.data;
    } catch (error) {
        console.error('Failed to optimize SVG:', error);
        throw new Error('Failed to optimize SVG');
    }
}
