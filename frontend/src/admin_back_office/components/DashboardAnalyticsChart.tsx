import React from "react";
import {
  Line
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface Props{
  payments:any[];
}

const DashboardAnalyticsChart=({
  payments
}:Props)=>{

  const labels=[
    "1 May",
    "5 May",
    "10 May",
    "15 May",
    "20 May",
    "25 May",
    "31 May"
  ];

  const chartData={

    labels,

    datasets:[

      {
        label:"GMV",
        data:[95000,120000,145000,160000,150000,175000,190000],
        borderColor:"#22c55e",
        tension:.4
      },

      {
        label:"Orders",
        data:[45000,55000,70000,80000,78000,95000,110000],
        borderColor:"#3b82f6",
        tension:.4
      },

      {
        label:"Customers",
        data:[18000,25000,30000,42000,50000,62000,75000],
        borderColor:"#a855f7",
        tension:.4
      },

      {
        label:"Average Order Value",
        data:[12000,15000,17000,22000,21000,24000,28000],
        borderColor:"#f59e0b",
        tension:.4
      }

    ]

  };

  const options:any={

    responsive:true,

    maintainAspectRatio:false,

    plugins:{
      legend:{
        position:"bottom"
      }
    }

  };

  return(

    <div className="dashboard-analytics-chart">

      <div className="dashboard-mini-cards">

        <div className="dashboard-mini-card">
          <span>GMV</span>
          <h4>₹2,45,78,890</h4>
        </div>

        <div className="dashboard-mini-card">
          <span>Orders</span>
          <h4>12,456</h4>
        </div>

        <div className="dashboard-mini-card">
          <span>Customers</span>
          <h4>8,732</h4>
        </div>

        <div className="dashboard-mini-card">
          <span>AOV</span>
          <h4>₹1,972</h4>
        </div>

      </div>

      <div className="dashboard-line-chart">

        <Line
          data={chartData}
          options={options}
        />

      </div>

    </div>

  );

};

export default DashboardAnalyticsChart;