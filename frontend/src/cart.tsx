// import "./styles/cart.css";
// import Navbar from './Navbar/navbar';
// import Footer from './footer';
// import { useWishlist } from "./context/WishlistContext";
// import { useCart } from "./context/CartContext";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { API_URLS } from "./API-Urls";

// interface ProductAPI {
//   ProductID: number;
//   ProductName: string;
//   ProductDescription: string;
//   ProductWeight: string;
//   Price: number;
//   DiscountPrice: number;
//   ProductImage: string | null;
//   ProductCategoryID: number;
// }

// export default function Cart() {

//   const { cartItems, removeFromCart, increaseQty, decreaseQty, addToCart, isInCart } = useCart();
//   const { toggleWishlist, isInWishlist } = useWishlist();
//   const navigate = useNavigate();

//   const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);

//   const total = cartItems.reduce((sum,item) => sum + item.price * item.qty,0 );
//   const gst = total * 0.10;
//   const finalTotal = total + gst;

//   /* ===============================
//      FETCH CATEGORY-BASED PRODUCTS
//      =============================== */
//   useEffect(() => {

//   const fetchRecommendations = async () => {

//     const userId = localStorage.getItem("userId");
//     if (!userId) return;

//     try {
//       const res = await fetch(
//         `${API_URLS.BASE_URL}cart/recommendations/${userId}`
//       );

//       const data = await res.json();

//       const mapped = data.map((item: ProductAPI) => ({
//         id: item.ProductID,
//         title: item.ProductName,
//         price: item.DiscountPrice || item.Price,
//         weight: item.ProductWeight,
//         img: item.ProductImage
//           ? `http://localhost:4000${item.ProductImage}`
//           : "https://via.placeholder.com/300"
//       }));

//       setRecommendedProducts(mapped);

//     } catch (error) {
//       console.error("Recommendation error:", error);
//     }
//   };

//   fetchRecommendations();

// }, [cartItems]);

//   return (
//     <>
//       <Navbar />

//       <div className="cart-page">

//         <div className="cart-steps">
//           <span className="active">My Cart</span>
//           <span className="dots">-----------------</span>
//           <span>Address</span>
//           <span className="dots">-----------------</span>
//           <span>Payment</span>
//         </div>

//         <div className="cart-content">

//           {/* LEFT SIDE */}
//           <div className="cart-left">
//             {cartItems.length === 0 ? (
//               <p className="empty-cart">Your cart is empty</p>
//             ) : (
//               cartItems.map((item) => (
//                 <div key={item.cartId} className="cart-item">

//                   <img src={item.img} className="cart-img" alt="not found"/>

//                   <div className="cart-details">
//                     <h4>{item.title}</h4>
//                     <p>{item.weight}</p>

//                     <div className="qty-controls">
//                       <button onClick={() => decreaseQty(item.cartId)}>-</button>
//                       <span>{item.qty}</span>
//                       <button onClick={() => increaseQty(item.cartId)}>+</button>
//                       <button
//                         className="cart-delete"
//                         onClick={() => removeFromCart(item.cartId)}
//                       >
//                         <i className="fa-regular fa-trash-can"></i>
//                       </button>
//                     </div>

//                     <p className="wishlist">
//                       Move To Wishlist
//                       <button
//                         className={`wishlogo-cart ${isInWishlist(item.id) ? "active" : ""}`}
//                         onClick={() => toggleWishlist(item)}
//                       >
//                         <i className="fa-regular fa-heart"></i>
//                       </button>
//                     </p>
//                   </div>

//                   <div className="cart-price">
//                     <h4>₹ {item.price * item.qty}</h4>
//                     <p>MRP incl. all taxes</p>
//                   </div>

//                 </div>
//               ))
//             )}
//           </div>

//           {/* RIGHT SIDE */}
//           <div className="cart-right">
//             <h3>Place Order</h3>

