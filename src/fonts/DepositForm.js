import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert";
import "./DepositForm.css";

const DepositForm = ({ customer, updateBalance }) => {
  const [depositData, setDepositData] = useState({
    username: customer?.username || "",
    accountNumber: customer?.accountNumber || "",
    date: "",
    depositAmount: "",
    depositType: "",
  });

  const handleDeposit = async (e) => {
    e.preventDefault();
    console.log(depositData);
    try {
      const response = await axios.post(
        "http://localhost:7000/api/deposit",
        depositData
      );
      console.log(response.data.balance);
      updateBalance(response.data.balance); // Corrected prop name

      Swal({
        title: "Deposit Successful!",
        text: `Amount deposited: ${depositData.depositAmount}`,
        icon: "success",
      });
    } catch (error) {
      console.error("Deposit failed", error);
    }
  };

  const handleClear = () => {
    setDepositData({
      date: "",
      depositAmount: "",
      depositType: "",
    });
  };

  return (
    <div className="deposit-container">
      <div className="text-deposit-container">
        <form onSubmit={handleDeposit}>
          <h2>Deposit Form:</h2>
          <p>Username: {customer?.username}</p>
          <p>Account Number: {customer?.accountNumber}</p>
          <label>Date:</label>
          <input
            type="date"
            value={depositData.date}
            onChange={(e) =>
              setDepositData({ ...depositData, date: e.target.value })
            }
            required
          />
          <label>Deposit Amount:</label>
          <input
            type="number"
            placeholder="Deposit Amount"
            value={depositData.depositAmount}
            onChange={(e) =>
              setDepositData({ ...depositData, depositAmount: e.target.value })
            }
            required
          />
          <label>Deposit Type:</label>
          <input
            type="text"
            placeholder="Deposit Type"
            value={depositData.depositType}
            onChange={(e) =>
              setDepositData({ ...depositData, depositType: e.target.value })
            }
            required
          />
          <button type="submit">Deposit</button>
          <button type="button" onClick={handleClear}> {/* Changed type to "button" */}
            Clear
          </button>
        </form>
      </div>
    </div>
  );
};

export default DepositForm;
