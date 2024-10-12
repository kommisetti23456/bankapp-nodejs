import React from "react";
import './AccountDetails.css';

const AccountDetails = ({ customer, updatedBalance }) => {
  const user = customer || { username: "N/A", accountNumber: "N/A", branch: "N/A", phoneNumber: "N/A", balance: 0 };

  return (
    <div className="account-container">
      <div className="text-account-container">
        <h2>Account Details :</h2>
        <p>Username: {user.username}</p>
        <p>Account Number: {user.accountNumber}</p>
        <p>Branch: {user.branch}</p>
        <p>Phone Number: {user.phoneNumber}</p>
        <p>
          Available Balance:
          <span>
            {updatedBalance === 0 ? user.balance : updatedBalance}
          </span> Balance
        </p>
      </div>
    </div>
  );
};

export default AccountDetails;