//             <div className="summary">
//               <div className="row">
//                 <span>Cart Total (Excl. of all taxes)</span>
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
//               onClick={() => navigate("/cart-address")}
//             >
//               PLACE ORDER
//             </button>

//           </div>
//         </div>

//         {/* ===============================
//             DYNAMIC RECOMMENDATIONS
//            =============================== */}

//         {recommendedProducts.length > 0 && (
//           <div className="recommendations">
//             <h3>You May Also Like</h3>

//             <div className="products-carousel">
//               {recommendedProducts.map((item, index) => (
//                 <div key={index} className="product-card">

//                   <img
//                     src={item.img}
//                     alt={item.title}
//                     className="img-placeholder"
//                   />

//                   <h4>{item.title}</h4>
//                   <h3 className="price">₹ {item.price}</h3>

//                   <button
//                     className="cart-add-btn"
//                     onClick={() => {
//                       if (isInCart(item.id)) {
//                         navigate("/cart");
//                       } else {
//                         addToCart({
//                           id: item.id,
//                           title: item.title,
//                           price: item.price,
//                           qty: 1,
//                           img: item.img,
//                           weight: item.weight,
//                         });
//                       }
//                     }}
//                   >
//                     {isInCart(item.id) ? "✔ Go To Cart" : "Add To Cart"}
//                   </button>

//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//       </div>

//       <Footer />
//     </>
//   );
// }


// ----------------dropdown coupons selection-------------//

// import "./styles/cart.css";
// import Navbar from "./Navbar/navbar";
// import Footer from "./footer";
// import { useWishlist } from "./context/WishlistContext";
// import { useCart } from "./context/CartContext";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { API_URLS } from "./API-Urls";

// interface ProductAPI {
//   ProductID: number;
//   ProductName: string;
//   ProductDescription: string;
//   ProductWeight: string;
//   Price: number;
//   DiscountPrice: number;
//   ProductImage: string | null;
//   ProductCategoryID: number;
// }

// export default function Cart() {

//   const { cartItems, removeFromCart, increaseQty, decreaseQty, addToCart, isInCart } = useCart();
//   const { toggleWishlist, isInWishlist } = useWishlist();
//   const navigate = useNavigate();

//   const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);
//   const [coupons, setCoupons] = useState<any[]>([]);
//   const [selectedCoupon, setSelectedCoupon] = useState<any>(null);
//   const [discountAmount, setDiscountAmount] = useState(0);
//   const [couponMessage, setCouponMessage] = useState("");

//   const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
//   const gst = total * 0.10;
//   const finalTotal = total + gst - discountAmount;

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


//   const applyCoupon = () => {

//   if (!selectedCoupon) {
//     setCouponMessage("Please select a coupon");
//     return;
//   }

//   const minOrder = Number(selectedCoupon.MinOrderValue || selectedCoupon.MinOrderAmount || 0);
//   const discountValue = Number(selectedCoupon.DiscountValue || 0);
//   const maxDiscount = Number(selectedCoupon.MaxDiscount || 0);

//   /* MIN ORDER VALIDATION */

//   if (total < minOrder) {

//     const remaining = minOrder - total;

//     setCouponMessage(
//       `Add products worth ₹${remaining} more to apply this coupon`
//     );

//     setDiscountAmount(0);
//     return;
//   }

//   let discount = 0;

//   /* FLAT DISCOUNT */

//   if (selectedCoupon.DiscountType === "Flat") {

//     discount = discountValue;

//   }

//   /* PERCENTAGE DISCOUNT */

//   else {

//     discount = (total * discountValue) / 100;

//     if (maxDiscount > 0) {
//       discount = Math.min(discount, maxDiscount);
//     }

//   }

//   setDiscountAmount(discount);

//   setCouponMessage(`Coupon Applied! You saved ₹${discount}`);

// };

//   /* ===============================
//      FETCH CATEGORY-BASED PRODUCTS
//      =============================== */

//   useEffect(() => {

//     const fetchRecommendations = async () => {

