import React from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const Sidebar = ({ onAddClick }) => {
  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-gray-800 text-white p-5 flex flex-col justify-between z-50">
      <div>
        <h1 className="text-xl font-bold mb-8">TallyUp</h1>
        <ul className="space-y-4">
          <li>
            <Link
              to="/dashboard"
              className="block p-2 text-lg hover:bg-gray-700 rounded"
            >
              Dashboard
            </Link>
          </li>
        </ul>

        <button
          onClick={onAddClick}
          className="mt-8 flex items-center justify-center gap-2 p-2 w-full bg-green-500 hover:bg-green-600 rounded text-white text-lg font-medium transition"
        >
          <Plus size={20} />
          Add Transaction
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
