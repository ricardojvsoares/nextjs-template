import { Shell } from '@/components/shared/shell/shell';
import { requireUser } from '@/lib/auth/session';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();

  return <Shell user={{ displayName: user.displayName, email: user.email }}>{children}</Shell>;
}
