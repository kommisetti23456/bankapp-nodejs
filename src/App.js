import "./App.css";
import Home from "./Home";
import Login from "./fonts/Login";
import Registration from "./fonts/Registration";
import AccountDetails from "./fonts/AccountDetails";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import DepositForm from "./fonts/DepositForm";
import WithdrawalForm from "./fonts/WithdrawalForm";

function App() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null); // Initialize as null
  const [updatedBalance, setUpdatedBalance] = useState(0);

  const updateCustomer = (userData) => {
    setCustomer(userData);
    console.log(userData);
  };

  const handleLogout = () => {
    setCustomer(null);
    navigate("/login"); // Redirect on logout
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          {!customer ? (
            <>
              <li>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link className="nav-link" to="/account-details">
                  Account Details
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/deposit">
                  Deposit
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/withdraw">
                  Withdraw
                </Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login updateCustomer={updateCustomer} />} />
        <Route path="/register" element={<Registration />} />
        <Route 
          path="/account-details" 
          element={<AccountDetails customer={customer} updatedBalance={updatedBalance} />} 
        />
        <Route 
          path="/deposit" 
          element={<DepositForm customer={customer} updateBalance={setUpdatedBalance} />} 
        />
        <Route 
          path="/withdraw" 
          element={<WithdrawalForm customer={customer} updateBalance={setUpdatedBalance} />} 
        />
      </Routes>
    </div>
  );
}

export default App;





