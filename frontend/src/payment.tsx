
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import Navbar from "./Navbar/navbar";
// import Footer from "./footer";
// import PaymentOptions from "./payment/paymentOptions";
// import PaymentFooter from "./payment/PaymentFooter";
// import "../src/styles/products.css";
// import { useAddress } from "./context/AddressContext";
// import { useCart } from "./context/CartContext";
// import axios from "axios";

// const Payment = () => {
//   const navigate = useNavigate();
//   const { selectedAddress } = useAddress();
//   const { cartItems } = useCart();

//   const [selectedMethod, setSelectedMethod] = useState<string>("upi");
//   const [loading, setLoading] = useState(false);

//   // 🔢 Calculate totals
//   const total = cartItems.reduce(
//     (sum, item) => sum + item.price * item.qty,
//     0
//   );
//   const gst = total * 0.1;
//   const finalTotal = Math.round(total + gst);

//   // 🔥 CONFIRM ORDER
//   const handleConfirmOrder = async () => {
    
//     if (!selectedAddress) {
//       const goToAddress = window.confirm(
//         "No delivery address selected.\n\nClick OK to Select / Add Address"
//       );

//       if (goToAddress) {
//         navigate("/address");
//       }
//       return;
//     }

//     if (cartItems.length === 0) {
//       alert("Cart is empty");
//       return;
//     }

//     try {
//       setLoading(true);

//       // ==============================
//       // 1️⃣ CREATE ORDER (DB)
//       // ==============================
//       const userId = Number(localStorage.getItem("userId"));

//       const orderRes = await axios.post(
//         "http://localhost:4000/api/order/create",
//         {
//           userId,
//           cartItems: cartItems.map(item => ({
//             productId: item.id,
//             quantity: item.qty,
//             unitPrice: item.price,
//             totalPrice: item.price * item.qty
//           })),
//           totalAmount: finalTotal,
//           taxAmount: gst,
//           paymentMode: selectedMethod === "upi" ? "PHONEPE" : "COD",

//           shippingAddress: {
//       name: selectedAddress.name,
//       mobile: selectedAddress.mobile,
//       flat: selectedAddress.flat,
//       street: selectedAddress.street,
//       landmark: selectedAddress.landmark,
//       city: selectedAddress.city,
//       state: selectedAddress.state,
//       pincode: selectedAddress.pincode,
//       type: selectedAddress.type
//     }
//   }
// );
      

//       const orderId = orderRes.data.orderId;

//       // ==============================
//       // 2️⃣ PHONEPE PAYMENT
//       // ==============================
//       if (selectedMethod === "upi") {
//         console.log("Creating PhonePe payment for order:", orderId);

// const payRes = await axios.post(
//   "http://localhost:4000/api/payment/create",
//   {
//     orderId,
//     amount: finalTotal
//   }
// );

// console.log("Full payment response:", payRes.data);

// // ✅ THIS IS CORRECT
// const redirectUrl = payRes.data.redirectUrl;

// if (!redirectUrl) {
//   throw new Error("PhonePe redirect URL not received from backend");
// }

// // 🚀 REDIRECT TO PHONEPE
// window.location.href = redirectUrl;
//         return;
//       }

//       // ==============================
//       // 3️⃣ CASH ON DELIVERY
//       // ==============================
//       if (selectedMethod === "cod") {
//         alert("Order placed successfully with Cash On Delivery");
//         navigate(`/success?orderId=${orderId}`);
//       }

//     } catch (err: any) {
//       console.error("❌ Payment error:", err.response?.data || err.message);
//       alert("Payment failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="payment-page">

//         {/* Steps */}
//         <div className="payment-steps">
//           <span className="cmpltd">My Cart</span>
//           <span className="dots">---------------</span>
//           <span className="cmpltd">Address</span>
//           <span className="dots">---------------</span>
//           <span className="active">Payment</span>
//         </div>

