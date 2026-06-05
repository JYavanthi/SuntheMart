// ======================================
// FILE: MyOrders.tsx
// ======================================

// import React, { useEffect, useState } from "react";
// import "./styles/MyOrders.css";
// import Navbar from "./Navbar/navbar";
// import Footer from "./footer";
// import { useNavigate } from "react-router-dom";
// import { API_URLS } from "../src/API-Urls";
// import ProfileSidebar from "./ProfileSidebar";

// import banner from "./assets/cart-bg.jpeg";

// interface OrderItem {
//   productId: number;
//   productName: string;
//   qty: number;
//   unitPrice: number;
//   totalPrice: number;
//   weight: string;
//   imageUrl: string;
// }

// interface Order {
//   orderId: number;
//   orderDate: string;
//   orderStatus: string;
//   finalAmount: number;
//   paymentStatus: string;
//   items: OrderItem[];
// }

// const MyOrders = () => {

//   const navigate = useNavigate();

//   const [orders, setOrders] =
//     useState<Order[]>([]);

//   const [loading, setLoading] =
//     useState(true);

//   /* =========================
//      GET ORDERS
//   ========================= */

//   useEffect(() => {

//     const storedUser = JSON.parse(
//       localStorage.getItem("user") || "null"
//     );

//     if (!storedUser?.UserID) {
//       navigate("/");
//       return;
//     }

//     getUserOrders(storedUser.UserID);

//   }, []);

//   const getUserOrders = async (
//     userId: number
//   ) => {

//     try {

//       const res = await fetch(
//         `http://localhost:4000/api/orders/user/${userId}`
//       );

//       const data = await res.json();

//       if (data.success) {
//         setOrders(data.data);
//       }

//     } catch (err) {

//       console.error(
//         "❌ Order fetch error:",
//         err
//       );

//     } finally {

//       setLoading(false);

//     }

//   };

//   /* =========================
//      STATUS STYLE
//   ========================= */

//   const getStatusClass = (
//     status: string
//   ) => {

//     switch (status?.toLowerCase()) {

//       case "delivered":
//         return "delivered";

//       case "packed":
//         return "packed";

//       case "out for delivery":
//         return "out";

//       default:
//         return "processing";

//     }

//   };

//   return (
//     <>
//       <Navbar />

//       <div className="my-orders-page">

//         {/* =====================
//             BANNER
//         ===================== */}

//         <div className="my-orders-top-banner">

//           <img
//             src={banner}
//             alt=""
//             className="my-orders-banner-img"
//           />

//           <div className="my-orders-banner-overlay"></div>

//           <div className="my-orders-banner-content">

//             <div className="my-orders-banner-left">

//               <h1>
//                 My Orders
//               </h1>

//               <div className="my-orders-breadcrumb">

//                 Home

//                 <span>›</span>

//                 Orders

//               </div>

//             </div>

//           <div className="cart-banner-right">
//             <div className="my-orders-banner-card">

//               <div className="my-orders-banner-icon">
//                 📦
//               </div>

//               <div>

//                 <h3>
//                   Track, manage &
//                   reorder
//                 </h3>

//                 <p>
//                   View details of your
//                   orders and reorder your
//                   favourite products.
//                 </p>

//               </div>

//             </div>

//           </div>
// </div>
//         </div>

//         {/* =====================
//             MAIN
//         ===================== */}

//         <div className="my-orders-container">

//           {/* SIDEBAR */}

//           <ProfileSidebar />

//           {/* RIGHT */}

//           <div className="my-orders-right">

//             {/* TOP */}

//             <div className="my-orders-top">

//               <div>

//                 <h2>
//                   All Orders
//                 </h2>

//                 <p>
//                   View and track all your
//                   orders in one place.
//                 </p>

//               </div>

//               <div className="my-orders-filter-row">

//                 <select>

//                   <option>
//                     All Orders
//                   </option>

//                 </select>

//                 <select>

//                   <option>
//                     Last 6 Months
//                   </option>

