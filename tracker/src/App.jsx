import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./Dashboard/Sidebar";
import DashboardPage from "./Dashboard/Page";
// import TransactionsPage from "./pages/TransactionsPage";
// import GoalsPage from "./pages/GoalsPage";
// import AnalyticsPage from "./pages/AnalyticsPage";
// import WalletPage from "./pages/WalletPage";

function App() {
  return (
    <Router>
      <div className="flex">
        {/* <Sidebar /> */}
        <div className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            {/* <Route path="/transactions" element={<TransactionsPage />} /> */}
            {/* <Route path="/goals" element={<GoalsPage />} /> */}
            {/* <Route path="/analytics" element={<AnalyticsPage />} /> */}
            {/* <Route path="/wallet" element={<WalletPage />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
