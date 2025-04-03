import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './customerlist.css'

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/customers/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomers(response.data);
    } catch (error) {
      setError(error.response?.data?.error || "Failed to fetch customers");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/customers/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setCustomers(customers.filter((customer) => customer.id !== id));
  
      alert("Customer deleted successfully!");
    } catch (error) {
      setError(error.response?.data?.error || "Failed to delete customer");
    }
  };

  
  return (
    <div className="customer-list">
      <h2>Customer List</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>
                <button onClick={() => handleEdit(customer.id)}>Edit</button>
                <button onClick={() => handleDelete(customer.id)} style={{ marginLeft: "10px", background: "red", color: "white" }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;