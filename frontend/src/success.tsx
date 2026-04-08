//success page including the delivery tracking api
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "../src/styles/success.css";

interface OrderItem {
  productName: string;
  weight: string;
  qty: number;
  price: number;
  discount:number;
  imageUrl: string;
}

interface OrderData {
  orderId: string;
  transactionDate: string;
  paymentMethod: string;
  shippingMethod: string;
  subtotal: number;
  gst: number;
  shipping: number;
  discount:number;
  couponDiscount:number;
  total: number;
  items: OrderItem[];
}

/* ---------------- Delivery Types ---------------- */

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

  const [order, setOrder] = useState<OrderData | null>(null);
  const [delivery, setDelivery] = useState<DeliveryData | null>(null);
  const [loading, setLoading] = useState(true);
  const subTotal2=(order?.subtotal || 0)-(order?.discount || 0)-(order?.couponDiscount || 0);


   
  /* ---------------- Fetch Order + Delivery ---------------- */

  useEffect(() => {
    if (!orderId) return;

    const fetchAll = async () => {
      try {
        setLoading(true);

        // 1️⃣ Order API
        const orderRes = await fetch(`http://localhost:4000/api/order/${orderId}`);
        const orderData = await orderRes.json();
        setOrder(orderData);

        // 2️⃣ Delivery Tracking API
        const deliveryRes = await fetch(
          `http://localhost:4000/api/delivery/track/${orderId}`
        );
        const deliveryData = await deliveryRes.json();

        if (deliveryData.success) {
          setDelivery(deliveryData.delivery);
        }

      } catch (err) {
        console.error("❌ Success page fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [orderId]);

  if (loading) {
    return <div className="success-wrapper">Loading order & delivery details...</div>;
  }

  if (!order) {
    return <div className="success-wrapper">Order not found</div>;
  }

  return (
    <div className="success-wrapper">
      <div className="success-card">

        {/* Success Icon */}
        <div className="success-icon">
          <div className="circle">✓</div>
        </div>

        <h3 className="order-id">Order id : {order.orderId}</h3>
        <h2 className="success-title">Placed Successfully</h2>
        <p className="success-sub">
          Payment successful. The transaction has been completed
        </p>

        {/* ---------------- PRODUCTS ---------------- */}
        {order.items.map((item, index) => (
          <div className="product-box" key={index}>
            <img
              src={item.imageUrl}
              alt={item.productName}
              className="product-img"
            />

            <div className="product-info">
              <h4>{item.productName}</h4>
              <p>{item.weight}</p>
              <p className="scsqty">Qty:{item.qty}</p>
            </div>

            <div className="product-price">₹{item.price}</div>
          </div>
        ))}

        {/* ---------------- ORDER DETAILS ---------------- */}
        <div className="details">
          <div className="row">
            <span className="k">Transaction Date</span>
            <span>{order.transactionDate}</span>
          </div>

          <div className="row">
            <span className="k">Payment Method</span>
            <span>{order.paymentMethod}</span>
          </div>

          {/* <div className="row">
            <span className="k">Shipping Method</span>
            <span>{order.shippingMethod}</span>
          </div> */}

          <div className="row">
                <span>Item Total (Excl. of all taxes)</span>
                <span>₹ {order.subtotal}</span>
              </div>

              <div className="row">
            <span className="k">Discount</span>
            <span>-₹ {order.discount}</span>
          </div>
          
           {/* <div className="row">
            <span className="k">Coupon Discount</span>
            <span>-₹{order.couponDiscount}</span>
          </div> */}
          {order.couponDiscount > 0 && (
  <div className="row">
    <span className="k">Coupon Discount</span>
    <span>-₹ {order.couponDiscount}</span>
  </div>
)}

            <div className="row">
            <span className="k">Shipping</span>
            <span>{order.shipping}</span>
          </div>

          <div className="row">
            <span className="k">Subtotal</span>
            <span>₹ {subTotal2}</span>
          </div>

           

          <div className="row">
            <span className="k">GST</span>
            <span>+₹ {order.gst}</span>
          </div>

        

          

         

          <hr />

          <div className="row total">
            <span className="k">Total</span>
            <span>₹{order.total}</span>
          </div>
        </div>

        {/* ---------------- ACTION BUTTONS ---------------- */}
        <button className="btn continue" onClick={() => navigate("/")}>
          Continue Shopping
        </button>

        {/* <button
          className="btn invoice"
          onClick={() =>
            window.open(`/api/order/${order.orderId}/invoice`, "_blank")
          }
        >
          Download Invoice
        </button> */}

        <button
  className="btn invoice"
  onClick={() => {
    const link = document.createElement("a");
    link.href = `http://localhost:4000/api/order/${order.orderId}/invoice`;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }}
>
  Download Invoice
</button>

     

      </div>
    </div>
  );
};

export default Success;


// import React, { useEffect, useState } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import "../src/styles/success.css";

// interface OrderItem {
//   productName: string;
//   weight: string;
//   qty: number;
//   price: number;
//   imageUrl: string;
//   discountPrice:number;
// }

// interface OrderData {
//   orderId: string;
//   transactionDate: string;
//   paymentMethod: string;
//   shippingMethod: string;
//   subtotal: number;
//   gst: number;
//   shipping: number;
//   discount: number; // ✅ ADDED
//   total: number;
//   items: OrderItem[];
// }

// /* ---------------- Delivery Types ---------------- */

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

//   const [order, setOrder] = useState<OrderData | null>(null);
//   const [delivery, setDelivery] = useState<DeliveryData | null>(null);
//   const [loading, setLoading] = useState(true);

//   /* ---------------- Fetch Order + Delivery ---------------- */

//   useEffect(() => {
//     if (!orderId) return;

//     const fetchAll = async () => {
//       try {
//         setLoading(true);

//         // Order API
//         const orderRes = await fetch(`http://localhost:4000/api/order/${orderId}`);
//         const orderData = await orderRes.json();
//         setOrder(orderData);

//         // Delivery API
//         const deliveryRes = await fetch(
//           `http://localhost:4000/api/delivery/track/${orderId}`
//         );

//         const deliveryData = await deliveryRes.json();

//         if (deliveryData.success) {
//           setDelivery(deliveryData.delivery);
//         }

//       } catch (err) {
//         console.error("❌ Success page fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAll();
//   }, [orderId]);

//   if (loading) {
//     return <div className="success-wrapper">Loading order & delivery details...</div>;
//   }

//   if (!order) {
//     return <div className="success-wrapper">Order not found</div>;
//   }

//   return (
//     <div className="success-wrapper">
//       <div className="success-card">

//         {/* Success Icon */}
//         <div className="success-icon">
//           <div className="circle">✓</div>
//         </div>

//         <h3 className="order-id">Order id : {order.orderId}</h3>
//         <h2 className="success-title">Placed Successfully</h2>

//         <p className="success-sub">
//           Payment successful. The transaction has been completed
//         </p>

//         {/* ---------------- PRODUCTS ---------------- */}

//         {order.items.map((item, index) => (
//           <div className="product-box" key={index}>
//             <img
//               src={item.imageUrl}
//               alt={item.productName}
//               className="product-img"
//             />

//             <div className="product-info">
//               <h4>{item.productName}</h4>
//               <p>{item.weight}</p>
//               <p className="scsqty">Qty: {item.qty}</p>
//             </div>

//             <div className="product-price">₹{item.discountPrice}</div>
//           </div>
//         ))}

//         {/* ---------------- ORDER DETAILS ---------------- */}

//         <div className="details">

//           <div className="row">
//             <span className="k">Transaction Date</span>
//             <span>{order.transactionDate}</span>
//           </div>

//           <div className="row">
//             <span className="k">Payment Method</span>
//             <span>{order.paymentMethod}</span>
//           </div>

//           <div className="row">
//             <span className="k">Shipping Method</span>
//             <span>{order.shippingMethod}</span>
//           </div>

//           <div className="row">
//             <span className="k">Subtotal</span>
//             <span>₹{order.subtotal}</span>
//           </div>

//           <div className="row">
//             <span className="k">GST</span>
//             <span>₹{order.gst}</span>
//           </div>

//           {/* ✅ DISCOUNT ROW */}

//           {order.discount > 0 && (
//             <div className="row">
//               <span className="k">Discount</span>
//               <span style={{color:"green"}}>- ₹{order.discount}</span>
//             </div>
//           )}

//           <div className="row">
//             <span className="k">Shipping</span>
//             <span>₹{order.shipping}</span>
//           </div>

//           <hr />

//           <div className="row total">
//             <span className="k">Total</span>
//             <span>₹{order.total}</span>
//           </div>

//         </div>

//         {/* ---------------- DELIVERY STATUS ---------------- */}

//         {delivery && (
//           <div className="delivery-box">
//             <h4>Delivery Status</h4>

//             <p>
//               <b>Status:</b> {delivery.deliveryStatus}
//             </p>

//             <p>
//               <b>From:</b> {delivery.fromLocation}
//             </p>

//             <p>
//               <b>To:</b> {delivery.toLocation}
//             </p>

//             <p>
//               <b>Expected Delivery:</b> {delivery.expectedDeliveryDate}
//             </p>

//           </div>
//         )}

//         {/* ---------------- ACTION BUTTONS ---------------- */}

//         <button className="btn continue" onClick={() => navigate("/")}>
//           Continue Shopping
//         </button>

//         <button
//           className="btn invoice"
//           onClick={() =>
//             window.open(`/api/order/${order.orderId}/invoice`, "_blank")
//           }
//         >
//           Download Invoice
//         </button>

//       </div>
//     </div>
//   );
// };

// export default Success;