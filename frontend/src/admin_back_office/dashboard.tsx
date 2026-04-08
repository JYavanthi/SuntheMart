
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
//   InvoiceNo: string;
// }

// const Dashboard = () => {
//   const [payments, setPayments] = useState<Payment[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>("");
//   const [viewAll, setViewAll] = useState(false);

//   useEffect(() => {
//     fetch("http://localhost:4000/api/admin/payments")
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) {
//           setPayments(data.data);
//         } else {
//           setError(data.message || "Failed to fetch payments");
//         }
//       })
//       .catch((err) => {
//         console.error("Dashboard payment fetch error:", err);
//         setError("Server error while fetching payments");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div className="ad-app">
//       <Sidebar />

//       <main className="ad-main">
//         <Header />
//         <h2 className="ad-welcome">
//           Hello, Madhusudan! Look at your store
//         </h2>

//         <div className="ad-dshbrd">
//           {/* CARDS */}
//           <div className="ad-cards">
//             <div className="ad-card green">
//               ₹24,500 <small>Annual Revenue</small>
//             </div>
//             <div className="ad-card purple">
//               ₹40,000 <small>Monthly Revenue</small>
//             </div>
//             <div className="ad-card yellow">
//               1400+ <small>Total Orders</small>
//             </div>
//             <div className="ad-card red">
//               200+ <small>Product Refunds</small>
//             </div>
//           </div>

//           {/* CHART */}
//           <div className="ad-content">
//             <div className="ad-box ad-graph-box">
//               <Charts />
//             </div>
//           </div>

//           {/* TRANSACTION TABLE */}
//           <div className="ad-table-content">
//             <div className="ad-table-box">
//               <div className="table-header">
//                 <h3>Transactions</h3>
//                 {/* <button className="view-btn">View All</button> */}
//                 <button 
//                     className="view-btn"
//                     onClick={() => setViewAll(!viewAll)}
//                   >
//                     {viewAll ? "Show Less" : "View All"}
//                   </button>
//               </div>
//              <div className={`ad-table-scroll ${viewAll ? "scroll-active" : ""}`}>
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
//                   {loading ? (
//                     <tr>
//                       <td colSpan={7} style={{ textAlign: "center" }}>
//                         Loading payments...
//                       </td>
//                     </tr>
//                   ) : error ? (
//                     <tr>
//                       <td colSpan={7} style={{ textAlign: "center" }}>
//                         {error}
//                       </td>
//                     </tr>
//                   ) : payments.length === 0 ? (
//                     <tr>
//                       <td colSpan={7} style={{ textAlign: "center" }}>
//                         No payments found
//                       </td>
//                     </tr>
//                   ) : (
//                      (viewAll ? payments : payments.slice(0, 5)).map((item) => (
//                       <tr key={item.OrderID}>
//                         <td>#{item.OrderID}</td>
//                         <td>{item.CustomerName}</td>
//                         <td>#{item.UserID}</td>
//                         <td>{item.PaymentMode}</td>
//                         <td>
//                           {new Date(item.OrderDate).toLocaleDateString("en-IN")}
//                         </td>
//                         <td>₹{item.TotalAmount}</td>
//                         <td>
//                           <span
//                             className={`pay-status ${item.PaymentStatus.toLowerCase()}`}
//                           >
//                             {item.PaymentStatus}
//                           </span>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//              </div> 
//             </div>

//             {/* TRAFFIC SECTION */}
//             <div className="ad-table-box-2">
//               <div className="table-header">
//                 <h3>Traffic Sources</h3>
//               </div>

//               <div className="traffic-sources">
//                 {/* Your existing UI */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;










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
//   InvoiceNo: string;
// }

// const Dashboard = () => {

//   const [payments, setPayments] = useState<Payment[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>("");

//   const [viewAll, setViewAll] = useState(false);

//   const [annualRevenue, setAnnualRevenue] = useState(0);
//   const [monthlyRevenue, setMonthlyRevenue] = useState(0);
//   const [totalOrders, setTotalOrders] = useState(0);
//   const [refunds, setRefunds] = useState(0);

//   useEffect(() => {
//     fetch("http://localhost:4000/api/admin/payments")
//       .then((res) => res.json())
//       .then((data) => {

//         if (data.success) {

//           const paymentsData: Payment[] = data.data;
//           setPayments(paymentsData);

//           const now = new Date();
//           const currentYear = now.getFullYear();
//           const currentMonth = now.getMonth();

//           let annual = 0;
//           let monthly = 0;
//           let refundCount = 0;

//           paymentsData.forEach((p) => {

//             const orderDate = new Date(p.OrderDate);

//             if (orderDate.getFullYear() === currentYear) {
//               annual += p.TotalAmount;
//             }

//             if (
//               orderDate.getFullYear() === currentYear &&
//               orderDate.getMonth() === currentMonth
//             ) {
//               monthly += p.TotalAmount;
//             }

//             if (p.PaymentStatus.toLowerCase() === "refunded") {
//               refundCount++;
//             }

//           });

//           setAnnualRevenue(annual);
//           setMonthlyRevenue(monthly);
//           setTotalOrders(paymentsData.length);
//           setRefunds(refundCount);

//         } else {
//           setError(data.message || "Failed to fetch payments");
//         }
//       })
//       .catch((err) => {
//         console.error("Dashboard payment fetch error:", err);
//         setError("Server error while fetching payments");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div className="ad-app">

//       <Sidebar />

//       <main className="ad-main">

//         <Header />

//         <h2 className="ad-welcome">
//           Hello, Madhusudan! Look at your store
//         </h2>

//         <div className="ad-dshbrd">

//           {/* DASHBOARD CARDS */}
//           <div className="ad-cards">

//             <div className="ad-card green">
//               ₹{annualRevenue.toLocaleString()}
//               <small>Annual Revenue</small>
//             </div>

//             <div className="ad-card purple">
//               ₹{monthlyRevenue.toLocaleString()}
//               <small>Monthly Revenue</small>
//             </div>

//             <div className="ad-card yellow">
//               {totalOrders}+
//               <small>Total Orders</small>
//             </div>

//             <div className="ad-card red">
//               {refunds}+
//               <small>Product Refunds</small>
//             </div>

//           </div>

//           {/* GRAPH */}
//           <div className="ad-content">

//             <div className="ad-box ad-graph-box">
//               <Charts payments={payments} />
//             </div>

//           </div>

//           {/* TRANSACTIONS */}
//           <div className="ad-table-content">

//             <div className="ad-table-box">

//               <div className="table-header">

//                 <h3>Transactions</h3>

//                 <button
//                   className="view-btn"
//                   onClick={() => setViewAll(!viewAll)}
//                 >
//                   {viewAll ? "Show Less" : "View All"}
//                 </button>

//               </div>

//               <div className={`ad-table-scroll ${viewAll ? "scroll-active" : ""}`}>

//                 <table className="ad-table">

//                   <thead>
//                     <tr>
//                       <th>Order ID</th>
//                       <th>Cust Name</th>
//                       <th>Cust ID</th>
//                       <th>Mode</th>
//                       <th>Date</th>
//                       <th>Amount</th>
//                       <th>Status</th>
//                     </tr>
//                   </thead>

//                   <tbody>

//                     {loading ? (
//                       <tr>
//                         <td colSpan={7} style={{ textAlign: "center" }}>
//                           Loading payments...
//                         </td>
//                       </tr>

//                     ) : error ? (
//                       <tr>
//                         <td colSpan={7} style={{ textAlign: "center" }}>
//                           {error}
//                         </td>
//                       </tr>

//                     ) : payments.length === 0 ? (
//                       <tr>
//                         <td colSpan={7} style={{ textAlign: "center" }}>
//                           No payments found
//                         </td>
//                       </tr>

//                     ) : (
//                       (viewAll ? payments : payments.slice(0, 5)).map((item) => (

//                         <tr key={item.OrderID}>

//                           <td>#{item.OrderID}</td>

//                           <td>{item.CustomerName}</td>

//                           <td>#{item.UserID}</td>

//                           <td>{item.PaymentMode}</td>

//                           <td>
//                             {new Date(item.OrderDate).toLocaleDateString("en-IN")}
//                           </td>

//                           <td>₹{item.TotalAmount}</td>

//                           <td>
//                             <span
//                               className={`pay-status ${item.PaymentStatus.toLowerCase()}`}
//                             >
//                               {item.PaymentStatus}
//                             </span>
//                           </td>

//                         </tr>

//                       ))
//                     )}

//                   </tbody>

//                 </table>

//               </div>

//             </div>

//             {/* TRAFFIC SECTION */}
//             <div className="ad-table-box-2">

//               <div className="table-header">
//                 <h3>Traffic Sources</h3>
//               </div>

//               <div className="traffic-sources">
//                 {/* future traffic analytics */}
//               </div>

//             </div>

//           </div>

//         </div>

//       </main>

//     </div>
//   );
// };

// export default Dashboard;


import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Header from "./topbar";
import "./styles/dashboard.css";
import Charts from "./components/charts";

interface Payment {
  OrderID: number;
  UserID: number;
  CustomerName: string;
  PaymentMode: string;
  OrderDate: string;
  TotalAmount: number;
  PaymentStatus: string;
}

interface Product {
  ProductName: string;
  TotalSold: number;
}

const Dashboard = () => {

  const [payments,setPayments] = useState<Payment[]>([]);
  const [topProducts,setTopProducts] = useState<Product[]>([]);

  const [viewAll,setViewAll] = useState(false);
  

  const [annualRevenue,setAnnualRevenue] = useState(0);
  const [monthlyRevenue,setMonthlyRevenue] = useState(0);
  const [totalOrders,setTotalOrders] = useState(0);
  const [refunds,setRefunds] = useState(0);
  
    const [userName, setUserName] = useState("User");

  useEffect(()=>{

    /* FETCH PAYMENTS */
    fetch("http://localhost:4000/api/admin/payments")
    .then(res=>res.json())
    .then(data=>{

      if(data.success){

        const paymentsData:Payment[] = data.data;

        setPayments(paymentsData);

        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();

        let annual = 0;
        let monthly = 0;
        let refundCount = 0;

        paymentsData.forEach(p=>{

          const orderDate = new Date(p.OrderDate);

          if(orderDate.getFullYear()===currentYear){
            annual += p.TotalAmount;
          }

          if(
            orderDate.getFullYear()===currentYear &&
            orderDate.getMonth()===currentMonth
          ){
            monthly += p.TotalAmount;
          }

          if(p.PaymentStatus.toLowerCase()==="refunded"){
            refundCount++;
          }

        });

        setAnnualRevenue(annual);
        setMonthlyRevenue(monthly);
        setTotalOrders(paymentsData.length);
        setRefunds(refundCount);

      }

    });

    /* FETCH TOP PRODUCTS */

    fetch("http://localhost:4000/api/admin/top-products")
    .then(res=>res.json())
    .then(data=>{
      if(data.success){
        setTopProducts(data.data);
      }
    });

  },[]);
    useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId");

        if (!userId) return;

        const res = await fetch(`http://localhost:4000/api/users/${userId}`);
        const result = await res.json();

        if (result.success && result.data?.FirstName) {
          setUserName(result.data.FirstName);
        }
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };

    fetchUser();
  }, []);

  return(

  <div className="ad-app">

    <Sidebar/>

    <main className="ad-main">

      <Header/>

      <h2 className="ad-welcome">
        Hello, {userName}! Look at your store
      </h2>

      <div className="ad-dshbrd">

        {/* DASHBOARD CARDS */}

        <div className="ad-cards">

          <div className="ad-card green">
            ₹{annualRevenue.toLocaleString()}
            <small>Annual Revenue</small>
          </div>

          <div className="ad-card purple">
            ₹{monthlyRevenue.toLocaleString()}
            <small>Monthly Revenue</small>
          </div>

          <div className="ad-card yellow">
            {totalOrders}+
            <small>Total Orders</small>
          </div>

          <div className="ad-card red">
            {refunds}+
            <small>Product Refunds</small>
          </div>

        </div>

        {/* CHARTS */}

        <div className="ad-content">

          <div className="ad-box ad-graph-box">
           <Charts 
  type="products"
  payments={payments} 
  topProducts={topProducts}
/>
          </div>

        </div>

        {/* TRANSACTIONS TABLE */}

        <div className="ad-table-content">

          <div className="ad-table-box">

            <div className="table-header">
              <h3>Transactions</h3>

              <button
                className="view-btn"
                onClick={()=>setViewAll(!viewAll)}
              >
                {viewAll ? "Show Less" : "View All"}
              </button>

            </div>

            <div className={`ad-table-scroll ${viewAll ? "scroll-active":""}`}>

              <table className="ad-table">

                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Cust Name</th>
                    <th>Cust ID</th>
                    <th>Mode</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {(viewAll ? payments : payments.slice(0,5)).map(item=>(

                    <tr key={item.OrderID}>

                      <td>#{item.OrderID}</td>
                      <td>{item.CustomerName}</td>
                      <td>#{item.UserID}</td>
                      <td>{item.PaymentMode}</td>

                      <td>
                        {new Date(item.OrderDate)
                        .toLocaleDateString("en-IN")}
                      </td>

                      <td>₹{item.TotalAmount}</td>

                      <td>
                        <span className={`pay-status ${item.PaymentStatus.toLowerCase()}`}>
                          {item.PaymentStatus}
                        </span>
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>
        <div className="ad-table-box-2">
  <div className="table-header">
    <h3>Customer Reviews</h3>
  </div>

  <div className="customer-reviews-box">
    <div className="review-card">
      <div className="review-top">
        <div>
          <h4>Yavanthi</h4>
          <span>Order #3207</span>
        </div>
        <div className="review-rating">★★★★★</div>
      </div>
      <p>
        Very good quality products and quick delivery. Packaging was neat and
        the product felt premium.
      </p>
    </div>

   
    <div className="review-card">
      <div className="review-top">
        <div>
          <h4>Ramesh</h4>
          <span>Order #3205</span>
        </div>
        <div className="review-rating">★★★★★</div>
      </div>
      <p>
        Excellent experience. Easy ordering process and the product quality was
        exactly as expected.
      </p>
    </div>
  </div>
</div>
        </div>

      </div>

    </main>

  </div>

  );

};

export default Dashboard;



