import React from "react";

const WalletsAndPayouts = () => {

  return (

    <div>

      <div className="vendor-stat-grid">

        <div className="vendor-stat-card">
          <h4>Available Balance</h4>
          <h2>₹2,45,600</h2>
        </div>

        <div className="vendor-stat-card">
          <h4>Pending Payout</h4>
          <h2>₹45,000</h2>
        </div>

        <div className="vendor-stat-card">
          <h4>Total Earnings</h4>
          <h2>₹18,75,600</h2>
        </div>

        <div className="vendor-stat-card">
          <h4>Completed Payouts</h4>
          <h2>24</h2>
        </div>

      </div>

      <div className="vendor-box">

        <table className="vendor-table">

          <thead>

            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            <tr>
              <td>01-Jun-2026</td>
              <td>₹50,000</td>
              <td>Paid</td>
            </tr>

            <tr>
              <td>15-May-2026</td>
              <td>₹40,000</td>
              <td>Paid</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default WalletsAndPayouts;