// // import { useEffect, useState } from "react";
// // import AddTransactionForm from "../components/AddTransactionForm";
// // import TransactionList from "../components/TransactionList";
// // import EditTransactionDialog from "../components/EditTransactionDialog";
// // import ExpenseBarChart from "../components/ExpenseBarChart";
// // import WelcomeBack from "@/components/Hero";
// // import SummaryCards from "./SummaryCards";
// // import Sidebar from "./Sidebar";

// // export default function DashboardPage() {
// //   const [transactions, setTransactions] = useState([]);
// //   const [editingTxn, setEditingTxn] = useState(null);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [filter, setFilter] = useState("recent");
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [isAddFormOpen, setIsAddFormOpen] = useState(false); // New state for Add Transaction Form visibility

// //   // Fetch from backend
// //   const fetchTransactions = async () => {
// //     setIsLoading(true);
// //     setError(null);
// //     try {
// //       const res = await fetch("http://localhost:5000/api/transactions");
// //       if (!res.ok) throw new Error("Failed to fetch transactions");
// //       const data = await res.json();
// //       setTransactions(data);
// //     } catch (err) {
// //       setError(err.message);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     try {
// //       const res = await fetch(`http://localhost:5000/api/transactions/${id}`, {
// //         method: "DELETE",
// //       });
// //       if (!res.ok) throw new Error("Failed to delete transaction");
// //       fetchTransactions();
// //     } catch (err) {
// //       setError(err.message);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchTransactions();
// //   }, []);

// //   const calculateSums = (transactions) => {
// //     let creditSum = 0;
// //     let debitSum = 0;

// //     transactions.forEach((txn) => {
// //       if (txn.type === "credit") creditSum += txn.amount;
// //       if (txn.type === "debit") debitSum += txn.amount;
// //     });

// //     const balance = creditSum - debitSum;
// //     const savings = balance;

// //     return { creditSum, debitSum, balance, savings };
// //   };

// //   const { creditSum, debitSum, balance, savings } = calculateSums(transactions);

// //   // Add transaction form open logic
// //   const handleAddTransactionClick = () => {
// //     setIsAddFormOpen(true);
// //   };

// //   return (
// //     <div className="flex">
// //       {/* Sidebar with Add Transaction Button */}
// //       <Sidebar onAddClick={handleAddTransactionClick} />

// //       <div className="p-6 max-w-4xl mx-auto flex-1">
// //         <WelcomeBack />

// //         <SummaryCards
// //           balance={balance}
// //           income={creditSum}
// //           expenses={debitSum}
// //           savings={savings}
// //         />

// //         <h1 className="text-2xl font-bold mb-4">💰 Personal Finance Tracker</h1>

// //         {isLoading && <p>Loading transactions...</p>}
// //         {error && <p className="text-red-500">Error: {error}</p>}

// //         {/* Conditionally render AddTransactionForm */}
// //         {isAddFormOpen && (
// //           <AddTransactionForm
// //             refresh={fetchTransactions}
// //             onClose={() => setIsAddFormOpen(false)}
// //           />
// //         )}

// //         {transactions.length > 0 ? (
// //           <TransactionList
// //             transactions={transactions}
// //             onDelete={handleDelete}
// //             onEdit={setEditingTxn}
// //             filter={filter}
// //             setFilter={setFilter}
// //             searchTerm={searchTerm}
// //             setSearchTerm={setSearchTerm}
// //           />
// //         ) : (
// //           !isLoading && (
// //             <p className="text-gray-500">No transactions found. Add some transactions!</p>
// //           )
// //         )}

// //         <ExpenseBarChart transactions={transactions} />

