
// import "./styles/profile.css";
// import Navbar from "./Navbar/navbar";
// import Footer from "./footer";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { API_URLS } from "../src/API-Urls";
// import { toast } from "react-hot-toast";
// import { useConfirm } from "./context/ConfirmContext";
// import logout from "./assets/log_out.png"
// import del from  "./assets/delete_acnt.jpeg"

// /* =========================
//    TYPES
// ========================= */

// interface User {
//   UserID: number;
//   FirstName: string;
//   Email: string;
//   ContactNo: string;
// }

// interface OrderItem {
//     productId: number; 
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

// /* =========================
//    COMPONENT
// ========================= */

// const Profile = () => {
//   const navigate = useNavigate();

//   const [user, setUser] = useState<User | null>(null);
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [expandedOrders, setExpandedOrders] = useState<number[]>([]);
//   const { confirm } = useConfirm();

//   /* =========================
//      INIT
//   ========================= */

//   const logoutUser = (navigate: any) => {
//   localStorage.removeItem("user");
//   localStorage.removeItem("userId"); // 🔥 VERY IMPORTANT
//    localStorage.removeItem("roleId"); 

//   window.dispatchEvent(new Event("userChanged"));

//   navigate("/");
// };

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user") || "null");

//     if (!storedUser?.UserID) {
//       navigate("/");
//       return;
//     }

//     getUserProfileById(storedUser.UserID);
//     getUserOrders(storedUser.UserID);
//   }, []);

//   /* =========================
//      API CALLS
//   ========================= */

//   const getUserProfileById = async (userId: number) => {
//     try {
//       const response = await fetch(
//         `${API_URLS.BASE_URL}${API_URLS.USERS}/${userId}`
//       );

//       const result = await response.json();

//       if (result.success) {
//         setUser(result.data);
//       }
//     } catch (error) {
//       console.error("❌ Error fetching profile:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getUserOrders = async (userId: number) => {
//     try {
//       const res = await fetch(`http://localhost:4000/api/orders/user/${userId}`);
//       const data = await res.json();

//       if (data.success) {
//         setOrders(data.data);
//       }
//     } catch (err) {
//       console.error("❌ Order fetch error:", err);
//     }
//   };

//   /* =========================
//      DELETE ACCOUNT
//   ========================= */

//   // const handleDeleteAccount = async () => {
//   //   const confirmDelete = window.confirm(
//   //     "⚠️ Are you sure you want to delete your account?\nThis action can be recovered later."
//   //   );

//   //   if (!confirmDelete) return;

//   //   try {
//   //     const userId = localStorage.getItem("userId");

//   //     if (!userId) {
//   //       alert("User not found");
//   //       return;
//   //     }

//   //     const res = await fetch(
//   //       `${API_URLS.BASE_URL}users/${userId}/delete`,
//   //       { method: "PUT" }
//   //     );

//   //     const data = await res.json();

//   //     if (data.success) {
//   //       localStorage.clear();
//   //       alert("✅ Account deleted successfully");
//   //       navigate("/signup");
//   //     } else {
//   //       alert("❌ Failed to delete account");
//   //     }

//   //   } catch (error) {
//   //     console.error("❌ Delete error:", error);
//   //     alert("Server error while deleting account");
//   //   }
//   // };
//   const handleDeleteAccount = async () => {
//   const confirmDelete = await confirm({
//     title: "Are you sure, you want to DELETE this Account?",
//     subText: "This action can be recovered later.",
//     confirmText: "Yes",
//     cancelText: "No",
//     image: del,
//     variant:"delete",
//   });

//   if (!confirmDelete) return;

//   try {
//     const userId = localStorage.getItem("userId");

//     if (!userId) {
//       toast.error("User not found");
//       return;
//     }

//     const res = await fetch(
//       `${API_URLS.BASE_URL}users/${userId}/delete`,
//       { method: "PUT" }
//     );

//     const data = await res.json();

//     if (data.success) {
//       localStorage.clear();
//       toast.success("Account deleted successfully");
//       navigate("/signup");
//     } else {
//       toast.error("Failed to delete account");
//     }
//   } catch (error) {
//     console.error("❌ Delete error:", error);
//     toast.error("Server error while deleting account");
//   }
// };

//   const toggleOrder = (orderId: number) => {
//   setExpandedOrders(prev =>
//     prev.includes(orderId)
//       ? prev.filter(id => id !== orderId)
//       : [...prev, orderId]
//   );
// };

//   /* =========================
//      UI
//   ========================= */

//   return (
//     <>
//       <Navbar />

//       <div className="profile-page">

//         {/* HEADER */}

//         <div className="profile-box">
//                    <button
//   onClick={() =>
//     navigate("/signup", {
//       state: {
//         userData: user,
//       },
//     })
//   }
// >
//   Edit
// </button>
//           {loading ? (
//             <h2>Loading...</h2>
//           ) : (
//             <>
//               <h2>{user?.FirstName}</h2>
//               <p>{user?.Email}</p>
//               <p>{user?.ContactNo}</p>
//               {/* <button>Edit</button> */}

     
//             </>
//           )}
//         </div>

//         <div className="profile-content">

//           {/* SIDEBAR */}

//           <div className="prfl-sidebar">
//             <button className="active">MY ORDERS</button>

//             <button onClick={() => navigate("/address")}>
//               SAVED ADDRESS
//             </button>

//             <button onClick={() => navigate("/t&c")}>
//               TERMS & CONDITIONS
//             </button>

//             <button onClick={() => navigate("/privacy-policy")}>
//               PRIVACY POLICY
//             </button>

//             {/* <button
//               className="logout-btn"
//               onClick={() => {
//                 const confirmLogout = window.confirm("Do you want to logout?");
//                 if (confirmLogout) {
//                    logoutUser(navigate);
//   toast.success("Logged out successfully");
//                 }
//               }}
//             >
//               LOG OUT
//             </button> */}
//             <button
//   className="logout-btn"
//   onClick={async () => {
//     const confirmLogout = await confirm({
//       title: "Do you want to LOG-OUT?",
//       // subText: "You will need to sign in again to continue.",
//       confirmText: "Yes",
//       cancelText: "No",
//       image: logout,
//       variant:"logout",
//     });

//     if (!confirmLogout) return;

//     logoutUser(navigate);
//     toast.success("Logged out successfully");
//   }}
// >
//   LOG OUT
// </button>

//             <button className="delete-btn" onClick={handleDeleteAccount}>
//               DELETE ACCOUNT
//             </button>
//           </div>

//           {/* ORDERS */}

//           <div className="orders-section">

//             {orders.length === 0 && (
//               <p style={{ padding: "20px" }}>No orders yet</p>
//             )}

          
//             {orders.map(order => {
//   const isExpanded = expandedOrders.includes(order.orderId);
//   const firstItem = order.items[0];
//   const remainingCount = order.items.length - 1;

//   return (
//     <div key={order.orderId} className="order-box">

//       {/* HEADER */}
//       <div className="order-footer">
//         <p>
//           Order ID : <strong>#{order.orderId}</strong>
//         </p>

//        <div className="order-footer-right">

//   {/* 🔥 SHOW ONLY IF MULTIPLE ITEMS */}
//   {order.items.length > 1 && (
//     <button
//       className="ord-view-btn"
//       onClick={() => toggleOrder(order.orderId)}
//     >
//       {isExpanded ? "Hide Details" : "View Details"}
//     </button>
//   )}

//   <a
//     href={`http://localhost:4000/api/order/${order.orderId}/invoice`}
//     download
//   >
//     Download Invoice
//   </a>

// </div>
//       </div>

//       {/* 🔥 COLLAPSED VIEW */}
//       {!isExpanded && firstItem && (
//         // <div className="order-card compact">
//         <div
//   className="order-card compact"
//   onClick={() => navigate(`/product/${firstItem.productId}`)}
//   style={{ cursor: "pointer" }}
// >

