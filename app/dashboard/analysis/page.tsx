import { getCategoryMessageCountsLast30Days } from '@/actions/categories';
import BarChart from '@/components/BarChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function AnalysisPage() {
  const data = await getCategoryMessageCountsLast30Days();

  return (
    <div className="p-6 space-y-6">
      <Card className="border border-gray-200 shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-600 dark:text-gray-200">
            Analysis Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6 dark:text-gray-200">
            Visual overview of message distribution by category for the past 30 days.
          </p>
          {data.length > 0 ? (
            <BarChart data={data} />
          ) : (
            <p className="text-gray-500 italic text-center">
              No messages received in the last 30 days.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}