import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CompaniesCountTable from "./components/CompaniesCountTable";
import NightLaunchedRocketsTable from "./components/NightLaunchedRocketsTable";
import AverageCostTable from "./components/AverageCostTable";
import MissionsCompletedTable from "./components/MissionsCompletedTable";
import CountriesPresentsCompaniesTable from "./components/CountriesPresentsCompaniesTable";
import RocketsInActivityTable from "./components/RocketsInActivityTable";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import "./App.css"; // Importe seu arquivo CSS aqui se necessário

function App() {
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <Router>
      <div className="app-container">
        {isSidebar && <Sidebar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/CompaniesCountTable"
            element={<CompaniesCountTable />}
          />
          <Route
            path="/NightLaunchedRocketsTable"
            element={<NightLaunchedRocketsTable />}
          />
          <Route path="/AverageCostTable" element={<AverageCostTable />} />
          <Route
            path="/MissionsCompletedTable"
            element={<MissionsCompletedTable />}
          />
          <Route
            path="/CountriesPresentsCompaniesTable"
            element={<CountriesPresentsCompaniesTable />}
          />
          <Route
            path="/RocketsInActivityTable"
            element={<RocketsInActivityTable />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
