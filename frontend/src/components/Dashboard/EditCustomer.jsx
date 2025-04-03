import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditCustomer = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "" });
  const [error, setError] = useState("");
  // console.log(id,'swe');
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      console.log(token ,'swetha')
      await axios.put(`http://localhost:3000/customers/update/${id}`, form ,{
        headers: { Authorization: `Bearer ${token}` },

      });
      console.log('update successfully')
      // navigate("/dashboard/customers"); 
    } catch (error) {
      console.log("error",error)
      setError("Error updating customer.");
    }
  };

  return (
    <div>
      <h2>Edit Customer</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <button type="submit">Update Customer</button>
      </form>
    </div>
  );
};

export default EditCustomer;