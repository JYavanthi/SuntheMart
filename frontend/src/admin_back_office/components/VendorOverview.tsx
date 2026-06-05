
import React, {
  useEffect,
  useState
} from "react";

import {
  Line,
  Doughnut
} from "react-chartjs-2";

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

interface Props {
  VendorID: number;
}

const VendorOverview = ({
  VendorID
}: Props) => {

  const [summary, setSummary] =
    useState<any>({});

  const [revenueChart, setRevenueChart] =
    useState<any[]>([]);

  const [ordersChart, setOrdersChart] =
    useState<any[]>([]);

  const [categoryChart, setCategoryChart] =
    useState<any[]>([]);

  const [topProducts, setTopProducts] =
    useState<any[]>([]);

  useEffect(() => {

    if (!VendorID) return;

    loadData();

  }, [VendorID]);

  const loadData = async () => {

    try {

      const [
        summaryRes,
        revenueRes,
        ordersRes,
        categoryRes,
        productRes
      ] = await Promise.all([

        fetch(
          `http://localhost:4000/api/admin/vendor-summary/${VendorID}`
        ),

        fetch(
          `http://localhost:4000/api/admin/vendor-revenue-chart/${VendorID}`
        ),

        fetch(
          `http://localhost:4000/api/admin/vendor-orders-chart/${VendorID}`
        ),

        fetch(
          `http://localhost:4000/api/admin/vendor-category-sales/${VendorID}`
        ),

        fetch(
          `http://localhost:4000/api/admin/vendor-top-products/${VendorID}`
        )

      ]);

      const summaryData =
        await summaryRes.json();

      const revenueData =
        await revenueRes.json();

      const ordersData =
        await ordersRes.json();

      const categoryData =
        await categoryRes.json();

      const productsData =
        await productRes.json();

      if (summaryData.success) {
        setSummary(summaryData.data);
      }

      if (revenueData.success) {
        setRevenueChart(revenueData.data);
      }

      if (ordersData.success) {
        setOrdersChart(ordersData.data);
      }

      if (categoryData.success) {
        setCategoryChart(categoryData.data);
      }

      if (productsData.success) {
        setTopProducts(productsData.data);
      }

    }

    catch (error) {

      console.log(error);

    }

  };

  const revenueData = {

    labels:
      revenueChart.map(
        (x: any) =>
          new Date(
            x.SalesDate
          ).toLocaleDateString()
      ),

    datasets: [
      {
        label: "Revenue",

        data:
          revenueChart.map(
            (x: any) =>
              x.Revenue
          ),

        borderColor: "#22c55e",

        backgroundColor:
          "rgba(34,197,94,.1)",

        tension: .4,

        fill: true
      }
    ]
  };

  const ordersData = {

    labels:
      ordersChart.map(
        (x: any) =>
          new Date(
            x.SalesDate
          ).toLocaleDateString()
      ),

    datasets: [
      {
        label: "Orders",

        data:
          ordersChart.map(
            (x: any) =>
              x.TotalOrders
          ),

        borderColor: "#3b82f6",

        backgroundColor:
          "rgba(59,130,246,.1)",

        tension: .4,

        fill: true
      }
    ]
  };

  const categoryData = {

    labels:
      categoryChart.map(
        (x: any) =>
          x.CategoryName
      ),

    datasets: [
      {
        data:
          categoryChart.map(
            (x: any) =>
              x.Revenue
          ),

        backgroundColor: [
          "#22c55e",
          "#3b82f6",
          "#f59e0b",
          "#a855f7",
          "#ef4444"
        ],

        borderWidth: 0
      }
    ]
  };

  return (

    <div>

      {/* STATS */}

      <div className="vendor-stat-grid">

        <div className="vendor-stat-card">
          <h4>Total Revenue</h4>

          <h2>
            ₹
            {Number(
              summary.TotalRevenue || 0
            ).toLocaleString()}
          </h2>
        </div>

        <div className="vendor-stat-card">
          <h4>Total Orders</h4>

          <h2>
            {summary.TotalOrders || 0}
          </h2>
        </div>

        <div className="vendor-stat-card">
          <h4>Average Order Value</h4>

          <h2>
            ₹
            {Number(
              summary.AverageOrderValue || 0
            ).toLocaleString()}
          </h2>
        </div>

        <div className="vendor-stat-card">
          <h4>Products Sold</h4>

          <h2>
            {summary.TotalProductsSold || 0}
          </h2>
        </div>

      </div>

      {/* CHARTS */}

      <div className="vendor-chart-grid">

        <div className="vendor-box">

          <h3>
            Revenue Overview
          </h3>

          <Line
            data={revenueData}
          />

        </div>

        <div className="vendor-box">

          <h3>
            Orders Overview
          </h3>

          <Line
            data={ordersData}
          />

        </div>

        <div className="vendor-box">

          <h3>
            Category Wise Sales
          </h3>

          <Doughnut
            data={categoryData}
          />

        </div>

      </div>

      {/* TOP PRODUCTS */}

      <div
        className="vendor-box"
        style={{
          marginTop: "20px"
        }}
      >

        <h3>
          Top Selling Products
        </h3>

        <table
          className="vendor-table"
        >

          <thead>

            <tr>

              <th>
                Product
              </th>

              <th>
                Orders
              </th>

              <th>
                Revenue
              </th>

            </tr>

          </thead>

          <tbody>

            {topProducts.map(
              (
                item: any,
                index
              ) => (

                <tr key={index}>

                  <td>
                    {item.ProductName}
                  </td>

                  <td>
                    {item.OrdersCount}
                  </td>

                  <td>
                    ₹
                    {Number(
                      item.Revenue
                    ).toLocaleString()}
                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default VendorOverview;

