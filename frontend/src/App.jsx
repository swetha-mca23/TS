import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Home from "./components/Home"; 
import CustomerList from "./components/Dashboard/CustomerList";
import Dashboard from "./components/Dashboard/Dashboard";
import DashboardSidebar from "./components/Dashboard/DashboardSidebar";
import EditCustomer from "./components/Dashboard/EditCustomer";
import CustomerDashboard from "./components/CustomerDashboard";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        
        <Route element={<PrivateRoute/>}>
        <Route path="/customerlist" element={<CustomerList />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sidebar" element={<DashboardSidebar />} />
        <Route path="/edit/:id" element={<EditCustomer />} />
        <Route path="/customerdashboard" element={< CustomerDashboard/>} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;