//         {/* Address */}
//         <div className="payment-add-section">
//           {selectedAddress && (
//             <div className="payment-address-card active">
//               <h3 className="payment-delivery-title">Deliver To :</h3>
//               <div className="payment-add">
//                 <p className="name">
//                   {selectedAddress.name}
//                   <span className="type"> ({selectedAddress.type})</span>,
//                   <span className="mobile"> Ph:{selectedAddress.mobile}</span>
//                 </p>
//                 <p className="pymnt-add-1">
//                   No {selectedAddress.flat}, {selectedAddress.street},
//                   {selectedAddress.city}, {selectedAddress.state} -{" "}
//                   {selectedAddress.pincode}
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Main */}
//         <div className="payment-container">

//           {/* Left */}
//           <div className="payment-left">
//             <h3 className="payment-section-title">Payment Options</h3>

//             <PaymentOptions
//               selectedMethod={selectedMethod}
//               setSelectedMethod={setSelectedMethod}
//             />
//           </div>

//           {/* Right */}
//           <div className="payment-right">
//             <h3 className="payment-title">Billing Details</h3>

//             <div className="summary">
//               <div className="row">
//                 <span>Cart Total</span>
//                 <span>₹ {total}</span>
//               </div>

//               <div className="row">
//                 <span>GST</span>
//                 <span>₹ {gst.toFixed(2)}</span>
//               </div>

//               <div className="row">
//                 <span>Shipping Charges</span>
//                 <span className="free">Free</span>
//               </div>

//               <hr />

//               <div className="row total">
//                 <span>Total Amount</span>
//                 <span>₹ {finalTotal}</span>
//               </div>
//             </div>

//             <button
//               className="place-order-btn"
//               onClick={handleConfirmOrder}
//               disabled={loading}
//             >
//               {loading ? "PROCESSING..." : "CONFIRM YOUR ORDER"}
//             </button>
//           </div>
//         </div>

//         <PaymentFooter />
//         <Footer />
//       </div>
//     </>
//   );
// };

// export default Payment;


// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Navbar from "./Navbar/navbar";
// import Footer from "./footer";
// import PaymentOptions from "./payment/paymentOptions";
// import PaymentFooter from "./payment/PaymentFooter";
// import "../src/styles/products.css";
// import { useAddress } from "./context/AddressContext";
// import { useCart } from "./context/CartContext";
// import { API_URLS } from "./API-Urls";
// import axios from "axios";

// const Payment = () => {
//   const navigate = useNavigate();
//   const { selectedAddress } = useAddress();
//   const { cartItems } = useCart();

//   const [selectedMethod, setSelectedMethod] = useState<string>("upi");
//   const [loading, setLoading] = useState(false);

//   const [coupons, setCoupons] = useState<any[]>([]);
//   const [autoDiscount, setAutoDiscount] = useState(0);
//   const [autoDiscountLabel, setAutoDiscountLabel] = useState("");

//   /* coupon discount from cart page */
//   const couponDiscount = Number(localStorage.getItem("couponDiscount") || 0);

//   // =============================
//   // PRICE CALCULATION
//   // =============================

//   const total = cartItems.reduce(
//     (sum, item) => sum + item.price * item.qty,
//     0
//   );

//   const gst = total * 0.10;

//   const finalTotal = Math.round(total + gst - couponDiscount - autoDiscount);

//   // =============================
//   // FETCH COUPONS
//   // =============================

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

//   // =============================
//   // AUTO DISCOUNT
//   // =============================

//   useEffect(() => {

//     if (coupons.length === 0) return;

//     const auto = coupons.find(
//       (c:any) => !c.CouponCode || c.CouponCode.trim() === ""
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

//   // =============================
//   // CONFIRM ORDER
//   // =============================

//   const handleConfirmOrder = async () => {

//     if (!selectedAddress) {
//       const goToAddress = window.confirm(
//         "No delivery address selected.\n\nClick OK to Select / Add Address"
//       );

