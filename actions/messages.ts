'use server';

import { prisma } from '@/lib/prisma';
import { ensureCategoriesExist } from './categories';
import { suggestCategory } from './suggestCategory';
import { generateAIReply } from '@/lib/ai';

export async function uploadMessages(messageTexts: string[]) {
  if (!messageTexts || messageTexts.length === 0) return [];

  await ensureCategoriesExist();

  const savedMessages = [];

  for (const text of messageTexts) {
    const { category } = await suggestCategory(text);

    const categoryRecord = await prisma.category.findUnique({
      where: { name: category },
    });

    const message = await prisma.message.create({
      data: {
        text,
        categoryId: categoryRecord?.id,
      },
    });

    // 🪄 Convert Prisma Date to string for serialization
    savedMessages.push({
      ...message,
      createdAt: message.createdAt.toISOString(),
    });
  }

  return savedMessages;
}

// Delete all messages older than 30 days
async function deleteOldMessages() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const deleted = await prisma.message.deleteMany({
    where: {
      createdAt: {
        lt: thirtyDaysAgo,
      },
    },
  });

  if (deleted.count > 0) {
    console.log(`Auto-deleted ${deleted.count} old messages`);
  }
}

// Get all messages under a specific category
export async function getMessagesByCategory(categoryId: string) {
  // First cleanup old messages
  await deleteOldMessages();

  const messages = await prisma.message.findMany({
    where: { categoryId },
    orderBy: { createdAt: 'desc' },
  });

  // Convert Date → string for serialization
  return messages.map((msg) => ({
    ...msg,
    createdAt: msg.createdAt.toISOString(),
  }));
}

// Manually delete a single message
export async function deleteMessage(id: string) {
  try {
    await prisma.message.delete({
      where: { id },
    });
    console.log(`Message ${id} deleted`);
    return { success: true };
  } catch (error) {
    console.error('❌ Error deleting message:', error);
    return { success: false, error: 'Failed to delete message' };
  }
}

// Generate and save AI reply for a message
export async function generateResponse(messageId: string) {
  try {
    const message = await prisma.message.findUnique({
      where: { id: messageId },
    });

    if (!message) throw new Error('Message not found');

    const aiReply = await generateAIReply(message.text);

    const updated = await prisma.message.update({
      where: { id: messageId },
      data: { aiReply },
    });

    return { success: true, aiReply: updated.aiReply };
  } catch (error) {
    console.error('❌ Error generating response:', error);
    return { success: false, error: 'Failed to generate AI reply' };
  }
}