import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { RasterVsVector } from './components/demos/basics/RasterVsVector';
import { TechComparisonExplorer } from './components/demos/basics/TechComparisonExplorer';
import { ViewBoxPlayground } from './components/demos/structure/ViewBoxPlayground';
import { EmbeddingMethodsLab } from './components/demos/structure/EmbeddingMethodsLab';
import { BasicShapesLab } from './components/demos/shapes/BasicShapesLab';
import { TextLab } from './components/demos/shapes/TextLab';
import { PathBuilder } from './components/demos/path/PathBuilder';
import { BezierCurvePlayground } from './components/demos/path/BezierCurvePlayground';
import { ArcPlayground } from './components/demos/path/ArcPlayground';
import { StrokePlayground } from './components/demos/style/StrokePlayground';
import { FillOpacityDemo } from './components/demos/style/FillOpacityDemo';
import { TransformPlayground } from './components/demos/transform/TransformPlayground';
import { GradientBuilder } from './components/demos/gradients/GradientBuilder';
import { PatternPlayground } from './components/demos/gradients/PatternPlayground';
import { FilterLab } from './components/demos/filters/FilterLab';
import { ClipMaskComparator } from './components/demos/clip-mask/ClipMaskComparator';
import { AnimationPlayground } from './components/demos/animation/AnimationPlayground';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    RasterVsVector,
    TechComparisonExplorer,
    ViewBoxPlayground,
    EmbeddingMethodsLab,
    BasicShapesLab,
    TextLab,
    PathBuilder,
    BezierCurvePlayground,
    ArcPlayground,
    StrokePlayground,
    FillOpacityDemo,
    TransformPlayground,
    GradientBuilder,
    PatternPlayground,
    FilterLab,
    ClipMaskComparator,
    AnimationPlayground,
    ...components,
  };
}
