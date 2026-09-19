'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

import AppBreadcrumb from '@/components/shared/breadcrumbs/breadcrumb';
import {
  BreadcrumbProvider,
  useBreadcrumbSegments,
} from '@/components/shared/breadcrumbs/breadcrumb.context';
import LanguageDropdown from '@/components/shared/shell/dropdown-language';
import ProfileDropdown from '@/components/shared/shell/dropdown-profile';

import { LanguagesIcon } from 'lucide-react';
import React from 'react';

import { NAV_HEADER, NAV_MAIN, NAV_PAGES, NAV_SUPPORT } from './shell.config';

type ShellUser = { displayName: string; email: string };

const ShellInner = ({ children, user }: { children: React.ReactNode; user?: ShellUser }) => {
  const breadcrumbs = useBreadcrumbSegments();

  return (
    <div className="flex h-dvh w-full overflow-hidden">
      <SidebarProvider>
        {/* ── Sidebar ── */}
        <Sidebar>
          <SidebarContent>
            <SidebarHeader>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton size="lg" asChild>
                    <a href={NAV_HEADER.href}>
                      <NAV_HEADER.icon />
                      <span>{NAV_HEADER.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarHeader>

            {/* Main */}
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {NAV_MAIN.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton asChild>
                        <a href={item.href}>
                          <item.icon />
                          <span>{item.label}</span>
                        </a>
                      </SidebarMenuButton>
                      {item.badge != null && (
                        <SidebarMenuBadge className="bg-primary/10 top-1/2! right-2 -translate-y-1/2! rounded-full">
                          {item.badge}
                        </SidebarMenuBadge>
                      )}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Pages */}
            <SidebarGroup>
              <SidebarGroupLabel>Pages</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {NAV_PAGES.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton asChild>
                        <a href={item.href}>
                          <item.icon />
                          <span>{item.label}</span>
                        </a>
                      </SidebarMenuButton>
                      {'badge' in item && item.badge != null && (
                        <SidebarMenuBadge className="bg-primary/10 top-1/2! right-2 -translate-y-1/2! rounded-full">
                          {item.badge}
                        </SidebarMenuBadge>
                      )}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Supporting Features */}
            <SidebarGroup>
              <SidebarGroupLabel>Supporting Features</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {NAV_SUPPORT.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton asChild>
                        <a href={item.href}>
                          <item.icon />
                          <span>{item.label}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* ── Shell body ── */}
        <div className="flex flex-1 flex-col min-h-0 overflow-hidden">
          {/* Header */}
          <header className="bg-card sticky top-0 z-50 border-b">
            <div className="mx-auto flex w-full items-center justify-between gap-6 px-4 py-2 sm:px-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="[&_svg]:size-5!" />
                {breadcrumbs.length > 0 && (
                  <>
                    <Separator
                      orientation="vertical"
                      className="hidden h-4! data-vertical:self-center sm:block"
                    />
                    <AppBreadcrumb segments={breadcrumbs} className="hidden sm:block" />
                  </>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <LanguageDropdown
                  trigger={
                    <Button variant="ghost" size="icon-lg">
                      <LanguagesIcon />
                    </Button>
                  }
                />
                <ProfileDropdown
                  user={user}
                  trigger={
                    <Button variant="ghost" size="icon-lg">
                      <Avatar className="size-[inherit] rounded-[inherit] after:rounded-[inherit]">
                        <AvatarImage
                          src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png"
                          className="rounded-[inherit]"
                        />
                        <AvatarFallback className="rounded-[inherit]">JD</AvatarFallback>
                      </Avatar>
                    </Button>
                  }
                />
              </div>
            </div>
          </header>

          {/* ── Page content slot ── */}
          <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
};

// ─── Shell (public) ───────────────────────────────────────────────────────────

interface ShellProps {
  children: React.ReactNode;
  user?: ShellUser;
}

/**
 * Shell
 *
 * Mount once in your root layout. Breadcrumbs are controlled independently
 * via the <Breadcrumb> component or the useBreadcrumb() hook — no prop needed here.
 *
 * // app/layout.tsx
 * export default function RootLayout({ children }) {
 *   return <Shell>{children}</Shell>
 * }
 */
const Shell = ({ children, user }: ShellProps) => (
  <BreadcrumbProvider>
    <ShellInner user={user}>{children}</ShellInner>
  </BreadcrumbProvider>
);

export { Shell };
