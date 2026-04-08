
// import React, { useState, useEffect } from "react";
// import Navbar from "./Navbar/navbar";
// import Footer from "./footer";
// import "./styles/address.css";
// import { useNavigate } from "react-router-dom";
// import { useAddress } from "./context/AddressContext";
// import AddressFormModal from "./addressFormModal";
// import { API_URLS } from "../src/API-Urls";
// import { useCart } from "./context/CartContext";

// const emptyForm = {
//   flat: "",
//   street: "",
//   landmark: "",
//   pincode: "",
//   city: "",
//   state: "",
//   name: "",
//   mobile: "",
//   type: "Home",
//   default: false,
// };

// const Address = () => {
//   const navigate = useNavigate();
//   const { cartItems } = useCart();

//   const {
//     addresses,
//     selectedAddress,
//     selectAddress,
//     deleteAddress,
//     fetchAddresses,
//   } = useAddress();

//   const [showForm, setShowForm] = useState(false);
//   const [form, setForm] = useState<any>(emptyForm);
//   const [editingId, setEditingId] = useState<number | null>(null);

//   const userId = Number(localStorage.getItem("userId"));

//   /* ================= LOAD ADDRESSES ================= */
//   useEffect(() => {
//     if (userId) {
//       fetchAddresses(userId);
//     }
//   }, [userId]);

//   /* ================= ADD ADDRESS ================= */
//   const openAddForm = () => {
//     setEditingId(null);
//     setForm({ ...emptyForm });
//     setShowForm(true);
//   };

//   /* ================= EDIT ADDRESS ================= */
//   const openEditForm = (item: any) => {
//     setEditingId(item.id);

//     setForm({
//       flat: item.flat || "",
//       street: item.street || "",
//       landmark: item.landmark || "",
//       pincode: item.pincode || "",
//       city: item.city || "",
//       state: item.state || "",
//       name: item.name || "",
//       mobile: item.mobile || "",
//       type: item.type || "Home",
//       default: item.isDefault || false,
//     });

//     setShowForm(true);
//   };

//   /* ================= DELETE ADDRESS ================= */
//   const handleDelete = async (id: number, e: any) => {
//     e.stopPropagation();
//     await deleteAddress(id);

//     if (userId) {
//       fetchAddresses(userId);
//     }
//   };
  
//     const handleDeleteAccount = async () => {
//       const confirmDelete = window.confirm(
//         "⚠️ Are you sure you want to delete your account?\nThis action can be recovered later."
//       );
  
//       if (!confirmDelete) return;
  
//       try {
//         const userId = localStorage.getItem("userId");
  
//         if (!userId) {
//           alert("User not found");
//           return;
//         }
  
//         const res = await fetch(
//           `${API_URLS.BASE_URL}users/${userId}/delete`,
//           { method: "PUT" }
//         );
  
//         const data = await res.json();
  
//         if (data.success) {
//           localStorage.clear();
//           alert("✅ Account deleted successfully");
//           navigate("/signup");
//         } else {
//           alert("❌ Failed to delete account");
//         }
  
//       } catch (error) {
//         console.error("❌ Delete error:", error);
//         alert("Server error while deleting account");
//       }
//     };

//   return (
//     <>
//       <Navbar />

//       <div className="profile-page-1">
//         <div className="profile-content-add">

//           {/* Sidebar */}
//           <div className="prfl-sidebar">
//             <button onClick={() => navigate("/profile")}>MY ORDERS</button>
//             <button className="active">SAVED ADDRESS</button>
//             <button onClick={() => navigate("/t&c")}>TERMS & CONDITIONS</button>
//             <button onClick={() => navigate("/privacy-policy")}>PRIVACY POLICY</button>
          
//                <button
//               className="logout-btn"
//               onClick={() => {
//                 const confirmLogout = window.confirm("Do you want to logout?");
//                 if (confirmLogout) {
//                   localStorage.clear();
//                   navigate("/");
//                 }
//               }}
//             >
//               LOG OUT
//             </button>

//             <button className="delete-btn" onClick={handleDeleteAccount}>
//               DELETE ACCOUNT
//             </button>
//           </div>

//           {/* Address Section */}
//           <div className="address-section">
//             <h2>Deliver To</h2>

//             {addresses.length === 0 && <p>No addresses found</p>}

//             {addresses.map((item: any) => (
//               <div
//                 key={item.id}
//                 className={`address-card ${
//                   selectedAddress?.id === item.id ? "selected" : ""
//                 }`}
//                 onClick={() => selectAddress(item)}
//               >
//                 <input
//                   type="radio"
//                   checked={selectedAddress?.id === item.id}
//                   readOnly
//                 />

//                 <div className="address-details">
//                   <h3>
//                     {item.name} ({item.type})
//                   </h3>
//                   <p>
//                     No {item.flat}, {item.street}, {item.city},{" "}
//                     {item.state}, {item.pincode}
//                   </p>
//                   <p>{item.mobile}</p>
//                 </div>

//                 <div className="edt-del">
//                   {/* EDIT */}
//                   <button
//                     className="add-edit-btn"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       openEditForm(item);
//                     }}
//                   >
//                     Edit
//                   </button>

//                   {/* DELETE */}
//                   <button
//                     className="add-delete-btn"
//                     onClick={(e) => handleDelete(item.id, e)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}

//                 <button
//               className="select-continue-btn"
//               disabled={!selectedAddress || cartItems.length === 0}
//               onClick={() => navigate("/cart-address")}
//             >
//               Select & Continue
//             </button>

//             {/* ADD NEW */}
//             <button
//               className="add-address-btn"
//               onClick={openAddForm}
//             >
//               + Add New Address
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* MODAL */}
//       <AddressFormModal
//         open={showForm}
//         onClose={() => setShowForm(false)}
//         form={form}
//         setForm={setForm}
//         userId={userId}
//         editingId={editingId}
//       />

//       <Footer />
//     </>
//   );
// };

// export default Address;



// works paerfect but doesnt navigate to cart-add automtcly

import React, { useState, useEffect } from "react";
import Navbar from "./Navbar/navbar";
import Footer from "./footer";
import "./styles/address.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useAddress } from "./context/AddressContext";
import AddressFormModal from "./addressFormModal";
import { API_URLS } from "../src/API-Urls";
import { useCart } from "./context/CartContext";

const emptyForm = {
  flat: "",
  street: "",
  landmark: "",
  pincode: "",
  city: "",
  state: "",
  name: "",
  mobile: "",
  type: "Home",
  default: false,
};

const Address = () => {
  const navigate = useNavigate();
  const location = useLocation();   // ⭐ added
  const { cartItems } = useCart();

  const {
    addresses,
    selectedAddress,
    selectAddress,
    deleteAddress,
    fetchAddresses,
  } = useAddress();

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<any>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  const userId = Number(localStorage.getItem("userId"));

  /* ================= LOAD ADDRESSES ================= */
  useEffect(() => {
    if (userId) {
      fetchAddresses(userId);
    }

    /* ⭐ OPEN FORM IF COMING FROM CART PAGE */
    if (location.state?.openAddForm) {
      setEditingId(null);
      setForm({ ...emptyForm });
      setShowForm(true);
    }

  }, [userId]);

  /* ================= ADD ADDRESS ================= */
  const openAddForm = () => {
    setEditingId(null);
    setForm({ ...emptyForm });
    setShowForm(true);
  };

  /* ================= EDIT ADDRESS ================= */
  const openEditForm = (item: any) => {
    setEditingId(item.id);

    setForm({
      flat: item.flat || "",
      street: item.street || "",
      landmark: item.landmark || "",
      pincode: item.pincode || "",
      city: item.city || "",
      state: item.state || "",
      name: item.name || "",
      mobile: item.mobile || "",
      type: item.type || "Home",
      default: item.isDefault || false,
    });

    setShowForm(true);
  };

  /* ================= DELETE ADDRESS ================= */
  const handleDelete = async (id: number, e: any) => {
    e.stopPropagation();
    await deleteAddress(id);

    if (userId) {
      fetchAddresses(userId);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "⚠️ Are you sure you want to delete your account?\nThis action can be recovered later."
    );

    if (!confirmDelete) return;

    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("User not found");
        return;
      }

      const res = await fetch(
        `${API_URLS.BASE_URL}users/${userId}/delete`,
        { method: "PUT" }
      );

      const data = await res.json();

      if (data.success) {
        localStorage.clear();
        alert("✅ Account deleted successfully");
        navigate("/signup");
      } else {
        alert("❌ Failed to delete account");
      }

    } catch (error) {
      console.error("❌ Delete error:", error);
      alert("Server error while deleting account");
    }
  };

  return (
    <>
      <Navbar />

      <div className="profile-page-1">
        <div className="profile-content-add">

          {/* Sidebar */}
          <div className="prfl-sidebar">
            <button onClick={() => navigate("/profile")}>MY ORDERS</button>
            <button className="active">SAVED ADDRESS</button>
            <button onClick={() => navigate("/t&c")}>TERMS & CONDITIONS</button>
            <button onClick={() => navigate("/privacy-policy")}>PRIVACY POLICY</button>

            <button
              className="logout-btn"
              onClick={() => {
                const confirmLogout = window.confirm("Do you want to logout?");
                if (confirmLogout) {
                  localStorage.clear();
                  navigate("/");
                }
              }}
            >
              LOG OUT
            </button>

            <button className="delete-btn" onClick={handleDeleteAccount}>
              DELETE ACCOUNT
            </button>
          </div>

          {/* Address Section */}
          <div className="address-section">
            <h2>Deliver To</h2>

            {addresses.length === 0 && <p>No addresses found</p>}

            {addresses.map((item: any) => (
              <div
                key={item.id}
                className={`address-card ${
                  selectedAddress?.id === item.id ? "selected" : ""
                }`}
                onClick={() => selectAddress(item)}
              >
                <input
                  type="radio"
                  checked={selectedAddress?.id === item.id}
                  readOnly
                />

                <div className="address-details">
                  <h3>
                    {item.name} ({item.type})
                  </h3>
                  <p>
                    No {item.flat}, {item.street}, {item.city},{" "}
                    {item.state}, {item.pincode}
                  </p>
                  <p>{item.mobile}</p>
                </div>

                <div className="edt-del">
                  <button
                    className="add-edit-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditForm(item);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="add-delete-btn"
                    onClick={(e) => handleDelete(item.id, e)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            <button
              className="select-continue-btn"
              disabled={!selectedAddress || cartItems.length === 0}
              onClick={() => navigate("/cart-address")}
            >
              Select & Continue
            </button>

            {/* ADD NEW */}
            <button
              className="add-address-btn"
              onClick={openAddForm}
            >
              + Add New Address
            </button>
          </div>
        </div>
      </div>

      <AddressFormModal
        open={showForm}
        onClose={() => setShowForm(false)}
        form={form}
        setForm={setForm}
        userId={userId}
        editingId={editingId}
      />

      <Footer />
    </>
  );
};

export default Address;


