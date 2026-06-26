import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'

import AppBreadcrumb, { type BreadcrumbSegment } from '@/components/shared/shell/breadcrumb'
import LanguageDropdown from '@/components/shadcn-studio/blocks/dropdown-language'
import ProfileDropdown from '@/components/shadcn-studio/blocks/dropdown-profile'

import FacebookIcon from '@/assets/svg/facebook-icon'
import InstagramIcon from '@/assets/svg/instagram-icon'
import LinkedinIcon from '@/assets/svg/linkedin-icon'
import TwitterIcon from '@/assets/svg/twitter-icon'

import {
  LanguagesIcon
} from 'lucide-react'
import React from 'react'

import { NAV_MAIN, NAV_PAGES, NAV_SUPPORT } from './shell.config'




interface ShellProps {
  children: React.ReactNode
  /**
   * Breadcrumb segments for the current page.
   * The last item is always rendered as the active (non-linked) crumb.
   *
   * @example [{ label: 'Home', href: '/' }, { label: 'Dashboard' }]
   */
  breadcrumbs?: BreadcrumbSegment[]
}

/**
 * Shell
 *
 * Full-page layout that renders the sidebar, header, footer, and a
 * `<main>` region. Only `children` and `breadcrumbs` change per route.
 *
 * Wrap your Next.js root layout (or a nested layout) with this component:
 *
 *   // app/dashboard/layout.tsx
 *   export default function DashboardLayout({ children }) {
 *     return (
 *       <Shell breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Dashboard' }]}>
 *         {children}
 *       </Shell>
 *     )
 *   }
 *
 * Each page file just renders its own content — no need to repeat chrome.
 */
const Shell = ({ children, breadcrumbs }: ShellProps) => {
  return (
    <div className='flex min-h-dvh w-full'>
      <SidebarProvider>

        {/* ── Sidebar ── */}
        <Sidebar>
          <SidebarContent>

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
                        <SidebarMenuBadge className='bg-primary/10 top-1/2! right-2 -translate-y-1/2! rounded-full'>
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
                      {item.badge != null && (
                        <SidebarMenuBadge className='bg-primary/10 top-1/2! right-2 -translate-y-1/2! rounded-full'>
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
        <div className='flex flex-1 flex-col'>

          {/* Header */}
          <header className='bg-card sticky top-0 z-50 border-b'>
            <div className='mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2 sm:px-6'>
              <div className='flex items-center gap-4'>
                <SidebarTrigger className='[&_svg]:size-5!' />
                {breadcrumbs?.length ? (
                  <>
                    <Separator
                      orientation='vertical'
                      className='hidden h-4! data-vertical:self-center sm:block'
                    />
                    <AppBreadcrumb
                      segments={breadcrumbs}
                      className='hidden sm:block'
                    />
                  </>
                ) : null}
              </div>

              <div className='flex items-center gap-1.5'>
                <LanguageDropdown
                  trigger={
                    <Button variant='ghost' size='icon-lg'>
                      <LanguagesIcon />
                    </Button>
                  }
                />
                <ProfileDropdown
                  trigger={
                    <Button variant='ghost' size='icon-lg'>
                      <Avatar className='size-[inherit] rounded-[inherit] after:rounded-[inherit]'>
                        <AvatarImage
                          src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png'
                          className='rounded-[inherit]'
                        />
                        <AvatarFallback className='rounded-[inherit]'>JD</AvatarFallback>
                      </Avatar>
                    </Button>
                  }
                />
              </div>
            </div>
          </header>

          {/* ── Page content slot ── */}
          <main className='mx-auto size-full max-w-7xl flex-1 px-4 py-6 sm:px-6'>
            {children}
          </main>

          {/* Footer */}
          <footer>
            <div className='text-muted-foreground mx-auto flex size-full max-w-7xl items-center justify-between gap-3 px-4 py-3 max-sm:flex-col sm:gap-6 sm:px-6'>
              <p className='text-sm text-balance max-sm:text-center'>
                {`©${new Date().getFullYear()}`}{' '}
                <a href='#' className='text-primary'>
                  shadcn/studio
                </a>
                , Made for better web design
              </p>
              <div className='flex items-center gap-5'>
                <a href='#'><FacebookIcon className='size-4' /></a>
                <a href='#'><InstagramIcon className='size-4' /></a>
                <a href='#'><LinkedinIcon className='size-4' /></a>
                <a href='#'><TwitterIcon className='size-4' /></a>
              </div>
            </div>
          </footer>

        </div>
      </SidebarProvider>
    </div>
  )
}

export { Shell }