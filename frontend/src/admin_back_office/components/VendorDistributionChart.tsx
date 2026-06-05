import React from "react";

import {
  Doughnut
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface Props{
  distribution:any;
}

const VendorDistributionChart=({
  distribution
}:Props)=>{

  const chartData={

    labels:[
      "Active",
      "Pending",
    //   "Suspended",
      "Rejected"
    ],

    datasets:[

      {
        data:[

          distribution?.active||0,
          distribution?.pending||0,
        //   distribution?.suspended||0,
          distribution?.rejected||0

        ],

        backgroundColor:[

          "#22c55e",
          "#3b82f6",
        //   "#f59e0b",
          "#ef4444"

        ],

        borderWidth:0

      }

    ]

  };

  return(

    <div className="dashboard-distribution-chart">

      <Doughnut
        data={chartData}
      />

    </div>

  );

};

export default VendorDistributionChart;