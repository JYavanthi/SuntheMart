
// import React, { useEffect, useState } from "react";
// import "./styles/AdminCustomers.css";
// import Sidebar from "./sidebar";
// import Header from "./topbar";
// import { FaPrint } from "react-icons/fa";
// import AdminCustomerDetails from "./AdminCustomerDetails";

// interface Customer {
//   UserID: number;
//   FirstName: string;
//   LastName: string;
//   Email: string;
//   ContactNo: string;
//   OrderDate: string;
//   CreatedDt: string;
// }

// const AdminCustomers = () => {
//   const [customers, setCustomers] = useState<Customer[]>([]);
//   const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);
  

//   useEffect(() => {
//     fetch("http://localhost:4000/api/admin/customers")
//       .then(res => res.json())
//       .then(data => {
//         if (data.success) {
//           setCustomers(data.data);
//         }
//       });
//   }, []);

//   return (
//     <div className="admin-layout">
//       <Sidebar />
//       <div className="admin-main">
//         <Header />

//         <div className="top-controls">
//           <h2 className="page-title">CUSTOMERS</h2>
//           <div className="right-controls">
//             {/* <div className="control-item">
//               <span>Sort By:</span>
//               <select>
//                 <option>Default</option>
//                 <option>Latest</option>
//               </select>
//             </div> */}

//             <button className="btn-icon">
//               <FaPrint /> Print
//             </button>

//             {/* <button className="filter-btn">⚲ Filter</button> */}
//             <div className="search-circle">🔍</div>
//           </div>
//         </div>

//         <div className="admin-cstmrs-container">
//           <div className="admin-cstmrs-count">
//             <span>{customers.length}</span> Customers
//           </div>

//           <table className="admin-cstmrs-table">
//             <thead>
//               <tr>
//                 {/* <th></th> */}
//                 <th>Customer Name</th>
//                 <th>Customer ID</th>
//                 <th>Phone Number</th>
//                 <th>Email</th>
//                 <th>Order Date</th>
//                 <th>Registered Date</th>
//                 {/* <th>Action</th> */}
//               </tr>
//             </thead>

//             <tbody>
//               {customers.map(user => (
//                 <tr
//                   key={user.UserID}
//                   className="clickable-row"
//                   onClick={() => setSelectedCustomer(user)}
//                 >
//                   {/* <td onClick={e => e.stopPropagation()}>
//                     <input type="checkbox" />
//                   </td> */}

//                   <td>
//                     <div className="admin-cstmrs-name">
//                       <strong>{user.FirstName} {user.LastName}</strong>
//                       {/* <span>ID : {user.UserID}</span> */}
//                     </div>
//                   </td>
//                   <td>{user.UserID}</td>

//                   <td>{user.ContactNo}</td>
//                   <td>{user.Email}</td>
//                   <td>
//                     {user.OrderDate
//                       ? new Date(user.OrderDate).toLocaleDateString()
//                       : "Yet to order"}
//                   </td>
//                   <td>
//                     {user.CreatedDt
//                       ? new Date(user.CreatedDt).toLocaleDateString()
//                       : "-"}
//                   </td>
          
//                   {/* <td className="admin-cstmrs-actions">
//                     <button onClick={e => e.stopPropagation()}>✏️</button>
//                     <button onClick={e => e.stopPropagation()}>🗑️</button>
//                   </td> */}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* ================= CUSTOMER POPUP ================= */}

//         {selectedCustomer && (
//           <div
//             className="ord-dtl-overlay"
//             onClick={() => setSelectedCustomer(null)}
//           >
//             <div
//               className="ord-dtl-popup1"
//               onClick={e => e.stopPropagation()}
//             >
//               <AdminCustomerDetails customer={selectedCustomer} />

//               <button
//                 className="ord-dtl-close"
//                 onClick={() => setSelectedCustomer(null)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default AdminCustomers;

import React, { useEffect, useMemo, useState } from "react";
import "./styles/AdminCustomers.css";
import Sidebar from "./sidebar";
import Header from "./topbar";
import AdminCustomerDetails from "./AdminCustomerDetails";

interface Customer {
  UserID: number;
  FirstName: string;
  LastName: string;
  Email: string;
  ContactNo: string;
  CreatedDt: string;
  OrdersPlaced: number;
  TotalSpent: number;
  LastOrderDate: string;
  CustomerStatus: string;
}

