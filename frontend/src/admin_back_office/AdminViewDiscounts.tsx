// import React, { useEffect, useState } from "react";
// import "./styles/AdminViewDiscounts.css";
// import Sidebar from "./sidebar";
// import Header from "./topbar";

// interface Discount {
//   DiscountID: number;
//   DiscountName: string;
//   CouponCode: string;
//   DiscountType: string;
//   DiscountValue: number;
//   ApplyTo: string;
//   MinOrderAmount?: number;
//   MaxDiscount?: number;
//   Status: number;
// }

// const AdminViewDiscounts = () => {

//   const [discounts, setDiscounts] = useState<Discount[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDiscounts();
//   }, []);

//   const fetchDiscounts = async () => {

//     try {

//       const response = await fetch("http://localhost:4000/api/admin/discounts");

//       const data = await response.json();

//       if (data.success) {
//         setDiscounts(data.data);
//       }

//     } catch (error) {

//       console.error("Error fetching discounts:", error);

//     } finally {
//       setLoading(false);
//     }
//   };

//   const getDiscountIcon = (type: string) => {

//     if (type === "Percentage") return "🎁";
//     if (type === "Fixed Amount") return "💰";
//     if (type === "Free Shipping") return "🚚";

//     return "🎫";
//   };

//   return (

//     <div className="admin-layout">

//       <Sidebar />

//       <div className="admin-main">

//         <Header />

//         <div className="top-controls">
//           <h2 className="page-title">DISCOUNTS PAGE</h2>
//         </div>

//         {loading ? (

//           <div className="adm-vw-dscnts-loading">
//             Loading discounts...
//           </div>

//         ) : (

//           <div className="adm-vw-dscnts-container">

//             <h2 className="adm-vw-dscnts-subtitle">
//               DISCOUNTS GENERATED
//             </h2>

//             <div className="adm-vw-dscnts-list">

//               {discounts.map((discount) => (

//                 <div
//                   key={discount.DiscountID}
//                   className="adm-vw-dscnts-item"
//                 >

//                   <div className="adm-vw-dscnts-item-left">

//                     <div className="adm-vw-dscnts-item-icon">
//                       {getDiscountIcon(discount.DiscountType)}
//                     </div>

//                     <div className="adm-vw-dscnts-item-info">

//                       <div className="adm-vw-dscnts-item-header">

//                         <span className="adm-vw-dscnts-code">
//                           {discount.CouponCode}
//                         </span>

//                         <span className="adm-vw-dscnts-separator">
//                           -
//                         </span>

//                         <span className="adm-vw-dscnts-description">
//                           {discount.DiscountType === "Percentage"
//                             ? `${discount.DiscountValue}% off for ${discount.ApplyTo}`
//                             : discount.DiscountType === "Flat"
//                             ? `₹${discount.DiscountValue} off on order`
//                             : "Free Shipping"}
//                         </span>

//                       </div>

//                     </div>

//                   </div>

//                   <div className="adm-vw-dscnts-item-right">

//                     <span className="adm-vw-dscnts-amount">
//                       -₹
//                       {discount.DiscountType === "Percentage"
//                         ? discount.MaxDiscount || discount.DiscountValue
//                         : discount.DiscountValue}
//                     </span>

//                     <button className="adm-vw-dscnts-edit-btn">
//                       ✏️ Edit
//                     </button>

//                   </div>

//                 </div>

//               ))}

//             </div>

//             <button className="adm-vw-dscnts-apply-btn">
//               + Apply Another Coupon
//             </button>

//           </div>

//         )}

//       </div>

//     </div>

//   );
// };

// export default AdminViewDiscounts;



// import React, { useEffect, useState } from "react";
// import "./styles/AdminViewDiscounts.css";
// import Sidebar from "./sidebar";
// import Header from "./topbar";
// import { useNavigate } from "react-router-dom";

// interface Discount {
//   DiscountID: number;
//   DiscountName: string;
//   CouponCode: string;
//   DiscountType: string;
//   DiscountValue: number;
//   ApplyTo: string;
//   MinOrderAmount?: number;
//   MaxDiscount?: number;
//   Status: string;
// }

// const AdminViewDiscounts = () => {
//   const navigate = useNavigate();
//   const [discounts, setDiscounts] = useState<Discount[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDiscounts();
//   }, []);

//   const fetchDiscounts = async () => {
//     try {
//       const res = await fetch("http://localhost:4000/api/admin/discounts");
//       const data = await res.json();
//       if (data.success) setDiscounts(data.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (discount: Discount) => {
//     navigate("/AdminDiscounts", { state: { discount } });
//   };

//   const handleAdd = () => {
//     navigate("/AdminDiscounts"); // empty form
//   };

//   const getDiscountIcon = (type: string) => {
//     if (type === "Percentage") return "🎁";
//     if (type === "Flat") return "💰";
//     if (type === "FreeShipping") return "🚚";
//     return "🎫";
//   };
//    const getCouponDisplay = (code?: string | null) => {
//     return code && code.trim() !== "" ? code : "DEFAULT DISCOUNT";
//   };

//   return (
//     <div className="admin-layout">
//       <Sidebar />
//       <div className="admin-main">
//         <Header />
//         <div className="top-controls">
//           <h2 className="page-title">DISCOUNTS PAGE</h2>
//         </div>
//         {loading ? (
//           <div className="adm-vw-dscnts-loading">Loading discounts...</div>
//         ) : (
//           <div className="adm-vw-dscnts-container">
//             <h2 className="adm-vw-dscnts-subtitle">DISCOUNTS GENERATED</h2>
//             <div className="adm-vw-dscnts-list">
//               {discounts.map((d) => (
//                 <div key={d.DiscountID} className="adm-vw-dscnts-item">
//                   <div className="adm-vw-dscnts-item-left">
//                     <div className="adm-vw-dscnts-item-icon">{getDiscountIcon(d.DiscountType)}</div>
//                     <div className="adm-vw-dscnts-item-info">
//                       <div className="adm-vw-dscnts-item-header">
//                         <span className="adm-vw-dscnts-code">{getCouponDisplay(d.CouponCode)}</span>
//                         <span className="adm-vw-dscnts-separator">-</span>
//                         <span className="adm-vw-dscnts-description">
//                           {d.DiscountType === "Percentage"
//                             ? `${d.DiscountValue}% off for ${d.ApplyTo}`
//                             : d.DiscountType === "Flat"
//                             ? `₹${d.DiscountValue} off on order`
//                             : "Free Shipping"}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="adm-vw-dscnts-item-right">
//                     <span className="adm-vw-dscnts-amount">
//                       ₹{d.DiscountValue}
//                     </span>
//                     <button className="adm-vw-dscnts-edit-btn" onClick={() => handleEdit(d)}>✏️ Edit</button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <button className="adm-vw-dscnts-apply-btn" onClick={handleAdd}>+ Apply Another Coupon</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminViewDiscounts;



import React, { useEffect, useState } from "react";
import "./styles/AdminViewDiscounts.css";
import Sidebar from "./sidebar";
import Header from "./topbar";
import { useNavigate } from "react-router-dom";

interface Discount {
  DiscountID: number;
  DiscountName: string;
  CouponCode?: string | null;
  DiscountType: string;
  DiscountValue: number;
  ApplyTo: string;
  MinOrderAmount?: number;
  MaxDiscount?: number;
  Status: string;
}

const AdminViewDiscounts = () => {
  const navigate = useNavigate();
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const fetchDiscounts = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/admin/discounts");
      const data = await res.json();
      if (data.success) setDiscounts(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (discount: Discount) => {
    navigate("/AdminDiscounts", { state: { discount } });
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this discount?")) return;

    try {
      const res = await fetch(`http://localhost:4000/api/admin/discount/${id}`, {
        method: "DELETE"
      });

      const data = await res.json();

      if (data.success) {
        alert("Discount deleted successfully");
        // Refresh the list
        fetchDiscounts();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Server error while deleting");
    }
  };

  const handleAdd = () => {
    navigate("/AdminDiscounts"); // empty form
  };

  const getDiscountIcon = (type: string) => {
    if (type === "Percentage") return "🎁";
    if (type === "Flat") return "💰";
    if (type === "FreeShipping") return "🚚";
    return "🎫";
  };

  const getCouponDisplay = (code?: string | null) => {
    return code && code.trim() !== "" ? code : "DEFAULT DISCOUNT";
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Header />
        <div className="top-controls">
          <h2 className="page-title">DISCOUNTS PAGE</h2>
        </div>
        {loading ? (
          <div className="adm-vw-dscnts-loading">Loading discounts...</div>
        ) : (
          <div className="adm-vw-dscnts-container">
            <h2 className="adm-vw-dscnts-subtitle">DISCOUNTS GENERATED</h2>
            <div className="adm-vw-dscnts-list">
              {discounts.map((d) => (
                <div key={d.DiscountID} className="adm-vw-dscnts-item">
                  <div className="adm-vw-dscnts-item-left">
                    <div className="adm-vw-dscnts-item-icon">{getDiscountIcon(d.DiscountType)}</div>
                    <div className="adm-vw-dscnts-item-info">
                      <div className="adm-vw-dscnts-item-header">
                        <span className="adm-vw-dscnts-code">{getCouponDisplay(d.CouponCode)}</span>
                        <span className="adm-vw-dscnts-separator">-</span>
                        <span className="adm-vw-dscnts-description">
                          {d.DiscountType === "Percentage"
                            ? `${d.DiscountValue}% off for ${d.ApplyTo}`
                            : d.DiscountType === "Flat"
                            ? `₹${d.DiscountValue} off on order`
                            : "Free Shipping"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="adm-vw-dscnts-item-right">
                    {/* <span className="adm-vw-dscnts-amount">₹{d.DiscountValue}</span> */}
                    <span className="adm-vw-dscnts-amount">
                       -₹
                       {d.DiscountType === "Percentage"
                         ? d.MaxDiscount || d.DiscountValue
                         : d.DiscountValue}
                     </span>
                    <button className="adm-vw-dscnts-edit-btn" onClick={() => handleEdit(d)}>✏️ Edit</button>
                    <button className="adm-vw-dscnts-delete-btn" onClick={() => handleDelete(d.DiscountID)}>🗑️</button>
                  </div>
                </div>
              ))}
            </div>
            <button className="adm-vw-dscnts-apply-btn" onClick={handleAdd}>+ Apply Another Coupon</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminViewDiscounts;