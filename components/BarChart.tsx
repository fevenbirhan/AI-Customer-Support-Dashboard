'use client';

import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';

interface BarChartProps {
  data: { name: string; messageCount: number }[];
}

export default function BarChart({ data }: BarChartProps) {
  return (
    <div className="w-full h-[400px] bg-white p-4 rounded-2xl shadow-md border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        📊 Messages by Category (Last 30 Days)
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <ReBarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis
            dataKey="name"
            angle={-20}
            textAnchor="end"
            interval={0}
            tick={{ fill: '#555', fontSize: 12 }}
          />
          <YAxis tick={{ fill: '#555', fontSize: 12 }} />
          <Tooltip
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
            contentStyle={{
              backgroundColor: '#fff',
              borderRadius: '10px',
              border: '1px solid #eee',
            }}
          />
          <Legend />
          <Bar
            dataKey="messageCount"
            name="Messages"
            fill="#3b82f6"
            radius={[8, 8, 0, 0]}
          />
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  );
}