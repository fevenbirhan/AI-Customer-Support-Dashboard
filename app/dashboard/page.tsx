import { prisma } from '@/lib/prisma';
import StatsCard from '@/components/StatsCard';
import Link from 'next/link';
import { Inbox, MessageSquare, Brain, ArrowUpRight } from 'lucide-react';

export default async function DashboardPage() {
  const categoryCount = await prisma.category.count();
  const messageCount = await prisma.message.count();

  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Welcome, Admin 👋</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          Here&apos;s an overview of your AI customer support activity.
        </p>
      </header>

      {/* ✨ Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Messages"
          value={messageCount}
          subtitle="Messages received (all time)"
          icon={<Inbox className="w-5 h-5" />}
          colorClass="bg-blue-500"
        />

        <StatsCard
          title="Categories"
          value={categoryCount}
          subtitle="Distinct categories available"
          icon={<MessageSquare className="w-5 h-5" />}
          colorClass="bg-green-500"
        />

        <StatsCard
          title="AI Insights"
          value="Live"
          subtitle="Quick insights & trends (30 days)"
          icon={<Brain className="w-5 h-5" />}
          colorClass="bg-purple-500"
        />
      </div>

      {/* Quick actions */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/dashboard/upload" className="group">
          <div className="p-4 rounded-lg border border-gray-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/80 hover:shadow-md transition flex items-center justify-between gap-3">
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-100">Upload Messages</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">Import or paste messages to categorize.</p>
            </div>
            <ArrowUpRight className="w-5 h-5 text-gray-500 dark:text-gray-300" />
          </div>
        </Link>

        <Link href="/dashboard/categories" className="group">
          <div className="p-4 rounded-lg border border-gray-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/80 hover:shadow-md transition flex items-center justify-between gap-3">
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-100">View Categories</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">See categories and message counts.</p>
            </div>
            <ArrowUpRight className="w-5 h-5 text-gray-500 dark:text-gray-300" />
          </div>
        </Link>

        <Link href="/dashboard/analysis" className="group">
          <div className="p-4 rounded-lg border border-gray-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/80 hover:shadow-md transition flex items-center justify-between gap-3">
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-100">Run Analysis</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">View message trends & charts.</p>
            </div>
            <ArrowUpRight className="w-5 h-5 text-gray-500 dark:text-gray-300" />
          </div>
        </Link>
      </section>
    </div>
  );
}