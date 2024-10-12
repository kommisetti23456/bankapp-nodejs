import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert";

const WithdrawalForm = ({ customer, updateBalance }) => {
  const [withdrawalData, setWithdrawalData] = useState({
    username: customer?.username || "",
    accountNumber: customer?.accountNumber || "",
    withdrawalAmount: "",
    withdrawalType: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(withdrawalData);

    try {
      const response = await axios.post("http://localhost:7000/api/withdraw", withdrawalData);
      console.log(response.data);
      updateBalance(response.data.balance);

      Swal({
        title: "Withdrawal Successful!",
        text: `Amount withdrawn: ${withdrawalData.withdrawalAmount}`,
        icon: "success",
      });
    } catch (error) {
      console.error("Withdraw failed", error);
      Swal({
        title: "Withdrawal Failed!",
        text: error.response?.data.message || "Something went wrong",
        icon: "error",
      });
    }
  };

  const handleClear = () => {
    setWithdrawalData({
      username: customer?.username || "",
      accountNumber: customer?.accountNumber || "",
      withdrawalAmount: "",
      withdrawalType: ""
    });
  };

  if (!customer) {
    return <p>Please log in to access the withdrawal form.</p>; // Or redirect to login
  }

  return (
    <div className="withdraw-container">
      <div className="text-withdraw-container">
        <form onSubmit={handleSubmit}>
          <h2>Withdrawal Form:</h2>
          <p>Username: {customer.username}</p>
          <p>Account Number: {customer.accountNumber}</p>
          <label>Withdrawal Amount:</label>
          <input
            type="number"
            placeholder="Withdrawal Amount"
            value={withdrawalData.withdrawalAmount}
            onChange={(e) =>
              setWithdrawalData({
                ...withdrawalData,
                withdrawalAmount: e.target.value,
              })
            }
            required
          />
          <label>Withdrawal Type:</label>
          <input
            type="text"
            placeholder="Withdrawal Type"
            value={withdrawalData.withdrawalType}
            onChange={(e) =>
              setWithdrawalData({
                ...withdrawalData,
                withdrawalType: e.target.value,
              })
            }
            required
          />
          <button type="submit">Withdraw</button>
          <button type="button" onClick={handleClear}>Clear</button>
        </form>
      </div>
    </div>
  );
};

export default WithdrawalForm;



