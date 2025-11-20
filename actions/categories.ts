'use server';

import { prisma } from '@/lib/prisma';
import { CATEGORIES } from '@/lib/constants';

export async function ensureCategoriesExist() {
  try {
    for (const category of CATEGORIES) {
      await prisma.category.upsert({
        where: { name: category },
        update: {},
        create: { name: category },
      });
    }
  } catch (error) {
    console.error('❌ Error ensuring categories exist:', error);
  }
}

// Get all categories with their message counts
export async function getAllCategoriesWithCount() {
  await ensureCategoriesExist();

  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { messages: true },
      },
    },
    orderBy: { name: 'asc' },
  });

  // Format data for the frontend
  return categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    messageCount: cat._count.messages,
  }));
}

// Get message counts for each category within the last 30 days
export async function getCategoryMessageCountsLast30Days() {
  await ensureCategoriesExist();

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const categories = await prisma.category.findMany({
    include: {
      messages: {
        where: {
          createdAt: { gte: thirtyDaysAgo },
        },
      },
    },
    orderBy: { name: 'asc' },
  });

  return categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    messageCount: cat.messages.length,
  }));
}