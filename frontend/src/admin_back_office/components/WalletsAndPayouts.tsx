import React from "react";

const WalletsAndPayouts = () => {

  return (

    <div className="actve-vndr-dtl-wallet-page">

      {/* TOP CARDS */}

      <div className="actve-vndr-dtl-wallet-top-cards">

        <div className="actve-vndr-dtl-wallet-card">
          <span>💵</span>
          <h4>Available Balance</h4>
          <h2>₹2,45,600</h2>
        </div>

        <div className="actve-vndr-dtl-wallet-card">
          <span>🪙</span>
          <h4>Pending Settlement</h4>
          <h2>₹38,250</h2>
        </div>

        <div className="actve-vndr-dtl-wallet-card">
          <span>🏦</span>
          <h4>Total Paid Out</h4>
          <h2>₹12,75,300</h2>
        </div>

        <div className="actve-vndr-dtl-wallet-card">
          <span>📈</span>
          <h4>This Month Earnings</h4>
          <h2>₹1,84,500</h2>
        </div>

      </div>

      {/* SUMMARY ROW */}

      <div className="actve-vndr-dtl-wallet-summary">

        <div className="actve-vndr-dtl-wallet-box">

          <h3>Wallet Overview</h3>

          <div className="wallet-info-row">
            <span>Current Wallet Balance</span>
            <strong>₹2,45,600</strong>
          </div>

          <div className="wallet-info-row">
            <span>Last Settlement</span>
            <strong>₹48,250</strong>
          </div>

          <div className="wallet-info-row">
            <span>Settlement Date</span>
            <strong>27 May 2024</strong>
          </div>

          <div className="wallet-info-row">
            <span>Next Settlement</span>
            <strong>03 Jun 2024</strong>
          </div>

          <div className="wallet-info-row">
            <span>Settlement Cycle</span>
            <strong>Weekly</strong>
          </div>

        </div>

        <div className="actve-vndr-dtl-wallet-box">

          <h3>Earnings Breakdown</h3>

          <div className="wallet-info-row">
            <span>Product Sales</span>
            <strong>₹3,85,500</strong>
          </div>

          <div className="wallet-info-row">
            <span>Delivery Charges</span>
            <strong>₹12,500</strong>
          </div>

          <div className="wallet-info-row">
            <span>Promotional Revenue</span>
            <strong>₹8,000</strong>
          </div>

          <div className="wallet-total-green">
            Total Earnings ₹4,06,100
          </div>

        </div>

        <div className="actve-vndr-dtl-wallet-box">

          <h3>Deductions</h3>

          <div className="wallet-info-row">
            <span>Platform Commission</span>
            <strong>₹58,200</strong>
          </div>

          <div className="wallet-info-row">
            <span>Refunds</span>
            <strong>₹6,500</strong>
          </div>

          <div className="wallet-info-row">
            <span>Promotions</span>
            <strong>₹2,300</strong>
          </div>

          <div className="wallet-info-row">
            <span>Taxes</span>
            <strong>₹18,000</strong>
          </div>

          <div className="wallet-total-red">
            Total Deductions ₹85,000
          </div>

        </div>

        <div className="actve-vndr-dtl-wallet-box">

          <h3>Wallet Health Score</h3>

          <div className="wallet-health">

            <div className="wallet-health-circle">
              ✓
            </div>

            <h2>Excellent</h2>

            <p>
              Your wallet health is great
            </p>

          </div>

        </div>

      </div>

      {/* CHART + PAYOUTS + HEALTH */}

      <div className="actve-vndr-dtl-wallet-grid">

        <div className="actve-vndr-dtl-wallet-chart">

          <h3>Wallet Trend (Last 30 Days)</h3>

          <div className="wallet-dummy-chart">
            Wallet Trend Chart
          </div>

        </div>

        <div className="actve-vndr-dtl-wallet-payouts">

          <h3>Recent Payouts</h3>

          <table className="actve-vndr-dtl-table">

            <thead>
              <tr>
                <th>Payout ID</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>PAY-2024-231</td>
                <td>27 May 2024</td>
                <td>₹48,250</td>
                <td>Completed</td>
              </tr>

              <tr>
                <td>PAY-2024-228</td>
                <td>20 May 2024</td>
                <td>₹45,800</td>
                <td>Completed</td>
              </tr>

              <tr>
                <td>PAY-2024-224</td>
                <td>13 May 2024</td>
                <td>₹42,900</td>
                <td>Completed</td>
              </tr>

            </tbody>

          </table>

        </div>

        <div className="actve-vndr-dtl-wallet-side">

          <div className="actve-vndr-dtl-wallet-box">

            <h3>Wallet Health Metrics</h3>

            <div className="wallet-info-row">
              <span>Average Weekly Payout</span>
              <strong>₹46,500</strong>
            </div>

            <div className="wallet-info-row">
              <span>Failed Transactions</span>
              <strong>0</strong>
            </div>

            <div className="wallet-info-row">
              <span>Refund Ratio</span>
              <strong>1.2%</strong>
            </div>

            <div className="wallet-info-row">
              <span>Chargeback Rate</span>
              <strong>0.1%</strong>
            </div>

          </div>

          <div className="actve-vndr-dtl-wallet-box">

            <h3>Settlement Controls</h3>

            <button className="wallet-btn green">
              Release Payment
            </button>

            <button className="wallet-btn yellow">
              Hold Settlement
            </button>

            <button className="wallet-btn red">
              Freeze Wallet
            </button>

            <button className="wallet-btn">
              Download Statement
            </button>

            <button className="wallet-btn">
              View Transactions
            </button>

          </div>

        </div>

      </div>

  

    </div>

  );

};

export default WalletsAndPayouts;