//       const userId = localStorage.getItem("userId");
//       if (!userId) return;

//       try {
//         const res = await fetch(
//           `${API_URLS.BASE_URL}cart/recommendations/${userId}`
//         );

//         const data = await res.json();

//         const mapped = data.map((item: ProductAPI) => ({
//           id: item.ProductID,
//           title: item.ProductName,
//           price: item.DiscountPrice || item.Price,
//           weight: item.ProductWeight,
//           img: item.ProductImage
//             ? `http://localhost:4000${item.ProductImage}`
//             : "https://via.placeholder.com/300"
//         }));

//         setRecommendedProducts(mapped);

//       } catch (error) {
//         console.error("Recommendation error:", error);
//       }
//     };

//     fetchRecommendations();

//   }, [cartItems]);

//   return (
//     <>
//       <Navbar />

//       <div className="cart-page">

//         <div className="cart-steps">
//           <span className="active">My Cart</span>
//           <span className="dots">-----------------</span>
//           <span>Address</span>
//           <span className="dots">-----------------</span>
//           <span>Payment</span>
//         </div>

//         <div className="cart-content">

//           {/* LEFT SIDE */}

//           <div className="cart-left">
//             {cartItems.length === 0 ? (
//               <p className="empty-cart">Your cart is empty</p>
//             ) : (
//               cartItems.map((item) => (
//                 <div key={item.cartId} className="cart-item">

//                   <img src={item.img} className="cart-img" alt="not found" />

//                   <div className="cart-details">

//                     <h4>{item.title}</h4>
//                     <p>{item.weight}</p>

//                     <div className="qty-controls">
//                       <button onClick={() => decreaseQty(item.cartId)}>-</button>
//                       <span>{item.qty}</span>
//                       <button onClick={() => increaseQty(item.cartId)}>+</button>

//                       <button
//                         className="cart-delete"
//                         onClick={() => removeFromCart(item.cartId)}
//                       >
//                         <i className="fa-regular fa-trash-can"></i>
//                       </button>

//                     </div>

//                     <p className="wishlist">
//                       Move To Wishlist
//                       <button
//                         className={`wishlogo-cart ${isInWishlist(item.id) ? "active" : ""}`}
//                         onClick={() => toggleWishlist(item)}
//                       >
//                         <i className="fa-regular fa-heart"></i>
//                       </button>
//                     </p>

//                   </div>

//                   <div className="cart-price">
//                     <h4>₹ {item.price * item.qty}</h4>
//                     <p>MRP incl. all taxes</p>
//                   </div>

//                 </div>
//               ))
//             )}
//           </div>

//           {/* RIGHT SIDE */}

//           <div className="cart-right">

//             <h3>Place Order</h3>

//             <div className="summary">

//               <div className="row">
//                 <span>Cart Total (Excl. of all taxes)</span>
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

//               {/* COUPON SECTION */}

//               <div className="coupon-section">

//                 <h4>Coupons</h4>

//                 <div className="coupon-input-row">

//                   <select
//                     className="coupon-dropdown"
//                     onChange={(e) => {

//                       const cp = coupons.find(
//                         (c: any) => c.CouponCode === e.target.value
//                       );

//                       setSelectedCoupon(cp);
//                       setCouponMessage("");

//                     }}
//                   >

//                     <option value="">Select Coupon</option>

//                     {coupons.map((coupon) => (

//                       <option key={coupon.DiscountID} value={coupon.CouponCode}>

//                         {coupon.CouponCode} - {coupon.DiscountType === "Flat"
//                           ? `₹${coupon.DiscountValue} OFF`
//                           : `${coupon.DiscountValue}% OFF`}

//                       </option>

//                     ))}

//                   </select>

//                   <button className="apply-btn" onClick={applyCoupon}>
//                     Apply
//                   </button>

//                 </div>

//                 {couponMessage && (
//                   <p className="coupon-message">{couponMessage}</p>
//                 )}

//               </div>

