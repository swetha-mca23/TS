import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
// import "./customerdashboard.css"

const API_URL = "http://localhost:3000/customers/me"; 

const CustomerDashboard = () => {
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {

    const fetchCustomer = async () => {
     
      try {
        const token = localStorage.getItem("token");
        console.log("--------------",token)

         const decoded = jwtDecode(token)
         console.log("**********************",decoded)

        
        const { data } = await axios.get(API_URL,{
          headers: { Authorization:`Bearer ${token}` },
        });

        setCustomer(data);
        console.log(data)

      } catch (err) {
        setError("Failed to load customer data");
      } 
    };
    fetchCustomer();
  },[]);

  return (
    <div>
      <h2>Customer Dashboard</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {customer && (
        <div>
          <p><strong>Name:</strong> {customer.name}</p>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>Phone:</strong> {customer.phoneNo}</p>
          <p><strong>Address:</strong> {customer.address}</p>
        </div>
      )}
      <button onClick={() => { 
        localStorage.removeItem("token"); 
        navigate("/"); 
      }}>Logout </button>
    </div>
  );
};

export default CustomerDashboard;
