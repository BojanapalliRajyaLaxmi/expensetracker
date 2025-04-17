import React, { useState } from "react";

export default function AddTransactionForm({ refresh, onClose }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const [type, setType] = useState("debit");


  const categories = ["food", "travel", "dessert", "parents", "friends", "clothes","entertainment","groceries","refund","salary","gifts","bills","utilities"]; 
  const validateForm = () => {
    if (!description || !amount || !category) {
      setErrorMessage("All fields are required.");
      return false;
    }
    if (amount <= 0) {
      setErrorMessage("Amount must be a positive number.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrorMessage("");

    const newTransaction = {
        description,
        amount: parseFloat(amount),
        category,
        type,
        date: new Date().toLocaleDateString("en-US"),
      };
    try {
      const res = await fetch("https://expenseserver-pn1c.onrender.com/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTransaction),
      });

      if (res.ok) {
        refresh();
        onClose();
      } else {
        setErrorMessage("Failed to add transaction. Please try again.");
      }
    } catch (err) {
      setErrorMessage("An error occurred. Please try again.");
      console.error("Failed to add transaction:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
      <h2 className="text-2xl font-bold mb-4">Add New Transaction</h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div className="mb-4">
  <label className="block text-sm font-medium">Type</label>
  <select
    value={type}
    onChange={(e) => setType(e.target.value)}
    className="w-full p-2 border border-gray-300 rounded mt-1"
  >
    <option value="debit">Debit</option>
    <option value="credit">Credit</option>
  </select>
</div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          >
            <option value="">Select a category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            {isLoading ? "Adding..." : "Add Transaction"}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="w-full py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

