'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  colorClass?: string; // optional color class for the icon/text e.g. "text-blue-500"
}

export default function StatsCard({ title, value, subtitle, icon, colorClass }: StatsCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.995 }}
      className="p-6 rounded-xl border border-gray-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/80 shadow-sm hover:shadow-md transition"
    >
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-white ${colorClass || 'bg-gray-200 dark:bg-gray-700'}`}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">{title}</h3>
            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">{value}</div>
          </div>
          {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
        </div>
      </div>
    </motion.div>
  );
}