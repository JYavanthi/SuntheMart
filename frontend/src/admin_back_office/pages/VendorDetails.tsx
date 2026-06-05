
// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

// import VendorOverview from "../components/VendorOverview";
// import ProductPerformance from "../components/ProductPerformance";
// import WalletsAndPayouts from "../components/WalletsAndPayouts";

// import "../styles/vendorDetails.css";

// const VendorDetails = () => {

//   const location = useLocation();

//   const VendorID =
//     location.state?.VendorID || 0;

//   const [vendor, setVendor] =
//     useState<any>(null);

//   const [loading, setLoading] =
//     useState(true);

//   const [activeTab, setActiveTab] =
//     useState("overview");

//   useEffect(() => {

//     if (!VendorID) return;

//     fetch(
//       `http://localhost:4000/api/admin/vendor-details/${VendorID}`
//     )
//       .then((res) => res.json())
//       .then((data) => {

//         if (data.success) {

//           setVendor(data.data);

//         }

//       })
//       .catch((err) => {

//         console.log(err);

//       })
//       .finally(() => {

//         setLoading(false);

//       });

//   }, [VendorID]);

//   if (loading) {

//     return (
//       <div className="vendor-loading">
//         Loading Vendor Details...
//       </div>
//     );

//   }

//   if (!vendor) {

//     return (
//       <div className="vendor-loading">
//         Vendor not found
//       </div>
//     );

//   }

//   return (

//     <div className="active-vendor-details-page">

//       {/* HEADER */}

//       <div className="vendor-header-card">

//         <div className="vendor-header-left">

//           <div className="vendor-logo">
//             🏪
//           </div>

//           <div>

//             <h2>
//               {vendor.BusinessName}
//             </h2>

//             <span className="vendor-status">

//               {vendor.VendorStatus}

//             </span>

//             <p>
//               {vendor.Email}
//             </p>

//             <p>
//               {vendor.PhoneNumber}
//             </p>

//             <p>
//               {vendor.City},
//               {" "}
//               {vendor.State}
//             </p>

//           </div>

//         </div>

//         <div className="vendor-header-right">

//           <div>

//             <strong>
//               Vendor ID
//             </strong>

//             <p>
//               {vendor.VendorID}
//             </p>

//           </div>

//           <div>

//             <strong>
//               Business Type
//             </strong>

//             <p>
//               {vendor.BusinessType}
//             </p>

//           </div>

//           <div>

//             <strong>
//               Category
//             </strong>

//             <p>
//               {vendor.Category}
//             </p>

//           </div>

//         </div>

//       </div>

//       {/* TABS */}

//       <div className="vendor-tabs">

//         <button
//           className={
//             activeTab === "overview"
//               ? "active"
//               : ""
//           }
//           onClick={() =>
//             setActiveTab("overview")
//           }
//         >
//           Overview
//         </button>

//         <button
//           className={
//             activeTab === "products"
//               ? "active"
//               : ""
//           }
//           onClick={() =>
//             setActiveTab("products")
//           }
//         >
//           Product Performance
//         </button>

//         <button
//           className={
//             activeTab === "wallets"
//               ? "active"
//               : ""
//           }
//           onClick={() =>
//             setActiveTab("wallets")
//           }
//         >
//           Wallets & Payouts
//         </button>

//       </div>

//       {/* CONTENT */}

//       {activeTab === "overview" && (

//         <VendorOverview
//           VendorID={VendorID}
//           vendor={vendor}
//         />

//       )}

//       {activeTab === "products" && (

//         <ProductPerformance
//           VendorID={VendorID}
//         />

//       )}

//       {activeTab === "wallets" && (

//         <WalletsAndPayouts
//           VendorID={VendorID}
//           vendor={vendor}
//         />

//       )}

//     </div>

//   );

// };

// export default VendorDetails;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Sidebar from "../sidebar";
import Header from "../topbar";

import VendorOverview from "../components/VendorOverview";
import ProductPerformance from "../components/ProductPerformance";
import WalletsAndPayouts from "../components/WalletsAndPayouts";

import "../styles/vendorDetails.css";

const VendorDetails = () => {

  const location = useLocation();

  const VendorID =
    location.state?.VendorID || 0;

  const [vendor, setVendor] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [activeTab, setActiveTab] =
    useState("overview");

  useEffect(() => {

    if (!VendorID) return;

    fetch(
      `http://localhost:4000/api/admin/vendor-details/${VendorID}`
    )
      .then((res) => res.json())
      .then((data) => {

        if (data.success) {
          setVendor(data.data);
        }

      })
      .finally(() => {
        setLoading(false);
      });

  }, [VendorID]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (

    <div className="vendor-layout">

      <Sidebar />

      <div className="vendor-main">

        <Header />

        <div className="vendor-page">

          <div className="vendor-breadcrumb">
            Active Vendors &gt; Vendor Details &gt; Vendor Insights
          </div>

          <h2 className="vendor-page-title">
            Active Vendor Details
          </h2>

          <div className="vendor-header-card">

            <div className="vendor-header-left">

              <div className="vendor-logo">
                🏪
              </div>

              <div>

                <h2>
                  {vendor?.BusinessName}
                </h2>

                <span className="vendor-status">
                  {vendor?.VendorStatus}
                </span>

                <p>
                  📧 {vendor?.Email}
                </p>

                <p>
                  📞 {vendor?.PhoneNumber}
                </p>

                <p>
                  📍 {vendor?.City}, {vendor?.State}
                </p>

              </div>

            </div>

            <div className="vendor-header-right">

              <div>
                <label>Vendor ID</label>
                <span>{vendor?.VendorID}</span>
              </div>

              <div>
                <label>Business Type</label>
                <span>{vendor?.BusinessType}</span>
              </div>

              <div>
                <label>Business Category</label>
                <span>{vendor?.Category}</span>
              </div>

            </div>

          </div>

          <div className="vendor-tabs">

            <button
              className={
                activeTab === "overview"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveTab("overview")
              }
            >
              Overview
            </button>

            <button
              className={
                activeTab === "products"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveTab("products")
              }
            >
              Product Performance
            </button>

            <button
              className={
                activeTab === "wallets"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveTab("wallets")
              }
            >
              Wallets & Payouts
            </button>

          </div>

          {activeTab === "overview" && (
            <VendorOverview
              VendorID={VendorID}
            />
          )}

          {activeTab === "products" && (
            <ProductPerformance
              VendorID={VendorID}
            />
          )}

          {activeTab === "wallets" && (
            <WalletsAndPayouts
              VendorID={VendorID}
            />
          )}

        </div>

      </div>

    </div>

  );

};

export default VendorDetails;