//           <img src={firstItem.imageUrl} alt={firstItem.productName} />

//           <div className="order-info">
//             <h3>{firstItem.productName}</h3>
//             <p>{firstItem.weight}</p>
//             <p><strong>Qty:</strong> {firstItem.qty}</p>

//             {/* {remainingCount > 0 && (
//               <p className="more-items">
//                 + {remainingCount} more item{remainingCount > 1 ? "s" : ""}
//               </p>
//             )} */}
//             {remainingCount > 0 && (
//   <p
//     className="more-items clickable"
//     onClick={(e) =>{
//       e.stopPropagation(); 
//       toggleOrder(order.orderId)}}
//   >
//     {isExpanded
//       ? "Hide Details"
//       : `+ ${remainingCount} more item${remainingCount > 1 ? "s" : ""}`}
//   </p>
// )}
//           </div>

//           <div className="order-status">
//             <span className="delivered">{order.orderStatus}</span>
//             <p>{order.orderDate}</p>
//             <p className="ord-ttl">
//               <strong>₹{firstItem.totalPrice}</strong>
//             </p>
//           </div>

//         </div>
//       )}

//       {/* 🔥 EXPANDED VIEW */}
//       {isExpanded && order.items.map((item, idx) => (
//         // <div className="order-card" key={idx}>
//         <div
//   className="order-card"
//   key={idx}
//   onClick={() => navigate(`/product/${item.productId}`)}
//   style={{ cursor: "pointer" }}
// >

//           <img src={item.imageUrl} alt={item.productName} />

//           <div className="order-info">
//             <h3>{item.productName}</h3>
//             <p>{item.weight}</p>
//             <p><strong>Qty:</strong> {item.qty}</p>
//           </div>

//           <div className="order-status">
//             <span className="delivered">{order.orderStatus}</span>
//             <p>{order.orderDate}</p>
//             <p className="ord-ttl">
//               <strong>₹{item.totalPrice}</strong>
//             </p>
//           </div>

//         </div>
//       ))}

//       {/* TOTAL */}
//       <div className="order-total">
//         <h3>Total Amount: ₹{order.finalAmount}</h3>
//       </div>

//     </div>
//   );
// })}

//           </div>

//         </div>

//       </div>

//       <Footer />
//     </>
//   );
// };

// export default Profile;




import React, {
  useEffect,
  useState,
} from "react";

import "./styles/profile.css";

import Navbar from "./Navbar/navbar";
import Footer from "./footer";

import {
  useNavigate,
} from "react-router-dom";

import {
  API_URLS,
} from "../src/API-Urls";

import {
  toast,
} from "react-hot-toast";

import {
  useConfirm,
} from "./context/ConfirmContext";

import ProfileSidebar from "./ProfileSidebar";

import logout from "./assets/log_out.png";
import del from "./assets/delete_acnt.jpeg";
import banner from "./assets/cart-bg.jpeg";

interface User {
  UserID: number;
  FirstName: string;
  Email: string;
  ContactNo: string;
}

interface Order {
  orderId: number;
  finalAmount: number;
}

