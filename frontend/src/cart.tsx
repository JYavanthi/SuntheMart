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

  /* ===============================
     APPLY COUPON
     =============================== */

  // const applyCoupon = () => {

  //   if (!couponInput) {
  //     setCouponMessage("Please enter coupon code");
  //     return;
  //   }

  //   const cp = coupons.find(
  //     (c:any) =>
  //       c.CouponCode &&
  //       c.CouponCode.toLowerCase() === couponInput.toLowerCase()
  //   );

  //   if (!cp) {
  //     setCouponMessage("Invalid coupon code");
  //     setDiscountAmount(0);
  //       localStorage.removeItem("couponDiscount"); 
  //     return;
  //   }

  //   const minOrder = Number(cp.MinOrderValue || cp.MinOrderAmount || 0);
  //   const discountValue = Number(cp.DiscountValue || 0);
  //   const maxDiscount = Number(cp.MaxDiscount || 0);

  //   if (total < minOrder) {

  //     const remaining = minOrder - total;

  //     setCouponMessage(
  //       `Add products worth ₹${remaining} more to apply this coupon`
  //     );

  //     setDiscountAmount(0);
  //      localStorage.removeItem("couponDiscount");
  //     return;
  //   }

  //   let discount = 0;

  //   if (cp.DiscountType === "Flat") {

  //     discount = discountValue;

  //   } else {

  //     discount = (total * discountValue) / 100;

  //     if (maxDiscount > 0) {
  //       discount = Math.min(discount, maxDiscount);
  //     }

  //   }

  //   setDiscountAmount(discount);
  //   localStorage.setItem("couponDiscount", discount.toString())
  //   setCouponMessage(`Coupon Applied! You saved ₹${discount}`);

  // };

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

        <div className="cart-back">
  <button
    className="back-btn"
    onClick={() => navigate(-1)}
  >
    ←
  </button>


        <div className="cart-steps">
          
          <span className="active">My Cart</span>
          <span className="dots">-----------------</span>
          <span>Address</span>
          <span className="dots">-----------------</span>
          <span>Payment</span>
        </div>
        </div>
         


        <div className="cart-content">

          {/* LEFT SIDE */}

          <div className="cart-left">
        
            {cartItems.length === 0 ? (
              <>
              <div className="empty-image"><img src={emp} alt="" /></div>
              <p className="empty-cart">Your cart is empty</p>
              <button className="shop-now" onClick={()=>navigate("/categoryProductPage")}>Shop now</button></>
            ) : (

              cartItems.map((item) => (

                <div key={item.cartId} className="cart-item" >

                  <img src={item.img} className="cart-img" alt="not found"onClick={() => navigate(`/product/${item.id}`)} />

                  <div className="cart-details">

                    <h4>{item.title}</h4>
                    <p>{item.weight}</p>

                    <div className="qty-controls">
                      <button onClick={() => decreaseQty(item.cartId)}>-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => increaseQty(item.cartId)}>+</button>

                      <button
                        className="cart-delete"
                        onClick={() => removeFromCart(item.cartId)}
          
                      >
                        <i className="fa-regular fa-trash-can"></i>
                      </button>
                    </div>

                    <p className="wishlist">
                      {isInWishlist(item.id) ? "Remove From Wishlist" : "Move To Wishlist"}
                      <button
                        className={`wishlogo-cart ${isInWishlist(item.id) ? "active" : ""}`}
                        onClick={() =>{
                          const alreadyInWishlist = isInWishlist(item.id);
                           toggleWishlist(item);
                           if (alreadyInWishlist) {
                                 
                                  showToast(
                               rem_wish,
                               "Wishlist Updated",
                               "Item removed from wishlist",
                               "wishlist-action"
                             );
                               } else {
                                
                                 showToast(
                             add_wish,
                             "Wishlist Updated",
                             "Item added to wishlist successfully",
                             "wishlist-action"
                           );
                               }
                          }}
                      >
                        <i className="fa-regular fa-heart"></i>
                      </button>
                    </p>

                  </div>

                  <div className="cart-price">
                    <h4>₹ {item.discount * item.qty}</h4>
                    <p>MRP excl. all taxes</p>
                  </div>

                </div>

              ))

            )}

          </div>

          {/* RIGHT SIDE */}
          <div className="cart-right-content">

          <div className="cart-right">

            <h3>Place Order</h3>

            <div className="summary">

              <div className="row">
                <span>Item Total (Excl. of all taxes)</span>
                <span>₹ {total}</span>
              </div>

              {/* OPENING OFFER */}

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

              {/* COUPON SECTION */}

              <div className="coupon-section">

                <h4>Coupons</h4>

                <div className="coupon-input-row">

                  {/* <input
                    type="text"
                    className="coupon-input"
                    placeholder="Enter coupon code"
                    value={couponInput}
                    onChange={(e)=>setCouponInput(e.target.value)}
                  /> */}
                  <input
  type="text"
  className="coupon-input"
  placeholder={couponMessage ? couponMessage : "Enter coupon code"}
  value={couponInput}
  onChange={(e) => {
    setCouponInput(e.target.value);
    setCouponMessage(""); 
  }}
   
