import { Button } from "@/components/ui/button";
import { useState } from "react";
import Papa from 'papaparse';
import { jsPDF } from "jspdf";
import { Download } from "lucide-react"; // Import Download icon from Lucide

const formatDate = (date, filter) => {
  const d = new Date(date);
  if (filter === "monthly") {
    return `${d.getMonth() + 1}-${d.getFullYear()}`;
  } else if (filter === "yearly") {
    return d.getFullYear();
  } else if (filter === "weekly") {
    const startOfYear = new Date(d.getFullYear(), 0, 1);
    const week = Math.ceil((d - startOfYear) / (1000 * 60 * 60 * 24 * 7));
    return `Week ${week}`;
  }
  return d.toLocaleDateString();
};

export default function TransactionList({
  transactions,
  onDelete,
  onEdit,
  filter,
  setFilter,
  searchTerm,
  setSearchTerm,
}) {
  const filteredTransactions = transactions.filter((txn) => {
    const category = txn.category?.toLowerCase() || "";
    const description = txn.description?.toLowerCase() || "";
    const amount = txn.amount?.toString() || "";
    const search = searchTerm.toLowerCase();

    return (
      category.includes(search) ||
      description.includes(search) ||
      amount.includes(search)
    );
  });

  const groupedTransactions =
    filter === "recent"
      ? {
          "Recent Transactions": [...filteredTransactions]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 10),
        }
      : filteredTransactions.reduce((acc, txn) => {
          const key =
            filter === "category"
              ? txn.category || "Uncategorized"
              : formatDate(txn.date, filter);

          if (!acc[key]) acc[key] = [];
          acc[key].push(txn);
          return acc;
        }, {});

  const handleExportCSV = () => {
    const csv = Papa.unparse(filteredTransactions);
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "transactions.csv";
    link.click();
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Transaction History", 10, 10);
    let y = 20;
    filteredTransactions.forEach((txn) => {
      doc.text(`Description: ${txn.description}`, 10, y);
      doc.text(`Date: ${new Date(txn.date).toLocaleDateString()}`, 10, y + 10);
      doc.text(`Amount: $${txn.amount}`, 10, y + 20);
      y += 30;
    });
    doc.save("transactions.pdf");
  };

  return (
    <div className="backdrop-blur-md bg-white/30 border border-white/40 rounded-xl p-4 shadow-2xl overflow-y-auto transition-all">
      {/* Top Section */}
      <div className="sticky top-0 z-10 bg-white/80 p-4 backdrop-blur-md rounded-t-xl">
        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search transactions..."
            className="p-2 w-full border rounded-md text-sm sm:text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filters and Download buttons inline for larger screens */}
        <div className="flex flex-wrap gap-2 mb-4 justify-between items-center">
          <div className="flex gap-2 flex-wrap">
            {["recent", "monthly", "yearly", "weekly", "category"].map((f) => (
              <Button
                key={f}
                size="sm"
                variant={filter === f ? "default" : "outline"}
                onClick={() => setFilter(f)}
                className="capitalize"
              >
                {f}
              </Button>
            ))}
            <Button size="sm" variant="outline" onClick={handleExportCSV}>
              <Download size={20} className="mr-2" />
              CSV
            </Button>
            <Button size="sm" variant="outline" onClick={handleExportPDF}>
              <Download size={10} className="mr-2" />
              PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Section Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-2">
        {filter === "recent"
          ? "Recent Transactions"
          : `Transactions (${filter.charAt(0).toUpperCase() + filter.slice(1)} View)`} 
      </h2>

      {/* Transaction List */}
      <ul className="space-y-5">
        {Object.keys(groupedTransactions).map((key) => (
          <li key={`${filter}-${key}`} className="bg-gray-100 p-3 rounded-md">
            <h3 className="font-semibold text-base mb-2">{key}</h3>
            <ul className="space-y-3">
              {groupedTransactions[key].map((txn) => {
                // Determine the color based on transaction type
                const amountColor = txn.type === "credit" ? "text-green-600" : "text-red-600";
                
                return (
                  <li
                    key={txn._id}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white/50 border border-gray-200 p-4 rounded-lg shadow-sm transition-all hover:scale-[1.01]"
                  >
                    {/* Transaction Info */}
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{txn.description}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(txn.date).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Amount + Actions */}
                    <div className="mt-2 sm:mt-0 flex items-center gap-4 flex-wrap">
                      <span className={`text-lg font-semibold ${amountColor} min-w-[80px]`}>
                        ${txn.amount}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-blue-500 hover:bg-blue-600 text-white"
                          onClick={() => onEdit(txn)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="bg-red-500 hover:bg-red-600 text-white"
                          onClick={() => onDelete(txn._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
