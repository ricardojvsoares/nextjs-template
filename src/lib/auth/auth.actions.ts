'use server';

import { logout } from '@/lib/api/auth/logout';
import { redirect } from 'next/navigation';

export async function logoutAction() {
  await logout();

  redirect('/login');
}
