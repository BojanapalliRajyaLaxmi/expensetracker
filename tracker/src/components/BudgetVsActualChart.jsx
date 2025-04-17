import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const BudgetVsActualChart = ({ transactions }) => {
  const monthlyBudgets = {
    Jan: 1000,
    Feb: 1200,
    Mar: 900,
    Apr: 1100,
    May: 950,
    Jun: 1000,
    Jul: 1050,
    Aug: 1150,
    Sep: 1000,
    Oct: 1200,
    Nov: 1300,
    Dec: 1250,
  };

  // Group transactions by month
  const monthlyActuals = transactions.reduce((acc, txn) => {
    const month = new Date(txn.date).toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + txn.amount;
    return acc;
  }, {});

  // Merge budget and actuals into one array
  const data = Object.keys(monthlyBudgets).map(month => ({
    month,
    budget: monthlyBudgets[month],
    actual: monthlyActuals[month] || 0,
  }));

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-2">📈 Budget vs Actual</h3>
      <BarChart width={700} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="budget" fill="#82ca9d" name="Budget" />
        <Bar dataKey="actual" fill="#8884d8" name="Actual" />
      </BarChart>
    </div>
  );
};

export default BudgetVsActualChart;
