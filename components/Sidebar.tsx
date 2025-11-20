'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Upload, Folder, BarChart3 } from 'lucide-react';

const items = [
  { href: '/dashboard', label: 'Overview', icon: <Home size={18} /> },
  { href: '/dashboard/upload', label: 'Upload Messages', icon: <Upload size={18} /> },
  { href: '/dashboard/categories', label: 'Categories', icon: <Folder size={18} /> },
  { href: '/dashboard/analysis', label: 'Analysis', icon: <BarChart3 size={18} /> },
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside
      className="
        w-60 min-h-screen
        bg-card/70 backdrop-blur-md
        border-r border-border
        p-5 flex flex-col
        transition-colors duration-300
      "
    >
      {/* Title */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-foreground tracking-tight">
          Admin Panel
        </h2>
        <p className="text-xs text-muted-foreground">Manage the system</p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1.5">
        {items.map((item) => {
          const isActive = path === item.href;
          return (
            <motion.div
              key={item.href}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                  transition-all duration-200
                  ${
                    isActive
                      ? 'bg-primary/15 text-primary border border-primary/20'
                      : 'text-foreground hover:bg-muted/40 hover:text-primary'
                  }
                `}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </motion.div>
          );
        })}
      </nav>
    </aside>
  );
}