//                 </select>

//                 <button>
//                   ⏳ Filter
//                 </button>

//               </div>

//             </div>

//             {/* LIST */}

//             {loading ? (

//               <div className="my-orders-loading">
//                 Loading...
//               </div>

//             ) : orders.length === 0 ? (

//               <div className="my-orders-empty">
//                 No Orders Found
//               </div>

//             ) : (

//               orders.map((order) => {

//                 const firstItem =
//                   order.items?.[0];

//                 return (

//                   <div
//                     key={order.orderId}
//                     className="my-orders-card"
//                   >

//                     {/* LEFT */}

//                     <div className="my-orders-left-sec">

//                       <div className="my-orders-icon">

//                         {order.orderStatus?.toLowerCase() ===
//                         "delivered"
//                           ? "🛍"
//                           : order.orderStatus?.toLowerCase() ===
//                             "packed"
//                           ? "📦"
//                           : "⏰"}

//                       </div>

//                       <div>

//                         <span className="my-orders-label">
//                           Order ID
//                         </span>

//                         <h3>
//                           {order.orderId}
//                         </h3>

//                         <div className="my-orders-date">

//                           📅{" "}
//                           {order.orderDate}

//                         </div>

//                       </div>

//                     </div>

//                     {/* ITEMS */}

//                     <div className="my-orders-middle-sec-items">

//                       <span>
//                         Items
//                       </span>

//                       <h4>
//                         {
//                           order.items.length
//                         }
//                         {" "}Items
//                       </h4>

//                     </div>

//                     {/* AMOUNT */}

//                     <div className="my-orders-middle-sec-price">

//                       <span>
//                         Total Amount
//                       </span>

//                       <h4>
//                         ₹
//                         {
//                           order.finalAmount
//                         }
//                       </h4>

//                       <p>
//                         Paid via{" "}
//                         {
//                           order.paymentStatus
//                         }
//                       </p>

//                     </div>

//                     {/* STATUS */}

//                     <div className="my-orders-status-sec">

//                       <span
//                         className={`my-orders-status ${getStatusClass(
//                           order.orderStatus
//                         )}`}
//                       >
//                         {
//                           order.orderStatus
//                         }
//                       </span>

//                       <p>

//                         {order.orderStatus ===
//                         "Delivered"
//                           ? `Delivered on ${order.orderDate}`
//                           : `Expected on ${order.orderDate}`}

//                       </p>

//                     </div>

//                     {/* ACTIONS */}

//                     <div className="my-orders-actions">

//                       <button
//                         onClick={() =>
//                           navigate(
//                             `/success?orderId=${order.orderId}`
//                           )
//                         }
//                       >
//                         View Details →
//                       </button>

//                       <span>
//                         ↻ Reorder
//                       </span>

//                     </div>

//                   </div>

//                 );

//               })

//             )}

//             {/* PAGINATION */}

//             <div className="my-orders-pagination">

//               <button>
//                 ‹
//               </button>

//               <button className="active">
//                 1
//               </button>

//               <button>
//                 2
//               </button>

//               <button>
//                 3
//               </button>

//               <button>
//                 ›
//               </button>

//             </div>

//             {/* BOTTOM FEATURES */}

//             <div className="my-orders-bottom-features">

//               <div className="my-orders-feature">

//                 <span>
//                   🛡
//                 </span>

//                 <div>

//                   <h4>
//                     100% Safe & Secure
//                   </h4>

//                   <p>
//                     Secure payments and
//                     data protection
//                   </p>

//                 </div>

//               </div>

//               <div className="my-orders-feature">

//                 <span>
//                   🚚
//                 </span>

//                 <div>

//                   <h4>
//                     On-time Delivery
//                   </h4>

//                   <p>
//                     Fast and reliable
//                     delivery
//                   </p>

//                 </div>

//               </div>

//               <div className="my-orders-feature">

//                 <span>
//                   🔄
//                 </span>

//                 <div>

//                   <h4>
//                     Easy Returns
//                   </h4>

