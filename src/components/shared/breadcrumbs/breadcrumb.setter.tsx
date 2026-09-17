'use client';

import { useEffect } from 'react';
import { useBreadcrumb } from './breadcrumb.context';
import type { BreadcrumbSegment } from './breadcrumb';

interface BreadcrumbProps {
  segments: BreadcrumbSegment[];
}

/**
 * Breadcrumb
 *
 * Declarative component that pushes segments into the Shell's breadcrumb slot.
 * Renders nothing — it's purely a side-effect that updates the Shell header.
 *
 * Mount it anywhere: a layout, a page, even inside a data-fetching component
 * once you have the real names. The last segment mounted wins.
 *
 * Usage:
 *   <Breadcrumb segments={[
 *     { label: 'Home',     href: '/' },
 *     { label: 'Projects', href: '/projects' },
 *     { label: project.name },
 *   ]} />
 */
export function Breadcrumb({ segments }: BreadcrumbProps) {
  const setSegments = useBreadcrumb();

  useEffect(() => {
    setSegments(segments);
    // Clear on unmount so stale crumbs don't bleed into the next route
    return () => setSegments([]);
    // Re-run only when the content meaningfully changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(segments)]);

  return null;
}
