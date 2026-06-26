import {
    ChartNoAxesCombinedIcon,
    ChartSplineIcon,
    UsersIcon,
    ChartPieIcon,
    HashIcon,
    ArrowRightLeftIcon,
    Clock9Icon,
    ClipboardListIcon,
    CrownIcon,
    SquareActivityIcon,
    CalendarClockIcon,
    Undo2Icon,
    SettingsIcon,
  } from 'lucide-react'

const NAV_MAIN = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: ChartNoAxesCombinedIcon,
      badge: 5
    }
  ]
  
  const NAV_PAGES = [
    { label: 'Content Performance', href: '#', icon: ChartSplineIcon },
    { label: 'Audience Insight', href: '#', icon: UsersIcon },
    { label: 'Engagement Metrics', href: '#', icon: ChartPieIcon },
    { label: 'Hashtag Performance', href: '#', icon: HashIcon, badge: 3 },
    { label: 'Competitor Analysis', href: '#', icon: ArrowRightLeftIcon },
    { label: 'Campaign Tracking', href: '#', icon: Clock9Icon },
    { label: 'Sentiment Tracking', href: '#', icon: ClipboardListIcon },
    { label: 'Influencer', href: '#', icon: CrownIcon }
  ]
  
  const NAV_SUPPORT = [
    { label: 'Real Time Monitoring', href: '#', icon: SquareActivityIcon },
    { label: 'Schedule Post & Calendar', href: '#', icon: CalendarClockIcon },
    { label: 'Report & Export', href: '#', icon: Undo2Icon },
    { label: 'Settings & Integrations', href: '#', icon: SettingsIcon },
    { label: 'User Management', href: '#', icon: UsersIcon }
  ]

export { NAV_MAIN, NAV_PAGES, NAV_SUPPORT }
