import { getMessagesByCategory } from '@/actions/messages';
import { prisma } from '@/lib/prisma';
import MessageCard from '@/components/MessageCard';
import { notFound } from 'next/navigation';

export default async function CategoryDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const category = await prisma.category.findUnique({
    where: { id },
  });

  if (!category) notFound();

  const messages = await getMessagesByCategory(id);

  return (
    <div className="space-y-6 p-4">
      <div className="border-b pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">{category.name}</h1>
        <p className="text-gray-500 text-sm dark:text-gray-200">
          Total Messages: {messages.length}
        </p>
      </div>

      {messages.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-200 italic text-center mt-10">
          No messages yet in this category.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {messages.map((msg) => (
            <MessageCard key={msg.id} message={msg} />
          ))}
        </div>
      )}
    </div>
  );
}