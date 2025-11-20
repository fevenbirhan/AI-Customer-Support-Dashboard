import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import { requireAdmin } from '@/lib/checkUser';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  try {
    await requireAdmin();
  } catch {
    redirect('/not-authorized');
  }

  return (
    <div className="flex gap-6 mt-6">
      <Sidebar />
      <section className="flex-1">{children}</section>
    </div>
  );
}