// import React, { useEffect, useState } from "react";
// import "../src/styles/categoryProducts.css";
// import { API_URLS } from "./API-Urls";
// import { useCart } from "./context/CartContext";
// import { useWishlist } from "./context/WishlistContext";
// import { useNavigate, useLocation } from "react-router-dom";
//  import { toast } from "react-hot-toast";
// import Navbar from "./Navbar/navbar";
// import Footer from "./footer";
// import { showToast } from "./components/CustomToast";
// import tst_bfr from "./assets/toast_bfr_lgn.jpeg";
// import add_cart from "./assets/add_cart.png";
// import add_wish from  "./assets/add_wish.png";
// import rem_wish from "./assets/remove_wish.png";

// interface Category {
//   ProductCategoryID: number;
//   CategoryName: string;
// }

// interface ProductAPI {
//   ProductID: number;
//   ProductName: string;
//   ProductDescription: string;
//   ProductWeight: string;
//   Price: number;
//   DiscountPrice: number;
//   ProductImage: string | null;
// }

// interface ProductUI {
//   id: number;
//   title: string;
//   desc: string;
//   price: number;
//   weight: string;
//   img: string;
//   tag?: string;
// }

// const CategoryProductPage = () => {

//   const [categories, setCategories] = useState<Category[]>([]);
//   const [activeCategory, setActiveCategory] = useState<number | null>(null);
//   const [products, setProducts] = useState<ProductUI[]>([]);
//   const [loading, setLoading] = useState(false);

//   const { addToCart, isInCart } = useCart();
//   const { toggleWishlist, isInWishlist } = useWishlist();

//   const navigate = useNavigate();
//   const location = useLocation();

//   /* SEARCH DATA FROM NAVBAR */
//   const searchCategoryId = location.state?.categoryId;
//   const highlightProducts: string[] = location.state?.highlightProducts || [];

//   const user = JSON.parse(localStorage.getItem("user") || "null");
//   const userId = user?.UserID;

//   /* LOAD CATEGORIES */
//   useEffect(() => {

//     fetch(`${API_URLS.BASE_URL}categories`)
//       .then((res) => res.json())
//       .then((data) => {

//         setCategories(data);

//         if (searchCategoryId) {
//           setActiveCategory(searchCategoryId);
//         } 
//         else if (data.length > 0) {
//           setActiveCategory(data[0].ProductCategoryID);
//         }

//       })
//       .catch((err) => console.error("Category load error:", err));

//   }, [searchCategoryId]);

//   /* LOAD PRODUCTS */
//   useEffect(() => {

//     if (!activeCategory) return;

//     setLoading(true);

//     fetch(`${API_URLS.BASE_URL}products/category/${activeCategory}`)
//       .then((res) => res.json())
//       .then((data: ProductAPI[]) => {

//         const mapped: ProductUI[] = data.map((item, index) => ({
//           id: item.ProductID,
//           title: item.ProductName,
//           desc: item.ProductDescription,
//           price: item.DiscountPrice || item.Price,
//           weight: item.ProductWeight || "",
//           img: item.ProductImage
//             ? `http://localhost:4000${item.ProductImage}`
//             : "https://via.placeholder.com/300",
//           tag: index % 2 === 0 ? "Best Seller" : "",
//         }));

//         setProducts(mapped);

//       })
//       .catch((err) => console.error("Product load error:", err))
//       .finally(() => setLoading(false));

//   }, [activeCategory]);

//   /* SCROLL TO FIRST HIGHLIGHT PRODUCT */
//   useEffect(() => {

//     if (!highlightProducts.length || products.length === 0) return;

//     const first = highlightProducts[0];

//     const id = first.toLowerCase().replace(/\s+/g, "-");

//     setTimeout(() => {

//       const element = document.getElementById(id);

//       if (element) {
//         element.scrollIntoView({
//           behavior: "smooth",
//           block: "center"
//         });
//       }

//     }, 300);

//   }, [products, highlightProducts]);

//   return (
//     <>
//       <Navbar />

