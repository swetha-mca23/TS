import React from 'react';
import { Link } from 'react-router-dom';

const DashboardSidebar = () => {
  // console.log(localStorage.getItem());
  
  return (
    <nav className="dashboard-sidebar">
      
        <p> <Link to="/customerlist">Customer List</Link> </p> <br></br>
        
         {/* <p> <Link to="/addcustomer">Add Customer</Link> </p> */}
        
    </nav>
  );
};

export default DashboardSidebar;
