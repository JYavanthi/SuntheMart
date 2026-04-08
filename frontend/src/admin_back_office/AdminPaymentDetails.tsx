
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Sidebar from "./sidebar";
// import Header from "./topbar";
// import user from "../assets/user.png";
// import "./styles/AdminPaymentDetails.css";

// interface OrderItem {
//   ProductName: string;
//   ProductWeight: string;
//   Quantity: number;
//   UnitPrice: number;
//   TotalPrice: number;
// }

// interface Order {
//   orderId: number;
//   userId: number;
//   customerName: string;
//   email:string,
//   contact:number,
//   regdate:number,
//   orderDate: string;
//   paymentMode: string;
//   paymentStatus: string;
//   orderStatus: string;
//   totalAmount: number;
//   taxAmount: number;
//   invoiceNo: string;
//   transactionId: string;
//   items: OrderItem[];
// }

// const AdminPaymentDetails = () => {
//   const { id } = useParams();
//   const [order, setOrder] = useState<Order | null>(null);

//   useEffect(() => {
//     fetch("http://localhost:4000/api/admin/orders")
//       .then(res => res.json())
//       .then(data => {
//         if (data.success) {
//           const selected = data.data.find(
//             (o: Order) => o.orderId === Number(id)
//           );
//           setOrder(selected);
//         }
//       });
//   }, [id]);

//   if (!order) return <div>Loading...</div>;

//   return (
//     <div className="admin-layout">
//       <Sidebar />

//       <div className="admin-main">
//         <Header />

//         <div className="adm-paydtl-wrapper">

//           {/* TOP HEADER */}
//           <div className="adm-paydtl-top">
//             <div className="adm-paydtl-userid">
//               <span>USER ID : </span>
//               <strong>#{order.userId}</strong>
//             </div>

//             <h2 className="adm-paydtl-title">Transactions</h2>

//             <div className="adm-paydtl-download">
//               Download Invoice
//             </div>
//           </div>

//           {/* MAIN CARD */}
//           <div className="adm-paydtl-card">

//             {/* PROFILE SECTION */}
//             <div className="adm-paydtl-profile-card">
//               <div className="adm-paydtl-personal-header">
//                 <h4>PERSONAL DETAILS</h4>
//               </div>

//               <div className="adm-paydtl-dtl-prsnl">
//                 <img
//                   src={user}
//                   alt="profile"
//                   className="adm-paydtl-profile-img"
//                 />

//               </div>

              
//               <div className="adm-paydtl-contact">
//   <div className="adm-paydtl-row">
//     <span className="adm-paydtl-key">Name : </span>
//     <span className="adm-prsnl-value">{order.customerName}</span>
//   </div>



//   <div className="adm-paydtl-row">
//     <span className="adm-paydtl-key">Email : </span>
//     <span className="adm-prsnl-value">{order.email}</span>
//   </div>

//   <div className="adm-paydtl-row">
//     <span className="adm-paydtl-key">Contact : </span>
//     <span className="adm-prsnl-value">{order.contact}</span>
//   </div>

//   <div className="adm-paydtl-row">
//     <span className="adm-paydtl-key">Registration Date :</span>
//     <span className="adm-prsnl-value">
//       {new Date(order.regdate).toLocaleString()}
//     </span>
//   </div>
// </div>
//             </div>

//             {/* RIGHT SECTION */}
//             <div className="adm-paydtl-content">

//               {/* ORDER HEADER */}
//               <div className="adm-paydtl-order-header">
//                 <strong>Order ID :  <span className="paydtl-ord-id">#{order.orderId}</span></strong>
//                 <span>{order.orderDate}</span>
//               </div>

//               {/* ITEMS + SUMMARY */}
//               <div className="adm-paydtl-body">

              

//                 <div className="adm-paydtl-summary">

//   <div className="adm-paydtl-summary-row adm-paydtl-total-row">
//     <span className="adm-paydtl-label-ttl">Total Amount</span>
//     <span className="adm-paydtl-total-amount">
//       ₹ {order.totalAmount}
//     </span>
//   </div>

//   <div className="adm-paydtl-summary-row-inv">
//     <span className="adm-paydtl-label-inv">Invoice</span>
//     <span className="adm-paydtl-value-inv">
//       {order.invoiceNo || "N/A"}
//     </span>
//   </div>

