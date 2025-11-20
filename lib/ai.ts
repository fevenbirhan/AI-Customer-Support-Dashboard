import OpenAI from 'openai';
import { CATEGORIES } from './constants';

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY!,
  defaultHeaders: {
    'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    'X-Title': 'AI Customer Support Dashboard',
  },
});

// Suggest category for a single message
export async function categorizeMessage(text: string): Promise<string> {
  try {
    const numberedList = CATEGORIES.map((c, i) => `${i + 1}. ${c}`).join('\n');

    const prompt = `You are a strict classifier. Below is a numbered list of categories. For the message, reply with ONLY the single number that best matches (no text, no punctuation). If unsure, reply with the number for "Other".

Categories:
${numberedList}

Examples:
Message: "I was charged twice this month, please help."
Answer: 1
Message: "The app crashes on startup after the update."
Answer: 2

Now classify this message. Reply with ONLY the number.

Message: "${text.replace(/\n/g, ' ')}"
Answer:`;

    const completion = await openai.chat.completions.create({
      model: 'mistralai/mistral-7b-instruct:free',
      messages: [
        { role: 'system', content: 'You are an exact-output classifier. Reply with a single number only.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.0,
      max_tokens: 4,
      stop: ['\n'],
    });

    const raw = completion.choices?.[0]?.message?.content ?? '';

    // Try to parse a number from the model output
    const m = raw.trim().match(/(\d+)/);
    if (m) {
      const n = parseInt(m[1], 10);
      if (!Number.isNaN(n) && n >= 1 && n <= CATEGORIES.length) {
        return CATEGORIES[n - 1];
      }
    }

    // Fallback: tolerant name matching if model returned text instead of number
    const cleaned = (raw.split('\n')[0] || '').replace(/^[\s"'`:.]+|[\s"'`:.]+$/g, '').trim();
    const normalized = cleaned.toLowerCase();

    // 1) exact (case-insensitive)
    let matched = CATEGORIES.find((c) => c.toLowerCase() === normalized);

    // 2) substring (e.g. "billing" -> "Billing Issue")
    if (!matched) {
      matched = CATEGORIES.find((c) => normalized.includes(c.toLowerCase()) || c.toLowerCase().includes(normalized));
    }

    // 3) simple token-overlap fuzzy match
    if (!matched) {
      function tokenScore(cat: string, txt: string) {
        const catTokens = cat.toLowerCase().split(/\W+/).filter(Boolean);
        if (!catTokens.length) return 0;
        const hits = catTokens.filter((t) => txt.includes(t)).length;
        return hits / catTokens.length;
      }

      let best: { cat?: string; score: number } = { score: 0 };
      for (const c of CATEGORIES) {
        const s = tokenScore(c, normalized);
        if (s > best.score) best = { cat: c, score: s };
      }
      if (best.score >= 0.5) matched = best.cat;
    }

    return matched || 'Other';
  } catch (error) {
    console.error('❌ Error categorizing message:', error);
    return 'Other';
  }
}

// Generate AI reply for a message
export async function generateAIReply(messageText: string): Promise<string> {
  try {
    const prompt = `
You are a professional and concise customer support assistant.
Write ONE friendly, natural-sounding sentence to reply to the following customer message.
Keep it short (under 25 words) and empathetic.

Customer message:
"${messageText}"
`;

    const completion = await openai.chat.completions.create({
      model: 'mistralai/mistral-7b-instruct:free',
      messages: [
        { role: 'system', content: 'You are a helpful customer support assistant.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 60,
    });

    return completion.choices?.[0]?.message?.content?.trim() ?? 'Thank you for reaching out to us!';
  } catch (error) {
    console.error('❌ Error generating AI reply:', error);
    return 'Sorry, I could not generate a reply right now.';
  }
}