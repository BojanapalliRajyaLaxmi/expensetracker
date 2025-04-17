'use client'

import React from 'react'
import {
  FaWallet,
  FaArrowDown,
  FaArrowUp,
  FaPiggyBank,
} from 'react-icons/fa'

export default function TotalCard({ balance = 0, income = 0, expenses = 0, savings = 0 }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full  mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Balance */}
      <div className="flex items-center gap-4 p-4 rounded-lg bg-blue-50">
        <div className="p-3 rounded-full bg-blue-200 text-blue-800">
          <FaWallet className="text-2xl" />
        </div>
        <div>
          <p className="text-sm text-gray-600">Balance</p>
          <p className="text-lg font-bold text-gray-800">${balance.toFixed(2)}</p>
        </div>
      </div>

      {/* Income */}
      <div className="flex items-center gap-4 p-4 rounded-lg bg-green-50">
        <div className="p-3 rounded-full bg-green-200 text-green-800">
          <FaArrowUp className="text-2xl" />
        </div>
        <div>
          <p className="text-sm text-gray-600">Income</p>
          <p className="text-lg font-bold text-gray-800">${income.toFixed(2)}</p>
        </div>
      </div>

      {/* Expenses */}
      <div className="flex items-center gap-4 p-4 rounded-lg bg-red-50">
        <div className="p-3 rounded-full bg-red-200 text-red-800">
          <FaArrowDown className="text-2xl" />
        </div>
        <div>
          <p className="text-sm text-gray-600">Expenses</p>
          <p className="text-lg font-bold text-gray-800">${expenses.toFixed(2)}</p>
        </div>
      </div>

      {/* Savings */}
      <div className="flex items-center gap-4 p-4 rounded-lg bg-yellow-50">
        <div className="p-3 rounded-full bg-yellow-200 text-yellow-800">
          <FaPiggyBank className="text-2xl" />
        </div>
        <div>
          <p className="text-sm text-gray-600">Savings</p>
          <p className="text-lg font-bold text-gray-800">${savings.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}
