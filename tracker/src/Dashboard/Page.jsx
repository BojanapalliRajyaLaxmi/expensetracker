// import { useEffect, useState } from "react";
// import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
// import AddTransactionForm from "../components/AddTransactionForm";
// import TransactionList from "../components/TransactionList";
// import EditTransactionDialog from "../components/EditTransactionDialog";
// import ExpenseBarChart from "../components/ExpenseBarChart";
// import WelcomeBack from "@/components/Hero";
// import SummaryCards from "./SummaryCards";
// import Sidebar from "./Sidebar";
// import BudgetVsActualChart from "../components/BudgetVsActualChart"

// export default function DashboardPage() {
//   const [transactions, setTransactions] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [editingTxn, setEditingTxn] = useState(null);
//   const [error, setError] = useState(null);
//   const [filter, setFilter] = useState("recent");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isAddFormOpen, setIsAddFormOpen] = useState(false);
//   const [categorySpending, setCategorySpending] = useState({});
//   const [budgetAlerts, setBudgetAlerts] = useState([]);

//   const monthlyBudgets = {
//     entertainment: 500,
//     food: 300,
//     groceries: 600,
//     travel: 200,
//     miscellaneous: 150,
//     dessert: 100,
//     parents: 200,
//     friends: 250,
//     clothes: 400,
//     gifts: 150,
//     bills: 600,
//     utilities: 250,
//   };
//   const fetchTransactions = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const res = await fetch("https://expenseserver-pn1c.onrender.com/api/transactions");
//       if (!res.ok) throw new Error("Failed to fetch transactions");
//       const data = await res.json();
//       setTransactions(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   const handleDelete = async (id) => {
//     try {
//       if (!id) {
//         throw new Error("Invalid transaction ID");
//       }
//       const res = await fetch(`https://expenseserver-pn1c.onrender.com/api/transactions/${id}`, {
//         method: "DELETE",
//       });
//       if (!res.ok) {
//         throw new Error("Failed to delete transaction");
//       }
//       fetchTransactions();
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   useEffect(() => {
//     const categoryTotal = transactions.reduce((acc, txn) => {
//       const category = txn.category || "Miscellaneous";
//       acc[category] = (acc[category] || 0) + txn.amount;
//       return acc;
//     }, {});

//     setCategorySpending(categoryTotal);
//     const alerts = Object.keys(monthlyBudgets).map(category => {
//       const spent = categoryTotal[category] || 0;
//       const budget = monthlyBudgets[category];
//       const percentageSpent = (spent / budget) * 100;

//       if (percentageSpent >= 85 && percentageSpent < 100) {
//         return {
//           category,
//           message: `Warning: You have spent ${percentageSpent.toFixed(2)}% of your budget for the '${category}' category this month.`,
//           status: "yellow",
//         };
//       }
//       if (percentageSpent >= 100) {
//         return {
//           category,
//           message: `Alert: You have exceeded your budget by ${percentageSpent.toFixed(2)}% for the '${category}' category.`,
//           status: "red",
//         };
//       }
//       return null;
//     }).filter(alert => alert !== null);

//     setBudgetAlerts(alerts);
//   }, [transactions]);

//   const calculateSums = (transactions) => {
//     let creditSum = 0;
//     let debitSum = 0;

//     transactions.forEach((txn) => {
//       if (txn.type === "credit") creditSum += txn.amount;
//       if (txn.type === "debit") debitSum += txn.amount;
//     });

//     const balance = creditSum - debitSum;
//     const savings = balance;

//     return { creditSum, debitSum, balance, savings };
//   };

//   const { creditSum, debitSum, balance, savings } = calculateSums(transactions);

//   const handleAddTransactionClick = () => {
//     setIsAddFormOpen(true);
//   };

//   const renderPieChart = () => {
//     const chartData = Object.keys(categorySpending).map(category => ({
//       name: category,
//       value: categorySpending[category],
//     }));

//     return (
//       <PieChart width={500} height={450}>
//         <Pie
//           data={chartData}
//           dataKey="value"
//           nameKey="name"
//           outerRadius={120}
//           fill="#8884d8"
//           label
//         >
//           {chartData.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={entry.value > 500 ? "#ff4d4d" : "#82ca9d"} />
//           ))}
//         </Pie>
//         <Tooltip />
//         <Legend />
//       </PieChart>
//     );
//   };

//  return (
//     <div className="flex flex-col md:flex-row min-h-screen mt-20">
//       <Sidebar onAddClick={handleAddTransactionClick} />
//       <main className="flex-1 p-4 md:ml-64 bg-gray-50">
//         <div className="max-w-7xl mx-auto">
//           <WelcomeBack />

//           <SummaryCards
//             balance={balance}
//             income={creditSum}
//             expenses={debitSum}
//             savings={savings}
//           />

//           <h1 className="text-2xl font-bold mt-6 mb-4">💰 Personal Finance Tracker</h1>

//           {isLoading && <p>Loading transactions...</p>}
//           {error && <p className="text-red-500">Error: {error}</p>}

//           {/* Budget Alerts */}
//           {budgetAlerts.length > 0 && (
//             <div className="mt-5 space-y-2">
//               {budgetAlerts.map((alert, index) => (
//                 <div
//                   key={index}
//                   className={`alert p-4 rounded shadow transition-all duration-300 ${
//                     alert.status === "yellow"
//                       ? "bg-yellow-200 text-yellow-800"
//                       : alert.status === "red"
//                       ? "bg-red-200 text-red-800"
//                       : "bg-green-200 text-green-800"
//                   }`}
//                 >
//                   <p>{alert.message}</p>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Expense Bar Chart */}
//           <div className="my-6">
//             <ExpenseBarChart transactions={transactions} />
//           </div>

//           {/* Transaction List */}
//           <div className="my-6">
//             {transactions.length > 0 ? (
//               <TransactionList
//                 transactions={transactions}
//                 onEdit={(txn) => setEditingTxn(txn)}
//                 onDelete={handleDelete}
//                 filter={filter}
//                 setFilter={setFilter}
//                 searchTerm={searchTerm}
//                 setSearchTerm={setSearchTerm}
//               />
//             ) : (
//               !isLoading && (
//                 <p className="text-gray-500">
//                   No transactions found. Add some transactions!
//                 </p>
//               )
//             )}
//           </div>

//           {/* Edit Dialog */}
//           {editingTxn && (
//             <EditTransactionDialog
//               open={!!editingTxn}
//               transaction={editingTxn}
//               onClose={() => setEditingTxn(null)}
//               refresh={fetchTransactions}
//             />
//           )}

//           {/* Charts Section */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10 items-start">
//             <div className="w-full">
//               <BudgetVsActualChart transactions={transactions} />
//             </div>

//             <div className="w-full flex flex-col items-center">
//               <h3 className="text-lg font-semibold mb-4 text-center">
//                 📊 Top Spending Categories
//               </h3>
//               <div className="w-full flex justify-center">
//                 <div className="max-w-[500px] w-full h-[400px]">
//                   {renderPieChart()}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Add Form Modal */}
//       {isAddFormOpen && (
//         <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-700 bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-2">
//             <AddTransactionForm
//               refresh={fetchTransactions}
//               onClose={() => setIsAddFormOpen(false)}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import AddTransactionForm from "../components/AddTransactionForm";
import TransactionList from "../components/TransactionList";
import EditTransactionDialog from "../components/EditTransactionDialog";
import ExpenseBarChart from "../components/ExpenseBarChart";
import WelcomeBack from "@/components/Hero";
import SummaryCards from "./SummaryCards";
import Sidebar from "./Sidebar";
import BudgetVsActualChart from "../components/BudgetVsActualChart";

export default function DashboardPage() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingTxn, setEditingTxn] = useState(null);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("recent");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [categorySpending, setCategorySpending] = useState({});
  const [budgetAlerts, setBudgetAlerts] = useState([]);
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
  

  
  const monthlyBudgets = {
    entertainment: 500,
    food: 300,
    groceries: 600,
    travel: 200,
    miscellaneous: 150,
    dessert: 100,
    parents: 200,
    friends: 250,
    clothes: 400,
    gifts: 150,
    bills: 600,
    utilities: 250,
  };

  const fetchTransactions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("https://expenseserver-pn1c.onrender.com/api/transactions");
      if (!res.ok) throw new Error("Failed to fetch transactions");
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (!id) throw new Error("Invalid transaction ID");
      const res = await fetch(`https://expenseserver-pn1c.onrender.com/api/transactions/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete transaction");
      fetchTransactions();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    const categoryTotal = transactions.reduce((acc, txn) => {
      const category = txn.category || "Miscellaneous";
      acc[category] = (acc[category] || 0) + txn.amount;
      return acc;
    }, {});
    setCategorySpending(categoryTotal);

    const alerts = Object.keys(monthlyBudgets).map((category) => {
      const spent = categoryTotal[category] || 0;
      const budget = monthlyBudgets[category];
      const percentageSpent = (spent / budget) * 100;

      if (percentageSpent >= 85 && percentageSpent < 100) {
        return {
          category,
          message: `Warning: You have spent ${percentageSpent.toFixed(2)}% of your budget for '${category}' this month.`,
          status: "yellow",
        };
      }
      if (percentageSpent >= 100) {
        return {
          category,
          message: `Alert: You exceeded your budget by ${percentageSpent.toFixed(2)}% in '${category}'.`,
          status: "red",
        };
      }
      return null;
    }).filter(Boolean);

    setBudgetAlerts(alerts);
  }, [transactions]);

  const calculateSums = () => {
    let creditSum = 0, debitSum = 0;
  
    // Log transactions to check data
    console.log("Transactions:", transactions);  // Ensure correct structure
  
    transactions.forEach(({ type, amount }) => {
      // Validate amount is a number before adding
      if (typeof amount === 'number') {
        if (type === "credit") {
          creditSum += amount;
        } else if (type === "debit") {
          debitSum += amount;
        }
      }
    });
  
    // Log the sums for debugging
    console.log("Credit Sum:", creditSum, "Debit Sum:", debitSum);
  
    return {
      creditSum,
      debitSum,
      balance: creditSum - debitSum,
      savings: creditSum - debitSum,  // savings are calculated the same as balance
    };
  };
  

  const { creditSum, debitSum, balance, savings } = calculateSums();

  const handleAddTransactionClick = () => setIsAddFormOpen(true);

  const renderPieChart = () => {
    const data = Object.entries(categorySpending).map(([name, value]) => ({ name, value }));
    return (
      <PieChart width={400} height={400}>
  <Pie data={data} dataKey="value" nameKey="name" outerRadius={120} label>
    {data.map((entry, index) => (
      <Cell
        key={`cell-${index}`}
        fill={categoryColors[entry.name] || "#8884d8"} 
      />
    ))}
  </Pie>
  <Tooltip />
  <Legend
    layout="horizontal"
    verticalAlign="bottom"
    align="center"
    wrapperStyle={{ marginTop: 20, width: "100%", height: "auto", textAlign: "center" }}
  />
</PieChart>

    
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Sidebar onAddClick={handleAddTransactionClick} />
      <main className="pt-24 px-4 sm:px-6 lg:px-8 bg-gray-50 flex-1">
        <div className="max-w-7xl mx-auto w-full">
          <WelcomeBack />

          <SummaryCards
            balance={balance}
            income={creditSum}
            expenses={debitSum}
            savings={savings}
          />

          <h1 className="text-2xl font-bold mt-6 mb-4">💰 Personal Finance Tracker</h1>

          {isLoading && <p>Loading transactions...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}

          {budgetAlerts.length > 0 && (
            <div className="mt-5 space-y-2">
              {budgetAlerts.map((alert, i) => (
                <div
                  key={i}
                  className={`p-4 rounded shadow transition-all ${
                    alert.status === "yellow"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  <p>{alert.message}</p>
                </div>
              ))}
            </div>
          )}

          <div className="my-6">
            <ExpenseBarChart transactions={transactions} />
          </div>

          <div className="my-6">
            {transactions.length > 0 ? (
              <TransactionList
                transactions={transactions}
                onEdit={setEditingTxn}
                onDelete={handleDelete}
                filter={filter}
                setFilter={setFilter}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            ) : (
              !isLoading && <p className="text-gray-500">No transactions found. Add some!</p>
            )}
          </div>

          {editingTxn && (
            <EditTransactionDialog
              open={!!editingTxn}
              transaction={editingTxn}
              onClose={() => setEditingTxn(null)}
              refresh={fetchTransactions}
            />
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
            <div className="w-full">
              <BudgetVsActualChart transactions={transactions} />
            </div>
            <div className="w-full flex flex-col items-center">
              <h3 className="text-lg font-semibold mb-4 text-center">
                📊 Top Spending Categories
              </h3>
              <div className="w-full flex justify-center">
                {renderPieChart()}
              </div>
            </div>
          </div>
        </div>
      </main>

      {isAddFormOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-700 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-2">
            <AddTransactionForm
              refresh={fetchTransactions}
              onClose={() => setIsAddFormOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
