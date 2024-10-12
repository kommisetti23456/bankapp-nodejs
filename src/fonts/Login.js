import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import "./Login.css";

const Login = ({ updateCustomer }) => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    // Reset loginData to empty when component mounts
    setLoginData({
      username: "",
      password: "",
    });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:7000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Login error details:", errorData);
        throw new Error(errorData.message || "Network response was not ok");
      }

      const data = await response.json();
      navigate("/account-details");
      updateCustomer(data.customer);

    } catch (error) {
      console.error("Login failed", error);
      setLoginError(error.message);
    }
    console.log("Login data:", loginData);
  };

  const handleClear = () => {
    setLoginData({
      username: "",
      password: "",
    });
  };

  return (
    <div className="login-container">
      <div className="text-login-container">
        <form onSubmit={handleLogin}>
          <label>Username:</label>
          <input
            type="text"
            placeholder="User Name"
            value={loginData.username}
            onChange={(e) =>
              setLoginData({ ...loginData, username: e.target.value })
            }
            required
          />

          <label>Password:</label>
          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
            maxLength={8}
            required
          />
          <h3 className="error-msg">{loginError}</h3>
          <button type="submit">Login</button>
          <button type="button" onClick={handleClear}>
            Clear
          </button>
        </form>
        <p>Welcome back! Log in to manage your finances securely.</p>
        <p>If you're new here, sign up for an account to get started.</p>
        <p>Explore our features to make the most of your banking experience.</p>
        <p>We prioritize your security.</p>
        <p>Rest assured, your data is safe with us.</p>
        <p>24/7 customer support is available. Contact us for assistance.</p>
      </div>
    </div>
  );
};

export default Login;


  



