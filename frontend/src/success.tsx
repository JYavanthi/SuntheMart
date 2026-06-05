
// import React, { useEffect, useState } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import "./styles/success.css";
// import Navbar from "./Navbar/navbar";
// import Footer from "./footer";
// import banner from "./assets/cart-bg.jpeg";

// interface OrderItem {
//   productName: string;
//   weight: string;
//   qty: number;
//   price: number;
//   discount: number;
//   imageUrl: string;
// }

// interface OrderData {
//   orderId: string;
//   transactionDate: string;
//   paymentMethod: string;
//   shippingMethod: string;
//   subtotal: number;
//   gst: number;
//   shipping: number;
//   discount: number;
//   couponDiscount: number;
//   total: number;
//   items: OrderItem[];
// }

// interface DeliveryData {
//   deliveryId: number;
//   orderId: number;
//   userId: number;
//   shippingMode: string;
//   fromLocation: string;
//   toLocation: string;
//   deliveryStatus: string;
//   expectedDeliveryDate: string;
//   createdDate: string;
// }

// const Success = () => {

//   const [searchParams] = useSearchParams();

//   const navigate = useNavigate();

//   const orderId = searchParams.get("orderId");

//   const [order, setOrder] =
//     useState<OrderData | null>(null);

//   const [delivery, setDelivery] =
//     useState<DeliveryData | null>(null);

//   const [loading, setLoading] =
//     useState(true);

//   const subTotal2 =
//     (order?.subtotal || 0) -
//     (order?.discount || 0) -
//     (order?.couponDiscount || 0);

//   useEffect(() => {

//     if (!orderId) return;

//     const fetchAll = async () => {

//       try {

//         setLoading(true);

//         const orderRes = await fetch(
//           `http://localhost:4000/api/order/${orderId}`
//         );

//         const orderData =
//           await orderRes.json();

//         setOrder(orderData);

//         const deliveryRes = await fetch(
//           `http://localhost:4000/api/delivery/track/${orderId}`
//         );

//         const deliveryData =
//           await deliveryRes.json();

//         if (deliveryData.success) {
//           setDelivery(
//             deliveryData.delivery
//           );
//         }

//       } catch (err) {

//         console.error(err);

//       } finally {

//         setLoading(false);

//       }

//     };

//     fetchAll();

//   }, [orderId]);

//   if (loading) {
//     return (
//       <div className="success-loading">
//         Loading...
//       </div>
//     );
//   }

//   if (!order) {
//     return (
//       <div className="success-loading">
//         Order not found
//       </div>
//     );
//   }

//   return (
//     <>
//       <Navbar />

//       <div className="success-page">
//         <div className="success-top-banner">
                  
//                             <img
//                               src={banner}
//                               alt=""
//                               className="success-banner-img"
//                             />
        
//                   <div className="success-banner-overlay"></div>
//                     <div className="success-banner-content">
        
//                     <div className="success-banner-left">
        
//                       <h1>
//                         Thank You
//                       </h1>
        
//                       <div className="success-breadcrumb">
        
//                         Your order has been successfully placed
//                       </div>
        
//                     </div>
        
//                     <div className="success-banner-right">
        
//                       <div className="success-banner-card">
        
//                         <div className="success-banner-icon">
//                           ♡
//                         </div>
        
//                         <div>
        
//                           <h3>
//                             Fresh picks you love.
//                           </h3>
        
//                           <p>
//                             Handpicked from our farms,
//                             saved just for you.
//                           </p>
        
//                         </div>
        
//                       </div>
        
//                     </div>
        
//                   </div>
        
        
//                   </div>
        
//                 </div>

//         {/* CONTENT */}

//         <div className="success-container">

//           {/* LEFT */}

//           <div className="success-left">

//             <div className="success-card">

//               <div className="success-order-top">

//                 <div>

//                   <h2>
//                     Order Confirmed!
//                   </h2>

//                   <p>
//                     Order ID:
//                     {" "}
//                     {order.orderId}
//                   </p>

//                   <span>
//                     We’ve received your order
//                     and it’s now being
//                     processed.
//                   </span>

//                 </div>

//                 <img
//                   src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png"
//                   alt=""
//                 />

//               </div>

//               {/* TRACKING */}

//               <div className="success-tracking">