//               {discountAmount > 0 && (

//                 <div className="row discount">
//                   <span>Coupon Discount</span>
//                   <span>- ₹ {discountAmount}</span>
//                 </div>

//               )}

//               <hr />

//               <div className="row total">
//                 <span>Total Amount</span>
//                 <span>₹ {finalTotal.toFixed(2)}</span>
//               </div>

//             </div>

//             <button
//               className="place-order-btn"
//               onClick={() => navigate("/cart-address")}
//             >
//               PLACE ORDER
//             </button>

//           </div>

//         </div>

//         {/* RECOMMENDATIONS */}

//         {recommendedProducts.length > 0 && (
//           <div className="recommendations">

//             <h3>You May Also Like</h3>

//             <div className="products-carousel">

//               {recommendedProducts.map((item, index) => (

//                 <div key={index} className="product-card">

//                   <img
//                     src={item.img}
//                     alt={item.title}
//                     className="img-placeholder"
//                   />

//                   <h4>{item.title}</h4>
//                   <h3 className="price">₹ {item.price}</h3>

//                   <button
//                     className="cart-add-btn"
//                     onClick={() => {

//                       if (isInCart(item.id)) {

//                         navigate("/cart");

//                       } else {

//                         addToCart({
//                           id: item.id,
//                           title: item.title,
//                           price: item.price,
//                           qty: 1,
//                           img: item.img,
//                           weight: item.weight,
//                         });

//                       }

//                     }}
//                   >
//                     {isInCart(item.id) ? "✔ Go To Cart" : "Add To Cart"}
//                   </button>

//                 </div>

//               ))}

//             </div>

//           </div>
//         )}

//       </div>

//       <Footer />

//     </>
//   );
// }


import "./styles/cart.css";
import Navbar from "./Navbar/navbar";
import Footer from "./footer";
import { useWishlist } from "./context/WishlistContext";
import { useCart } from "./context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { API_URLS } from "./API-Urls";
import emp from  "./assets/empty_cart1.png";
import { showToast } from "./components/CustomToast";
import add_wish from  "./assets/add_wish.png";
import rem_wish from "./assets/remove_wish.png";
import { useConfirm } from "./context/ConfirmContext";
import emptyCart from "./assets/cart_empty.jpg"
import removeCart from "./assets/remove_cart.png"
import bg from "./assets/cart-bg.jpeg"

interface ProductAPI {
  ProductID: number;
  ProductName: string;
  ProductDescription: string;
  ProductWeight: string;
  Price: number;
  DiscountPrice: number;
  ProductImage: string | null;
  ProductCategoryID: number;
}