//       if (goToAddress) {
//         navigate("/address");
//       }
//       return;
//     }

//     if (cartItems.length === 0) {
//       alert("Cart is empty");
//       return;
//     }

//     try {

//       setLoading(true);

//       const userId = Number(localStorage.getItem("userId"));

//       const orderRes = await axios.post(
//         "http://localhost:4000/api/order/create",
//         {
//           userId,

//           cartItems: cartItems.map(item => ({
//             productId: item.id,
//             quantity: item.qty,
//             unitPrice: item.price,
//             totalPrice: item.price * item.qty
//           })),
//           subTotalAmount: total,
//     discountAmount: autoDiscount + couponDiscount,
//           totalAmount: finalTotal,
//           taxAmount: gst,
//           paymentMode: selectedMethod === "upi" ? "PHONEPE" : "COD",

//           shippingAddress: {
//             name: selectedAddress.name,
//             mobile: selectedAddress.mobile,
//             flat: selectedAddress.flat,
//             street: selectedAddress.street,
//             landmark: selectedAddress.landmark,
//             city: selectedAddress.city,
//             state: selectedAddress.state,
//             pincode: selectedAddress.pincode,
//             type: selectedAddress.type
//           }
//         }
//       );

//       const orderId = orderRes.data.orderId;

//       // =============================
//       // PHONEPE PAYMENT
//       // =============================

//       if (selectedMethod === "upi") {

//         const payRes = await axios.post(
//           "http://localhost:4000/api/payment/create",
//           {
//             orderId,
//             amount: finalTotal
//           }
//         );

//         const redirectUrl = payRes.data.redirectUrl;

//         if (!redirectUrl) {
//           throw new Error("PhonePe redirect URL not received");
//         }

//         window.location.href = redirectUrl;
//         return;
//       }

//       // =============================
//       // COD
//       // =============================

//       if (selectedMethod === "cod") {
//         alert("Order placed successfully with Cash On Delivery");
//         navigate(`/success?orderId=${orderId}`);
//       }

//     } catch (err: any) {

//       console.error("Payment error:", err.response?.data || err.message);
//       alert("Payment failed. Please try again.");

//     } finally {

//       setLoading(false);

//     }

//   };

//   return (
//     <>
//       <Navbar />

//       <div className="payment-page">

//         <div className="payment-steps">
//           <span className="cmpltd">My Cart</span>
//           <span className="dots">---------------</span>
//           <span className="cmpltd">Address</span>
//           <span className="dots">---------------</span>
//           <span className="active">Payment</span>
//         </div>

//         {/* Address */}

//         <div className="payment-add-section">

//           {selectedAddress && (

//             <div className="payment-address-card active">

//               <h3 className="payment-delivery-title">Deliver To : </h3>

//               <div className="payment-add">

//                 <p className="name">
//                   {selectedAddress.name}
//                   <span className="type"> ({selectedAddress.type})</span>,
//                   <span className="mobile"> Ph:{selectedAddress.mobile}</span>
//                 </p>

//                 <p className="pymnt-add-1">
//                   No {selectedAddress.flat}, {selectedAddress.street},
//                   {selectedAddress.city}, {selectedAddress.state} -{" "}
//                   {selectedAddress.pincode}
//                 </p>

//               </div>

//             </div>

//           )}

//         </div>

//         <div className="payment-container">

//           {/* LEFT */}

//           <div className="payment-left">

//             <h3 className="payment-section-title">Payment Options</h3>

//             <PaymentOptions
//               selectedMethod={selectedMethod}
//               setSelectedMethod={setSelectedMethod}
//             />

//           </div>

//           {/* RIGHT */}

//           <div className="payment-right">

//             <h3 className="payment-title">Billing Details</h3>

//             <div className="summary">

//               <div className="row">
//                 <span>Cart Total</span>
//                 <span>₹ {total}</span>
//               </div>

//               <div className="row">
//                 <span>GST</span>
//                 <span>₹ {gst.toFixed(2)}</span>
//               </div>

