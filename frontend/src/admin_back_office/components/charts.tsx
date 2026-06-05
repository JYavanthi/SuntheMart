

import React, { useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

type RangeType = 7 | 30 | 90;

interface Payment {
  OrderDate: string;
  TotalAmount: number;
  PaymentMode: string;
}

interface Product {
  ProductName: string;
  TotalSold: number;
}

interface Props {
  payments?: Payment[];
  topProducts?: Product[];
  type?: "payments" | "products";
}

const Charts = ({
  payments = [],
  topProducts = [],
  type = "payments"
}: Props) => {

  const [range, setRange] = useState<RangeType>(7);

  /* SALES GRAPH */

  const generateData = (days: number) => {

    const labels: string[] = [];
    const data: number[] = [];

    for (let i = days - 1; i >= 0; i--) {

      const date = new Date();
      date.setDate(date.getDate() - i);

      labels.push(
        date.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short"
        })
      );

      const revenue = payments
        .filter((p) => {
          const d = new Date(p.OrderDate);
          return d.toDateString() === date.toDateString();
        })
        .reduce((sum, p) => sum + p.TotalAmount, 0);

      data.push(revenue);
    }

    return { labels, data };
  };

  const { labels, data } = generateData(range);

  const salesData = {
    labels,
    datasets: [
      {
        label: "Sales",
        data,
        fill: true,
        borderColor: "#3aaa35",
        backgroundColor: "rgba(58,170,53,0.15)",
        tension: 0.4,
        pointRadius: 4
      }
    ]
  };

  /* PIE CHART DATA */

  let pieLabels: string[] = [];
  let pieValues: number[] = [];
  let pieTitle = "";

  if (type === "products") {

    pieTitle = "Top Selling Products";

    pieLabels = topProducts.map((p) => p.ProductName);
    pieValues = topProducts.map((p) => p.TotalSold);

  } else {

    pieTitle = "Payment Modes";

    const paymentModes: { [key: string]: number } = {};

    payments.forEach((p) => {
      paymentModes[p.PaymentMode] =
        (paymentModes[p.PaymentMode] || 0) + 1;
    });

    pieLabels = Object.keys(paymentModes);
    pieValues = Object.values(paymentModes);
  }

  const pieData = {
    labels: pieLabels,
    datasets: [
      {
        data: pieValues,
        backgroundColor: [
          "#3aaa35",
          "#9cdb7b",
          "#ffe28a",
          "#ffb3b3"
        ],
        borderWidth: 0
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false
  };

  return (

    <div className="ad-charts">

      {/* SALES GRAPH */}

      <div className="chart-card">

        <div className="chart-header">

          <h3>Sales Report</h3>

          <div className="chart-filters">

            <button
              className={range === 7 ? "active" : ""}
              onClick={() => setRange(7)}
            >
              7 Days
            </button>

            <button
              className={range === 30 ? "active" : ""}
              onClick={() => setRange(30)}
            >
              30 Days
            </button>

            <button
              className={range === 90 ? "active" : ""}
              onClick={() => setRange(90)}
            >
              90 Days
            </button>

          </div>

        </div>

        <div className="chart-body">
          <Line data={salesData} options={options} />
        </div>

      </div>

      {/* PIE CHART */}

      {/* <div className="chart-card">

        <div className="chart-header">
          <h3>{pieTitle}</h3>
        </div>

        <div className="chart-body pie-body">
          <Pie data={pieData} options={options} />
        </div>

      </div> */}

    </div>

  );
};

export default Charts;