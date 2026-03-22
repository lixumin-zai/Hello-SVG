import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { MarkerLab } from '@/components/docs/11-markers/playground/MarkerLab';
import { AnimationLab } from '@/components/docs/12-animations/playground/AnimationLab';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,
    MarkerLab,
    AnimationLab,
  };
}
