// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import "./styles/OrderDetails.css";

// interface OrderItem {
//   productName: string;
//   weight: string;
//   qty: number;
//   unitPrice: number;
//   totalPrice: number;
//   imageUrl: string;
// }

// interface OrderDetailsData {
//   orderId: number;
//   orderDate: string;
//   expectedDeliveryDate: string;
//   deliveryStatus: string;
//   paymentMode: string;
//   paymentStatus: string;
//   orderStatus: string;
//   totalAmount: number;
//   subtotal: number;
//   taxAmount: number;
//   discountAmount: number;
//   couponDiscount: number;
//   invoiceNo: string;
//   transactionId: string;
//   customerName: string;
//   mobile: string;
//   email: string;
//   addressType: string;
//   deliveryAddress: string;
//   items: OrderItem[];
// }

// const OrderDetails = () => {

//   const { orderId } = useParams();

//   const navigate = useNavigate();

//   const [order, setOrder] =
//     useState<OrderDetailsData | null>(null);

//   const [loading, setLoading] =
//     useState(true);

//   useEffect(() => {

//     fetchOrder();

//   }, []);

//   const fetchOrder = async () => {

//     try {

//       const res = await fetch(
//         `http://localhost:4000/api/order/details/${orderId}`
//       );

//       const data = await res.json();

//       if (data.success) {

//         setOrder(data.data);

//       }

//     } catch (err) {

//       console.error(err);

//     } finally {

//       setLoading(false);

//     }

//   };

//   if (loading) {
//     return (
//       <div className="order-details-loading">
//         Loading...
//       </div>
//     );
//   }

//   if (!order) {
//     return (
//       <div className="order-details-loading">
//         Order not found
//       </div>
//     );
//   }

//   return (

//     <div className="order-details-page">

//       <button
//         className="back-orders-btn"
//         onClick={() => navigate(-1)}
//       >
//         ← Back to Orders
//       </button>

//       {/* TOP */}

//       <div className="order-details-top-card">

//         <div className="order-top-item">

//           <span>Order ID</span>

//           <h2>
//             STM{order.orderId}
//           </h2>

//           <p>
//             {new Date(
//               order.orderDate
//             ).toLocaleDateString("en-IN", {
//               day: "numeric",
//               month: "short",
//               year: "numeric"
//             })}
//           </p>

//         </div>

//         <div className="order-top-item">

//           <span>Order Status</span>

//           <div className="green-badge">
//             {order.deliveryStatus}
//           </div>

//           <p>
//             Delivered on{" "}
//             {new Date(
//               order.expectedDeliveryDate
//             ).toLocaleDateString("en-IN")}
//           </p>

//         </div>

//         <div className="order-top-item">

//           <span>Payment Method</span>

//           <h3>
//             {order.paymentMode}
//           </h3>

//           <p>
//             Paid via {order.paymentMode}
//           </p>

//         </div>

//         <div className="order-top-item">

//           <span>Total Amount</span>

//           <h2 className="green-text">
//             ₹{order.totalAmount}
//           </h2>

//           <p>
//             Paid via {order.paymentMode}
//           </p>

//         </div>

//       </div>

//       {/* TRACKING */}

//       <div className="tracking-card">

//         <div className="tracking-step active">
//           <div className="tracking-dot">✓</div>
//           <h4>Order Placed</h4>
//         </div>

//         <div className="tracking-line"></div>

//         <div className="tracking-step active">
//           <div className="tracking-dot">✓</div>
//           <h4>Order Confirmed</h4>
//         </div>

//         <div className="tracking-line"></div>

//         <div className="tracking-step active">
//           <div className="tracking-dot">📦</div>
//           <h4>Packed</h4>
//         </div>

//         <div className="tracking-line"></div>

//         <div className="tracking-step active">
//           <div className="tracking-dot">🚚</div>
//           <h4>Out for Delivery</h4>
//         </div>

//         <div className="tracking-line"></div>

//         <div className="tracking-step active">
//           <div className="tracking-dot">✓</div>
//           <h4>Delivered</h4>
//         </div>

//       </div>

//       {/* CONTENT */}

//       <div className="order-details-content">

