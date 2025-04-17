'use client';

import React, { useState, useMemo } from 'react';
import {
  BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip as BarTooltip,
  PieChart, Pie, Cell, Tooltip as PieTooltip, Legend
} from 'recharts';

// Define category colors
const categoryColors = {
  food: "#FF4C4C",
  travel: "#FF9900",
  dessert: "#FF66B2",
  parents: "#4CAF50",
  friends: "#00BFFF",
  clothes: "#A0522D",
  entertainment: "#8A2BE2",
  groceries: "#FF6347",
  refund: "#2ECC71",
  salary: "#3498DB",
  gifts: "#FFC300",
  bills: "#E74C3C",
  utilities: "#9B59B6",
  Uncategorized: "#7F8C8D"
};

export default function ExpenseCharts({ transactions }) {
  const currentYear = new Date().getFullYear();
  const years = [...new Set(transactions.map(txn => new Date(txn.date).getFullYear()))].sort();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // Filter transactions by selected year and type "debit"
  const filteredTxns = useMemo(() =>
    transactions.filter(txn =>
      txn.type === 'debit' &&
      new Date(txn.date).getFullYear() === selectedYear
    ), [transactions, selectedYear]);

  // Monthly Expenses (Bar Chart)
  const monthlyData = useMemo(() => {
    const data = filteredTxns.reduce((acc, txn) => {
      const month = new Date(txn.date).toLocaleString('default', { month: 'short' });
      acc[month] = (acc[month] || 0) + txn.amount;
      return acc;
    }, {});

    const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return allMonths.map(month => ({
      month,
      total: data[month] || 0
    }));
  }, [filteredTxns]);

  // Category-wise Expenses (Pie Chart)
  const categoryData = useMemo(() => {
    const categoryTotals = filteredTxns.reduce((acc, txn) => {
      const category = txn.category || "Uncategorized";
      acc[category] = (acc[category] || 0) + txn.amount;
      return acc;
    }, {});
    return Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
  }, [filteredTxns]);

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Monthly Expenses Bar Chart */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">📊 Monthly Expenses ({selectedYear})</h3>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="border p-2 rounded-md"
            >
              {years.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <BarChart width={600} height={350} data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <BarTooltip />
            <Bar dataKey="total" fill="#8884d8" />
          </BarChart>
        </div>

        {/* Category-wise Pie Chart */}
        <div>
          <h3 className="text-lg font-semibold mb-2">🥧 Category-wise Expenses</h3>
          <PieChart width={600} height={350}>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="40%"
              cy="50%"
              outerRadius={110}
              label={({ name, value }) => `${name}: $${value.toFixed(2)}`}
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={categoryColors[entry.name] || "#8884d8"}
                />
              ))}
            </Pie>
            <PieTooltip />
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              formatter={(value, entry) =>
                `${entry.payload.name}: $${entry.payload.value.toFixed(2)}`
              }
            />
          </PieChart>
        </div>
      </div>
    </div>
  );
}