export default function Cart() {

  const { cartItems, removeFromCart, increaseQty, decreaseQty, addToCart, isInCart , clearCart} = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();
    const { confirm } = useConfirm();

  const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [couponInput, setCouponInput] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");

  /* NEW STATES */
  const [autoDiscount, setAutoDiscount] = useState(0);
  const [autoDiscountLabel, setAutoDiscountLabel] = useState("");
  const [showGstDetails, setShowGstDetails] = useState(false);

 const total = cartItems.reduce((sum, item) => sum + (item.discount || item.price) * item.qty, 0);
 const gst = cartItems.reduce((sum, item) => sum + (((item.discount || item.price) * item.qty * item.gstPercent) / 100), 0);
 const subTotal = total-autoDiscount-discountAmount;
 const finalTotal = subTotal + gst ;



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
     AUTO OPENING OFFER
     =============================== */

  useEffect(() => {

    if (coupons.length === 0) return;

    const auto = coupons.find(
      (c:any) => !c.CouponCode || c.CouponCode.trim() === ""
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

      setAutoDiscountLabel(`Discount ${discountValue}% `);
    }

    setAutoDiscount(discount);

  }, [coupons, total]);


const applyCoupon = () => {

  if (!couponInput) {
    setCouponMessage("Please enter coupon code");
    return;
  }

  const cp = coupons.find(
    (c:any) =>
      c.CouponCode &&
      c.CouponCode.toLowerCase() === couponInput.toLowerCase()
  );

  if (!cp) {
    setCouponMessage("Invalid coupon code");
    setDiscountAmount(0);

    localStorage.removeItem("couponDiscount");
    localStorage.removeItem("couponApplied");

    return;
  }

  const minOrder = Number(cp.MinOrderValue || cp.MinOrderAmount || 0);
  const discountValue = Number(cp.DiscountValue || 0);
  const maxDiscount = Number(cp.MaxDiscount || 0);

  if (total < minOrder) {

    const remaining = minOrder - total;

    setCouponMessage(
      `Add products worth ₹${remaining} more to apply this coupon`
    );

    setDiscountAmount(0);

    localStorage.removeItem("couponDiscount");
    localStorage.removeItem("couponApplied");
    localStorage.removeItem("couponCode");

    return;
  }

  let discount = 0;

  if (cp.DiscountType === "Flat") {
    discount = discountValue;
  } else {
    discount = (total * discountValue) / 100;

    if (maxDiscount > 0) {
      discount = Math.min(discount, maxDiscount);
    }
  }

  setDiscountAmount(discount);

  localStorage.setItem("couponDiscount", discount.toString());
  localStorage.setItem("couponCode", cp.CouponCode);
  localStorage.setItem("couponApplied", "true");

  setCouponMessage(`Coupon Applied! You saved ₹${discount}`);
};

  /* ===============================
     FETCH RECOMMENDATIONS
     =============================== */

  useEffect(() => {

     localStorage.removeItem("couponDiscount");
  localStorage.removeItem("couponApplied");
  localStorage.removeItem("couponCode");
  

    const fetchRecommendations = async () => {

      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {

        const res = await fetch(
          `${API_URLS.BASE_URL}cart/recommendations/${userId}`
        );

        const data = await res.json();

        const mapped = data.map((item: ProductAPI) => ({
          id: item.ProductID,
          title: item.ProductName,
          price:  item.Price,
          discount:item.DiscountPrice,
          weight: item.ProductWeight,
          img: item.ProductImage
            ? `http://localhost:4000${item.ProductImage}`
            : "https://via.placeholder.com/300"
        }));

        setRecommendedProducts(mapped);

      } catch (error) {
        console.error("Recommendation error:", error);
      }

    };

    fetchRecommendations();

  }, [cartItems]);

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

    <div className="cart-page">

      {/* =========================
          TOP BANNER
      ========================= */}

      <div className="cart-top-banner">

        <img
          src={bg}
          alt="cart-banner"
        />
          <div className="cart-banner-overlay"></div>
        <div className="cart-banner-left">

          <h1>Your Cart</h1>

          <div className="cart-breadcrumb">
            Home <span>›</span> Cart
          </div>

        </div>

        <div className="cart-banner-right">
          <div className="cart-banner-card">
            <div className="cart-banner-icon">
              🛡️
            </div>
            <div>

              <h3>
                Fresh. Safe. Delivered.
              </h3>

              <p>
                Handpicked and carefully delivered
                fresh to your doorstep.
              </p>

            </div>
          </div>
        </div>
      </div>

      {/* =========================
          MAIN SECTION
      ========================= */}

      <div className="cart-main-wrapper">

        {/* =========================
            LEFT SECTION
        ========================= */}

        <div className="cart-left-section">

          {/* SAVINGS */}

          {cartItems.length > 0 && (

            <div className="cart-saving-box">
              🌿 Yay! You are saving ₹
              {(autoDiscount + discountAmount).toFixed(0)}
              {" "}on this order.
            </div>

          )}

          {/* TABLE HEADER */}

          {cartItems.length > 0 && (

            <div className="cart-table-header">

              <p>Product</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>

            </div>

          )}

          {/* EMPTY CART */}

          {cartItems.length === 0 ? (

            <div className="cart-empty-box">

              <img
                src={emp}
                alt="empty-cart"
              />

              <h2>
                Your Cart is Empty
              </h2>

              <p>
                Looks like you haven’t added anything yet.
              </p>

              <button
                className="cart-shop-btn"
                onClick={() =>
                  navigate("/categoryProductPage")
                }
              >
                Shop Now
              </button>

            </div>

          ) : (

            cartItems.map((item) => (

              <div
                className="cart-product-card"
                key={item.cartId}
              >

                {/* PRODUCT INFO */}

                <div className="cart-product-left">

                  <img
                    src={item.img}
                    alt={item.title}
                    className="cart-product-img"
                    onClick={() =>
                      navigate(`/product/${item.id}`)
                    }
                  />

                  <div className="cart-product-info">

                    <h3>
                      {item.title}
                    </h3>

                    <p>
                      {item.weight}
                    </p>

                    <span>
                      Farm Fresh
                    </span>

                  </div>

                </div>

                {/* PRICE */}

                <div className="cart-price-box">

                  <h3>
                    ₹ {item.discount}
                  </h3>

                  <p>
                    ₹ {item.price}
                  </p>

                </div>

                {/* QUANTITY */}

                <div className="cart-qty-box">

                  <button
                    onClick={() =>
                      decreaseQty(item.cartId)
                    }
                  >
                    −
                  </button>

                  {/* <span>
                    {item.qty}
                  </span> */}
                  <span>
  {
    Number(
      localStorage.getItem(`weight_${item.id}`)
    ) || item.qty
  }
</span>

                  <button
                    onClick={() =>
                      increaseQty(item.cartId)
                    }
                  >
                    +
                  </button>

                </div>

                {/* TOTAL */}

                <div className="cart-total-box">

                  <h3>
                    ₹ {item.discount * item.qty}
                  </h3>

                </div>

                {/* REMOVE */}

                <button
                  className="cart-remove-btn"
                  onClick={() =>
                    removeFromCart(item.cartId)
                  }
                >
                  ✕
                </button>

              </div>

            ))

          )}

          {/* ACTION BUTTONS */}

          {cartItems.length > 0 && (

            <div className="cart-action-row">

              <button
                className="cart-outline-btn"
                onClick={() =>
                  navigate("/categoryProductPage")
                }
              >
                ← Continue Shopping
              </button>

              <button
                className="cart-outline-btn"
                onClick={async () => {

                  const ok = await confirm({

                    title:
                      "Are you sure you want to empty the cart?",

                    subText:
                      "All items will be removed from your cart.",

                    confirmText:
                      "Yes, Empty",

                    cancelText:
                      "Cancel",

                    image:
                      emptyCart,

                    variant:
                      "empty_cart",
                  });

                  if (!ok) return;

                  await clearCart();

                  showToast(
                    removeCart,
                    "Cart Updated",
                    "Cart emptied successfully",
                    "cart-emptied"
                  );

                }}
              >
                🗑 Clear Cart
              </button>

            </div>

          )}

          {/* =========================
              FARM BANNER
          ========================= */}

          {cartItems.length > 0 && (

            <div className="cart-farm-banner">

              <div className="cart-farm-left">

                <img
                  src="https://img.freepik.com/free-photo/portrait-indian-farmer-holding-vegetables_23-2148760996.jpg"
                  alt=""
                />

              </div>

              <div className="cart-farm-center">

                <h2>
                  From Our Farms to Your Home
                </h2>

                <p>
                  Supporting 5000+ farmers and their families.
                </p>

                <div className="cart-farm-features">

                  <div>
                    🌿 Direct from Farmers
                  </div>

                  <div>
                    🥬 100% Natural
                  </div>

                  <div>
                    🚜 Handpicked
                  </div>

                  <div>
                    💚 Fair Price
                  </div>

                </div>

              </div>

              <div className="cart-farm-right">

                <img
                  src="https://pngimg.com/d/basket_PNG26.png"
                  alt=""
                />

              </div>

            </div>

          )}

        </div>

        {/* =========================
            RIGHT SUMMARY
        ========================= */}

        {cartItems.length > 0 && (

          <div className="cart-summary-section">

            <div className="cart-summary-card">

              <h2>
                Order Summary
              </h2>

              <div className="cart-summary-row">

                <p>
                  Subtotal ({cartItems.length} items)
                </p>

                <span>
                  ₹ {total}
                </span>

              </div>

              {/* AUTO DISCOUNT */}

              {autoDiscount > 0 && (

                <div className="cart-summary-row green">

                  <p>
                    {autoDiscountLabel}
                  </p>

                  <span>
                    - ₹ {autoDiscount.toFixed(2)}
                  </span>

                </div>

              )}

              {/* COUPON DISCOUNT */}

              {discountAmount > 0 && (

                <div className="cart-summary-row green">

                  <p>
                    Coupon Discount
                  </p>

                  <span>
                    - ₹ {discountAmount}
                  </span>

                </div>

              )}

              {/* DELIVERY */}

              <div className="cart-summary-row">

                <p>
                  Delivery Charges
                </p>

                <span className="free">
                  Free
                </span>

              </div>

              {/* COUPON */}

              <div className="cart-coupon-box">

                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponInput}
                  onChange={(e) => {

                    setCouponInput(
                      e.target.value
                    );

                    setCouponMessage("");

                  }}
                />

                <button
                  onClick={applyCoupon}
                >
                  Apply
                </button>

              </div>

              {couponMessage && (

                <p
                  className={`cart-coupon-msg ${
                    couponMessage.includes("Applied")
                      ? "success"
                      : "error"
                  }`}
                >
                  {couponMessage}
                </p>

              )}

              {/* GST */}

              <div className="cart-summary-row">

                <p>
                  GST
                </p>

                <span>
                  ₹ {gst.toFixed(2)}
                </span>

              </div>

              {/* TOTAL */}

              <div className="cart-summary-total">

                <h3>
                  Total Amount
                </h3>

                <h2>
                  ₹ {finalTotal.toFixed(2)}
                </h2>

              </div>

              <button
                className="cart-checkout-btn"
                onClick={() =>
                  navigate("/checkout")
                }
              >
                Proceed to Checkout
              </button>

            </div>

            {/* FEATURES */}

            <div className="cart-feature-list">

              <div>
                🛡️ 100% Safe & Secure Payments
              </div>

              <div>
                🌿 Freshness Guaranteed
              </div>

              <div>
                🚚 Fast Delivery
              </div>

              <div>
                🔄 Easy Returns
              </div>

            </div>

          </div>

        )}

      </div>

      {/* =========================
          RECOMMENDED PRODUCTS
      ========================= */}

      {recommendedProducts.length > 0 && (

        <div className="cart-recommend-section">

          <h2>
            You May Also Like
          </h2>

          <div className="cart-recommend-grid">

            {recommendedProducts.map((item, index) => (

              <div key={index} className="cart-recommend-card" >
                <div className="cart-recommend-img-cntr"> 
                  <img
                    src={item.img}
                    alt=""
                  />
                </div>
                <div>
                  <h4>
                  {item.title}
                </h4>

                <p>
                  {item.weight}
                </p>

                <h3>
                  ₹ {item.price}
                </h3>

                <button
                  onClick={() => {

                    if (isInCart(item.id)) {

                      navigate("/cart");

                    } else {

                      addToCart({
                        id: item.id,
                        title: item.title,
                        price: item.price,
                        qty: 1,
                        img: item.img,
                        weight: item.weight,
                      });

                    }

                  }}
                >
                  {isInCart(item.id)
                    ? "✔ Go To Cart"
                    : "Add To Cart"}
                </button>
                </div>

                

              </div>

            ))}

          </div>

        </div>

      )}

    </div>

    <Footer />
  </>
);
}
