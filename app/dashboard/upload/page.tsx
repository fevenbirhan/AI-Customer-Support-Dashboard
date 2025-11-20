'use client';

import { useState } from 'react';
import { uploadMessages } from '@/actions/messages';
import { Loader2, Upload, FileText, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Message } from '@/types/Message';

export default function UploadPage() {
  const [textInput, setTextInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedMessages, setUploadedMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function handleCategorize() {
    try {
      setError(null);
      setIsLoading(true);

      const messages = textInput
        .split('\n')
        .map((msg) => msg.trim())
        .filter((msg) => msg.length > 0);

      if (messages.length === 0) {
        setError('Please enter or upload at least one message.');
        setIsLoading(false);
        return;
      }

      const result = await uploadMessages(messages);
      setUploadedMessages(result);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    setTextInput(text);
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="shadow-lg bg-white/90 dark:bg-slate-800/90 border border-gray-200 dark:border-slate-700">
        {/* added bg + border color for better dark mode */}
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-gray-100">
            {/* better dark mode text color */}
            <Upload className="w-5 h-5" /> Upload or Paste Messages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            className="w-full min-h-[200px] p-3 border rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       bg-gray-50 dark:bg-slate-900/70 text-gray-800 dark:text-gray-100 
                       placeholder:text-gray-400 dark:placeholder:text-gray-500"
            /* dark background and text/placeholder colors */
            placeholder="Paste one message per line..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
          <div className="flex items-center justify-between mt-4">
            <input
              type="file"
              accept=".txt"
              onChange={handleFileUpload}
              className="text-sm text-gray-600 dark:text-gray-300"
              /* visible file text in dark mode */
            />
            <Button
              onClick={handleCategorize}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Categorizing...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Categorize
                </>
              )}
            </Button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </CardContent>
      </Card>

      {/* categorized messages list now respects dark mode */}
      {uploadedMessages.length > 0 && (
        <Card className="bg-white/90 dark:bg-slate-800/90 border border-gray-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <FileText className="w-5 h-5" /> Categorized Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-gray-200 dark:divide-slate-700">
              {uploadedMessages.map((msg) => (
                <li key={msg.id} className="py-3">
                  <p className="font-medium text-gray-900 dark:text-gray-100">{msg.text}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Category:{' '}
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      {msg.categoryId ? 'Categorized' : 'Uncategorized'}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}