//   <div className="adm-paydtl-summary-row">
//     <span className="adm-paydtl-label">Transaction ID</span>
//     <span className="adm-paydtl-value">
//       {order.transactionId || "N/A"}
//     </span>
//   </div>

//   <div className="adm-paydtl-summary-row">
//     <span className="adm-paydtl-label">Payment Mode</span>
//     <span className="adm-paydtl-value">
//       {order.paymentMode}
//     </span>
//   </div>

//   <div className="adm-paydtl-summary-row">
//     <span className="adm-paydtl-label">Status</span>
//     <span
//       className={`adm-paydtl-status ${
//         order.paymentStatus === "SUCCESS"
//           ? "success"
//           : order.paymentStatus === "FAILED"
//           ? "failed"
//           : "pending"
//       }`}
//     >
//       {order.paymentStatus}
//     </span>
//   </div>

// </div>

//               </div>

//             </div>
            
//           </div>
//           <div className="adm-paydtl-history">
//             <h3>Payment History</h3>

//             <div className="adm-paydtl-history-row">
//               <span>{order.orderDate}</span>
//               <span className="adm-paydtl-plus"> + ₹ {order.totalAmount}</span>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminPaymentDetails;


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Sidebar from "./sidebar";
// import Header from "./topbar";
// import user from "../assets/user.png";
// import "./styles/AdminPaymentDetails.css";

// interface OrderItem {
//   ProductName: string;
//   ProductWeight: string;
//   Quantity: number;
//   UnitPrice: number;
//   TotalPrice: number;
// }

// interface Order {
//   orderId: number;
//   userId: number;
//   customerName: string;
//   email: string;
//   contact: number;
//   regdate: any;
//   orderDate: string;
//   paymentMode: string;
//   paymentStatus: string;
//   orderStatus: string;
//   totalAmount: number;
//   taxAmount: number;
//   invoiceNo: string;
//   transactionId: string;
//   items: OrderItem[];
// }

// const AdminPaymentDetails = () => {
//   const { id } = useParams();

//   const [order, setOrder] = useState<Order | null>(null);
//   const [userOrders, setUserOrders] = useState<Order[]>([]);

