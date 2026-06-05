import "./styles/prowishlist.css";
import Navbar from "./Navbar/navbar";
import Footer from "./footer";
import { useWishlist } from "./context/WishlistContext";
import { useCart } from "./context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import ProfileSidebar from "./ProfileSidebar";

import banner from "./assets/cart-bg.jpeg";

const ProfWishlist = () => {

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

  return (

    <>
      <Navbar />

      <div className="pro-wshlst-page">

        {/* TOP */}

        <div className="pro-wshlst-banner">

          <img
            src={banner}
            alt=""
            className="pro-wshlst-banner-img"
          />

          <div className="pro-wshlst-overlay"></div>

          <div className="pro-wshlst-banner-content">

            <div className="pro-wshlst-banner-left">

              <h1>
                My Wishlist ♡
              </h1>

              <p>
                All your favourite fresh picks,
                saved just for you.
              </p>

            </div>

            <div className="pro-wshlst-banner-center">

              <img
                src="https://cdn-icons-png.flaticon.com/512/2153/2153788.png"
                alt=""
              />

            </div>

            <div className="pro-wshlst-banner-card">

              <h3>
                Good choices today,
                better health tomorrow.
              </h3>

              <p>
                Keep your list updated and
                never run out of freshness.
              </p>

            </div>

          </div>

        </div>

        {/* MAIN */}

        <div className="pro-wshlst-main">

          {/* LEFT */}

          <ProfileSidebar />

          {/* RIGHT */}

          <div className="pro-wshlst-right">

            {/* TOP */}

            <div className="pro-wshlst-top-row">

              <div></div>

              <div className="pro-wshlst-filters">

                <select>

                  <option>
                    Sort by: Recently Added
                  </option>

                </select>

                <button>
                  🧪 Filter
                </button>

              </div>

            </div>

            {/* SAVED SECTION */}

            <div className="pro-wshlst-section">

              <div className="pro-wshlst-section-top">

                <div>

                  <h2>
                    Saved for Later
                  </h2>

                  <p>
                    Items you've saved and can
                    shop anytime.
                  </p>

                </div>

                <span>
                  View All ({wishlistItems.length})
                </span>

              </div>

              {wishlistItems.length === 0 ? (

                <div className="pro-wshlst-empty">

                  <img
                    src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
                    alt=""
                  />

                  <h3>
                    Wishlist Empty
                  </h3>

                  <p>
                    Save your favourite items here
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

                <div className="pro-wshlst-grid">

                  {wishlistItems.map((item) => (

                    <div
                      key={item.wishlistId}
                      className="pro-wshlst-card"
                    >

                      {/* HEART */}

                      <button
                        className="pro-wshlst-heart"
                        onClick={() =>
                          removeFromWishlist(item.wishlistId)
                        }
                      >
                        ♡
                      </button>

                      {/* IMAGE */}

                      <img
                        src={item.img}
                        alt={item.title}
                        className="pro-wshlst-product-img"
                        onClick={() =>
                          navigate(`/product/${item.id}`)
                        }
                      />

                      {/* CONTENT */}

                      <div className="pro-wshlst-content">

                        <h3>
                          {item.title}
                        </h3>

                        <p>
                          {item.weight}
                        </p>

                        <div className="pro-wshlst-price-row">

                          <h2>
                            ₹{item.price}
                          </h2>

                          <span>
                            In Stock
                          </span>

                        </div>

                        {/* ACTIONS */}

                        <div className="pro-wshlst-actions">

                          <button
                            className="pro-wshlst-qty-btn"
                          >
                            −
                          </button>

                          <span>
                            1
                          </span>

                          <button
                            className="pro-wshlst-qty-btn"
                          >
                            +
                          </button>

                          <button
                            className="pro-wshlst-cart-btn"
                            onClick={() =>
                              moveToCart(item)
                            }
                          >
                            Add to Cart
                          </button>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>

            {/* FRESH PICKS */}

            <div className="pro-wshlst-section">

              <div className="pro-wshlst-section-top">

                <div>

                  <h2>
                    Fresh Picks You Love
                  </h2>

                  <p>
                    Handpicked based on your taste
                    and preferences.
                  </p>

                </div>

                <span>
                  View All (6)
                </span>

              </div>

              <div className="pro-wshlst-grid">

                {wishlistItems.slice(0, 6).map((item) => (

                  <div
                    key={item.wishlistId}
                    className="pro-wshlst-card small"
                  >

                    <button
                      className="pro-wshlst-heart"
                    >
                      ♡
                    </button>

                    <img
                      src={item.img}
                      alt=""
                      className="pro-wshlst-product-img"
                    />

                    <div className="pro-wshlst-content">

                      <h3>
                        {item.title}
                      </h3>

                      <p>
                        {item.weight}
                      </p>

                      <div className="pro-wshlst-price-row">

                        <h2>
                          ₹{item.price}
                        </h2>

                        <span>
                          In Stock
                        </span>

                      </div>

                      <button
                        className="pro-wshlst-cart-btn full"
                        onClick={() =>
                          moveToCart(item)
                        }
                      >
                        Add to Cart
                      </button>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default ProfWishlist;