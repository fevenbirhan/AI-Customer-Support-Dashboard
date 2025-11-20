import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function HomePage() {
  const user = await currentUser();

  if (user) {
    const dbUser = await prisma.user.findUnique({ where: { clerkUserId: user.id } });
    if (dbUser?.role === 'ADMIN') {
      redirect('/dashboard');
    }
  }

  return (
    <section className="mt-20 px-6 text-center">
      {/* HERO SECTION */}
      <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
        Manage Customer Messages with <br />
        <span className="bg-gradient-to-r from-emerald-500 to-blue-600 bg-clip-text text-transparent">
          AI-Powered Intelligence
        </span>
      </h1>

      <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 text-lg">
        Automatically categorize messages, generate smart replies, and gain insights —
        all in one unified admin workspace.
      </p>

      {/* CTA Buttons */}
      <div className="flex justify-center gap-4 mb-16">
        <Link
          href="/sign-up"
          className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition shadow-md"
        >
          Get Started
        </Link>
        <Link
          href="/sign-in"
          className="px-6 py-3 border border-emerald-600 text-emerald-600 dark:text-emerald-400 rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-800 transition"
        >
          Sign In
        </Link>
      </div>

      {/* FEATURES SECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition">
          <h3 className="font-semibold text-xl mb-2">🎯 AI Categorization</h3>
          <p className="text-sm text-muted-foreground">
            Organize messages instantly into categories using advanced AI models.
          </p>
        </div>
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition">
          <h3 className="font-semibold text-xl mb-2">💬 Smart Replies</h3>
          <p className="text-sm text-muted-foreground">
            Generate editable AI-suggested responses to speed up support.
          </p>
        </div>
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition">
          <h3 className="font-semibold text-xl mb-2">📊 Insights Dashboard</h3>
          <p className="text-sm text-muted-foreground">
            Understand message volume, trends, and performance at a glance.
          </p>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="max-w-3xl mx-auto text-center p-10 bg-card border border-border rounded-2xl shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Ready to streamline your customer support?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Start using AI to save time, improve accuracy, and enhance customer experience.
        </p>
        <Link
          href="/sign-up"
          className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition shadow-md"
        >
          Create Your Free Account
        </Link>
      </div>

      {/* --- FOOTER --- */}
      <footer className="mt-20 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} AI Customer Support Dashboard — All rights reserved.
      </footer>
    </section>
  );
}