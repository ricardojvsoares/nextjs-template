import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import React from 'react';

export interface BreadcrumbSegment {
  label: string;
  href?: string;
}

interface AppBreadcrumbProps {
  segments: BreadcrumbSegment[];
  className?: string;
}

/**
 * AppBreadcrumb
 *
 * Renders a breadcrumb trail from an array of segments.
 * The last segment is always rendered as the current page (no link).
 * All other segments can optionally receive an `href`.
 *
 * Usage:
 *   <AppBreadcrumb
 *     segments={[
 *       { label: 'Home', href: '/' },
 *       { label: 'Dashboard', href: '/dashboard' },
 *       { label: 'Overview' },
 *     ]}
 *   />
 */
const AppBreadcrumb = ({ segments, className }: AppBreadcrumbProps) => {
  if (!segments.length) return null;

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;

          return (
            <React.Fragment key={`${segment.label}-${index}`}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{segment.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={segment.href ?? '#'}>{segment.label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default AppBreadcrumb;
