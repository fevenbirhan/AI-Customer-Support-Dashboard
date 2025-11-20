'use client';

interface AIReplyCardProps {
  reply: string;
}

export default function AIReplyCard({ reply }: AIReplyCardProps) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mt-3">
      <p className="text-sm text-gray-800">
        <strong>AI Suggestion:</strong> {reply}
      </p>
    </div>
  );
}