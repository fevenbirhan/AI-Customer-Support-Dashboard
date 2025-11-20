'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Message } from '@/types/Message';
import { deleteMessage, generateResponse } from '@/actions/messages';
import AIReplyCard from './AIReplyCard';
import { useRouter } from 'next/navigation';

interface MessageCardProps {
  message: Message;
}

export default function MessageCard({ message }: MessageCardProps) {
  const { id, text, aiReply: savedReply, createdAt } = message;
  const [aiReply, setAiReply] = useState(savedReply);
  const [feedback, setFeedback] = useState<string>(''); 
  const [isThinking, setIsThinking] = useState(false); // ✅ for suggest reply
  const [isDeleting, setIsDeleting] = useState(false); // ✅ for delete
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteMessage(id);
      setFeedback('✅ Message deleted successfully.');
      router.refresh();
    } catch (error) {
      console.error('Error deleting message:', error);
      setFeedback('❌ Failed to delete message.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSuggestReply = async () => {
    setIsThinking(true);
    setFeedback('🤖 Generating reply...');
    try {
      const res = await generateResponse(id);
      if (res.success) {
        setAiReply(res.aiReply);
        setFeedback('✅ AI reply generated successfully.');
        router.refresh();
      } else {
        setFeedback('❌ Failed to generate reply.');
      }
    } catch (error) {
      console.error('Error generating AI reply:', error);
      setFeedback('❌ Error generating reply.');
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <Card className="w-full border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-gray-800 dark:text-gray-200">
          Customer Message
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-gray-700 dark:text-gray-200">{text}</p>

        <p className="text-xs text-gray-500 dark:text-gray-200">
          Posted on {new Date(createdAt).toLocaleString()}
        </p>

        {/* Show AI reply if available */}
        {aiReply && <AIReplyCard reply={aiReply} />}

        <div className="flex gap-2 justify-end pt-2">
          <Button
            variant="outline"
            size="sm"
            className="text-blue-600 hover:text-blue-700"
            onClick={handleSuggestReply}
            disabled={isThinking || isDeleting}
          >
            {isThinking ? 'Thinking...' : 'Suggest Reply'}
          </Button>

          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isThinking || isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>

        {/* ✅ success or error message here */}
        {feedback && (
          <p
            className={`text-sm mt-3 font-medium ${
              feedback.startsWith('✅') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {feedback}
          </p>
        )}
      </CardContent>
    </Card>
  );
}