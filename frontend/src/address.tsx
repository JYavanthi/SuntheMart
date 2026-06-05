

// import React, { useState, useEffect } from "react";
// import Navbar from "./Navbar/navbar";
// import Footer from "./footer";
// import "./styles/address.css";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useAddress } from "./context/AddressContext";
// import AddressFormModal from "./addressFormModal";
// import { useCart } from "./context/CartContext";
// import ProfileSidebar from "./ProfileSidebar";

// import banner from "./assets/cart-bg.jpeg";

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

//   const location = useLocation();

//   const { cartItems } = useCart();

//   const {
//     addresses,
//     selectedAddress,
//     selectAddress,
//     deleteAddress,
//     fetchAddresses,
//   } = useAddress();

//   const [showForm, setShowForm] =
//     useState(false);

//   const [form, setForm] =
//     useState<any>(emptyForm);

//   const [editingId, setEditingId] =
//     useState<number | null>(null);

//   const userId = Number(
//     localStorage.getItem("userId")
//   );

//   /* =========================
//      LOAD ADDRESS
//   ========================= */

//   useEffect(() => {

//     if (userId) {
//       fetchAddresses(userId);
//     }

//     if (location.state?.openAddForm) {

//       setEditingId(null);

//       setForm({ ...emptyForm });

//       setShowForm(true);

//     }

//   }, [userId]);

//   /* =========================
//      ADD
//   ========================= */

//   const openAddForm = () => {

//     setEditingId(null);

//     setForm({ ...emptyForm });

//     setShowForm(true);

//   };

//   /* =========================
//      EDIT
//   ========================= */

//   const openEditForm = (
//     item: any
//   ) => {

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

//   /* =========================
//      DELETE
//   ========================= */

//   const handleDelete = async (
//     id: number,
//     e: any
//   ) => {

//     e.stopPropagation();

//     await deleteAddress(id);

//     if (userId) {
//       fetchAddresses(userId);
//     }

//   };

//   return (
//     <>
//       <Navbar />

//       <div className="address-page">

//         {/* ======================
//             TOP BANNER
//         ====================== */}

//         <div className="address-top-banner">

//           <img
//             src={banner}
//             alt=""
//             className="address-banner-img"
//           />

//           <div className="address-banner-overlay"></div>

//           <div className="address-banner-content">

//             <div className="address-banner-left">

//               <h1>
//                 My Addresses
//               </h1>

//               <div className="address-breadcrumb">

//                 Home

//                 <span>›</span>

//                 Addresses

//               </div>

//             </div>

//             <div className="address-banner-right">

//               <div className="address-banner-card">

//                 <div className="address-banner-icon">
//                   ♡
//                 </div>

//                 <div>

//                   <h3>
//                     Manage your addresses
//                   </h3>

//                   <p>
//                     Add, edit or remove
//                     addresses for a smooth
//                     delivery experience.
//                   </p>

//                 </div>

//               </div>

//             </div>

//           </div>

//         </div>

//         {/* ======================
//             MAIN
//         ====================== */}

//         <div className="address-container">

//           {/* SIDEBAR */}

//           <ProfileSidebar />

//           {/* RIGHT */}

//           <div className="address-right">

//             {/* TOP */}

//             <div className="address-right-top">

//               <div>

//                 <h2>
//                   Your Saved Addresses
//                 </h2>

//                 <p>
//                   Choose an address during
//                   checkout for faster
//                   delivery
//                 </p>

//               </div>

//               <button
//                 className="address-add-btn"
//                 onClick={openAddForm}
//               >
//                 + Add New Address
//               </button>

//             </div>

//             {/* ADDRESS LIST */}

//             {addresses.map((item: any) => (

//               <div
//                 key={item.id}
//                 className={`address-card-new ${
//                   selectedAddress?.id ===
//                   item.id
//                     ? "selected"
//                     : ""
//                 }`}
//                 onClick={() =>
//                   selectAddress(item)
//                 }
//               >

//                 {/* LEFT */}

//                 <div className="address-card-left">

//                   <input
//                     type="radio"
//                     checked={
//                       selectedAddress?.id ===
//                       item.id
//                     }
//                     readOnly
//                   />

//                   <div className="address-icon-wrap">

//                     <div className="address-type-icon">

//                       {item.type ===
//                       "Home"
//                         ? "🏠"
//                         : item.type ===
//                           "Office"
//                         ? "💼"
//                         : "📍"}

//                     </div>

//                   </div>

//                   <div className="address-user-details">

//                     {item.isDefault && (
//                       <span className="address-default-badge">
//                         Default
//                       </span>
//                     )}

//                     <h3>
//                       {item.type}
//                     </h3>

//                     <h4>
//                       {item.name}
//                     </h4>

//                     <p>
//                       {item.flat},{" "}
//                       {item.street},
//                     </p>

//                     <p>
//                       {item.city},{" "}
//                       {item.state}
//                       {" - "}
//                       {item.pincode}
//                     </p>

//                     <p>
//                       +91{" "}
//                       {item.mobile}
//                     </p>

//                   </div>

//                 </div>

//                 {/* CENTER */}

//                 <div className="address-card-center">

//                   <div className="address-info-row">

//                     <span>
//                       Address Type
//                     </span>

//                     <strong>
//                       {item.type}
//                     </strong>

//                   </div>

//                   <div className="address-info-row">

//                     <span>
//                       Pincode
//                     </span>

//                     <strong>
//                       {item.pincode}
//                     </strong>

//                   </div>

//                   <div className="address-info-row">

//                     <span>
//                       Phone Number
//                     </span>

//                     <strong>
//                       +91{" "}
//                       {item.mobile}
//                     </strong>

//                   </div>

//                 </div>

//                 {/* RIGHT */}

//                 <div className="address-card-actions">

//                   <button
//                     className="address-edit-btn"
//                     onClick={(e) => {

//                       e.stopPropagation();

//                       openEditForm(item);

//                     }}
//                   >
//                     ✏ Edit
//                   </button>

//                   <button
//                     className="address-delete-btn"
//                     onClick={(e) =>
//                       handleDelete(
//                         item.id,
//                         e
//                       )
//                     }
//                   >
//                     🗑 Remove
//                   </button>

//                 </div>

//               </div>

//             ))}

//             {/* SAFE BOX */}

//             <div className="address-safe-box">

//               <div className="address-safe-icon">
//                 🛡
//               </div>

//               <div>

//                 <h4>
//                   Secure & Hassle-free
//                   Delivery
//                 </h4>

//                 <p>
//                   Your addresses are safe
//                   with us. We ensure
//                   on-time and secure
//                   delivery to your
//                   doorstep.
//                 </p>

//               </div>

//             </div>

//             {/* CONTINUE */}

//             <button
//               className="address-continue-btn"
//               disabled={
//                 !selectedAddress ||
//                 cartItems.length === 0
//               }
//               onClick={() =>
//                 navigate("/checkout")
//               }
//             >
//               Select & Continue
//             </button>

//           </div>

//         </div>

//       </div>

//       {/* MODAL */}

//       <AddressFormModal
//         open={showForm}
//         onClose={() =>
//           setShowForm(false)
//         }
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

import React, { useState, useEffect } from "react";
import Navbar from "./Navbar/navbar";
import Footer from "./footer";
import "./styles/address.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useAddress } from "./context/AddressContext";
import { useCart } from "./context/CartContext";
import ProfileSidebar from "./ProfileSidebar";
import AddNewAddress from "./AddNewAddress";

import banner from "./assets/cart-bg.jpeg";

const Address = () => {

  const navigate = useNavigate();

  const location = useLocation();

  const { cartItems } = useCart();

  const {
    addresses,
    selectedAddress,
    selectAddress,
    deleteAddress,
    fetchAddresses,
  } = useAddress();

  const [showAddNewAddress, setShowAddNewAddress] =
    useState(false);

  const userId = Number(
    localStorage.getItem("userId")
  );

  /* =========================
     LOAD ADDRESS
  ========================= */

  useEffect(() => {

    if (userId) {
      fetchAddresses(userId);
    }

  }, [userId]);

  /* =========================
     ADD ADDRESS
  ========================= */

  const openAddForm = () => {

    setShowAddNewAddress(true);

  };

  /* =========================
     EDIT ADDRESS
  ========================= */

  const openEditForm = (item: any) => {

    setShowAddNewAddress(true);

  };

  /* =========================
     DELETE ADDRESS
  ========================= */

  const handleDelete = async (
    id: number,
    e: any
  ) => {

    e.stopPropagation();

    await deleteAddress(id);

    if (userId) {
      fetchAddresses(userId);
    }

  };

  return (
    <>
      <Navbar />

      <div className="address-page">

        {/* ======================
            TOP BANNER
        ====================== */}

        <div className="address-top-banner">

          <img
            src={banner}
            alt=""
            className="address-banner-img"
          />

          <div className="address-banner-overlay"></div>

          <div className="address-banner-content">

            <div className="address-banner-left">

              <h1>
                My Addresses
              </h1>

              <div className="address-breadcrumb">

                Home

                <span>›</span>

                Addresses

              </div>

            </div>

            <div className="address-banner-right">

              <div className="address-banner-card">

                <div className="address-banner-icon">
                  ♡
                </div>

                <div>

                  <h3>
                    Manage your addresses
                  </h3>

                  <p>
                    Add, edit or remove
                    addresses for a smooth
                    delivery experience.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ======================
            MAIN
        ====================== */}

        <div className="address-container">

          {/* SIDEBAR */}

          <ProfileSidebar />

          {/* RIGHT */}

          <div className="address-right">

            {!showAddNewAddress ? (

              <>
                {/* TOP */}

                <div className="address-right-top">

                  <div>

                    <h2>
                      Your Saved Addresses
                    </h2>

                    <p>
                      Choose an address during
                      checkout for faster
                      delivery
                    </p>

                  </div>

                  <button
                    className="address-add-btn"
                    onClick={openAddForm}
                  >
                    + Add New Address
                  </button>

                </div>

                {/* ADDRESS LIST */}

                {addresses.map((item: any) => (

                  <div
                    key={item.id}
                    className={`address-card-new ${
                      selectedAddress?.id ===
                      item.id
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      selectAddress(item)
                    }
                  >

                    {/* LEFT */}

                    <div className="address-card-left">

                      <input
                        type="radio"
                        checked={
                          selectedAddress?.id ===
                          item.id
                        }
                        readOnly
                      />

                      <div className="address-icon-wrap">

                        <div className="address-type-icon">

                          {item.type ===
                          "Home"
                            ? "🏠"
                            : item.type ===
                              "Office"
                            ? "💼"
                            : "📍"}

                        </div>

                      </div>

                      <div className="address-user-details">

                        {item.isDefault && (
                          <span className="address-default-badge">
                            Default
                          </span>
                        )}

                        <h3>
                          {item.type}
                        </h3>

                        <h4>
                          {item.name}
                        </h4>

                        <p>
                          {item.flat},{" "}
                          {item.street},
                        </p>

                        <p>
                          {item.city},{" "}
                          {item.state}
                          {" - "}
                          {item.pincode}
                        </p>

                        <p>
                          +91{" "}
                          {item.mobile}
                        </p>

                      </div>

                    </div>

                    {/* CENTER */}

                    <div className="address-card-center">

                      <div className="address-info-row">

                        <span>
                          Address Type
                        </span>

                        <strong>
                          {item.type}
                        </strong>

                      </div>

                      <div className="address-info-row">

                        <span>
                          Pincode
                        </span>

                        <strong>
                          {item.pincode}
                        </strong>

                      </div>

                      <div className="address-info-row">

                        <span>
                          Phone Number
                        </span>

                        <strong>
                          +91{" "}
                          {item.mobile}
                        </strong>

                      </div>

                    </div>

                    {/* RIGHT */}

                    <div className="address-card-actions">

                      <button
                        className="address-edit-btn"
                        onClick={(e) => {

                          e.stopPropagation();

                          openEditForm(item);

                        }}
                      >
                        ✏ Edit
                      </button>

                      <button
                        className="address-delete-btn"
                        onClick={(e) =>
                          handleDelete(
                            item.id,
                            e
                          )
                        }
                      >
                        🗑 Remove
                      </button>

                    </div>

                  </div>

                ))}

                {/* SAFE BOX */}

                <div className="address-safe-box">

                  <div className="address-safe-icon">
                    🛡
                  </div>

                  <div>

                    <h4>
                      Secure & Hassle-free
                      Delivery
                    </h4>

                    <p>
                      Your addresses are safe
                      with us. We ensure
                      on-time and secure
                      delivery to your
                      doorstep.
                    </p>

                  </div>

                </div>

                {/* CONTINUE */}

                <button
                  className="address-continue-btn"
                  disabled={
                    !selectedAddress ||
                    cartItems.length === 0
                  }
                  onClick={() =>
                    navigate("/checkout")
                  }
                >
                  Select & Continue
                </button>
              </>

            ) : (

              <AddNewAddress
                userId={userId}
              />

            )}

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default Address;