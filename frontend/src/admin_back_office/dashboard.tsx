

// import React, { useEffect, useState } from "react";
// import Sidebar from "./sidebar";
// import Header from "./topbar";
// import "./styles/dashboard.css";
// import Charts from "./components/charts";

// interface Payment {
//   OrderID: number;
//   UserID: number;
//   CustomerName: string;
//   PaymentMode: string;
//   OrderDate: string;
//   TotalAmount: number;
//   PaymentStatus: string;
// }

// interface Product {
//   ProductName: string;
//   TotalSold: number;
// }

// const Dashboard = () => {

//   const [payments,setPayments] = useState<Payment[]>([]);
//   const [topProducts,setTopProducts] = useState<Product[]>([]);

//   const [viewAll,setViewAll] = useState(false);
  

//   const [annualRevenue,setAnnualRevenue] = useState(0);
//   const [monthlyRevenue,setMonthlyRevenue] = useState(0);
//   const [totalOrders,setTotalOrders] = useState(0);
//   const [refunds,setRefunds] = useState(0);
  
//     const [userName, setUserName] = useState("User");

//   useEffect(()=>{

//     /* FETCH PAYMENTS */
//     fetch("http://localhost:4000/api/admin/payments")
//     .then(res=>res.json())
//     .then(data=>{

//       if(data.success){

//         const paymentsData:Payment[] = data.data;

//         setPayments(paymentsData);

//         const now = new Date();
//         const currentYear = now.getFullYear();
//         const currentMonth = now.getMonth();

//         let annual = 0;
//         let monthly = 0;
//         let refundCount = 0;

//         paymentsData.forEach(p=>{

//           const orderDate = new Date(p.OrderDate);

//           if(orderDate.getFullYear()===currentYear){
//             annual += p.TotalAmount;
//           }

//           if(
//             orderDate.getFullYear()===currentYear &&
//             orderDate.getMonth()===currentMonth
//           ){
//             monthly += p.TotalAmount;
//           }

//           if(p.PaymentStatus.toLowerCase()==="refunded"){
//             refundCount++;
//           }

//         });

//         setAnnualRevenue(annual);
//         setMonthlyRevenue(monthly);
//         setTotalOrders(paymentsData.length);
//         setRefunds(refundCount);

//       }

//     });

//     /* FETCH TOP PRODUCTS */

//     fetch("http://localhost:4000/api/admin/top-products")
//     .then(res=>res.json())
//     .then(data=>{
//       if(data.success){
//         setTopProducts(data.data);
//       }
//     });

//   },[]);
//     useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const userId = localStorage.getItem("userId");

//         if (!userId) return;

//         const res = await fetch(`http://localhost:4000/api/users/${userId}`);
//         const result = await res.json();

//         if (result.success && result.data?.FirstName) {
//           setUserName(result.data.FirstName);
//         }
//       } catch (error) {
//         console.error("Error fetching user name:", error);
//       }
//     };

//     fetchUser();
//   }, []);

//   return(

//   <div className="ad-app">

//     <Sidebar/>

//     <main className="ad-main">

//       <Header/>

//       <h2 className="ad-welcome">
//         Hello, {userName}! Look at your store
//       </h2>

//       <div className="ad-dshbrd">

//         {/* DASHBOARD CARDS */}

//         <div className="ad-cards">

//           <div className="ad-card green">
//             ₹{annualRevenue.toLocaleString()}
//             <small>Annual Revenue</small>
//           </div>

//           <div className="ad-card purple">
//             ₹{monthlyRevenue.toLocaleString()}
//             <small>Monthly Revenue</small>
//           </div>

//           <div className="ad-card yellow">
//             {totalOrders}+
//             <small>Total Orders</small>
//           </div>

//           <div className="ad-card red">
//             {refunds}+
//             <small>Product Refunds</small>
//           </div>

//         </div>

//         {/* CHARTS */}

//         <div className="ad-content">

//           <div className="ad-box ad-graph-box">
//            <Charts 
//   type="products"
//   payments={payments} 
//   topProducts={topProducts}
// />
//           </div>

//         </div>

//         {/* TRANSACTIONS TABLE */}

//         <div className="ad-table-content">

//           <div className="ad-table-box">

//             <div className="table-header">
//               <h3>Transactions</h3>

//               <button
//                 className="view-btn"
//                 onClick={()=>setViewAll(!viewAll)}
//               >
//                 {viewAll ? "Show Less" : "View All"}
//               </button>

//             </div>

//             <div className={`ad-table-scroll ${viewAll ? "scroll-active":""}`}>

//               <table className="ad-table">

//                 <thead>
//                   <tr>
//                     <th>Order ID</th>
//                     <th>Cust Name</th>
//                     <th>Cust ID</th>
//                     <th>Mode</th>
//                     <th>Date</th>
//                     <th>Amount</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>

//                 <tbody>

//                   {(viewAll ? payments : payments.slice(0,5)).map(item=>(

//                     <tr key={item.OrderID}>

//                       <td>#{item.OrderID}</td>
//                       <td>{item.CustomerName}</td>
//                       <td>#{item.UserID}</td>
//                       <td>{item.PaymentMode}</td>

//                       <td>
//                         {new Date(item.OrderDate)
//                         .toLocaleDateString("en-IN")}
//                       </td>

//                       <td>₹{item.TotalAmount}</td>

//                       <td>
//                         <span className={`pay-status ${item.PaymentStatus.toLowerCase()}`}>
//                           {item.PaymentStatus}
//                         </span>
//                       </td>

//                     </tr>

//                   ))}

//                 </tbody>

//               </table>

//             </div>

//           </div>
//         <div className="ad-table-box-2">
//   <div className="table-header">
//     <h3>Customer Reviews</h3>
//   </div>

//   <div className="customer-reviews-box">
//     <div className="review-card">
//       <div className="review-top">
//         <div>
//           <h4>Yavanthi</h4>
//           <span>Order #3207</span>
//         </div>
//         <div className="review-rating">★★★★★</div>
//       </div>
//       <p>
//         Very good quality products and quick delivery. Packaging was neat and
//         the product felt premium.
//       </p>
//     </div>

   
//     <div className="review-card">
//       <div className="review-top">
//         <div>
//           <h4>Ramesh</h4>
//           <span>Order #3205</span>
//         </div>
//         <div className="review-rating">★★★★★</div>
//       </div>
//       <p>
//         Excellent experience. Easy ordering process and the product quality was
//         exactly as expected.
//       </p>
//     </div>
//   </div>
// </div>
//         </div>

//       </div>

//     </main>

//   </div>

//   );

// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Header from "./topbar";
import DashboardAnalyticsChart from "./components/DashboardAnalyticsChart";
import VendorDistributionChart from "./components/VendorDistributionChart";

import "./styles/dashboard.css";

interface Vendor {
  VendorID: number;
  BusinessName: string;
  BusinessType: string;
  VendorStatus: string;
  CreatedDt: string;
}

interface Order {
  OrderID: number;
  OrderDate: string;
  TotalAmount: number;
  OrderStatus: string;
}

interface Category {
  CategoryName: string;
  Status: string;
}

