import { cn } from '@/lib/utils'
import React from 'react'

// ─── Page (root) ─────────────────────────────────────────────────────────────

interface PageProps {
  children: React.ReactNode
  className?: string
}

/**
 * Page
 *
 * Root container for every page body inside the shell layout.
 * Provides consistent vertical spacing between its child slots.
 *
 * Usage:
 *   <Page>
 *     <Page.Header>
 *       <Page.Title>Dashboard</Page.Title>
 *       <Page.Description>Your activity overview</Page.Description>
 *       <Page.Actions>
 *         <Button>Export</Button>
 *       </Page.Actions>
 *     </Page.Header>
 *     <Page.Content>...</Page.Content>
 *   </Page>
 */
const Page = ({ children, className }: PageProps) => (
  <div className={cn('flex flex-col gap-6', className)}>{children}</div>
)

// ─── Page.Header ─────────────────────────────────────────────────────────────

interface PageHeaderProps {
  children: React.ReactNode
  className?: string
}

/**
 * Page.Header
 *
 * Horizontal bar that holds Title, Description, and Actions.
 * Stacks vertically on small screens; switches to a row on sm+.
 */
const PageHeader = ({ children, className }: PageHeaderProps) => (
  <div
    className={cn(
      'flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between',
      className
    )}
  >
    {children}
  </div>
)

// ─── Page.Title ───────────────────────────────────────────────────────────────

interface PageTitleProps {
  children: React.ReactNode
  className?: string
  /** Rendered element — default h1 */
  as?: React.ElementType
}

const PageTitle = ({ children, className, as: Tag = 'h1' }: PageTitleProps) => (
  <Tag
    className={cn(
      'text-foreground text-2xl font-semibold tracking-tight',
      className
    )}
  >
    {children}
  </Tag>
)

// ─── Page.Description ─────────────────────────────────────────────────────────

interface PageDescriptionProps {
  children: React.ReactNode
  className?: string
}

const PageDescription = ({ children, className }: PageDescriptionProps) => (
  <p className={cn('text-muted-foreground text-sm', className)}>{children}</p>
)

// ─── Page.Heading (Title + Description stacked) ───────────────────────────────

interface PageHeadingProps {
  title: string
  description?: string
  className?: string
}

/**
 * Page.Heading
 *
 * Convenience wrapper that stacks Title and Description together.
 * Use inside Page.Header when you don't need to slot them separately.
 */
const PageHeading = ({ title, description, className }: PageHeadingProps) => (
  <div className={cn('flex flex-col gap-1', className)}>
    <PageTitle>{title}</PageTitle>
    {description && <PageDescription>{description}</PageDescription>}
  </div>
)

// ─── Page.Actions ─────────────────────────────────────────────────────────────

interface PageActionsProps {
  children: React.ReactNode
  className?: string
}

/**
 * Page.Actions
 *
 * Right-aligned slot for CTAs, filters, or toolbar items inside Page.Header.
 */
const PageActions = ({ children, className }: PageActionsProps) => (
  <div className={cn('flex shrink-0 items-center gap-2', className)}>
    {children}
  </div>
)

// ─── Page.Content ─────────────────────────────────────────────────────────────

interface PageContentProps {
  children: React.ReactNode
  className?: string
}

/**
 * Page.Content
 *
 * Main content area. Fills remaining vertical space.
 */
const PageContent = ({ children, className }: PageContentProps) => (
  <div className={cn('flex-1 flex flex-col gap-4', className)}>{children}</div>
)

// ─── Page.Section ─────────────────────────────────────────────────────────────

interface PageSectionProps {
  children: React.ReactNode
  className?: string
}

/**
 * Page.Section
 *
 * Optional sub-divider inside Page.Content for visually separating
 * groups of related content within the same page.
 */
const PageSection = ({ children, className }: PageSectionProps) => (
  <section className={cn('flex flex-col gap-4 ', className)}>{children}</section>
)

// ─── Compound assembly ────────────────────────────────────────────────────────

Page.Header = PageHeader
Page.Title = PageTitle
Page.Description = PageDescription
Page.Heading = PageHeading
Page.Actions = PageActions
Page.Content = PageContent
Page.Section = PageSection

export { Page }
export type {
  PageProps,
  PageHeaderProps,
  PageTitleProps,
  PageDescriptionProps,
  PageHeadingProps,
  PageActionsProps,
  PageContentProps,
  PageSectionProps
}