// //         {editingTxn && (
// //           <EditTransactionDialog
// //             open={!!editingTxn}
// //             transaction={editingTxn}
// //             onClose={() => setEditingTxn(null)}
// //             refresh={fetchTransactions}
// //           />
// //         )}
// //       </div>
// //     </div>
// //   );
// // }
// import { useEffect, useState } from "react";
// import AddTransactionForm from "../components/AddTransactionForm";
// import TransactionList from "../components/TransactionList";
// import EditTransactionDialog from "../components/EditTransactionDialog";
// import ExpenseBarChart from "../components/ExpenseBarChart";
// import WelcomeBack from "@/components/Hero";
// import SummaryCards from "./SummaryCards";
// import Sidebar from "./Sidebar";
// import BudgetVsActualChart from "@/components/BudgetVsActualChart";

// export default function DashboardPage() {
//   const [transactions, setTransactions] = useState([]);
//   const [editingTxn, setEditingTxn] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [filter, setFilter] = useState("recent");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isAddFormOpen, setIsAddFormOpen] = useState(false); // New state for Add Transaction Form visibility

//   const fetchTransactions = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const res = await fetch("http://localhost:5000/api/transactions");
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
//       const res = await fetch(`http://localhost:5000/api/transactions/${id}`, {
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

//   return (
//     <div className="flex">
//       {/* Sidebar with Add Transaction Button */}
//       <Sidebar onAddClick={handleAddTransactionClick} />

//       {/* Main content shifted to the right of fixed sidebar */}
//       <div className="p-6 ml-64 w-full">
//         <WelcomeBack />

//         <SummaryCards
//           balance={balance}
//           income={creditSum}
//           expenses={debitSum}
//           savings={savings}
//         />

//         <h1 className="text-2xl font-bold mb-4">💰 Personal Finance Tracker</h1>

//         {isLoading && <p>Loading transactions...</p>}
//         {error && <p className="text-red-500">Error: {error}</p>}

//         {isAddFormOpen && (
//           <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-500 bg-opacity-50">
//             <AddTransactionForm
//               refresh={fetchTransactions}
//               onClose={() => setIsAddFormOpen(false)}
//             />
//           </div>
//         )}

//         <ExpenseBarChart transactions={transactions} />

//         {transactions.length > 0 ? (
//           <TransactionList
//             transactions={transactions}
//             onDelete={handleDelete}
//             onEdit={setEditingTxn}
//             filter={filter}
//             setFilter={setFilter}
//             searchTerm={searchTerm}
//             setSearchTerm={setSearchTerm}
//           />
//         ) : (
//           !isLoading && (
//             <p className="text-gray-500">No transactions found. Add some transactions!</p>
//           )
//         )}

//         {editingTxn && (
//           <EditTransactionDialog
//             open={!!editingTxn}
//             transaction={editingTxn}
//             onClose={() => setEditingTxn(null)}
//             refresh={fetchTransactions}
//           />
//         )}

//         <BudgetVsActualChart transactions={transactions} />
//       </div>
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
import BudgetVsActualChart from "../components/BudgetVsActualChart"

