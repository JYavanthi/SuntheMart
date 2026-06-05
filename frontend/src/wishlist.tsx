// import "./styles/wishlist.css";
// import Navbar from "./Navbar/navbar";
// import Footer from "./footer";
// import { useWishlist } from "./context/WishlistContext";
// import { useCart } from "./context/CartContext";
// import { useNavigate } from "react-router-dom";


// const Wishlist = () => {
//   const { wishlistItems, removeFromWishlist } = useWishlist();
//   const { addToCart } = useCart();
//    const navigate = useNavigate();

//   return (
//     <>
//       <Navbar />
//       <div className="wishlist-page">
//         <h1>My Wishlist ({wishlistItems.length} Items)</h1>

//         {wishlistItems.length === 0 ? (
//           <>
//           <p className="empty-text">Your wishlist is empty</p>
//           <button className="go-to-cart-btn" onClick={() => navigate("/cart")}>Go to Cart</button>
//           </>
//         ) : (
//           <div className="wishlist-grid">
//             {wishlistItems.map((item) => (
//               <div key={item.wishlistId} className="product-card1">
//                 {/* REMOVE BUTTON */}
//                 <button
//                   className="remove-btn"
//                   onClick={() => removeFromWishlist(item.wishlistId)}
//                   aria-label="Remove from wishlist"
//                 >
//                   ×
//                 </button>

//                 {/* IMAGE */}
//                 <img src={item.img} alt={item.title}  className="wsh-product-img"/>

//                 {/* DETAILS */}
//                  <p className="wsh-product-category">{item.category}</p>
//                 <h4 className="wsh-product-title">{item.title}</h4>
//                 {/* {item.desc && (
//                    <p className="wsh-product-desc">{item.desc}</p>
//                    )}    */}
//                       {item.price && (
//                     <h4 className="wsh-product-weight">{item.weight}</h4>
//                   )}
//                 <div className="wsh-price-row">         
//                   {item.weight && (
//                     <span className="wsh-product-price">₹{item.price}</span>
//                   )}
//                   <button className="add-to-cart-btn"onClick={() =>{ addToCart(item); removeFromWishlist(item.wishlistId);}}>Add To Cart
//                 </button>
//                 </div>  

               
                
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default Wishlist;


import "./styles/wishlist.css";
import Navbar from "./Navbar/navbar";
import Footer from "./footer";
import { useWishlist } from "./context/WishlistContext";
import { useCart } from "./context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import banner from "./assets/cart-bg.jpeg";
import farmBasket from "./assets/faq-basket.png";

