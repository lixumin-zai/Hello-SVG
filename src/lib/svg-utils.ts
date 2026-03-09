export function optimizeSvg(svg: string): string {
    // Basic cleanup: remove empty text nodes and basic indenting.
    // A fully robust SVGO implementation on the client side without heavy dependencies is hard,
    // so we provide a safe, lightweight regex-based cleanup.
    let optimized = svg
        .replace(/>\s+</g, '><')
        .replace(/(<(?!\/)(?!\?)[^>]+>)\s*(?=<\/?)/g, '$1\n')
        .replace(/(<\/[^>]+>)\s*(?=<\/?)/g, '$1\n');

    const lines = optimized.split('\n');
    let indentLevel = 0;
    const formattedLines = lines.map(line => {
        let trimmed = line.trim();
        if (!trimmed) return null;

        let shouldDecrease = trimmed.startsWith('</');
        if (shouldDecrease) indentLevel = Math.max(0, indentLevel - 1);

        const indentedLine = '  '.repeat(indentLevel) + trimmed;

        if (!shouldDecrease && !trimmed.endsWith('/>') && !trimmed.startsWith('<?')) {
            indentLevel++;
        }

        return indentedLine;
    }).filter(Boolean);

    return formattedLines.join('\n');
}

export function toReactStyle(svg: string): string {
    // Converts basic SVG attributes to camelCase for React (e.g. fill-rule -> fillRule)
    let reactSvg = optimizeSvg(svg);
    const attributesToCamelCase = [
        'fill-rule', 'clip-rule', 'stroke-width', 'stroke-linecap',
        'stroke-linejoin', 'stroke-miterlimit', 'stroke-dasharray',
        'stroke-dashoffset', 'stop-color', 'stop-opacity', 'viewBox',
        'font-family', 'font-size', 'font-weight', 'text-anchor', 'xmlns:xlink'
    ];

    attributesToCamelCase.forEach(attr => {
        const camelAttr = attr.replace(/(?:-([a-z]))|(?::([a-z]))/g, g => (g[1] || g[2]).toUpperCase());
        const regex = new RegExp(`\\s+\\b\${attr}="`, 'gi');
        reactSvg = reactSvg.replace(regex, ` \${camelAttr}="`);
    });

    // Handle 'class' -> 'className'
    reactSvg = reactSvg.replace(/\s+class="/g, ' className="');

    return reactSvg;
}

export function toReactNative(svg: string): string {
    let rnSvg = toReactStyle(svg);

    // Replace standard tags with react-native-svg equivalents
    const tagMap: Record<string, string> = {
        '<svg': '<Svg', '</svg>': '</Svg>',
        '<path': '<Path', '</path>': '</Path>',
        '<circle': '<Circle', '</circle>': '</Circle>',
        '<rect': '<Rect', '</rect>': '</Rect>',
        '<line': '<Line', '</line>': '</Line>',
        '<polygon': '<Polygon', '</polygon>': '</Polygon>',
        '<polyline': '<Polyline', '</polyline>': '</Polyline>',
        '<g': '<G', '</g>': '</G>',
        '<defs': '<Defs', '</defs>': '</Defs>',
        '<linearGradient': '<LinearGradient', '</linearGradient>': '</LinearGradient>',
        '<radialGradient': '<RadialGradient', '</radialGradient>': '</RadialGradient>',
        '<stop': '<Stop', '</stop>': '</Stop>',
        '<text': '<Text', '</text>': '</Text>',
        '<tspan': '<TSpan', '</tspan>': '</TSpan>',
        '<clipPath': '<ClipPath', '</clipPath>': '</ClipPath>'
    };

    Object.keys(tagMap).forEach(tag => {
        const regex = new RegExp(tag + '([\\s>])', 'g');
        rnSvg = rnSvg.replace(regex, tagMap[tag] + '$1');
    });

    return rnSvg;
}

export function toDataUri(svg: string): string {
    try {
        const encoded = typeof window !== 'undefined'
            ? window.btoa(unescape(encodeURIComponent(optimizeSvg(svg))))
            : '';
        return `data:image/svg+xml;base64,\${encoded}`;
    } catch (e) {
        return "Error generating Data URI";
    }
}
