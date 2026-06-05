// import React from "react";
// import "./styles/sidebar.css";
// import { useNavigate, useLocation } from "react-router-dom";

// const Sidebar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const isActive = (path: string) =>
//     location.pathname.startsWith(path) ? "ad-active" : "";

//   return (
//     <aside className="ad-sidebar">
//       <div className="ad-logo">brihati</div>

//       <ul className="ad-menu">

//         <li
//           className={isActive("/admin")}
//           onClick={() => navigate("/admin")}
//         >
//           <i className="fa-solid fa-house"></i> Dashboard
//         </li>

//         <li
//           className={isActive("/AdminCustomers")}
//           onClick={() => navigate("/AdminCustomers")}
//         >
//           <i className="fa-solid fa-users"></i> Customers
//         </li>

//         <li
//           className={isActive("/AdminCategory")}
//           onClick={() => navigate("/AdminCategory")}
//         >
//          <i className="fa-solid fa-layer-group"></i> Category
//         </li>

//         <li
//           className={isActive("/AdminProduct")}
//           onClick={() => navigate("/AdminProduct")}
//         >
//           <i className="fa-solid fa-cart-shopping"></i> Products
//         </li>

//         <li
//           className={isActive("/AdminOrders")}
//           onClick={() => navigate("/AdminOrders")}
//         >
//           <i className="fa-solid fa-box"></i> Orders
//         </li>

//         <li
//           className={isActive("/AdminPayment")}
//           onClick={() => navigate("/AdminPayment")}
//         >
//           <i className="fa-solid fa-indian-rupee-sign"></i> Payments
//         </li>
         
//          <li
//           className={isActive("/AdminDiscounts")}
//           onClick={() => navigate("/AdminDiscounts")}
//         >
//           <i className="fa-solid fa-percent"></i> Discounts
//         </li>
        

//         <li
//           className={isActive("/refunds")}
//           onClick={() => navigate("/refunds")}
//         >
//           <i className="fa-solid fa-rotate-left"></i> Refunds
//         </li>

        

//       </ul>

//       <div className="ad-bottom">
//         {/* <span><i className="fa-solid fa-gear"></i> Settings</span> */}
//         {/* <span><i className="fa-solid fa-right-from-bracket" onClick={() => navigate("/login")}></i> Log Out</span> */}
//         <span
//   onClick={() => {
//     localStorage.removeItem("userId");
//     localStorage.removeItem("user");

//     window.dispatchEvent(new Event("userChanged"));

//     navigate("/login");
//   }}
// >
//   <i className="fa-solid fa-right-from-bracket"></i> Log Out
// </span>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;


import { useState } from "react";
import "./styles/sidebar.css";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {

  const [vendorOpen, setVendorOpen] = useState(true);
  const [reportOpen, setReportOpen] = useState(false);
    const navigate = useNavigate();
  const location = useLocation();


  return (

    <div className="vendor-sidebar-container">

      <div>

        {/* LOGO */}

        <div className="vendor-sidebar-logo">
          Sunthe Mart
        </div>


        {/* MENU */}

        <div className="vendor-sidebar-menu">

          <div className="vendor-sidebar-item vendor-sidebar-active">

            <i className="fa-solid fa-table-columns"></i>
            <span onClick={()=>
                    navigate("/dashboard")
                  }>Dashboard</span>

          </div>


          {/* Vendors */}

          <div>

            <div
              className="vendor-sidebar-item"
              onClick={() =>
                setVendorOpen(!vendorOpen)
              }
            >

              <i className="fa-solid fa-users"></i>

              <span>Vendors</span>

              <i
                className={`fa-solid fa-chevron-down vendor-sidebar-arrow ${
                  vendorOpen ? "open" : ""
                }`}
              ></i>

            </div>


            {vendorOpen && (

              <div className="vendor-sidebar-submenu">

                <div className="vendor-sidebar-subitem" onClick={()=>navigate("/allvendors")}>
                  All Vendors
                </div>

                <div className="vendor-sidebar-subitem"   onClick={()=>
                    navigate("/addvendor")
                  }>
                  Add Vendors
                </div>

                <div className="vendor-sidebar-subitem" onClick={()=>
navigate("/vendorapplications")
}>
                  Vendor Applications
                </div>
                <div className="vendor-sidebar-subitem"   onClick={()=>
                    navigate("/activevendors")
                  }>
                  Active Vendors
                </div>

                {/* <div className="vendor-sidebar-subitem">
                  Suspended Vendors
                </div> */}

              </div>

            )}

          </div>


          <div className="vendor-sidebar-item">

            <i className="fa-solid fa-box"></i>
            <span>Products</span>

          </div>

          <div className="vendor-sidebar-item">

            <i className="fa-solid fa-cart-shopping"></i>
            <span>Orders</span>

          </div>

          <div className="vendor-sidebar-item">

            <i className="fa-solid fa-receipt"></i>
            <span>Transactions</span>

          </div>

          <div className="vendor-sidebar-item">

            <i className="fa-solid fa-wallet"></i>
            <span>Payouts</span>

          </div>

          <div className="vendor-sidebar-item">

            <i className="fa-solid fa-user"></i>
            <span>Customers</span>

          </div>


          {/* Reports */}

          <div>

            <div
              className="vendor-sidebar-item"
              onClick={() =>
                setReportOpen(!reportOpen)
              }
            >

              <i className="fa-solid fa-chart-column"></i>

              <span>Reports</span>

              <i
                className={`fa-solid fa-chevron-down vendor-sidebar-arrow ${
                  reportOpen ? "open" : ""
                }`}
              ></i>

            </div>

          </div>


          <div className="vendor-sidebar-item">

            <i className="fa-solid fa-bullhorn"></i>
            <span>Marketing</span>

          </div>

          <div className="vendor-sidebar-item">

            <i className="fa-solid fa-shield"></i>
            <span>Support</span>

          </div>

          <div className="vendor-sidebar-item">

            <i className="fa-solid fa-gear"></i>
            <span>Settings</span>

          </div>

        </div>

      </div>


      {/* FOOTER */}

      <div>

        <div className="vendor-sidebar-help-card">

          <div className="vendor-sidebar-help-top">

            <i className="fa-solid fa-headset"></i>

            <span>
              Need Help?
            </span>

          </div>

          <p>
            Our support team is here to help you
          </p>

          <button>
            Contact Support
          </button>

        </div>


        <div className="vendor-sidebar-logout">

          <i className="fa-solid fa-right-from-bracket"></i>

          <span>
            Logout
          </span>

        </div>

      </div>

    </div>

  );

};

export default Sidebar;