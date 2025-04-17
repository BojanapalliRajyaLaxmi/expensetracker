import { Button } from "@/components/ui/button";
import { useState } from "react";
import Papa from 'papaparse'; // Import PapaParse
import { jsPDF } from "jspdf";

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
  return d.toLocaleDateString(); // fallback
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
      ? { "Recent Transactions": [...filteredTransactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10) }
      : filteredTransactions.reduce((acc, txn) => {
          const key = filter === "category"
            ? txn.category || "Uncategorized"
            : formatDate(txn.date, filter);

          if (!acc[key]) acc[key] = [];
          acc[key].push(txn);
          return acc;
        }, {});

  // Handle Export to CSV
  const handleExportCSV = () => {
    // Convert to CSV using PapaParse
    const csv = Papa.unparse(filteredTransactions);  // `unparse` converts JSON to CSV
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'transactions.csv';
    link.click();
  };

  // Handle Export to PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text('Transaction History', 10, 10);
    let y = 20;
    filteredTransactions.forEach((txn) => {
      doc.text(`Description: ${txn.description}`, 10, y);
      doc.text(`Date: ${new Date(txn.date).toLocaleDateString()}`, 10, y + 10);
      doc.text(`Amount: $${txn.amount}`, 10, y + 20);
      y += 30;
    });
    doc.save('transactions.pdf');
  };

  return (
    <div className="backdrop-blur-md bg-white/30 border border-white/40 rounded-xl p-4 shadow-2xl max-h-96 overflow-y-auto">
      {/* Fixed search and filter section */}
      <div className="sticky top-0 z-10 bg-white/70 p-4 backdrop-blur-md">
        {/* 🔍 Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search transactions..."
            className="p-2 w-full border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* 🧭 Filter Buttons */}
        <div className="flex gap-2 flex-wrap mb-4">
          {["recent", "monthly", "yearly", "weekly", "category"].map((f) => (
            <Button
              key={f}
              size="sm"
              variant={filter === f ? "default" : "outline"}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Button>
          ))}
        </div>

        {/* Export Buttons */}
        <div className="flex gap-2 mb-4">
          <Button size="sm" variant="outline" onClick={handleExportCSV}>
            Export to CSV
          </Button>
          <Button size="sm" variant="outline" onClick={handleExportPDF}>
            Export to PDF
          </Button>
        </div>
      </div>

      {/* 🧾 Section Title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        {filter === "recent"
          ? "Recent Transactions"
          : `Transactions (${filter.charAt(0).toUpperCase() + filter.slice(1)} View)`}
      </h2>

      {/* 🧾 Transaction Groups */}
      <ul className="space-y-4">
        {Object.keys(groupedTransactions).map((key) => (
          <li key={`${filter}-${key}`} className="bg-gray-100 p-3 rounded-md">
            <h3 className="font-semibold text-lg mb-2">{key}</h3>
            <ul>
              {groupedTransactions[key].map((txn) => (
                <li
                  key={txn._id}  // Unique key for each transaction
                  className="flex justify-between items-center backdrop-blur-sm bg-gray/50 border border-white/30 shadow-md p-4 rounded-lg transition-all hover:scale-[1.01]"
                >
                  {/* Info */}
                  <div className="flex flex-col">
                    <p className="font-medium text-gray-800">{txn.description}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(txn.date).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Amount + Actions */}
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-semibold text-blue-600">
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
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
