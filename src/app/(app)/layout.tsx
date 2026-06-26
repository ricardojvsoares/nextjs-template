import { Shell } from '@/components/shared/shell/shell'

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Shell
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Dashboard' }        
      ]}
    >
      {children}
    </Shell>
  )
}