//         {/* LEFT */}

//         <div className="order-items-card">

//           <h3>
//             Items ({order.items.length})
//           </h3>

//           {order.items.map((item, index) => (

//             <div
//               className="order-item-row"
//               key={index}
//             >

//               <div className="order-item-left">

//                 <img
//                   src={item.imageUrl}
//                   alt=""
//                 />

//                 <div>

//                   <h4>
//                     {item.productName}
//                   </h4>

//                   <p>
//                     {item.weight}
//                   </p>

//                 </div>

//               </div>

//               <div className="order-item-price">
//                 ₹{item.unitPrice}
//               </div>

//               <div className="order-item-total">

//                 <h4>
//                   ₹{item.totalPrice}
//                 </h4>

//                 <p>
//                   Qty: {item.qty}
//                 </p>

//               </div>

//             </div>

//           ))}

//           <button className="buy-again-btn">
//             ↻ Buy Again
//           </button>

//         </div>

//         {/* RIGHT */}

//         <div className="order-summary-card">

//           <h3>
//             Order Summary
//           </h3>

//           <div className="summary-row">
//             <span>
//               Subtotal
//             </span>
//             <span>
//               ₹{order.subtotal}
//             </span>
//           </div>

//           <div className="summary-row">
//             <span>
//               Delivery Charges
//             </span>
//             <span className="green-text">
//               FREE
//             </span>
//           </div>

//           <div className="summary-row">
//             <span>
//               Packaging Charges
//             </span>
//             <span>
//               ₹0
//             </span>
//           </div>

//           <hr />

//           <div className="summary-total">

//             <div>

//               <h2>
//                 Total Amount
//               </h2>

//               <p>
//                 Paid via {order.paymentMode}
//               </p>

//             </div>

//             <h2 className="green-text">
//               ₹{order.totalAmount}
//             </h2>

//           </div>

//           {/* ADDRESS */}

//           <div className="delivery-address-box">

//             <div className="delivery-address-top">

//               <h4>
//                 📍 Delivery Address
//               </h4>

//               <span>
//                 {order.addressType}
//               </span>

//             </div>

//             <h3>
//               {order.customerName}
//             </h3>

//             <p>
//               {order.deliveryAddress}
//             </p>

//             <p>
//               +91 {order.mobile}
//             </p>

//           </div>

//           <div className="summary-links">

//             <div>
//               📄 Download Invoice
//             </div>

//             <div>
//               🎧 Need Help?
//             </div>

//             <div>
//               🔗 Share Order Details
//             </div>

//           </div>

//         </div>

//       </div>

//     </div>

//   );
// };

// export default OrderDetails;

import React, { useEffect, useState } from "react";
import "./styles/OrderDetails.css";

interface OrderItem {
  productName: string;
  weight: string;
  qty: number;
  unitPrice: number;
  totalPrice: number;
  imageUrl: string;
}

interface OrderDetailsData {
  orderId: number;
  orderDate: string;
  expectedDeliveryDate: string;
  deliveryStatus: string;
  paymentMode: string;
  paymentStatus: string;
  orderStatus: string;
  totalAmount: number;
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  couponDiscount: number;
  invoiceNo: string;
  transactionId: string;
  customerName: string;
  mobile: string;
  email: string;
  addressType: string;
  deliveryAddress: string;
  items: OrderItem[];
}