//   useEffect(() => {
//     fetch("http://localhost:4000/api/admin/orders")
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) {

//           const selected = data.data.find(
//             (o: Order) => o.orderId === Number(id)
//           );

//           if (selected) {
//             setOrder(selected);

//             const sameUserOrders = data.data.filter(
//               (o: Order) => o.userId === selected.userId
//             );

//             setUserOrders(sameUserOrders);
//           }
//         }
//       });
//   }, [id]);

//   const handleHistoryClick = (selectedOrder: Order) => {
//     setOrder(selectedOrder);
//   };

//   if (!order) return <div>Loading...</div>;

//   return (
//     <div className="admin-layout">
//       <Sidebar />

//       <div className="admin-main">
//         <Header />

//         <div className="adm-paydtl-wrapper">

//           {/* TOP HEADER */}
//           <div className="adm-paydtl-top">

//             <div className="adm-paydtl-userid">
//               USER ID : <strong>#{order.userId}</strong>
//             </div>

//             <h2 className="adm-paydtl-title">Transactions</h2>

//             <div className="adm-paydtl-download">
//               Download Invoice
//             </div>

//           </div>

//           {/* MAIN CARD */}
//           <div className="adm-paydtl-card">

//             {/* PROFILE */}
//             <div className="adm-paydtl-profile-card">

//               <div className="adm-paydtl-personal-header">
//                 <h4>PERSONAL DETAILS</h4>
//               </div>

//               <img
//                 src={user}
//                 alt="profile"
//                 className="adm-paydtl-profile-img"
//               />

//               <div className="adm-paydtl-contact">

//                 <div className="adm-paydtl-row">
//                   <span className="adm-paydtl-key">Name</span>
//                   <span className="adm-prsnl-value">{order.customerName}</span>
//                 </div>

//                 <div className="adm-paydtl-row">
//                   <span className="adm-paydtl-key">Email</span>
//                   <span className="adm-prsnl-value">{order.email}</span>
//                 </div>

//                 <div className="adm-paydtl-row">
//                   <span className="adm-paydtl-key">Contact</span>
//                   <span className="adm-prsnl-value">{order.contact}</span>
//                 </div>

//                 <div className="adm-paydtl-row">
//                   <span className="adm-paydtl-key">Registration Date</span>
//                   <span className="adm-prsnl-value">
//                     {new Date(order.regdate).toLocaleString()}
//                   </span>
//                 </div>

//               </div>

//             </div>

//             {/* RIGHT SIDE */}
//             <div className="adm-paydtl-content">

//               {/* ORDER HEADER */}
//               <div className="adm-paydtl-order-header">

//                 <strong>
//                   Order ID :
//                   <span className="paydtl-ord-id">
//                     #{order.orderId}
//                   </span>
//                 </strong>

//                 <span>
//                   {new Date(order.orderDate).toDateString()}
//                 </span>

//               </div>

//               {/* SUMMARY */}
//               <div className="adm-paydtl-summary">

//                 <div className="adm-paydtl-summary-row adm-paydtl-total-row">
//                   <span className="adm-paydtl-label-ttl">
//                     Total Amount
//                   </span>

//                   <span className="adm-paydtl-total-amount">
//                     ₹ {order.totalAmount}
//                   </span>
//                 </div>

//                 <div className="adm-paydtl-summary-row">
//                   <span className="adm-paydtl-label">
//                     Invoice
//                   </span>

//                   <span className="adm-paydtl-value">
//                     {order.invoiceNo || "N/A"}
//                   </span>
//                 </div>

//                 <div className="adm-paydtl-summary-row">
//                   <span className="adm-paydtl-label">
//                     Transaction ID
//                   </span>

//                   <span className="adm-paydtl-value">
//                     {order.transactionId || "N/A"}
//                   </span>
//                 </div>

//                 <div className="adm-paydtl-summary-row">
//                   <span className="adm-paydtl-label">
//                     Payment Mode
//                   </span>

//                   <span className="adm-paydtl-value">
//                     {order.paymentMode}
//                   </span>
//                 </div>

//                 <div className="adm-paydtl-summary-row">
//                   <span className="adm-paydtl-label">
//                     Status
//                   </span>

//                   <span
//                     className={`adm-paydtl-status ${
//                       order.paymentStatus === "SUCCESS"
//                         ? "success"
//                         : order.paymentStatus === "FAILED"
//                         ? "failed"
//                         : "pending"
//                     }`}
//                   >
//                     {order.paymentStatus}
//                   </span>

//                 </div>

//               </div>

//             </div>

//           </div>

//           {/* PAYMENT HISTORY */}
//           <div className="adm-paydtl-history">

//             <h3>Payment History</h3>

//             {userOrders.map((item) => (
//               <div
//                 key={item.orderId}
//                 className="adm-paydtl-history-row"
//                 onClick={() => handleHistoryClick(item)}
//               >

//                 <span>
//                   {new Date(item.orderDate).toDateString()}
//                 </span>

//                 <span className="adm-paydtl-plus">
//                   + ₹ {item.totalAmount}
//                 </span>

//               </div>
//             ))}

//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminPaymentDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./topbar";
import user from "../assets/user.png";
import "./styles/AdminPaymentDetails.css";

interface OrderItem {
  ProductName: string;
  ProductWeight: string;
  Quantity: number;
  UnitPrice: number;
  TotalPrice: number;
}

interface Order {
  orderId: number;
  userId: number;
  customerName: string;
  email: string;
  contact: number;
  regdate: number;
  orderDate: string;
  paymentMode: string;
  paymentStatus: string;
  orderStatus: string;
  totalAmount: number;
  taxAmount: number;
  invoiceNo: string;
  transactionId: string;
  items: OrderItem[];
}

const AdminPaymentDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState<Order | null>(null);
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const formatDate = (dateStr: string) => {
  const [day, month, year] = dateStr.split("/");

  const date = new Date(Number(year), Number(month) - 1, Number(day));

  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
  


  useEffect(() => {
    fetch("http://localhost:4000/api/admin/orders")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {

          setAllOrders(data.data);

          const selected = data.data.find(
            (o: Order) => o.orderId === Number(id)
          );

          if (selected) {
            setOrder(selected);

            const sameUserOrders = data.data.filter(
              (o: Order) => o.userId === selected.userId
            );

            setUserOrders(sameUserOrders);
          }
        }
      });
  }, [id]);

  const handleHistoryClick = (selectedOrder: Order) => {
    setOrder(selectedOrder);
  };

  if (!order) return <div>Loading...</div>;

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-main">
        <Header />
