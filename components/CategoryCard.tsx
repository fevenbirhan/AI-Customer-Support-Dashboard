'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface CategoryCardProps {
  id: string;
  name: string;
  messageCount: number;
}

export default function CategoryCard({ id, name, messageCount }: CategoryCardProps) {
  const router = useRouter();

  return (
    <Card className="p-4 shadow-md hover:shadow-lg transition-shadow duration-200 bg-white dark:bg-gray-800">
      <CardContent className="flex flex-col gap-3">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {messageCount} {messageCount === 1 ? 'message' : 'messages'}
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => router.push(`/dashboard/categories/${id}`)}
          className="w-fit mt-auto"
        >
          Show Details
        </Button>
      </CardContent>
    </Card>
  );
}