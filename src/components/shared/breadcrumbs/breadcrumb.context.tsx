'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { BreadcrumbSegment } from './breadcrumb';

// ─── Context ──────────────────────────────────────────────────────────────────

interface BreadcrumbContextValue {
  segments: BreadcrumbSegment[];
  setSegments: (segments: BreadcrumbSegment[]) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export const BreadcrumbProvider = ({ children }: { children: React.ReactNode }) => {
  const [segments, setSegmentsState] = useState<BreadcrumbSegment[]>([]);

  const setSegments = useCallback((next: BreadcrumbSegment[]) => {
    setSegmentsState(next);
  }, []);

  return (
    <BreadcrumbContext.Provider value={{ segments, setSegments }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

// ─── Internal hook (used by Shell to read) ────────────────────────────────────

export function useBreadcrumbSegments(): BreadcrumbSegment[] {
  const ctx = useContext(BreadcrumbContext);
  if (!ctx) throw new Error('useBreadcrumbSegments must be used inside BreadcrumbProvider');
  return ctx.segments;
}

// ─── Public hook (used by pages to write) ────────────────────────────────────

export function useBreadcrumb() {
  const ctx = useContext(BreadcrumbContext);
  if (!ctx) throw new Error('useBreadcrumb must be used inside BreadcrumbProvider');
  return ctx.setSegments;
}
