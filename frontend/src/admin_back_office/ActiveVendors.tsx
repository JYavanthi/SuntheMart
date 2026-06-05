import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Header from "./topbar";
import "./styles/activeVendors.css";
import { useNavigate } from "react-router-dom";
const ActiveVendors = () => {

  const [vendors, setVendors] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {

    fetch(
      "http://localhost:4000/api/admin/active-vendors"
    )
      .then(res => res.json())
      .then(data => {

        if (data.success) {
          setVendors(data.data);
        }

      });

    fetch(
      "http://localhost:4000/api/admin/active-vendor-stats"
    )
      .then(res => res.json())
      .then(data => {

        if (data.success) {
          setStats(data.data);
        }

      });

  }, []);

  const filteredVendors = vendors.filter((v: any) =>
    v.BusinessName?.toLowerCase().includes(search.toLowerCase()) ||
    v.Email?.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="activevendors-layout">

      <Sidebar />

      <div className="activevendors-main">

        <Header />

        <div className="activevendors-page-header">

          <h2>Active Vendors</h2>

          <p>
            Manage and monitor all active vendors on the platform.
          </p>

        </div>

        {/* STATS */}

        <div className="activevendors-stats">

          <div className="activevendors-stat-card">
            <h4>Total Active Vendors</h4>
            <h2>{stats.TotalActiveVendors || 0}</h2>
          </div>

          <div className="activevendors-stat-card">
            <h4>Products Listed</h4>
            <h2>0</h2>
          </div>

          <div className="activevendors-stat-card">
            <h4>Total Orders</h4>
            <h2>0</h2>
          </div>

          <div className="activevendors-stat-card">
            <h4>Total Sales</h4>
            <h2>0</h2>
          </div>

        </div>

        <div className="activevendors-content">

          {/* LEFT SECTION */}

          <div className="activevendors-table-section">

            <div className="activevendors-toolbar">

              <div className="activevendors-tabs">

                <button className="active">
                  All Active Vendors
                </button>

                <button>
                  Top Rated
                </button>

                <button>
                  High Sales
                </button>

                <button>
                  Newly Onboarded
                </button>

              </div>

              <div className="activevendors-search">

                <input
                  placeholder="Search vendors..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />

              </div>

            </div>

            <div className="activevendors-table-card">

              <table>

                <thead>

                  <tr>

                    <th>Vendor Details</th>
                    <th>Business Type</th>
                    <th>Category</th>
                    <th>Joined On</th>
                    <th>Status</th>
                    <th>Actions</th>

                  </tr>

                </thead>

                <tbody>

                  {filteredVendors.map((item: any) => (

                    <tr key={item.VendorID}>

                      <td>

                        <div>

                          <strong>
                            {item.BusinessName}
                          </strong>

                          <p>
                            {item.Email}
                          </p>

                          <span>
                            {item.City}, {item.State}
                          </span>

                        </div>

                      </td>

                      <td>
                        {item.BusinessType}
                      </td>

                      <td>
                        {item.Category}
                      </td>

                      <td>

                        {
                          new Date(
                            item.CreatedDt
                          ).toLocaleDateString()
                        }

                      </td>

                      <td>

                        <span className="activevendors-status">

                          Active

                        </span>

                      </td>

                      <td>

                        <button
  onClick={() =>
    navigate("/vendor-details", {
      state: {
        VendorID: item.VendorID,
        VendorName: item.BusinessName
      }
    })
  }
>
  View
</button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

          {/* RIGHT PANEL */}

          <div className="activevendors-right-panel">

            <div className="activevendors-card">

              <h3>
                Active Vendors Overview
              </h3>

              <div className="activevendors-circle">

                <div>
                  {stats.TotalActiveVendors || 0}
                  <span>Total</span>
                </div>

              </div>

              <ul>

                <li>
                  Approved
                </li>

                <li>
                  UnderReview
                </li>

                <li>
                  Rejected
                </li>

              </ul>

            </div>

            <div className="activevendors-card">

              <h3>
                Filters
              </h3>

              <select>
                <option>
                  Business Type
                </option>
              </select>

              <select>
                <option>
                  Category
                </option>
              </select>

              <button className="activevendors-filter-btn">
                Apply Filters
              </button>

            </div>

            <div className="activevendors-card">

              <h3>
                Export
              </h3>

              <button className="activevendors-export-btn">
                Export CSV
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default ActiveVendors;