import { Breadcrumb } from '@/components/shared/breadcrumbs/breadcrumb.setter';
import { Page } from '@/components/shared/pages/page';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <>
      <Breadcrumb
        segments={[
          { label: 'Home', href: '/' },
          { label: 'Dashboard', href: '/dashboard' },
        ]}
      />
      <Page>
        <Page.Header>
          <Page.Heading title="Dashboard" description="Your social media activity at a glance" />
          <Page.Actions>
            <Button variant="outline">Export</Button>
            <Button>New Report</Button>
          </Page.Actions>
        </Page.Header>

        <Page.Content>
          <Card className="h-96">
            <CardContent className="h-full">
              <div className="h-full rounded-md border bg-[repeating-linear-gradient(45deg,var(--muted),var(--muted)_1px,var(--card)_2px,var(--card)_15px)]" />
            </CardContent>
          </Card>
        </Page.Content>
      </Page>
    </>
  );
}