//                 <div className="success-track-item active">

//                   <div className="success-track-dot">
//                     ✓
//                   </div>

//                   <h4>
//                     Order Placed
//                   </h4>

//                   <p>
//                     May 15, 2024
//                   </p>

//                 </div>

//                 <div className="success-track-line" />

//                 <div className="success-track-item active">

//                   <div className="success-track-dot">
//                     ✓
//                   </div>

//                   <h4>
//                     Confirmed
//                   </h4>

//                   <p>
//                     10:31 AM
//                   </p>

//                 </div>

//                 <div className="success-track-line" />

//                 <div className="success-track-item active">

//                   <div className="success-track-dot">
//                     📦
//                   </div>

//                   <h4>
//                     Packed
//                   </h4>

//                   <p>
//                     In Progress
//                   </p>

//                 </div>

//                 <div className="success-track-line" />

//                 <div className="success-track-item">

//                   <div className="success-track-dot">
//                     🚚
//                   </div>

//                   <h4>
//                     Out for Delivery
//                   </h4>

//                   <p>
//                     Upcoming
//                   </p>

//                 </div>

//               </div>

//               {/* DELIVERY */}

//               <div className="success-delivery-grid">

//                 <div className="success-delivery-box">

//                   <h4>
//                     📍 Delivery Address
//                   </h4>

//                   <p>
//                     Sunil Kumar
//                   </p>

//                   <span>
//                     112/3, Green Fields Layout,
//                     Koramangala
//                     {/* {delivery?.toLocation} */}
//                   </span>

//                 </div>

//                 <div className="success-delivery-box">

//                   <h4>
//                     📅 Delivery Date
//                   </h4>

//                   <p>
//                     Saturday, 18 May 2024
//                   </p>

//                   <span>
//                     8:00 AM - 12:00 PM
//                   </span>

//                 </div>

//                 <div className="success-delivery-box">

//                   <h4>
//                     👤 Delivery Partner
//                   </h4>

//                   <p>
//                     Our delivery partner
//                     will contact you before
//                     delivery.
//                   </p>

//                 </div>

//               </div>

//               {/* BUTTONS */}

//               <div className="success-btn-row">

//                 <button
//                   className="success-shopping-btn"
//                   onClick={() =>
//                     navigate("/")
//                   }
//                 >
//                   Continue Shopping
//                 </button>

//                 <button
//                   className="success-track-btn"
//                 >
//                   Track Your Order →
//                 </button>

//               </div>

//             </div>

//           </div>

//           {/* RIGHT */}

//           <div className="success-right">

//             <div className="success-summary-card">

//               <h3>
//                 Order Summary
//               </h3>

//               <div className="success-summary-row">

//                 <span>
//                   Subtotal (
//                   {order.items.length}
//                   {" "}items)
//                 </span>

//                 <span>
//                   ₹{order.subtotal}
//                 </span>

//               </div>

//               <div className="success-summary-row green">

//                 <span>
//                   Savings
//                 </span>

//                 <span>
//                   -₹{order.discount}
//                 </span>

//               </div>

//               <div className="success-summary-row">

//                 <span>
//                   Delivery Charges
//                 </span>

//                 <span>
//                   ₹{order.shipping}
//                 </span>

//               </div>

//               <hr />

//               <div className="success-total-row">

//                 <div>

//                   <h2>
//                     Total Amount
//                   </h2>

//                   <p>
//                     Inclusive of all taxes
//                   </p>

//                 </div>

//                 <span>
//                   ₹{order.total}
//                 </span>

//               </div>

//               <div className="success-save-box">

//                 <span>
//                   🏷
//                 </span>

//                 <p>
//                   You saved ₹
//                   {order.discount}
//                   {" "}on this order
//                 </p>

//               </div>

//               {/* FEATURES */}

//               <div className="success-feature-list">

//                 <div className="success-feature-item">

//                   <span>
//                     🛡
//                   </span>

//                   <div>

//                     <h4>
//                       100% Safe & Secure Payments
//                     </h4>

//                     <p>
//                       Your transactions are
//                       protected
//                     </p>

//                   </div>

//                 </div>

//                 <div className="success-feature-item">

//                   <span>
//                     ♻
//                   </span>

//                   <div>

//                     <h4>
//                       Farm Fresh Produce
//                     </h4>

