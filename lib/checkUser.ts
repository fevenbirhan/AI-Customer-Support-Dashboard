import { currentUser } from '@clerk/nextjs/server';
import { prisma } from './prisma';

// This function ensures the Clerk user exists in the database
export const checkUser = async () => {
  const clerkUser = await currentUser();

  if (!clerkUser) return null;

  // Try to find the user in the database
  let user = await prisma.user.findUnique({
    where: { clerkUserId: clerkUser.id },
  });

  // If user not found, create a new one
  if (!user) {
    user = await prisma.user.create({
      data: {
        clerkUserId: clerkUser.id,
        name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim(),
        email: clerkUser.emailAddresses[0]?.emailAddress,
        // role will default to USER in schema
      },
    });
  }

  return user; // returns the Prisma user with its role
};

// Helper to check if user is admin
export const requireAdmin = async () => {
  const user = await checkUser();
  if (!user) throw new Error('Not signed in');
  if (user.role !== 'ADMIN') throw new Error('Forbidden: Admins only');
  return user;
};