//                   <p>
//                     Hassle-free returns
//                     within 24 hours
//                   </p>

//                 </div>

//               </div>

//               <div className="my-orders-feature">

//                 <span>
//                   🎧
//                 </span>

//                 <div>

//                   <h4>
//                     24x7 Support
//                   </h4>

//                   <p>
//                     We are here to help
//                     anytime
//                   </p>

//                 </div>

//               </div>

//             </div>

//           </div>

//         </div>

//       </div>

//       <Footer />
//     </>
//   );
// };

// export default MyOrders;


import React, { useEffect, useState } from "react";
import "./styles/MyOrders.css";
import Navbar from "./Navbar/navbar";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";
import ProfileSidebar from "./ProfileSidebar";
import OrderDetails from "./OrderDetails";

import banner from "./assets/cart-bg.jpeg";

interface OrderItem {
  productId: number;
  productName: string;
  qty: number;
  unitPrice: number;
  totalPrice: number;
  weight: string;
  imageUrl: string;
}

interface Order {
  orderId: number;
  orderDate: string;
  orderStatus: string;
  finalAmount: number;
  paymentStatus: string;
  items: OrderItem[];
}

const MyOrders = () => {

  const navigate = useNavigate();

  const [orders, setOrders] =
    useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedOrderId, setSelectedOrderId] =
    useState<number | null>(null);

  /* =========================
     GET ORDERS
  ========================= */

  useEffect(() => {

    const storedUser = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    if (!storedUser?.UserID) {
      navigate("/");
      return;
    }

    getUserOrders(storedUser.UserID);

  }, []);

  const getUserOrders = async (
    userId: number
  ) => {

    try {

      const res = await fetch(
        `http://localhost:4000/api/orders/user/${userId}`
      );

      const data = await res.json();

      if (data.success) {
        setOrders(data.data);
      }

    } catch (err) {

      console.error(
        "❌ Order fetch error:",
        err
      );

    } finally {

      setLoading(false);

    }

  };

  /* =========================
     STATUS STYLE
  ========================= */

  const getStatusClass = (
    status: string
  ) => {

    switch (status?.toLowerCase()) {

      case "delivered":
        return "delivered";

      case "packed":
        return "packed";

      case "out for delivery":
        return "out";

      default:
        return "processing";

    }

  };

  return (
    <>
      <Navbar />

      <div className="my-orders-page">

        {/* =====================
            BANNER
        ===================== */}

        <div className="my-orders-top-banner">

          <img
            src={banner}
            alt=""
            className="my-orders-banner-img"
          />

          <div className="my-orders-banner-overlay"></div>

          <div className="my-orders-banner-content">

            <div className="my-orders-banner-left">

              <h1>
                My Orders
              </h1>

              <div className="my-orders-breadcrumb">

                Home

                <span>›</span>

                Orders

              </div>

            </div>

            <div className="cart-banner-right">

              <div className="my-orders-banner-card">

                <div className="my-orders-banner-icon">
                  📦
                </div>

                <div>

                  <h3>
                    Track, manage &
                    reorder
                  </h3>

                  <p>
                    View details of your
                    orders and reorder your
                    favourite products.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =====================
            MAIN
        ===================== */}

        <div className="my-orders-container">

          {/* SIDEBAR */}

          <ProfileSidebar />

          {/* RIGHT */}

          <div className="my-orders-right">

            {selectedOrderId ? (

              <OrderDetails
                orderId={selectedOrderId}
                onBack={() =>
                  setSelectedOrderId(null)
                }
              />

            ) : (

              <>

                {/* TOP */}

                <div className="my-orders-top">

                  <div>

                    <h2>
                      All Orders
                    </h2>

                    <p>
                      View and track all your
                      orders in one place.
                    </p>

                  </div>

                  <div className="my-orders-filter-row">

                    <select>

                      <option>
                        All Orders
                      </option>

                    </select>

                    <select>

                      <option>
                        Last 6 Months
                      </option>

                    </select>

                    <button>
                      ⏳ Filter
                    </button>

                  </div>

                </div>

                {/* LIST */}

                {loading ? (

                  <div className="my-orders-loading">
                    Loading...
                  </div>

                ) : orders.length === 0 ? (

                  <div className="my-orders-empty">
                    No Orders Found
                  </div>

                ) : (

                  orders.map((order) => {

                    return (

                      <div
                        key={order.orderId}
                        className="my-orders-card"
                      >

                        {/* LEFT */}

                        <div className="my-orders-left-sec">

                          <div className="my-orders-icon">

                            {order.orderStatus?.toLowerCase() ===
                            "delivered"
                              ? "🛍"
                              : order.orderStatus?.toLowerCase() ===
                                "packed"
                              ? "📦"
                              : "⏰"}

                          </div>

                          <div>

                            <span className="my-orders-label">
                              Order ID
                            </span>

                            <h3>
                              {order.orderId}
                            </h3>

                            <div className="my-orders-date">

                              📅{" "}
                              {order.orderDate}

                            </div>

                          </div>

                        </div>

                        {/* ITEMS */}

                        <div className="my-orders-middle-sec-items">

                          <span>
                            Items
                          </span>

                          <h4>
                            {
                              order.items.length
                            }
                            {" "}Items
                          </h4>

                        </div>

                        {/* AMOUNT */}

                        <div className="my-orders-middle-sec-price">

                          <span>
                            Total Amount
                          </span>

                          <h4>
                            ₹
                            {
                              order.finalAmount
                            }
                          </h4>

                          <p>
                            Paid via{" "}
                            {
                              order.paymentStatus
                            }
                          </p>

                        </div>

                        {/* STATUS */}

                        <div className="my-orders-status-sec">

                          <span
                            className={`my-orders-status ${getStatusClass(
                              order.orderStatus
                            )}`}
                          >
                            {
                              order.orderStatus
                            }
                          </span>

                          <p>

                            {order.orderStatus ===
                            "Delivered"
                              ? `Delivered on ${order.orderDate}`
                              : `Expected on ${order.orderDate}`}

                          </p>

                        </div>

                        {/* ACTIONS */}

                        <div className="my-orders-actions">

                          <button
                            onClick={() =>
                              setSelectedOrderId(
                                order.orderId
                              )
                            }
                          >
                            View Details →
                          </button>

                          <span>
                            ↻ Reorder
                          </span>

                        </div>

                      </div>

                    );

                  })

                )}

                {/* PAGINATION */}

                <div className="my-orders-pagination">

                  <button>
                    ‹
                  </button>

                  <button className="active">
                    1
                  </button>

                  <button>
                    2
                  </button>

                  <button>
                    3
                  </button>

                  <button>
                    ›
                  </button>

                </div>

                {/* BOTTOM FEATURES */}

                <div className="my-orders-bottom-features">

                  <div className="my-orders-feature">

                    <span>
                      🛡
                    </span>

                    <div>

                      <h4>
                        100% Safe & Secure
                      </h4>

                      <p>
                        Secure payments and
                        data protection
                      </p>

                    </div>

                  </div>

                  <div className="my-orders-feature">

                    <span>
                      🚚
                    </span>

                    <div>

                      <h4>
                        On-time Delivery
                      </h4>

                      <p>
                        Fast and reliable
                        delivery
                      </p>

                    </div>

                  </div>

                  <div className="my-orders-feature">

                    <span>
                      🔄
                    </span>

                    <div>

                      <h4>
                        Easy Returns
                      </h4>

                      <p>
                        Hassle-free returns
                        within 24 hours
                      </p>

                    </div>

                  </div>

                  <div className="my-orders-feature">

                    <span>
                      🎧
                    </span>

                    <div>

                      <h4>
                        24x7 Support
                      </h4>

                      <p>
                        We are here to help
                        anytime
                      </p>

                    </div>

                  </div>

                </div>

              </>

            )}

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default MyOrders;