import { createElement } from 'react';
import type { CMSPage } from '@/types/cms';

// All templates are loaded lazily via DynamicTemplateRenderer (next/dynamic).
// This keeps the initial client bundle for every page down to:
//   - Framework (React / Next.js)
//   - Layout (Header + Footer + StickyEstimateCta)
//   - DynamicTemplateRenderer (slug router, ~12 KB gzip)
//
// SectionRenderer and all section components (including react-markdown) are
// NOT in the initial bundle; they load only for the page type that needs them.
import { DynamicTemplateRenderer } from './DynamicTemplateRenderer';

export function renderTemplate(page: CMSPage) {
  return createElement(DynamicTemplateRenderer, { page });
}
