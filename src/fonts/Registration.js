import React, { useState, useEffect } from "react";
import "./Registration.css";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    username: "",
    password: "",
    accountNumber: "",
    branch: "",
    phoneNumber: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Reset signupData to empty when component mounts
    setSignupData({
      username: "",
      password: "",
      accountNumber: "",
      branch: "",
      phoneNumber: "",
    });
  }, []); // Empty dependency array ensures this runs only on mount

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Validate inputs
    if (!signupData.username || !signupData.password || !signupData.accountNumber || !signupData.branch || !signupData.phoneNumber) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:7000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Signup failed");
      }

      console.log("Signup successful");
      navigate("/login");
    } catch (error) {
      console.error("Signup failed", error);
      setErrorMessage("Failed to connect to the server. Please try again later.");
    }
  };

  const handleClear = () => {
    setSignupData({
      username: "",
      password: "",
      accountNumber: "",
      branch: "",
      phoneNumber: "",
    });
    setErrorMessage("");
  };

  return (
    <div className="signup-Container">
      <div className="signUp-text">
        {errorMessage && <p className="error">{errorMessage}</p>}
        <form onSubmit={handleSignup}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              placeholder="User Name"
              value={signupData.username}
              onChange={(e) =>
                setSignupData({ ...signupData, username: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              placeholder="Password"
              value={signupData.password}
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
              maxLength={8}
              required
            />
          </div>
          <div>
            <label>Account Number:</label>
            <input
              type="text"
              placeholder="Account Number"
              value={signupData.accountNumber}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 14 && /^[0-9]*$/.test(value)) {
                  setSignupData({
                    ...signupData,
                    accountNumber: value,
                  });
                }
              }}
              required
            />
          </div>
          <div>
            <label>Branch:</label>
            <input
              type="text"
              placeholder="Branch Name"
              value={signupData.branch}
              onChange={(e) =>
                setSignupData({ ...signupData, branch: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label>Registered Phone Number:</label>
            <input
              type="tel"
              placeholder="Registered Phone Number"
              value={signupData.phoneNumber}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 10 && /^[0-9]*$/.test(value)) {
                  setSignupData({ ...signupData, phoneNumber: value });
                }
              }}
              required
            />
          </div>
          <div>
            <button type="submit">Sign Up</button>
            <button type="button" onClick={handleClear}>
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;











