import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";  


const Home = () => {
  return (
    <div>
      <h1>Welcome...!</h1>
      <Link to="/auth">
        <button>Login/Register</button>
      </Link>
    </div>
  );
};

export default Home;