export default function DashboardPage() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingTxn, setEditingTxn] = useState(null);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("recent");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddFormOpen, setIsAddFormOpen] = useState(false); // For Add Transaction Form visibility
  const [categorySpending, setCategorySpending] = useState({});
  const [budgetAlerts, setBudgetAlerts] = useState([]);

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

  // Fetch from backend
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
      if (!id) {
        throw new Error("Invalid transaction ID");
      }
      const res = await fetch(`https://expenseserver-pn1c.onrender.com/api/transactions/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete transaction");
      }
      fetchTransactions();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    // Calculate category-wise spending
    const categoryTotal = transactions.reduce((acc, txn) => {
      const category = txn.category || "Miscellaneous";
      acc[category] = (acc[category] || 0) + txn.amount;
      return acc;
    }, {});

    setCategorySpending(categoryTotal);

    // Generate budget alerts
    const alerts = Object.keys(monthlyBudgets).map(category => {
      const spent = categoryTotal[category] || 0;
      const budget = monthlyBudgets[category];
      const percentageSpent = (spent / budget) * 100;

      if (percentageSpent >= 85 && percentageSpent < 100) {
        return {
          category,
          message: `Warning: You have spent ${percentageSpent.toFixed(2)}% of your budget for the '${category}' category this month.`,
          status: "yellow",
        };
      }
      if (percentageSpent >= 100) {
        return {
          category,
          message: `Alert: You have exceeded your budget by ${percentageSpent.toFixed(2)}% for the '${category}' category.`,
          status: "red",
        };
      }
      return null;
    }).filter(alert => alert !== null);

    setBudgetAlerts(alerts);
  }, [transactions]);

  const calculateSums = (transactions) => {
    let creditSum = 0;
    let debitSum = 0;

    transactions.forEach((txn) => {
      if (txn.type === "credit") creditSum += txn.amount;
      if (txn.type === "debit") debitSum += txn.amount;
    });

    const balance = creditSum - debitSum;
    const savings = balance;

    return { creditSum, debitSum, balance, savings };
  };

  const { creditSum, debitSum, balance, savings } = calculateSums(transactions);

  const handleAddTransactionClick = () => {
    setIsAddFormOpen(true);
  };

  const renderPieChart = () => {
    const chartData = Object.keys(categorySpending).map(category => ({
      name: category,
      value: categorySpending[category],
    }));

    return (
      <PieChart width={500} height={450}>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          outerRadius={120}
          fill="#8884d8"
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.value > 500 ? "#ff4d4d" : "#82ca9d"} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    );
  };

  return (
    <div className="flex">
      {/* Sidebar with Add Transaction Button */}
      <Sidebar onAddClick={handleAddTransactionClick} />

      {/* Main content shifted to the right of fixed sidebar */}
      <div className="p-6 ml-64 w-full">
        <WelcomeBack />

        <SummaryCards
          balance={balance}
          income={creditSum}
          expenses={debitSum}
          savings={savings}
        />

        <h1 className="text-2xl font-bold mb-4">💰 Personal Finance Tracker</h1>

        {isLoading && <p>Loading transactions...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {budgetAlerts.length > 0 && (
          <div className="mt-5">
            {budgetAlerts.map((alert, index) => (
              <div
                key={index}
                className={`alert p-4 mb-2 rounded shadow-md transition-all duration-300 ${alert.status === "yellow"
                  ? "bg-yellow-200 text-yellow-800"
                  : alert.status === "red"
                    ? "bg-red-200 text-red-800"
                    : "bg-green-200 text-green-800"
                  }`}
              >
                <p>{alert.message}</p>
              </div>
            ))}
          </div>
        )}
        <ExpenseBarChart transactions={transactions} />

        {/* Transaction List */}
        {transactions.length > 0 ? (
          <TransactionList
            transactions={transactions}
            onEdit={(txn) => setEditingTxn(txn)}  // ✅ Correct way
            onDelete={handleDelete}
            filter={filter}
            setFilter={setFilter}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />


        ) : (
          !isLoading && <p className="text-gray-500">No transactions found. Add some transactions!</p>
        )}
        {editingTxn && (
          <EditTransactionDialog
            open={!!editingTxn}
            transaction={editingTxn}
            onClose={() => setEditingTxn(null)}
            refresh={fetchTransactions}
          />
        )}


        <div className="flex">

          <BudgetVsActualChart transactions={transactions} />
          <h3 className="text-lg font-semibold mb-2 ml-25">📊 Top Spending Categories</h3>
          <div className="flex flex-col items-center mt-8">
            {/* Render Pie Chart with 80% width */}
            <div className="w-4/5 h-[400px]"> {/* 80% width and fixed height */}
              <div className="w-full h-full">
                {renderPieChart()}
              </div>
            </div>


            {/* Modal for Add Transaction Form */}
            {isAddFormOpen && (
              <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-500 bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                  <AddTransactionForm
                    refresh={fetchTransactions}
                    onClose={() => setIsAddFormOpen(false)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>


      </div>
    </div>
  );
}