//                     <p>
//                       Handpicked from farms
//                     </p>

//                   </div>

//                 </div>

//                 <div className="success-feature-item">

//                   <span>
//                     🚚
//                   </span>

//                   <div>

//                     <h4>
//                       On-time Delivery
//                     </h4>

//                     <p>
//                       Fast and reliable
//                       delivery
//                     </p>

//                   </div>

//                 </div>

//                 <div className="success-feature-item">

//                   <span>
//                     🔄
//                   </span>

//                   <div>

//                     <h4>
//                       Easy Returns
//                     </h4>

//                     <p>
//                       Hassle-free returns
//                       within 24 hours
//                     </p>

//                   </div>

//                 </div>

//               </div>

//             </div>

//           </div>

//         </div>

    

//       <Footer />
//     </>
//   );
// };

// export default Success;

import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./styles/success.css";
import Navbar from "./Navbar/navbar";
import Footer from "./footer";
import banner from "./assets/cart-bg.jpeg";

interface OrderItem {
  productName: string;
  weight: string;
  qty: number;
  price: number;
  discount: number;
  imageUrl: string;
}

interface OrderData {
  orderId: string;
  customerName: string;
  deliveryAddress: string;
  transactionDate: string;
  paymentMethod: string;
  shippingMethod: string;
  subtotal: number;
  gst: number;
  shipping: number;
  discount: number;
  couponDiscount: number;
  total: number;
  items: OrderItem[];
}

interface DeliveryData {
  deliveryId: number;
  orderId: number;
  userId: number;
  shippingMode: string;
  fromLocation: string;
  toLocation: string;
  deliveryStatus: string;
  expectedDeliveryDate: string;
  createdDate: string;
}