const OrderDetails = ({
  orderId,
  onBack
}: any) => {

  const [order, setOrder] =
    useState<OrderDetailsData | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    if (orderId) {
      fetchOrder();
    }

  }, [orderId]);

  const fetchOrder = async () => {

    try {

      console.log(
        "ORDER ID =",
        orderId
      );

      const res = await fetch(
        `http://localhost:4000/api/order/details/${orderId}`
      );

      const data = await res.json();

      console.log(data);

      if (data.success) {

        setOrder(data.data);

      }

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {
    return (
      <div className="order-details-loading">
        Loading...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="order-details-loading">
        Order not found
      </div>
    );
  }

  return (

    <div className="order-details-page">

      <button
        className="back-orders-btn"
        onClick={onBack}
      >
        ← Back to Orders
      </button>

      {/* TOP */}

      <div className="order-details-top-card">

        <div className="order-top-item">

          <span>Order ID</span>

          <h2>
            STM{order.orderId}
          </h2>

          <p>
            {new Date(
              order.orderDate
            ).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric"
            })}
          </p>

        </div>

        <div className="order-top-item">

          <span>Order Status</span>

          <div className="green-badge">
            {order.deliveryStatus}
          </div>

          <p>
            Delivered on{" "}
            {new Date(
              order.expectedDeliveryDate
            ).toLocaleDateString("en-IN")}
          </p>

        </div>

        <div className="order-top-item">

          <span>Payment Method</span>

          <h3>
            {order.paymentMode}
          </h3>

          <p>
            Paid via {order.paymentMode}
          </p>

        </div>

        <div className="order-top-item">

          <span>Total Amount</span>

          <h2 className="green-text">
            ₹{order.totalAmount}
          </h2>

          <p>
            Paid via {order.paymentMode}
          </p>

        </div>

      </div>

      {/* TRACKING */}

      <div className="tracking-card">

        <div className="tracking-step active">
          <div className="tracking-dot">✓</div>
          <h4>Order Placed</h4>
        </div>

        <div className="tracking-line"></div>

        <div className="tracking-step active">
          <div className="tracking-dot">✓</div>
          <h4>Order Confirmed</h4>
        </div>

        <div className="tracking-line"></div>

        <div className="tracking-step active">
          <div className="tracking-dot">📦</div>
          <h4>Packed</h4>
        </div>

        <div className="tracking-line"></div>

        <div className="tracking-step active">
          <div className="tracking-dot">🚚</div>
          <h4>Out for Delivery</h4>
        </div>

        <div className="tracking-line"></div>

        <div className="tracking-step active">
          <div className="tracking-dot">✓</div>
          <h4>Delivered</h4>
        </div>

      </div>

      {/* CONTENT */}

      <div className="order-details-content">

        {/* LEFT */}

        <div className="order-items-card">

          <h3>
            Items ({order.items.length})
          </h3>

          {order.items.map((item, index) => (

            <div
              className="order-item-row"
              key={index}
            >

              <div className="order-item-left">

                <img
                  src={item.imageUrl}
                  alt=""
                />

                <div>

                  <h4>
                    {item.productName}
                  </h4>

                  <p>
                    {item.weight}
                  </p>

                </div>

              </div>

              <div className="order-item-price">
                ₹{item.unitPrice}
              </div>

              <div className="order-item-total">

                <h4>
                  ₹{item.totalPrice}
                </h4>

                <p>
                  Qty: {item.qty}
                </p>

              </div>

            </div>

          ))}

          <button className="buy-again-btn">
            ↻ Buy Again
          </button>

        </div>

        {/* RIGHT */}

        <div className="order-summary-card">

          <h3>
            Order Summary
          </h3>

          <div className="summary-row">
            <span>
              Subtotal
            </span>
            <span>
              ₹{order.subtotal}
            </span>
          </div>

          <div className="summary-row">
            <span>
              Delivery Charges
            </span>
            <span className="green-text">
              FREE
            </span>
          </div>

          <div className="summary-row">
            <span>
              Packaging Charges
            </span>
            <span>
              ₹0
            </span>
          </div>

          <hr />

          <div className="summary-total">

            <div>

              <h2>
                Total Amount
              </h2>

              <p>
                Paid via {order.paymentMode}
              </p>

            </div>

            <h2 className="green-text">
              ₹{order.totalAmount}
            </h2>

          </div>

          {/* ADDRESS */}

          <div className="delivery-address-box">

            <div className="delivery-address-top">

              <h4>
                📍 Delivery Address
              </h4>

              <span>
                {order.addressType}
              </span>

            </div>

            <h3>
              {order.customerName}
            </h3>

            <p>
              {order.deliveryAddress}
            </p>

            <p>
              +91 {order.mobile}
            </p>

          </div>

          <div className="summary-links">

            <div>
              📄 Download Invoice
            </div>

            <div>
              🎧 Need Help?
            </div>

            <div>
              🔗 Share Order Details
            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default OrderDetails;