const Wishlist = () => {

  const {
    wishlistItems,
    removeFromWishlist
  } = useWishlist();

  const {
    addToCart,
    isInCart
  } = useCart();

  const navigate = useNavigate();

  const moveToCart = (item: any) => {

    if (isInCart(item.id)) {

      toast.success("Already added to cart");

      return;
    }

    addToCart({
      ...item,
      qty: 1
    });

    removeFromWishlist(item.wishlistId);

    toast.success("Added to cart");

  };

  const clearWishlist = async () => {

    for (const item of wishlistItems) {
      await removeFromWishlist(item.wishlistId);
    }

    toast.success("Wishlist cleared");

  };

  return (

    <>
      <Navbar />

      <div className="wishlist-page">

        {/* =========================
            TOP BANNER
        ========================= */}

        <div className="wishlist-top-banner">

          <img
            src={banner}
            alt=""
            className="wishlist-banner-img"
          />

          <div className="wishlist-banner-overlay"></div>

          <div className="wishlist-banner-content">

            <div className="wishlist-banner-left">

              <h1>
                My Wishlist
              </h1>

              <div className="wishlist-breadcrumb">

                Home
                <span>›</span>
                Wishlist

              </div>

            </div>

            <div className="wishlist-banner-right">

              <div className="wishlist-banner-card">

                <div className="wishlist-banner-icon">
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

        {/* =========================
            MAIN WRAPPER
        ========================= */}

        <div className="wishlist-main-wrapper">

          {/* LEFT */}
          

          <div className="wishlist-left-section">

            <div className="wishlist-card">

              <div className="wishlist-header-row">

                <h2>
                  Your Saved Items
                  <span>
                    ({wishlistItems.length})
                  </span>
                </h2>

              </div>

              {wishlistItems.length === 0 ? (

                <div className="wishlist-empty-box">

                  <img
                    src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
                    alt=""
                  />

                  <h3>
                    Your Wishlist is Empty
                  </h3>

                  <p>
                    Save your favorite products here.
                  </p>

                  <button
                    onClick={() =>
                      navigate("/categoryProductPage")
                    }
                  >
                    Browse Products
                  </button>

                </div>

              ) : (

                <>
                  <div className="wishlist-grid">

                    {wishlistItems.map((item) => (

                      <div
                        key={item.wishlistId}
                        className="wishlist-product-card"
                      >

                        {/* HEART */}

                        <button
                          className="wishlist-heart-btn"
                          onClick={() =>
                            removeFromWishlist(item.wishlistId)
                          }
                        >
                          ❤️
                        </button>

                        {/* IMAGE */}

                        <img
                          src={item.img}
                          alt={item.title}
                          className="wishlist-product-img"
                          onClick={() =>
                            navigate(`/product/${item.id}`)
                          }
                        />

                        {/* CONTENT */}

                        <div className="wishlist-product-content">

                          <h3>
                            {item.title}
                          </h3>

                          <p>
                            {item.weight}
                          </p>

                          <h2>
                            ₹{item.price}
                          </h2>

                          <button
                            className="wishlist-add-cart-btn"
                            onClick={() =>
                              moveToCart(item)
                            }
                          >
                            🛒 Add to Cart
                          </button>

                        </div>

                      </div>

                    ))}

                  </div>

                  {/* BOTTOM ACTIONS */}

                  <div className="wishlist-bottom-actions">

                    <div className="wishlist-note">

                      ⓘ Prices or stock may change.
                      Add items to cart to check availability.

                    </div>

                    <div className="wishlist-action-buttons">

                      <button>
                        ↗ Share Wishlist
                      </button>

                      <button
                        onClick={clearWishlist}
                      >
                        🗑 Clear Wishlist
                      </button>

                    </div>

                  </div>

                </>
              )}

            </div>

            {/* FARM BANNER */}

            <div className="wishlist-farm-banner">

              <div className="wishlist-farm-item">
                🌿 Direct from Farmers
                <span>
                  Fresh produce straight
                  from our farms
                </span>
              </div>

              <div className="wishlist-farm-item">
                🥬 100% Natural
                <span>
                  No chemicals,
                  no preservatives
                </span>
              </div>

              <div className="wishlist-farm-item">
                💚 Handpicked with Care
                <span>
                  Carefully selected
                  just for you
                </span>
              </div>

              <div className="wishlist-farm-item">
                🌱 Fair Prices
                <span>
                  Honest pricing for
                  healthy living
                </span>
              </div>

              <div className="wishlist-farm-image">

                <img
                  src={farmBasket}
                  alt=""
                />

              </div>

            </div>

          </div>

          {/* RIGHT */}

          {wishlistItems.length > 0 && (

            <div className="wishlist-right-section">

              <div className="wishlist-side-card">

                <div className="wishlist-side-item">

                  <h3>
                    🔔 Get Notified
                  </h3>

                  <p>
                    We’ll notify you when items
                    in your wishlist are back
                    in stock or on offer.
                  </p>

                  <button>
                    Enable Notifications
                  </button>

                </div>

                <div className="wishlist-side-list">

                  <div>
                    💚 Price Drop Alerts
                    <span>
                      Get notified when prices drop
                    </span>
                  </div>

                  <div>
                    📦 Back in Stock Alerts
                    <span>
                      Know when items are available
                    </span>
                  </div>

                  <div>
                    🎁 Exclusive Offers
                    <span>
                      Receive offers on saved items
                    </span>
                  </div>

                </div>

              </div>

            </div>

          )}

        </div>

      </div>

      <Footer />
    </>
  );
};

export default Wishlist;