//               <div className="row">
//                 <span>Shipping Charges</span>
//                 <span className="free">Free</span>
//               </div>

//               {autoDiscount > 0 && (
//                 <div className="row discount">
//                   <span>{autoDiscountLabel}</span>
//                   <span>- ₹ {autoDiscount.toFixed(2)}</span>
//                 </div>
//               )}

//               {couponDiscount > 0 && (
//                 <div className="row discount">
//                   <span>Coupon Discount</span>
//                   <span>- ₹ {couponDiscount}</span>
//                 </div>
//               )}

//               <hr />

//               <div className="row total">
//                 <span>Total Amount</span>
//                 <span>₹ {finalTotal}</span>
//               </div>

//             </div>

//             <button
//               className="place-order-btn"
//               onClick={handleConfirmOrder}
//               disabled={loading}
//             >
//               {loading ? "PROCESSING..." : "CONFIRM YOUR ORDER"}
//             </button>

//           </div>

//         </div>

//         <PaymentFooter />
//         <Footer />

//       </div>
//     </>
//   );
// };

// export default Payment;



import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./Navbar/navbar";
import Footer from "./footer";
import PaymentOptions from "./payment/paymentOptions";
import PaymentFooter from "./payment/PaymentFooter";
import "../src/styles/payment.css";
import { useAddress } from "./context/AddressContext";
import { useCart } from "./context/CartContext";
import { API_URLS } from "./API-Urls";
import { useConfirm } from "./context/ConfirmContext";
import ordscs from "./assets/order_sucess.jpeg"
import axios from "axios";

