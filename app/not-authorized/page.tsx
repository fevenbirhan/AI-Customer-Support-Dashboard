import Link from 'next/link';

export default function NotAuthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <h1 className="text-3xl font-semibold mb-4">Access Denied</h1>
      <p className="text-gray-500 mb-6">
        You don’t have permission to view this page. Only admins can access the dashboard.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Go back home
      </Link>
    </div>
  );
}