const Success = () => {

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const orderId = searchParams.get("orderId");

  const [order, setOrder] =
    useState<OrderData | null>(null);

  const [delivery, setDelivery] =
    useState<DeliveryData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const subTotal2 =
    (order?.subtotal || 0) -
    (order?.discount || 0) -
    (order?.couponDiscount || 0);

  useEffect(() => {

    if (!orderId) return;

    const fetchAll = async () => {

      try {

        setLoading(true);

        const orderRes = await fetch(
          `http://localhost:4000/api/order/${orderId}`
        );

        const orderData =
          await orderRes.json();

        setOrder(orderData);

        const deliveryRes = await fetch(
          `http://localhost:4000/api/delivery/track/${orderId}`
        );

        const deliveryData =
          await deliveryRes.json();

        if (deliveryData.success) {
          setDelivery(
            deliveryData.delivery
          );
        }

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }

    };

    fetchAll();

  }, [orderId]);

  if (loading) {
    return (
      <div className="success-loading">
        Loading...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="success-loading">
        Order not found
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="success-page">

        <div className="success-top-banner">

          <img
            src={banner}
            alt=""
            className="success-banner-img"
          />

          <div className="success-banner-overlay"></div>

          <div className="success-banner-content">

            <div className="success-banner-left">

              <h1>
                Thank You
              </h1>

              <div className="success-breadcrumb">
                Your order has been successfully placed
              </div>

            </div>

            <div className="success-banner-right">

              <div className="success-banner-card">

                <div className="success-banner-icon">
                  ♡
                </div>

                <div>

                  <h3>
                    Fresh picks you love.
                  </h3>

                  <p>
                    Handpicked from our farms,
                    saved just for you.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* CONTENT */}

      <div className="success-container">

        {/* LEFT */}

        <div className="success-left">

          <div className="success-card">

            <div className="success-order-top">

              <div>

                <h2>
                  Order Confirmed!
                </h2>

                <p>
                  Order ID:
                  {" "}
                  {order.orderId}
                </p>

                <span>
                  We’ve received your order
                  and it’s now being
                  processed.
                </span>

              </div>

              <img
                src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png"
                alt=""
              />

            </div>

            {/* TRACKING */}

            <div className="success-tracking">

              <div className="success-track-item active">

                <div className="success-track-dot">
                  ✓
                </div>

                <h4>
                  Order Placed
                </h4>

                <p>
                  {delivery?.createdDate
                    ? new Date(
                        delivery.createdDate
                      ).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric"
                        }
                      )
                    : "Pending"}
                </p>

              </div>

              <div className="success-track-line" />

              <div className="success-track-item active">

                <div className="success-track-dot">
                  ✓
                </div>

                <h4>
                  Confirmed
                </h4>

                <p>
                  {delivery?.createdDate
                    ? new Date(
                        delivery.createdDate
                      ).toLocaleTimeString(
                        "en-IN",
                        {
                          hour: "2-digit",
                          minute: "2-digit"
                        }
                      )
                    : "--"}
                </p>

              </div>

              <div className="success-track-line" />

              <div className="success-track-item active">

                <div className="success-track-dot">
                  📦
                </div>

                <h4>
                  Packed
                </h4>

                <p>
                  In Progress
                </p>

              </div>

              <div className="success-track-line" />

              <div className="success-track-item">

                <div className="success-track-dot">
                  🚚
                </div>

                <h4>
                  Out for Delivery
                </h4>

                <p>
                  Upcoming
                </p>

              </div>

            </div>

            {/* DELIVERY */}

            <div className="success-delivery-grid">

              <div className="success-delivery-box">

                <h4>
                  📍 Delivery Address
                </h4>

                <p>
                  {order.customerName}
                </p>

                <span>
                  {order.deliveryAddress ||
                    "Address not available"}
                </span>

              </div>

              <div className="success-delivery-box">

                <h4>
                  📅 Delivery Date
                </h4>

                <p>
                  {delivery?.expectedDeliveryDate
                    ? new Date(
                        delivery.expectedDeliveryDate
                      ).toLocaleDateString(
                        "en-IN",
                        {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric"
                        }
                      )
                    : "Updating soon"}
                </p>

                <span>
                  8:00 AM - 12:00 PM
                </span>

              </div>

              <div className="success-delivery-box">

                <h4>
                  👤 Delivery Partner
                </h4>

                <p>
                  Our delivery partner
                  will contact you before
                  delivery.
                </p>

              </div>

            </div>

            {/* BUTTONS */}

            <div className="success-btn-row">

              <button
                className="success-shopping-btn"
                onClick={() =>
                  navigate("/")
                }
              >
                Continue Shopping
              </button>

              <button
                className="success-track-btn"
              >
                Track Your Order →
              </button>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="success-right">

          <div className="success-summary-card">

            <h3>
              Order Summary
            </h3>

            <div className="success-summary-row">

              <span>
                Subtotal (
                {order.items.length}
                {" "}items)
              </span>

              <span>
                ₹{order.subtotal}
              </span>

            </div>

            <div className="success-summary-row green">

              <span>
                Savings
              </span>

              <span>
                -₹{order.discount}
              </span>

            </div>

            <div className="success-summary-row">

              <span>
                Delivery Charges
              </span>

              <span>
                ₹{order.shipping}
              </span>

            </div>
                          <div className="success-summary-row">

                <p>
                  GST
                </p>

                <span>
                  ₹ {order.gst.toFixed(2)}
                </span>

              </div>


            <hr />

            <div className="success-total-row">

              <div>

                <h2>
                  Total Amount
                </h2>

                <p>
                  Inclusive of all taxes
                </p>

              </div>

              <span>
                ₹{order.total}
              </span>

            </div>

            <div className="success-save-box">

              <span>
                🏷
              </span>

              <p>
                You saved ₹
                {order.discount}
                {" "}on this order
              </p>

            </div>

            {/* FEATURES */}

            <div className="success-feature-list">

              <div className="success-feature-item">

                <span>
                  🛡
                </span>

                <div>

                  <h4>
                    100% Safe & Secure Payments
                  </h4>

                  <p>
                    Your transactions are
                    protected
                  </p>

                </div>

              </div>

              <div className="success-feature-item">

                <span>
                  ♻
                </span>

                <div>

                  <h4>
                    Farm Fresh Produce
                  </h4>

                  <p>
                    Handpicked from farms
                  </p>

                </div>

              </div>

              <div className="success-feature-item">

                <span>
                  🚚
                </span>

                <div>

                  <h4>
                    On-time Delivery
                  </h4>

                  <p>
                    Fast and reliable
                    delivery
                  </p>

                </div>

              </div>

              <div className="success-feature-item">

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

      <Footer />

    </>
  );
};

export default Success;