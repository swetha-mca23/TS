import React from 'react';
import DashboardSidebar from './DashboardSidebar';
import './dashboard.css'

const Dashboard = () => {
  return (
    <div className="dashboard-container">
        <h1>Dashboard</h1>
        <DashboardSidebar />
    </div>
  );
};

export default Dashboard;