const Dashboard = () => {

  const [stats, setStats] = useState<any>({});

  const [vendors, setVendors] =
    useState<Vendor[]>([]);

  const [orders, setOrders] =
    useState<Order[]>([]);

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [userName, setUserName] =
    useState("Admin");

   const [distribution, setDistribution] = useState({
  active: 0,
  pending: 0,
  suspended: 0,
  rejected: 0
}); 

  const payouts = [

    {
      vendor:
        "Green Fields Farms",
      amount:
        "₹2,45,680",
      status:
        "Paid"
    },

    {
      vendor:
        "Fresh Harvest Suppliers",
      amount:
        "₹1,85,420",
      status:
        "Paid"
    },

    {
      vendor:
        "Nature Basket Farms",
      amount:
        "₹1,53,000",
      status:
        "Paid"
    }

  ];

  useEffect(() => {

    fetch(
      "http://localhost:4000/api/admin/dashboard-stats"
    )
      .then((res) =>
        res.json()
      )
      .then((data) => {

        if (
          data.success
        ) {

          setStats(
            data.stats
          );

        }

      });

    fetch(
      "http://localhost:4000/api/admin/recent-vendors"
    )
      .then((res) =>
        res.json()
      )
      .then((data) => {

        if (
          data.success
        ) {

          setVendors(
            data.data
          );

        }

      });

    fetch(
      "http://localhost:4000/api/admin/recent-orders"
    )
      .then((res) =>
        res.json()
      )
      .then((data) => {

        if (
          data.success
        ) {

          setOrders(
            data.data
          );

        }

      });

      fetch(
  "http://localhost:4000/api/admin/vendor-distribution"
)
.then(res => res.json())
.then(data => {

  if(data.success){

   console.log("Vendor Distribution API", data.data);

const dist = {
  active: 0,
  pending: 0,
  suspended: 0,
  rejected: 0
};

data.data.forEach((item:any) => {

  const status =
    item.VendorStatus?.toLowerCase();

  if (
    status === "approved" ||
    status === "active"
  ) {
    dist.active += item.Count;
  }

  else if (

    status ==="UnderReview"
  ) {
    dist.pending += item.Count;
  }

  else if (
    status === "suspended"
  ) {
    dist.suspended += item.Count;
  }

  else if (
    status === "rejected"
  ) {
    dist.rejected += item.Count;
  }

});

console.log("Mapped Distribution", dist);

setDistribution(dist);

  }

});

    fetch(
      "http://localhost:4000/api/admin/top-categories"
    )
      .then((res) =>
        res.json()
      )
      .then((data) => {

        if (
          data.success
        ) {

          setCategories(
            data.data
          );

        }

      });

  }, []);

  useEffect(() => {

    const fetchUser =
      async () => {

        const userId =
          localStorage.getItem(
            "userId"
          );

        if (
          !userId
        )
          return;

        const res =
          await fetch(
            `http://localhost:4000/api/users/${userId}`
          );

        const result =
          await res.json();

        if (
          result.success
        ) {

          setUserName(
            result.data
              ?.FirstName ||
              "Admin"
          );

        }

      };

    fetchUser();

  }, []);

  return (

    <div className="dashboard-app">

      <Sidebar />

      <main className="dashboard-main">

        <Header />

        <div className="dashboard-welcome">

          <h2>
            Welcome Back,
            {userName}
          </h2>

          <p>
            Monitor your
            vendors,
            orders and
            business
            performance.
          </p>

        </div>

        {/* STATS */}

        <div className="dashboard-stats">

          <div className="dashboard-stat-card">

            <h5>
              Total Vendors
            </h5>

            <h2>
              {
                stats.totalVendors ||
                0
              }
            </h2>

          </div>

          <div className="dashboard-stat-card">

            <h5>
              Active Vendors
            </h5>

            <h2>
              {
                stats.activeVendors ||
                0
              }
            </h2>

          </div>

          <div className="dashboard-stat-card">

            <h5>
              Pending Approval
            </h5>

            <h2>
              {
                stats.pendingApprovals ||
                0
              }
            </h2>

          </div>

          <div className="dashboard-stat-card">

            <h5>
              Orders
            </h5>

            <h2>
              {
                stats.totalOrders ||
                0
              }
            </h2>

          </div>

          <div className="dashboard-stat-card">

            <h5>
              GMV
            </h5>

            <h2>

              ₹

              {Number(
                stats.gmv ||
                  0
              ).toLocaleString()}

            </h2>

          </div>

          <div className="dashboard-stat-card">

            <h5>
              Payouts
            </h5>

            <h2>
              ₹0
            </h2>

          </div>

        </div>

        {/* CHART */}

       <div className="dashboard-middle">

  <div className="dashboard-box">

    <div className="dashboard-box-header">
      <h3>Overview Analytics</h3>
    </div>

    <DashboardAnalyticsChart payments={[]} />

  </div>

  <div className="dashboard-box">

    <div className="dashboard-box-header">

      <h3>
        Recent Vendor Registrations
      </h3>

      <span className="dashboard-view-all">
        View All
      </span>

    </div>

    <table className="dashboard-vendor-table">

      <thead>

        <tr>

          <th>Vendor Name</th>
          <th>Business Type</th>
          <th>Registered On</th>
          <th>Status</th>

        </tr>

      </thead>

      <tbody>

        {vendors.slice(0,5).map((item:any)=>(

          <tr key={item.VendorID}>

            <td>{item.BusinessName}</td>

            <td>{item.BusinessType}</td>

            <td>
              {new Date(item.CreatedDt)
              .toLocaleDateString()}
            </td>

            <td>

              <span className="dashboard-status">

                {item.VendorStatus}

              </span>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</div>

        {/* BOTTOM GRID */}

        

   

        {/* LOWER GRID */}

        <div className="dashboard-bottom">

          {/* TOP CATEGORIES */}
          <div className="dashboard-card">

  <div className="dashboard-card-header">

    <h3>
      Vendor Status Distribution
    </h3>

  </div>

  <VendorDistributionChart
    distribution={distribution}
  />

</div>

          <div className="dashboard-card">

            <div className="dashboard-card-header">

              <h3>
                Top Categories
              </h3>

            </div>

            <div className="dashboard-category-list">

              {categories.map(
                (
                  item,
                  index
                ) => (

                  <div
                    key={
                      index
                    }
                    className="dashboard-category-item"
                  >

                    <div>

                      <span className="dashboard-category-number">

                        {
                          index + 1
                        }

                      </span>

                    </div>

                    <div className="dashboard-category-content">

                      <h4>

                        {
                          item.CategoryName
                        }

                      </h4>

                      <p>

                        {
                          item.Status
                        }

                      </p>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

          {/* PAYOUTS */}

          <div className="dashboard-card">

            <div className="dashboard-card-header">

              <h3>
                Recent Payouts
              </h3>

            </div>

            <table className="dashboard-table">

              <thead>

                <tr>

                  <th>
                    Vendor
                  </th>

                  <th>
                    Amount
                  </th>

                  <th>
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {payouts.map(
                  (
                    item,
                    index
                  ) => (

                    <tr
                      key={
                        index
                      }
                    >

                      <td>
                        {
                          item.vendor
                        }
                      </td>

                      <td>
                        {
                          item.amount
                        }
                      </td>

                      <td>

                        <span className="dashboard-paid-status">

                          {
                            item.status
                          }

                        </span>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      </main>

    </div>

  );

};

export default Dashboard;