const Payment = () => {

  const navigate = useNavigate();
  const { selectedAddress } = useAddress();
  const { cartItems } = useCart();
  const { confirm } = useConfirm();

  const [selectedMethod, setSelectedMethod] = useState<string>("upi");
  const [loading, setLoading] = useState(false);

  const [coupons, setCoupons] = useState<any[]>([]);
  const [autoDiscount, setAutoDiscount] = useState(0);
  const [autoDiscountLabel, setAutoDiscountLabel] = useState("");
  //  const [discountAmount, setDiscountAmount] = useState(0);

  /* coupon values from cart page */
  const couponDiscount= Number(localStorage.getItem("couponDiscount") || 0);
  const couponCode = localStorage.getItem("couponCode") || null;
  
 const [showGstDetails, setShowGstDetails] = useState(false);

  // =============================
  // PRICE CALCULATION
  // =============================


 const total = cartItems.reduce((sum, item) => sum + (item.discount || item.price) * item.qty, 0);
 const gst = cartItems.reduce((sum, item) => sum + (((item.discount || item.price) * item.qty * item.gstPercent) / 100), 0);
 const subTotal = total-autoDiscount-couponDiscount;
 const finalTotal = subTotal + gst ;

  // =============================
  // FETCH COUPONS
  // =============================

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

  // =============================
  // AUTO DISCOUNT
  // =============================

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

  // =============================
  // CONFIRM ORDER
  // =============================

  const handleConfirmOrder = async () => {

    if (!selectedAddress) {

      const goToAddress = window.confirm(
        "No delivery address selected.\n\nClick OK to Select / Add Address"
      );

      if (goToAddress) {
        navigate("/address");
      }

      return;
    }

    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {

      setLoading(true);

      const userId = Number(localStorage.getItem("userId"));
      console.log("Coupon Code:", couponCode);
console.log("Coupon Discount:", couponDiscount);//chnge

      const orderRes = await axios.post(
        "http://localhost:4000/api/order/create",
        {
          userId,

          cartItems: cartItems.map(item => ({
            productId: item.id,
            quantity: item.qty,
            unitPrice: item.price,
            totalPrice: item.price * item.qty
          })),

          subTotalAmount: total,

          /* AUTO DISCOUNT */
          discountAmount: autoDiscount,

          /* COUPON VALUES */
          couponCode: couponCode,
          couponDiscount: couponDiscount,//chnge

          totalAmount: finalTotal,
          taxAmount: gst,

          paymentMode: selectedMethod === "upi" ? "PHONEPE" : "COD",

          shippingAddress: {
            name: selectedAddress.name,
            mobile: selectedAddress.mobile,
            flat: selectedAddress.flat,
            street: selectedAddress.street,
            landmark: selectedAddress.landmark,
            city: selectedAddress.city,
            state: selectedAddress.state,
            pincode: selectedAddress.pincode,
            type: selectedAddress.type
          }

        }
      );

      const orderId = orderRes.data.orderId;

      // =============================
      // PHONEPE PAYMENT
      // =============================

      if (selectedMethod === "upi") {

        const payRes = await axios.post(
          "http://localhost:4000/api/payment/create",
          {
            orderId,
            amount: finalTotal
          }
        );

        const redirectUrl = payRes.data.redirectUrl;

        if (!redirectUrl) {
          throw new Error("PhonePe redirect URL not received");
        }

        window.location.href = redirectUrl;
        return;
      }

      // =============================
      // COD
      // =============================

      // if (selectedMethod === "cod") {

      //   alert("Order placed successfully with Cash On Delivery");
      //   window.dispatchEvent(new Event("userChanged"));

      //   navigate(`/success?orderId=${orderId}`);

      // }
      if (selectedMethod === "cod") {
  await confirm({
    title: "Order Update",
    subText: "Your order has been placed successfully with Cash On Delivery.",
    // confirmText: "View Order",
    cancelText: "Close",
    image: ordscs,
    variant: "success",
  });

  window.dispatchEvent(new Event("userChanged"));
  navigate(`/success?orderId=${orderId}`);
}

    } catch (err: any) {

      console.error("Payment error:", err.response?.data || err.message);

      alert("Payment failed. Please try again.");

    } finally {

      setLoading(false);

    }

  };
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

      <div className="payment-page">
          <div className="payment-back">
  <button
    className="payment-back-btn"
    onClick={() => navigate(-1)}
  >
    ← 
  </button>

        <div className="payment-steps">
          <span className="cmpltd">My Cart</span>
          <span className="dots">---------------</span>
          <span className="cmpltd">Address</span>
          <span className="dots">---------------</span>
          <span className="active">Payment</span>
        </div>

        </div>

        {/* Address */}

        <div className="payment-add-section">

          {selectedAddress && (

            <div className="payment-address-card active">

              <h3 className="payment-delivery-title">Deliver To :</h3>

              <div className="payment-add">

                <p className="name">
                  {selectedAddress.name?.toUpperCase()}
                  <span className="type"> ({selectedAddress.type})</span>,
                  <span className="mobile"> Ph:{selectedAddress.mobile}</span>
                </p>

                <p className="pymnt-add-1">
                  No {selectedAddress.flat}, {selectedAddress.street},
                </p>
                <p className="pymnt-add-1">
                  {selectedAddress.city}, {selectedAddress.state} -{" "}
                  {selectedAddress.pincode}
                </p>

              </div>

            </div>

          )}

        </div>

        <div className="payment-container">

          <div className="payment-left">

            <h3 className="payment-section-title">Payment Options</h3>

            <PaymentOptions
              selectedMethod={selectedMethod}
              setSelectedMethod={setSelectedMethod}
            />

          </div>

          <div className="payment-right">

            <h3 className="payment-title">Billing Details</h3>

            <div className="summary">

              <div className="row">
                <span>Cart Total</span>
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
                <div className="row discount" style={{ fontWeight: 700 }}>
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
              onClick={handleConfirmOrder}
              disabled={loading}
            >
              {loading ? "PROCESSING..." : "CONFIRM YOUR ORDER"}
            </button>

          </div>

        </div>

        <PaymentFooter />
        <Footer />

      </div>
    </>
  );
};

export default Payment;