/>

                  <button
                    className="apply-btn"
                    disabled={cartItems.length === 0}
                    onClick={applyCoupon}
                  >
                    Apply
                  </button>

                </div>

                {/* {couponMessage && couponInput && (
                  <p className="coupon-message">{couponMessage}</p>
                )} */}

                {couponMessage && couponInput && (

  <p
    className="coupon-message"
    style={{
      fontSize: "15px",
      color:
        couponMessage.includes("Applied")
          ? "green"
          : "red"
    }}
  >
    {couponMessage}
  </p>

)}

              </div>

              {/* COUPON DISCOUNT */}

              {discountAmount > 0 && couponInput && (

                <div className="row discount">
                  <span>Coupon Discount</span>
                  <span>- ₹ {discountAmount}</span>
                </div>

              )}
              <hr />
               <div className="row">
                <span>Sub Total</span>
                <span>₹ {subTotal}</span>
              </div>

              {/* <div className="row">
                <span>GST</span>
                <span>₹ {gst.toFixed(2)}</span>
              </div> */}
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
  disabled={cartItems.length === 0}
  onClick={() => {
   

    navigate("/cart-address");
  }}
>
  PLACE ORDER
</button>
{/* <button
  className="place-order-btn"
  disabled={cartItems.length === 0}
  onClick={() => {
    localStorage.setItem("checkoutItems", JSON.stringify(cartItems));
    navigate("/cart-address");
  }}
>
  PLACE ORDER
</button> */}


          </div>

          
             {cartItems.length > 0 && (
  <div className="empty-cart-container">
    {/* <button
      className="empty-cart-btn"
      onClick={async () => {
        const ok = window.confirm("Are you sure you want to empty the cart?");
        if (!ok) return;

        await clearCart();
        toast.success("Cart emptied successfully");
      }}
    >
    <i className="fa-regular fa-trash-can"></i>      Empty Cart
    </button>  
   */}
   <button
    className="empty-cart-btn"
    onClick={async () => {

      const ok = await confirm({
        title: "Are you sure you want to empty the cart?",
        subText: "All items will be removed from your cart.",
        confirmText: "Yes, Empty",
        cancelText: "Cancel",
        image: emptyCart, // 👈 use your sad cart image
        variant: "empty_cart",
      });

      if (!ok) return;

      await clearCart();
      // toast.success("Cart emptied successfully");
        showToast(
        removeCart,
        "Cart Updated",
        "Cart emptied successfully",
        "cart-emptied"
      );

    }}
  >
    <i className="fa-regular fa-trash-can"></i> Empty Cart
  </button>
    

   <button className="cart-add-more" onClick={()=>navigate("/categoryProductPage")}> + Add more items</button>

  </div>
)} 
</div>

     

        </div>

        {/* RECOMMENDATIONS */}

        {recommendedProducts.length > 0 && (

          <div className="recommendations">

            <h3>You May Also Like</h3>

            <div className="products-carousel">

              {recommendedProducts.map((item, index) => (

                <div key={index} className="product-card">

                  <img
                    src={item.img}
                    alt={item.title}
                    className="img-placeholder"
                  />

                  <h4>{item.title}</h4>
                  <h3 className="price">₹ {item.price}</h3>

                  <button
                    className="cart-add-btn"
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
                    {isInCart(item.id) ? "✔ Go To Cart" : "Add To Cart"}
                  </button>

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
