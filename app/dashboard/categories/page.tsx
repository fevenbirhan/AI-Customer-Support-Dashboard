import { getAllCategoriesWithCount } from '@/actions/categories';
import CategoryCard from '@/components/CategoryCard';

export default async function CategoriesPage() {
  const categories = await getAllCategoriesWithCount();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Categories
      </h1>

      {categories.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No categories found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              id={cat.id}
              name={cat.name}
              messageCount={cat.messageCount}
            />
          ))}
        </div>
      )}
    </div>
  );
}