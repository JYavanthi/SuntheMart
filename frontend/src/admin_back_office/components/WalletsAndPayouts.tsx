import React, { useEffect, useState } from "react";
import { API_URLS } from "../../API-Urls";

interface Props {
  VendorID:number;
}

const WalletsAndPayouts = ({
  VendorID
}:Props) => {

  const [walletSummary,setWalletSummary] =
    useState<any>({});

  const [walletOverview,setWalletOverview] =
    useState<any>({});

  const [deductions,setDeductions] =
    useState<any>({});

  const [payoutHistory,setPayoutHistory] =
    useState<any[]>([]);

  useEffect(()=>{

    if(!VendorID) return;

    loadWalletData();

  },[VendorID]);

  const loadWalletData=async()=>{

    try{

      const[
        summaryRes,
        overviewRes,
        deductionRes,
        payoutRes
      ]=await Promise.all([

        fetch(
          `${API_URLS.BASE_URL}admin/vendor-wallet-summary/${VendorID}`
        ),

        fetch(
          `${API_URLS.BASE_URL}admin/vendor-wallet-overview/${VendorID}`
        ),

        fetch(
          `${API_URLS.BASE_URL}admin/vendor-deductions/${VendorID}`
        ),

        fetch(
          `${API_URLS.BASE_URL}admin/vendor-payout-history/${VendorID}`
        )

      ]);

      const summaryData=
        await summaryRes.json();

      const overviewData=
        await overviewRes.json();

      const deductionData=
        await deductionRes.json();

      const payoutData=
        await payoutRes.json();

      if(summaryData.success)
        setWalletSummary(summaryData.data);

      if(overviewData.success)
        setWalletOverview(overviewData.data);

      if(deductionData.success)
        setDeductions(deductionData.data);

      if(payoutData.success)
        setPayoutHistory(payoutData.data);

    }
    catch(error){

      console.log(error);

    }

  };

  const releasePayment = async () => {

  try {

   const response = await fetch(
 `${API_URLS.BASE_URL}admin/release-vendor-payment/${VendorID}`,
 {
   method:"POST"
 }
);

const data = await response.json();

alert(data.message);

loadWalletData();

  } catch (error) {

    console.log(error);

  }

};

const holdSettlement = async () => {

  try {

    await fetch(
      `${API_URLS.BASE_URL}admin/hold-settlement/${VendorID}`,
      {
        method: "POST"
      }
    );

    loadWalletData();

  } catch (error) {

    console.log(error);

  }

};

const freezeWallet = async () => {

  try {

    await fetch(
      `${API_URLS.BASE_URL}admin/freeze-wallet/${VendorID}`,
      {
        method: "POST"
      }
    );

    alert("Wallet Frozen");

  } catch (error) {

    console.log(error);

  }

};

  return (

    <div className="actve-vndr-dtl-wallet-page">

      {/* TOP CARDS */}

      <div className="actve-vndr-dtl-wallet-top-cards">

        <div className="actve-vndr-dtl-wallet-card">
          <span>💵</span>
          <h4>Available Balance</h4>
        <h2>
  ₹{Number(walletSummary.AvailableBalance || 0).toLocaleString()}
</h2>
        </div>

        <div className="actve-vndr-dtl-wallet-card">
          <span>🪙</span>
          <h4>Pending Settlement</h4>
       <h2>
  ₹{Number(walletSummary.PendingSettlement || 0).toLocaleString()}
</h2>
        </div>

        <div className="actve-vndr-dtl-wallet-card">
          <span>🏦</span>
          <h4>Total Paid Out</h4>
          <h2>
  ₹{Number(walletSummary.TotalPaidOut || 0).toLocaleString()}
</h2>
        </div>

        <div className="actve-vndr-dtl-wallet-card">
          <span>📈</span>
          <h4>This Month Earnings</h4>
         <h2>
  ₹{Number(walletSummary.ThisMonthEarnings || 0).toLocaleString()}
</h2>
        </div>

      </div>

      {/* SUMMARY ROW */}

      <div className="actve-vndr-dtl-wallet-summary">

        <div className="actve-vndr-dtl-wallet-box">

          <h3>Wallet Overview</h3>

          <div className="wallet-info-row">
            <span>Current Wallet Balance</span>
         <strong>
  ₹{Number(walletSummary.AvailableBalance || 0).toLocaleString()}
</strong>
          </div>

          <div className="wallet-info-row">
            <span>Last Settlement</span>
            <strong>
  ₹{Number(walletOverview?.LastSettlement || 0).toLocaleString()}
</strong>
          </div>

          <div className="wallet-info-row">
            <span>Settlement Date</span>
            <strong>
{
  walletOverview.LastSettlementDate
    ? new Date(walletOverview?.LastSettlementDate)
      .toLocaleDateString()
    : "-"
}
</strong>
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
         

        </div>

        <div className="actve-vndr-dtl-wallet-box">

          <h3>Deductions</h3>

         <div className="wallet-info-row">
  <span>Total Revenue</span>
  <strong>
    ₹{Number(walletSummary.TotalRevenue || 0).toLocaleString()}
  </strong>
</div>

<div className="wallet-info-row">
  <span>Platform Commission (40%)</span>
  <strong>
    ₹{Number(walletSummary.TotalCommission || 0).toLocaleString()}
  </strong>
</div>

<div className="wallet-info-row">
  <span>Net Vendor Earnings</span>
  <strong>
    ₹{Number(walletSummary.TotalNetEarnings || 0).toLocaleString()}
  </strong>
</div>

<div className="wallet-total-green">
  Available Balance ₹
  {Number(walletSummary.AvailableBalance || 0).toLocaleString()}
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

{
  payoutHistory.map(
    (item:any,index:number)=>(
      <tr key={index}>

        <td>
          {item.PayoutID}
        </td>

        <td>
          {
            item.PayoutDate
              ? new Date(item.PayoutDate)
                .toLocaleDateString()
              : "-"
          }
        </td>

        <td>
          ₹{
            Number(item.NetAmount || 0)
              .toLocaleString()
          }
        </td>

        <td>
          {item.PayoutStatus}
        </td>

      </tr>
    )
  )
}

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

            <button className="wallet-btn green"  onClick={releasePayment}>
              Release Payment
            </button>

            <button className="wallet-btn yellow"  onClick={holdSettlement}>
              Hold Settlement
            </button>

            <button className="wallet-btn red"  onClick={freezeWallet}>
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