const Profile = () => {

  const navigate =
    useNavigate();

  const { confirm } =
    useConfirm();

  const [user, setUser] =
    useState<User | null>(null);

  const [orders, setOrders] =
    useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  /* =========================
     LOGOUT
  ========================= */

  const logoutUser = (
    navigate: any
  ) => {

    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "userId"
    );

    localStorage.removeItem(
      "roleId"
    );

    window.dispatchEvent(
      new Event("userChanged")
    );

    navigate("/");

  };

  /* =========================
     INIT
  ========================= */

  useEffect(() => {

    const storedUser =
      JSON.parse(
        localStorage.getItem(
          "user"
        ) || "null"
      );

    if (
      !storedUser?.UserID
    ) {

      navigate("/");

      return;

    }

    getUserProfileById(
      storedUser.UserID
    );

    getUserOrders(
      storedUser.UserID
    );

  }, []);

  /* =========================
     PROFILE API
  ========================= */

  const getUserProfileById =
    async (
      userId: number
    ) => {

      try {

        const response =
          await fetch(
            `${API_URLS.BASE_URL}${API_URLS.USERS}/${userId}`
          );

        const result =
          await response.json();

        if (
          result.success
        ) {

          setUser(
            result.data
          );

        }

      } catch (error) {

        console.error(
          "❌ Error fetching profile:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

  /* =========================
     ORDERS API
  ========================= */

  const getUserOrders =
    async (
      userId: number
    ) => {

      try {

        const res =
          await fetch(
            `http://localhost:4000/api/orders/user/${userId}`
          );

        const data =
          await res.json();

        if (
          data.success
        ) {

          setOrders(
            data.data
          );

        }

      } catch (err) {

        console.error(
          "❌ Order fetch error:",
          err
        );

      }

    };

  /* =========================
     DELETE ACCOUNT
  ========================= */

  const handleDeleteAccount =
    async () => {

      const confirmDelete =
        await confirm({
          title:
            "Are you sure, you want to DELETE this Account?",
          subText:
            "This action can be recovered later.",
          confirmText:
            "Yes",
          cancelText:
            "No",
          image: del,
          variant:
            "delete",
        });

      if (
        !confirmDelete
      )
        return;

      try {

        const userId =
          localStorage.getItem(
            "userId"
          );

        if (
          !userId
        ) {

          toast.error(
            "User not found"
          );

          return;

        }

        const res =
          await fetch(
            `${API_URLS.BASE_URL}users/${userId}/delete`,
            {
              method:
                "PUT",
            }
          );

        const data =
          await res.json();

        if (
          data.success
        ) {

          localStorage.clear();

          toast.success(
            "Account deleted successfully"
          );

          navigate(
            "/signup"
          );

        } else {

          toast.error(
            "Failed to delete account"
          );

        }

      } catch (error) {

        console.error(
          "❌ Delete error:",
          error
        );

        toast.error(
          "Server error while deleting account"
        );

      }

    };

  /* =========================
     STATS
  ========================= */

  const totalSpent =
    orders.reduce(
      (
        acc,
        curr
      ) =>
        acc +
        curr.finalAmount,
      0
    );

  return (
    <>
      <Navbar />

      <div className="profile-page">

        {/* =====================
            BANNER
        ===================== */}

        <div className="profile-top-banner">

          <img
            src={banner}
            alt=""
            className="profile-banner-img"
          />

          <div className="profile-banner-overlay"></div>

            <div className="profile-banner-left">
              <h1>
                My Profile
              </h1>

              <div className="profile-breadcrumb">
                Home  <span>›</span>  My Profile
              </div>
            </div>

          <div className="profile-banner-right">

            <div className="profile-banner-card">

              <div className="profile-banner-icon">
                👤
              </div>

              <div>

                <h3>
                  Manage your account
                </h3>

                <p>
                  Update your details
                  for a better
                  shopping experience.
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* =====================
            MAIN
        ===================== */}

        <div className="profile-container">

          {/* SIDEBAR */}

          <ProfileSidebar />

          {/* CENTER */}

          <div className="profile-center">

            <div className="profile-card">

              {/* TOP */}

              <div className="profile-card-top">

                <div>

                  <h2>
                    Profile Information
                  </h2>

                  <p>
                    View and update your
                    personal information
                  </p>

                </div>

                <button
                  onClick={() =>
                    navigate(
                      "/signup",
                      {
                        state: {
                          userData:
                            user,
                        },
                      }
                    )
                  }
                >
                  ✏ Edit
                </button>

              </div>

              {/* USER */}

              <div className="profile-user-section">

                <div className="profile-user-img">

                  👨
                </div>

                <div>

                  <h3>
                    {
                      user?.FirstName
                    }
                  </h3>

                  <p>
                    {
                      user?.Email
                    }
                  </p>

                  <span>
                    +91{" "}
                    {
                      user?.ContactNo
                    }
                  </span>

                </div>

              </div>

              {/* INFO */}

              <div className="profile-info-grid">

                <div className="profile-info-row">

                  <span>
                    Full Name
                  </span>

                  <strong>
                    {
                      user?.FirstName
                    }
                  </strong>

                </div>

                <div className="profile-info-row">

                  <span>
                    Email Address
                  </span>

                  <strong>
                    {
                      user?.Email
                    }
                  </strong>

                </div>

                <div className="profile-info-row">

                  <span>
                    Phone Number
                  </span>

                  <strong>
                    +91{" "}
                    {
                      user?.ContactNo
                    }
                  </strong>

                </div>

                <div className="profile-info-row">

                  <span>
                    Date of Birth
                  </span>

                  <strong>
                    15 May, 1985
                  </strong>

                </div>

                <div className="profile-info-row">

                  <span>
                    Gender
                  </span>

                  <strong>
                    Male
                  </strong>

                </div>

                <div className="profile-info-row">

                  <span>
                    Preferred Language
                  </span>

                  <strong>
                    English
                  </strong>

                </div>

                <div className="profile-info-row">

                  <span>
                    Default Currency
                  </span>

                  <strong>
                    INR (₹)
                  </strong>

                </div>

              </div>

              {/* ACTIONS */}

              <div className="profile-action-row">

                <button
                  className="profile-logout-btn"
                  onClick={async () => {

                    const confirmLogout =
                      await confirm({
                        title:
                          "Do you want to LOG-OUT?",
                        confirmText:
                          "Yes",
                        cancelText:
                          "No",
                        image:
                          logout,
                        variant:
                          "logout",
                      });

                    if (
                      !confirmLogout
                    )
                      return;

                    logoutUser(
                      navigate
                    );

                    toast.success(
                      "Logged out successfully"
                    );

                  }}
                >
                  Logout
                </button>

                <button
                  className="profile-delete-btn"
                  onClick={
                    handleDeleteAccount
                  }
                >
                  Delete Account
                </button>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="profile-right">

            {/* STATS */}

            <div className="profile-side-card">

              <h3>
                Quick Stats
              </h3>

              <div className="profile-stats-grid">

                <div className="profile-stat-box">

                  <span>
                    📦
                  </span>
                  <div>
                     <h4>
                    {
                      orders.length
                    }
                  </h4>

                  <p>
                    Orders Placed
                  </p>
                  </div>

                 

                </div>

                <div className="profile-stat-box">

                  <span>
                    💰
                  </span>

                  <div><h4>
                    ₹
                    {totalSpent.toFixed(1)}
                  </h4>

                  <p>
                    Total Spent
                  </p></div>

                </div>

                <div className="profile-stat-box">

                  <span>
                    ♡
                  </span>

                 <div> <h4>
                    6
                  </h4>

                  <p>
                    Wishlist Items
                  </p></div>

                </div>

                <div className="profile-stat-box">

                  <span>
                    📍
                  </span>

                  <div>                  <h4>
                    4
                  </h4>

                  <p>
                    Addresses Saved
                  </p>
                  </div>

                </div>

              </div>

            </div>

            {/* BENEFITS */}

            <div className="profile-side-card">

              <h3>
                Your Benefits
              </h3>

              <div className="profile-benefits">

                <div className="profile-benefit-item">

                  <span>
                    🚚
                  </span>

                  <div>

                    <h4>
                      Free Delivery
                    </h4>

                    <p>
                      On orders above ₹499
                    </p>

                  </div>

                </div>

                <div className="profile-benefit-item">

                  <span>
                    🎁
                  </span>

                  <div>

                    <h4>
                      Exclusive Offers
                    </h4>

                    <p>
                      Special deals just
                      for you
                    </p>

                  </div>

                </div>

                <div className="profile-benefit-item">

                  <span>
                    🥬
                  </span>

                  <div>

                    <h4>
                      Freshness Guaranteed
                    </h4>

                    <p>
                      We deliver only the
                      freshest produce
                    </p>

                  </div>

                </div>

                <div className="profile-benefit-item">

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

              </div>

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default Profile;
