import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import "./auth.css";
import { jwtDecode } from 'jwt-decode'

const API_URL = "http://localhost:3000/auth";

const Auth = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phoneNo: "",
    address: "",
    role: "user",
  });
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [id,setId] = useState("")

  const navigate = useNavigate();
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    
      const endpoint = isLogin ? "login" : "register";
      const { data } = await axios.post(`${API_URL}/${endpoint}`, form);
      setMessage(data.message);
      if (data.token) {
        localStorage.setItem("token", data.token);
        // localStorage.setItem("role", data.role);
        const decoded = jwtDecode(data.token)
        console.log("-------------->",decoded)
        if (decoded.role === "admin") {
          navigate("/dashboard"); 
        } else {
          navigate("/customerdashboard"); 
        }
      }
    } catch (error) {
      setMessage(error.response?.data?.error || "Something went wrong");
    }
  };
  

  return (
    <div>
      <h2>{isLogin ? "Login" : "Register"}</h2>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required/>
            <input type="text" name="address" placeholder="Address" onChange={handleChange} required/>
            <input type="text" name="phoneNo"placeholder="Phone Number" onChange={handleChange}required/>
          </>
        )}
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required/>
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>

      <p>{message}</p>

      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Go to Register" : "Go to Login"}
      </button>
    </div>
  );
};

export default Auth;