//       {/* CATEGORY BAR */}
//       <div className="cat-bar">
//         {categories.map((cat) => (
//           <button
//             key={cat.ProductCategoryID}
//             className={`cat-tab ${
//               activeCategory === cat.ProductCategoryID ? "active" : ""
//             }`}
//             onClick={() => setActiveCategory(cat.ProductCategoryID)}
//           >
//             {cat.CategoryName}
//           </button>
//         ))}
//       </div>

//       {/* PRODUCTS */}
//       <div className="productlist-page">

//         {loading && <p style={{ padding: "30px" }}>Loading products...</p>}

//         <div className="productlist-grid">

//           {!loading &&
//             products.map((item) => {

//               const productId = item.title
//                 .toLowerCase()
//                 .replace(/\s+/g, "-");

//               const isHighlighted =
//                 highlightProducts.includes(item.title);

//               return (
//                 <div
//                   key={item.id}
//                   id={productId}
//                   className={`plist-card ${
//                     isHighlighted ? "highlight-product" : ""
//                   }`}                >

//                   {item.tag && (
//                     <div className="plist-tag">{item.tag}</div>
//                   )}

//                   <img
//                     src={item.img}
//                     alt={item.title}
//                     className="plist-img"
//                     onClick={() => navigate(`/product/${item.id}`)}
//                   />

//                   <div className="plist-body">

//                     <h3 className="plist-title">
//                       {item.title}
//                     </h3>

//                     <div className="plist-price">

//                       <span className="plist-mrp">
//                         ₹{item.price + 300}
//                       </span>

//                       <span className="plist-final">
//                         ₹{item.price}
//                       </span>

//                       <span className="plist-weight">
//                         {item.weight}
//                       </span>

//                     </div>

//                     <div className="plist-actions">

//                       {/* <button
//                         className={`plist-wish ${
//                           isInWishlist(item.id) ? "active" : ""
//                         }`}
                       
//                           onClick={() => {
//   if (!userId) {
//     toast.error("Please login to add items to wishlist");
//     setTimeout(() => navigate("/login"), 1200); 
//     return;
//   }
//   toggleWishlist(item);
// }}
//                       >
//                         <i className="fa-regular fa-heart"></i>
//                       </button> */}
//                          <button
//                         className={`plist-wish ${
//                           isInWishlist(item.id) ? "active" : ""
//                         }`}
//                         onClick={() => {
//                           // if (!userId) {
//                           //   toast.error("Please login to add items to wishlist", {
//                           //     id: "wishlist-login",
//                           //   });
//                           //   setTimeout(() => navigate("/login"), 1200);
//                           //   return;
//                           // }
//                              if (!userId) {
//                             showToast(
//                               tst_bfr,
//                               "Login Required",
//                               "Please login to add items to wishlist ❤️",
//                               "wishlist-login"
//                             );
//                             setTimeout(() => navigate("/login"), 1200);
//                             return;
//                           }
                      
//                           const alreadyInWishlist = isInWishlist(item.id);
                      
//                           toggleWishlist(item);
                      
//                           if (alreadyInWishlist) {
//                             // toast.success("Item removed from wishlist ❌", {
//                             //   id: "wishlist-action",
//                             // });
//                              showToast(
//                                 rem_wish,
//                                 "Wishlist Updated",
//                                 "Item removed from wishlist",
//                                 "wishlist-action"
//                               );
//                           } else {
//                                showToast(
//                              add_wish,
//                              "Wishlist Updated",
//                              "Item added to wishlist successfully",
//                              "wishlist-action"
//                            );
//                           }
//                         }}
//                       >
//                         <i className="fa-regular fa-heart"></i>
//                       </button>

//                       <button
//                         className="plist-cart"
//                            onClick={() => {
//                           // if (!userId) {
//                           //   toast.error("Please login to add items to cart");
//                           //   setTimeout(() => navigate("/login"), 1200); // optional
//                           //   return;
//                           // }
//                                 if (!userId) {
//                                 showToast(
//                                   tst_bfr,
//                                   "Login Required",
//                                   "Please login to add items to cart",
//                                   "cart-login"
//                                 );
//                                 setTimeout(() => navigate("/login"), 1200);
//                                 return;
//                               }
                        
//                           if (isInCart(item.id)) {
//                             navigate("/cart");
//                           } else {
//                             addToCart({
//                               id: item.id,
//                               title: item.title,
//                               price: item.price,
//                               qty: 1,
//                               img: item.img,
//                               weight: item.weight,
//                             });
                        
//                             // toast.success("Item added to cart ✅"); // optional success message
//                                           showToast(
//                               add_cart,
//                               "Cart Updated",
//                               "Item added to cart successfully",
//                               "cart-added"
//                             );
//                           }
//                         }}
//                       >
//                         {isInCart(item.id)
//                           ? "✔ Go To Cart"
//                           : "Add To Cart"}
//                       </button>

//                     </div>

//                   </div>

//                 </div>
//               );

//             })}

//         </div>

//       </div>

//       <Footer />
//     </>
//   );
// };

// export default CategoryProductPage;

import React, { useEffect, useMemo, useState } from "react";
import "./styles/categoryProducts.css";
import { API_URLS } from "./API-Urls";
import { useCart } from "./context/CartContext";
import { useWishlist } from "./context/WishlistContext";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar/navbar";
import Footer from "./footer";
import { showToast } from "./components/CustomToast";

import tst_bfr from "./assets/toast_bfr_lgn.jpeg";
import add_cart from "./assets/add_cart.png";
import add_wish from "./assets/add_wish.png";
import rem_wish from "./assets/remove_wish.png";
import veg_ban from "./assets/cat-footer-veg.png";
import hero_img from "./assets/hero_img.jpeg";

interface Product {
  id: number;
  category: string;
  title: string;
  desc: string;
  price: number;
  weight: string;
  img: string;
}

const AllProductsPage = () => {
  const navigate = useNavigate();

  const { addToCart, isInCart } = useCart();

  const { toggleWishlist, isInWishlist } =
    useWishlist();

  const [products, setProducts] = useState<
    Product[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedCategory, setSelectedCategory] =
    useState("All Products");

  const [sortType, setSortType] =
    useState("featured");

  const userId =
    localStorage.getItem("userId");

  // FETCH PRODUCTS
  useEffect(() => {
    setLoading(true);

    fetch(
      `${API_URLS.BASE_URL}${API_URLS.PRODUCTS}`
    )
      .then((res) => res.json())
      .then((response) => {
        if (
          !response.success ||
          !Array.isArray(response.data)
        ) {
          setProducts([]);
          return;
        }

        const mappedProducts: Product[] =
          response.data.map((item: any) => ({
            id: item.ProductID,

            category:
              item.CategoryName ||
              "UNCATEGORIZED",

            title: item.ProductName,

            desc:
              item.ProductDescription,

            price:
              item.DiscountPrice ||
              item.Price,

            weight:
              item.ProductWeight || "",

            img: item.ImageUrl || "",
          }));

        setProducts(mappedProducts);
      })
      .catch((err) => {
        console.error(err);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // CATEGORY LIST
  const categories = useMemo(() => {
    const unique = [
      ...new Set(
        products.map((p) => p.category)
      ),
    ];

    return ["All Products", ...unique];
  }, [products]);

  // FILTERED PRODUCTS
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (
      selectedCategory !== "All Products"
    ) {
      filtered = filtered.filter(
        (p) =>
          p.category === selectedCategory
      );
    }

    if (sortType === "low-high") {
      filtered.sort(
        (a, b) => a.price - b.price
      );
    }

    if (sortType === "high-low") {
      filtered.sort(
        (a, b) => b.price - a.price
      );
    }

    return filtered;
  }, [
    products,
    selectedCategory,
    sortType,
  ]);

  return (
    <>
      <Navbar />

      <div className="cat-prod-page">
        <div className="cat-prod-left">
           <h3 className="cat-prod-filter-heading">
            Filters
          </h3>
          {/* SIDEBAR */}
        <div className="cat-prod-sidebar">

          <div className="cat-prod-filter-block">

            <h4>Categories</h4>

            {categories.map((cat) => (
              <label
                key={cat}
                className="cat-prod-filter-option"
              >
                <input
                  type="radio"
                  checked={
                    selectedCategory === cat
                  }
                  onChange={() =>
                    setSelectedCategory(cat)
                  }
                />

                {cat}
              </label>
            ))}
          </div>
        </div>
        </div>

        

        {/* RIGHT CONTENT */}
        <div className="cat-prod-content">

          {/* HEADER */}
          <div className="cat-prod-header">

            <div>
              <h2>All Products</h2>

              <p>
                Showing{" "}
                {
                  filteredProducts.length
                }{" "}
                products
              </p>
            </div>

            <select
              className="cat-prod-sort-dropdown"
              value={sortType}
              onChange={(e) =>
                setSortType(
                  e.target.value
                )
              }
            >
              <option value="featured">
                Featured
              </option>

              <option value="low-high">
                Price Low To High
              </option>

              <option value="high-low">
                Price High To Low
              </option>
            </select>
          </div>

          {/* GRID */}
          <div className="cat-prod-grid">

            {loading && (
              <p>Loading Products...</p>
            )}

            {!loading &&
              filteredProducts.map((item) => (
                <div
                  className="cat-prod-card"
                  key={item.id}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="cat-prod-image"
                    onClick={() =>
                      navigate(
                        `/product/${item.id}`
                      )
                    }
                  />

                  <h3 className="cat-prod-title">
                    {item.title}
                  </h3>

                  <div className="cat-prod-price-row">

                    <span className="cat-prod-price">
                      ₹{item.price}
                    </span>
                    <span className="cat-prod-slash">/</span>

                    <span className="cat-prod-weight">
                      {item.weight}
                    </span>

                  </div>

                  <div className="cat-prod-actions">

                    {/* WISHLIST */}
                    <button
                      className={`cat-prod-wishlist-btn ${
                        isInWishlist(
                          item.id
                        )
                          ? "active"
                          : ""
                      }`}
                      onClick={() => {

                        if (!userId) {

                          showToast(
                            tst_bfr,
                            "Login Required",
                            "Please login to add wishlist",
                            "wishlist-login"
                          );

                          setTimeout(
                            () =>
                              navigate(
                                "/login"
                              ),
                            1200
                          );

                          return;
                        }

                        const already =
                          isInWishlist(
                            item.id
                          );

                        toggleWishlist(
                          item
                        );

                        if (already) {

                          showToast(
                            rem_wish,
                            "Wishlist Updated",
                            "Removed from wishlist",
                            "wishlist-remove"
                          );

                        } else {

                          showToast(
                            add_wish,
                            "Wishlist Updated",
                            "Added to wishlist",
                            "wishlist-add"
                          );
                        }
                      }}
                    >
                      ❤
                    </button>

                    {/* CART */}
                    <button
                      className="cat-prod-cart-btn"
                      onClick={() => {

                        if (!userId) {

                          showToast(
                            tst_bfr,
                            "Login Required",
                            "Please login to add cart",
                            "cart-login"
                          );

                          setTimeout(
                            () =>
                              navigate(
                                "/login"
                              ),
                            1200
                          );

                          return;
                        }

                        if (
                          isInCart(item.id)
                        ) {

                          navigate(
                            "/cart"
                          );

                        } else {

                          addToCart({
                            id: item.id,
                            title:
                              item.title,
                            price:
                              item.price,
                            qty: 1,
                            img: item.img,
                            weight:
                              item.weight,
                          });

                          showToast(
                            add_cart,
                            "Cart Updated",
                            "Item added successfully",
                            "cart-added"
                          );
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
      </div>

      <div className="cat-prod-banner-ctnr">
         <div className="cat-prod-banner">

            <div className="cat-prod-banner-left">
              <img
                src={veg_ban}
                alt=""
              />
            </div>

            <div className="cat-prod-banner-center">

              <h2>
                Farm Fresh, Just For You!
              </h2>

              <p>
                Healthy foods from local
                farmers delivered fresh.
              </p>
              <div className="ban-btn">
                <button>
                Shop Now
              </button>
              </div>
              

            </div>

            <div className="cat-prod-banner-right">
              <img
                src={hero_img}
                alt=""
              />
            </div>

          </div>
      </div>
     

      <Footer />
    </>
  );
};

export default AllProductsPage;