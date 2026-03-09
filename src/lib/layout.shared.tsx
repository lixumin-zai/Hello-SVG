import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'Hello SVG',
    },
    links: [
      {
        text: 'Editor',
        url: '/app',
        active: 'nested-url',
      },
    ],
  };
}
