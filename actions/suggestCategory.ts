'use server';

import { categorizeMessage } from '@/lib/ai';

export async function suggestCategory(
  text: string
): Promise<{ category: string; error?: string }> {
  try {
    if (!text || text.trim().length < 3) {
      return { category: 'Other', error: 'Message too short for AI analysis' };
    }

    const category = await categorizeMessage(text.trim());
    return { category };
  } catch (error) {
    console.error('❌ Error in suggestCategory:', error);
    return { category: 'Other', error: 'AI failed to suggest category' };
  }
}