const AdminCustomers = () => {

  const [customers, setCustomers] =
    useState<Customer[]>([]);

  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

  const [search, setSearch] =
    useState("");

  const [dashboard, setDashboard] =
    useState<any>({});

  useEffect(() => {

    loadCustomers();
    loadDashboard();

  }, []);

  const loadCustomers = async () => {

    try {

      const res = await fetch(
        "http://localhost:4000/api/admin/customers"
      );

      const data = await res.json();

      if (data.success) {

        setCustomers(data.data);

      }

    } catch (error) {

      console.log(error);

    }

  };

  const loadDashboard = async () => {

    try {

      const res = await fetch(
        "http://localhost:4000/api/admin/customer-dashboard"
      );

      const data = await res.json();

      if (data.success) {

        setDashboard(data.data);

      }

    } catch (error) {

      console.log(error);

    }

  };

  const filteredCustomers = useMemo(() => {

    return customers.filter((item) => {

      const searchText =
        `${item.FirstName} ${item.LastName}
        ${item.Email}
        ${item.ContactNo}`
          .toLowerCase();

      return searchText.includes(
        search.toLowerCase()
      );

    });

  }, [customers, search]);

  return (

    <div className="dashboard-app">

      <Sidebar />

      <main className="dashboard-main">

        <Header />

        {/* PAGE TITLE */}

        <div className="admin-customer-page-header">

          <div>

            <h2>
              Customer Management
            </h2>

            <p>
              Manage customers and
              track purchase activity
            </p>

          </div>

          <div className="admin-customer-header-actions">

            <button
              className="admin-customer-export-btn"
            >
              Export
            </button>

          </div>

        </div>

        {/* TOP CARDS */}

        <div className="admin-customer-stats-grid">

          <div className="admin-customer-stat-card">

            <span>
              Total Customers
            </span>

            <h2>
              {
                dashboard.TotalCustomers || 0
              }
            </h2>

            <p>
              Registered buyers
            </p>

          </div>

          <div className="admin-customer-stat-card">

            <span>
              New This Month
            </span>

            <h2>
              {
                dashboard.NewThisMonth || 0
              }
            </h2>

            <p>
              Recent customers
            </p>

          </div>

          <div className="admin-customer-stat-card">

            <span>
              Orders Placed
            </span>

            <h2>
              {
                dashboard.OrdersPlaced || 0
              }
            </h2>

            <p>
              Total orders
            </p>

          </div>

          <div className="admin-customer-stat-card">

            <span>
              Revenue
            </span>

            <h2>

              ₹

              {
                Number(
                  dashboard.TotalRevenue || 0
                ).toLocaleString()
              }

            </h2>

            <p>
              Customer purchases
            </p>

          </div>

        </div>

        {/* CONTENT */}

        <div className="admin-customer-layout">

          {/* LEFT */}

          <div className="admin-customer-table-card">

            <div className="admin-customer-toolbar">

              <div>

                <h3>
                  Customers
                </h3>

                <p>

                  {
                    filteredCustomers.length
                  }

                  {" "}
                  customers found

                </p>

              </div>

              <input
                className="admin-customer-search"
                type="text"
                placeholder="Search customers..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
              />

            </div>

            <table className="admin-customer-table">

              <thead>

                <tr>

                  <th>
                    Customer
                  </th>

                  <th>
                    Orders
                  </th>

                  <th>
                    Total Spent
                  </th>

                  <th>
                    Last Order
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {
                  filteredCustomers.map(
                    (customer) => (

                      <tr
                        key={
                          customer.UserID
                        }
                      >

                        <td>

                          <div
                            className="admin-customer-user"
                          >

                            <div
                              className="admin-customer-avatar"
                            >

                              {
                                customer.FirstName
                                ?.charAt(0)
                              }

                            </div>

                            <div>

                              <h4>

                                {
                                  customer.FirstName
                                }

                                {" "}

                                {
                                  customer.LastName
                                }

                              </h4>

                              <p>

                                {
                                  customer.Email
                                }

                              </p>

                              <p>

                                {
                                  customer.ContactNo
                                }

                              </p>

                            </div>

                          </div>

                        </td>

                        <td>

                          {
                            customer.OrdersPlaced
                          }

                        </td>

                        <td>

                          ₹

                          {
                            Number(
                              customer.TotalSpent || 0
                            ).toLocaleString()
                          }

                        </td>

                        <td>

                          {
                            customer.LastOrderDate
                              ? new Date(
                                  customer.LastOrderDate
                                ).toLocaleDateString()
                              : "-"
                          }

                        </td>

                        <td>

                          <span
                            className="admin-customer-status active"
                          >

                            Active

                          </span>

                        </td>

                        <td>

                          <button
                            className="admin-customer-view-btn"
                            onClick={() =>
                              setSelectedCustomer(
                                customer
                              )
                            }
                          >

                            View

                          </button>

                        </td>

                      </tr>

                    )
                  )
                }

              </tbody>

            </table>

          </div>

          {/* RIGHT PANEL */}

          <div className="admin-customer-side-panel">

            <div className="admin-customer-side-card">

              <h3>
                Customer Overview
              </h3>

              <div className="admin-customer-row">
                <span>Total Customers</span>
                <strong>
                  {
                    dashboard.TotalCustomers || 0
                  }
                </strong>
              </div>

              <div className="admin-customer-row">
                <span>Orders</span>
                <strong>
                  {
                    dashboard.OrdersPlaced || 0
                  }
                </strong>
              </div>

              <div className="admin-customer-row">
                <span>Revenue</span>
                <strong>

                  ₹

                  {
                    Number(
                      dashboard.TotalRevenue || 0
                    ).toLocaleString()
                  }

                </strong>
              </div>

            </div>

            <div className="admin-customer-side-card">

              <h3>
                Quick Filters
              </h3>

              <select>

                <option>
                  All Customers
                </option>

                <option>
                  Active
                </option>

              </select>

              <button
                className="admin-customer-apply-btn"
              >
                Apply Filter
              </button>

            </div>

            <div className="admin-customer-side-card">

              <h3>
                Actions Guide
              </h3>

              <ul className="admin-customer-guide">

                <li>
                  View customer profile
                </li>

                <li>
                  Check order history
                </li>

                <li>
                  Review wishlist
                </li>

                <li>
                  Export customer list
                </li>

              </ul>

            </div>

          </div>

        </div>

        {/* POPUP */}

        {
          selectedCustomer && (

            <div
              className="ord-dtl-overlay"
              onClick={() =>
                setSelectedCustomer(
                  null
                )
              }
            >

              <div
                className="ord-dtl-popup1"
                onClick={(e) =>
                  e.stopPropagation()
                }
              >

                <AdminCustomerDetails
                  customer={
                    selectedCustomer
                  }
                />

                <button
                  className="ord-dtl-close"
                  onClick={() =>
                    setSelectedCustomer(
                      null
                    )
                  }
                >
                  Close
                </button>

              </div>

            </div>

          )
        }

      </main>

    </div>

  );

};

export default AdminCustomers;