<h2 className="pay-dtl-ttl">Payment Details</h2>
        <div className="adm-paydtl-wrapper">
          

          {/* TOP HEADER */}
          <div className="adm-paydtl-top">
            <div className="adm-paydtl-userid">
              <span>USER ID : </span>
              <strong>#{order.userId}</strong>
            </div>

            <h2 className="adm-paydtl-title">Transactions</h2>

            <div className="adm-paydtl-download">
              Download Invoice
            </div>
          </div>

          {/* MAIN CARD */}
          <div className="adm-paydtl-card">

            {/* PROFILE SECTION */}
            <div className="adm-paydtl-profile-card">
              <div className="adm-paydtl-personal-header">
                <h4>PERSONAL DETAILS</h4>
              </div>

              <div className="adm-paydtl-dtl-prsnl">
                <img
                  src={user}
                  alt="profile"
                  className="adm-paydtl-profile-img"
                />
              </div>

              <div className="adm-paydtl-contact">

                <div className="adm-paydtl-row">
                  <span className="adm-paydtl-key">Name : </span>
                  <span className="adm-prsnl-value">{order.customerName}</span>
                </div>

                <div className="adm-paydtl-row">
                  <span className="adm-paydtl-key">Email : </span>
                  <span className="adm-prsnl-value">{order.email}</span>
                </div>

                <div className="adm-paydtl-row">
                  <span className="adm-paydtl-key">Contact : </span>
                  <span className="adm-prsnl-value">{order.contact}</span>
                </div>

                <div className="adm-paydtl-row">
                  <span className="adm-paydtl-key">Registration Date :</span>
                  <span className="adm-prsnl-value">
                    {new Date(order.regdate).toLocaleString()}
                  </span>
                </div>

              </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="adm-paydtl-content">

              {/* ORDER HEADER */}
              <div className="adm-paydtl-order-header">
                <strong>
                  Order ID :
                  <span className="paydtl-ord-id">  #{order.orderId}</span>
                </strong>
                <span>{order.orderDate}</span>
              </div>

              {/* SUMMARY */}
              <div className="adm-paydtl-body">

                <div className="adm-paydtl-summary">

                  <div className="adm-paydtl-summary-row adm-paydtl-total-row">
                    <span className="adm-paydtl-label-ttl">Total Amount</span>
                    <span className="adm-paydtl-total-amount">
                      ₹ {order.totalAmount}
                    </span>
                  </div>

                  <div className="adm-paydtl-summary-row-inv">
                    <span className="adm-paydtl-label-inv">Invoice</span>
                    <span className="adm-paydtl-value-inv">
                      {order.invoiceNo || "N/A"}
                    </span>
                  </div>

                  <div className="adm-paydtl-summary-row">
                    <span className="adm-paydtl-label">Transaction ID</span>
                    <span className="adm-paydtl-value">
                      {order.transactionId || "N/A"}
                    </span>
                  </div>

                  <div className="adm-paydtl-summary-row">
                    <span className="adm-paydtl-label">Payment Mode</span>
                    <span className="adm-paydtl-value">
                      {order.paymentMode}
                    </span>
                  </div>

                  <div className="adm-paydtl-summary-row">
                    <span className="adm-paydtl-label">Status</span>
                    <span
                      className={`adm-paydtl-status ${
                        order.paymentStatus === "SUCCESS"
                          ? "success"
                          : order.paymentStatus === "FAILED"
                          ? "failed"
                          : "pending"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* PAYMENT HISTORY */}
          <div className="adm-paydtl-history">
            <h3><i className="fa-solid fa-receipt"></i>  Payment History</h3>

            {userOrders.map((item) => (
              // <div
              //   key={item.orderId}
              //   className="adm-paydtl-history-row"
              //   onClick={() => handleHistoryClick(item)}
              //   style={{ cursor: "pointer" }}
              // >
              //   <span>{item.orderDate}</span>
              //   <span className="adm-paydtl-plus">
              //     + ₹ {item.totalAmount}
              //   </span>
              // </div>
             <div
  key={item.orderId}
  className="adm-paydtl-history-row"
  onClick={() => handleHistoryClick(item)}
  style={{ cursor: "pointer" }}
>
  <span>{formatDate(item.orderDate)}</span>

  <span className="adm-paydtl-plus">
    + ₹ {item.totalAmount}
  </span>
</div>
            ))}

          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminPaymentDetails;