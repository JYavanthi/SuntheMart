
// import { useAddress } from "./context/AddressContext";
// import { useCart } from "./context/CartContext";
// import Navbar from "./Navbar/navbar";
// import Footer from "./footer";
// import "./styles/cart-address.css";
// import { useNavigate } from "react-router-dom";
// import AddressFormModal from "./addressFormModal";
// import { useState, useEffect } from "react";
// import { useConfirm } from "../src/context/ConfirmContext";
// import { API_URLS } from "./API-Urls";
// import slctadrs from "./assets/sel_adrs.jpeg"

// export default function CartAddress() {

//   const navigate = useNavigate();
//   const { selectedAddress, addAddress ,selectAddress} = useAddress();
//   const { cartItems } = useCart();
//   const { confirm } = useConfirm();

//   const [showForm, setShowForm] = useState(false);

//   const emptyForm = {
//     flat: "",
//     street: "",
//     landmark: "",
//     pincode: "",
//     city: "",
//     state: "",
//     name: "",
//     mobile: "",
//     type: "Home",
//     isDefault: false,
//   };

//   const [form, setForm] = useState<any>(emptyForm);

//   const [coupons, setCoupons] = useState<any[]>([]);
//   const [autoDiscount, setAutoDiscount] = useState(0);
//   const [autoDiscountLabel, setAutoDiscountLabel] = useState("");

//  const couponApplied = localStorage.getItem("couponApplied") === "true";

// const couponDiscount = couponApplied
//   ? Number(localStorage.getItem("couponDiscount") || 0)
//   : 0;

//   const handleSave = () => {
//     if (!form.name || !form.mobile || !form.street) {
//       alert("Please fill required fields");
//       return;
//     }

//     // addAddress({ ...form, id: Date.now() });
//     const userId = Number(localStorage.getItem("userId"));

// addAddress(userId, {
//   name: form.name,
//   mobile: form.mobile,
//   flat: form.flat,
//   street: form.street,
//   landmark: form.landmark,
//   city: form.city,
//   state: form.state,
//   pincode: form.pincode,
//   type: form.type,
//   isDefault: form.default,
// });
//     setShowForm(false);
//     setForm({ ...emptyForm });
//   };

//   /* ===============================
//      PRICE CALCULATION
//      =============================== */

//   const total = cartItems.reduce(
//     (sum, item) => sum + item.discount * item.qty,
//     0
//   );

//   const gst = total * 0.10;

//   const finalTotal = total + gst - couponDiscount - autoDiscount;

//   /* ===============================
//      FETCH COUPONS
//      =============================== */

//   useEffect(() => {

//     const fetchCoupons = async () => {

//       try {

//         const res = await fetch(`${API_URLS.BASE_URL}discounts`);
//         const data = await res.json();

//         if (data.success) {
//           setCoupons(data.data);
//         }

//       } catch (err) {
//         console.log("Coupon fetch error", err);
//       }

//     };

//     fetchCoupons();

//   }, []);

//   /* ===============================
//      AUTO OFFER
//      =============================== */

//   useEffect(() => {

//     if (coupons.length === 0) return;

//     const auto = coupons.find(
//       (c: any) => !c.CouponCode || c.CouponCode.trim() === ""
//     );

//     if (!auto) return;

//     const discountValue = Number(auto.DiscountValue || 0);
//     const maxDiscount = Number(auto.MaxDiscount || 0);

//     let discount = 0;

//     if (auto.DiscountType === "Flat") {

//       discount = discountValue;
//       setAutoDiscountLabel(`Discount ₹(${discountValue})`);

//     } else {

//       discount = (total * discountValue) / 100;

//       if (maxDiscount > 0) {
//         discount = Math.min(discount, maxDiscount);
//       }

//       setAutoDiscountLabel(`Discount ${discountValue}%`);

//     }

//     setAutoDiscount(discount);

//   }, [coupons, total]);

//   return (
//     <>
//       <Navbar />

//       <div className="cart-address-page">

//         <div className="cart-add-steps">
//           <span className="cmpltd">My Cart</span>
//           <span className="dots">---------------</span>
//           <span className="active">Address</span>
//           <span className="dots">---------------</span>
//           <span>Payment</span>
//         </div>

//         <div className="cart-add-content">

//           {/* LEFT SIDE */}

//           <div className="cart-add-left">

//             <h2>Delivery Address</h2>

//             {selectedAddress ? (
//               <div className="cart-address-card active">
//                 <input type="radio" checked readOnly aria-label=".." />

//                 <div>
//                   <p className="cart-add-name">{selectedAddress.name} ({selectedAddress.type})</p>

//                   <p>
//                     No {selectedAddress.flat},
//                     {selectedAddress.street},
//                     {selectedAddress.city},
//                     {selectedAddress.state},
//                     {selectedAddress.pincode}
//                   </p>

//                   <p className="cart-add-ph">{selectedAddress.mobile}</p>
//                 </div>

//               </div>
//             ) : (
//               <p>No address selected</p>
//             )}

//             <div className="address-actions">

//               <button onClick={() => navigate("/address")}>
//                 Select / Change Address
//               </button>

//               <button onClick={() => setShowForm(true)}>
//                 + Add New Address
//               </button>

//             </div>

//           </div>

//           {/* RIGHT SIDE */}

//           <div className="cart-right">

//             <h3>Order Summary</h3>

//             <div className="summary">

//               <div className="row">
//                 <span>Item Total (Excl. of all taxes)</span>
//                 <span>₹ {total}</span>
//               </div>

//               <div className="row">
//                 <span>GST(10%)</span>
//                 <span>₹ {gst.toFixed(2)}</span>
//               </div>

//               <div className="row">
//                 <span>Shipping Charges</span>
//                 <span className="free">Free</span>
//               </div>

//               {/* AUTO DISCOUNT */}

//               {autoDiscount > 0 && (

//                 <div className="row discount">
//                   <span style={{ fontWeight: 600 }}>
//                     {autoDiscountLabel}
//                   </span>

//                   <span>- ₹ {autoDiscount.toFixed(2)}</span>
//                 </div>

//               )}

//               {/* COUPON DISCOUNT */}

//               {couponDiscount > 0 && (

//                 <div className="row discount">
//                   <span>Coupon Discount</span>
//                   <span>- ₹ {couponDiscount}</span>
//                 </div>

//               )}

//               <hr />

//               <div className="row total">
//                 <span>Total Amount</span>
//                 <span>₹ {finalTotal.toFixed(2)}</span>
//               </div>

//             </div>

//             {/* <button
//               className="place-order-btn"
//               onClick={() => navigate("/payment")}
//             >
//               CONTINUE TO PAYMENT
//             </button> */}
//             {/* <button
//   className="place-order-btn"
//   onClick={() => {
//     if (!selectedAddress) {
//       window.alert("Please select the address to continue");
//       return;
//     }

//     navigate("/payment");
//   }}
// >
//   CONTINUE TO PAYMENT
// </button> */}
// <button
//   className="place-order-btn"
//   onClick={async () => {
//     if (!selectedAddress) {

//       await confirm({
//         title: "Address Required",
//         subText: "Please select the address to continue",
//         confirmText: "Select Address",
//         cancelText: "OK",
//         variant: "address",
//         image:slctadrs,
//       });

//       return;
//     }

//     navigate("/payment");
//   }}
// >
//   CONTINUE TO PAYMENT
// </button>

//           </div>

//         </div>

//       </div>

//       <AddressFormModal
//         open={showForm}
//         onClose={() => setShowForm(false)}
//         form={form}
//         setForm={setForm}
//         onSave={handleSave}
//         isEdit={false}
//       />

//       <Footer />
//     </>
//   );
// }



// click add new address naviagtes to address and opens form modal

import { useAddress } from "./context/AddressContext";
import { useCart } from "./context/CartContext";
import Navbar from "./Navbar/navbar";
import Footer from "./footer";
import "./styles/cart-address.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useConfirm } from "../src/context/ConfirmContext";
import { API_URLS } from "./API-Urls";
import slctadrs from "./assets/sel_adrs.jpeg";

export default function CartAddress() {
  const navigate = useNavigate();
  const { selectedAddress } = useAddress();
 
  const { confirm } = useConfirm();

  const [coupons, setCoupons] = useState<any[]>([]);
  const [autoDiscount, setAutoDiscount] = useState(0);
  const [autoDiscountLabel, setAutoDiscountLabel] = useState("");
  // const [discountAmount, setDiscountAmount] = useState(0);
   const { cartItems, removeFromCart, increaseQty, decreaseQty, addToCart, isInCart , clearCart} = useCart();
    const [showGstDetails, setShowGstDetails] = useState(false);

  const couponApplied = localStorage.getItem("couponApplied") === "true";

  const couponDiscount= couponApplied
    ? Number(localStorage.getItem("couponDiscount") || 0)
    : 0;

  /* ===============================
     PRICE CALCULATION
     =============================== */

 const total = cartItems.reduce((sum, item) => sum + (item.discount || item.price) * item.qty, 0);
 const gst = cartItems.reduce((sum, item) => sum + (((item.discount || item.price) * item.qty * item.gstPercent) / 100), 0);
 const subTotal = total-autoDiscount-couponDiscount;
 const finalTotal = subTotal + gst ;


  /* ===============================
     FETCH COUPONS
     =============================== */

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await fetch(`${API_URLS.BASE_URL}discounts`);
        const data = await res.json();

        if (data.success) {
          setCoupons(data.data);
        }
      } catch (err) {
        console.log("Coupon fetch error", err);
      }
    };

    fetchCoupons();
  }, []);

  /* ===============================
     AUTO OFFER
     =============================== */

  useEffect(() => {
    if (coupons.length === 0) return;

    const auto = coupons.find(
      (c: any) => !c.CouponCode || c.CouponCode.trim() === ""
    );

    if (!auto) return;

    const discountValue = Number(auto.DiscountValue || 0);
    const maxDiscount = Number(auto.MaxDiscount || 0);

    let discount = 0;

    if (auto.DiscountType === "Flat") {
      discount = discountValue;
      setAutoDiscountLabel(`Discount ₹(${discountValue})`);
    } else {
      discount = (total * discountValue) / 100;

      if (maxDiscount > 0) {
        discount = Math.min(discount, maxDiscount);
      }

      setAutoDiscountLabel(`Discount ${discountValue}%`);
    }

    setAutoDiscount(discount);
  }, [coupons, total]);

    const gstBreakdown = Object.values(
  cartItems.reduce((acc: any, item) => {
    const key = `${item.categoryName}-${item.gstPercent}`;
    const baseAmount = (item.discount || item.price) * item.qty;
    const gstAmount = (baseAmount * item.gstPercent) / 100;

    if (!acc[key]) {
      acc[key] = {
        categoryName: item.categoryName,
        gstPercent: item.gstPercent,
        amount: 0,
      };
    }

    acc[key].amount += gstAmount;
    return acc;
  }, {})
);

  return (
    <>
      <Navbar />

      <div className="cart-address-page">
          <div className="cart-add-back">
  <button
    className="cart-add-back-btn"
    onClick={() => navigate(-1)} 
  >
    ← 
  </button>
        <div className="cart-add-steps">
          <span className="cmpltd">My Cart</span>
          <span className="dots">---------------</span>
          <span className="active">Address</span>
          <span className="dots">---------------</span>
          <span>Payment</span>
        </div>
         </div>

        <div className="cart-add-content">
          <div className="cart-add-left">
            <div className="cart-add-left-title">
              <h2>Delivery Address</h2>
              <button className="change-add" onClick={() => navigate("/address")}>
                Change 
              </button>
            </div>

            {selectedAddress ? (
              <div className="cart-address-card active">
                <input type="checkbox" checked readOnly aria-label=".." />

                <div>
                  <p className="cart-add-name">
                    {selectedAddress.name?.toUpperCase()} ({selectedAddress.type})
                  </p>

                  <p>
                    No {selectedAddress.flat}, {selectedAddress.street},{" "}
                    {selectedAddress.city}, {selectedAddress.state},{" "}
                    {selectedAddress.pincode}
                  </p>

                  <p className="cart-add-ph">{selectedAddress.mobile}</p>
                </div>
              </div>
            ) : (
              <p>No address selected</p>
            )}

            {/* <div className="address-actions">
              <button onClick={() => navigate("/address")}>
                Select / Change Address
              </button>

              <button
                onClick={() =>
                  navigate("/address", { state: { openAddForm: true } })
                }
              >
                + Add New Address
              </button>
            </div> */}
             <h3 className="cart-address-items-title">Items in Your Cart</h3>

            {cartItems.length > 0 && (
  <div className="cart-address-items">
   
    {cartItems.map((item) => (
      <div key={item.cartId} className="cart-address-item">
        <img
          src={item.img}
          alt={item.title}
          className="cart-address-item-img"
        />

        <div className="cart-address-item-details">
          <h4>{item.title}</h4>
          <p>{item.weight}</p>
          <p >
            <strong>Qty:</strong> {item.qty}
            <div className="cart-add-item-qnty"> 
              {/* <button onClick={() => decreaseQty(item.cartId)}>-</button> */}
              <button
        onClick={() => {
          if (item.qty === 1) {
            removeFromCart(item.cartId);
          } else {
            decreaseQty(item.cartId);
          }
        }}
      >
        -
      </button>
             <button onClick={() => increaseQty(item.cartId)}>+</button></div>
            
          </p>
        </div>

        <div className="cart-address-item-price">
          <h4>₹ {item.discount * item.qty}</h4>
          <p>MRP excl. all taxes</p>
        </div>
      </div>
    ))}
  </div>
)}
          </div>

          <div className="cart-right">
            <h3>Order Summary</h3>

            <div className="summary">
              <div className="row">
                <span>Item Total (Excl. of all taxes)</span>
                <span>₹ {total}</span>
              </div>

               {autoDiscount > 0 && (

                <div className="row discount">
                  <span style={{ fontWeight: 600 }}>{autoDiscountLabel}</span>
                  <span>- ₹ {autoDiscount.toFixed(2)}</span>
                </div>

              )}

              <div className="row">
                <span>Shipping Charges</span>
                <span className="free">Free</span>
              </div>

            

              {couponDiscount > 0 && (
                <div className="row discount">
                  <span>Coupon Discount</span>
                  <span>- ₹ {couponDiscount}</span>
                </div>
              )}

              <hr />
               <div className="row">
                <span>Sub Total</span>
                <span>₹ {subTotal}</span>
              </div>

                 <div className="row gst-row">
  <span className="gst-title-wrap">
    GST
    <button
      type="button"
      className="gst-info-btn"
      onClick={() => setShowGstDetails(!showGstDetails)}
    >
      i
    </button>
  </span>
  <span>₹ {gst.toFixed(2)}</span>
</div>

{showGstDetails && (
  <div className="gst-inline-box">
    {gstBreakdown.map((item: any, index) => (
      <div key={index} className="gst-inline-row">
        <span>
          {item.categoryName} ({item.gstPercent}%)
        </span>
        <span>₹ {item.amount.toFixed(2)}</span>
      </div>
    ))}
  </div>
)}
  <hr />

              <div className="row total">
                <span>Total Amount</span>
                <span>₹ {finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              className="place-order-btn"
              onClick={async () => {
                if (!selectedAddress) {
                  await confirm({
                    title: "Address Required",
                    subText: "Please select the address to continue",
                    confirmText: "Select Address",
                    cancelText: "OK",
                    variant: "address",
                    image: slctadrs,
                  });

                  return;
                }

                navigate("/payment");
              }}
            >
              CONTINUE TO PAYMENT
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

