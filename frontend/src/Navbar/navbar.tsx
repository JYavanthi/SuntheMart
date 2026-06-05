import "../styles/navbar.css";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast";
import { products, categories } from "../data_search/search_data";
import { useConfirm } from "../context/ConfirmContext";
import logo from "../assets/santhe_mart_logo.jpeg";
import logout from "../assets/log_out.png";
import logotext from"../assets/San_mrt_logo-text.jpeg";

function Navbar() { 
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { wishlistItems } = useWishlist();
  const { cartItems} = useCart();
  const navigate = useNavigate();
  const location = useLocation();
   const isCartPage = location.pathname === "/cart";
    const { confirm } = useConfirm();

  const profileRef = useRef<HTMLDivElement>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const logoutUser = (navigate: any) => {
  localStorage.removeItem("user");
  localStorage.removeItem("userId"); // 🔥 VERY IMPORTANT

  window.dispatchEvent(new Event("userChanged"));

  navigate("/");
};

useEffect(() => {
  const checkUser = () => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  };

  checkUser();
  window.addEventListener("userChanged", checkUser);

  return () => window.removeEventListener("userChanged", checkUser);
}, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /** ✅ FIXED NAV HANDLER */
  const handleNavClick = (sectionId: string) => {
    setMenuOpen(false);

    if (location.pathname !== "/") {
      // Navigate to home first
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      // Already on home → scroll directly
      const section = document.getElementById(sectionId);
      section?.scrollIntoView({ behavior: "smooth" });
    }
  };
const handleSearch = () => {

  const search = searchTerm.toLowerCase().trim();

  if (!search) {
    toast.error("Please enter a product or category");
    return;
  }

  /* SPLIT SEARCH WORDS */
  const searchWords = search.split(" ").filter(w => w.length > 0);

  /* CATEGORY SEARCH FIRST */
  const categoryMatch = categories.find(c => {
    const categoryName = c.name.toLowerCase();
    return searchWords.every(word => categoryName.includes(word));
  });

  if (categoryMatch) {

    navigate("/categoryProductPage", {
      state: {
        categoryId: categoryMatch.id
      }
    });

    setSearchTerm("");
    return;
  }

  /* PRODUCT SEARCH */
  const productMatches = products.filter(p => {

    const productName = p.name.toLowerCase();

    return searchWords.every(word => productName.includes(word));

  });

  if (productMatches.length > 0) {

    navigate("/categoryProductPage", {
      state: {
        categoryId: productMatches[0].categoryId,
        highlightProducts: productMatches.map(p => p.name)
      }
    });

    setSearchTerm("");
    return;
  }

  toast.error("No matching product or category found");
};

  return (
    <div className={`navbar-wrapper ${isCartPage ? "cart-navbar" : ""}`}>
      <div className="top-strip">
        SERVING GLOBALLY • CLEAN-LABEL FOODS FOR DIABETES, WELLNESS & EVERYDAY HEALTH
      </div>

      <nav className="navbar">
        {/* LOGO */}
        <div className="left-section" onClick={() => handleNavClick("home")}>
          <div className="logo-circl"><img src={logo} alt="" /></div>
          <div className="logo-text">
            <img src={logotext} alt=""  />
          </div>
        </div>

        {/* NAV LINKS */}
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li onClick={() => handleNavClick("home")}>HOME</li>
          <li onClick={() => navigate("/categoryProductPage")}>SHOP</li>
          <li onClick={() => navigate("/categories")}>CATEGORIES</li>
          <li onClick={() => navigate("/aboutuspage")}>ABOUT</li>
          {/* <li onClick={() => handleNavClick("mission")}>MISSION</li> */}
          <li onClick={() => navigate("/contact")}>CONTACT</li>
          <li onClick={() => navigate("/howitworkspage")}>HOW IT WORKS</li>
           <li onClick={() => navigate("/faqs")}>FAQs</li>
        </ul>

         <div className="nav-actions">
          <div className="nav-search">
            {/* <input type="text" placeholder="Search products" /> */}
            <input
  type="text"
  placeholder="Search products"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") handleSearch();
  }}
/>
            <span className="search-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"  onClick={handleSearch}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
          </div>

      

        <div className="nav-icons">

  {!isLoggedIn ? (
    
    <button
      className="auth-btn"
      onClick={() => navigate("/login")}
    >
      Login / Signup
    </button>
  ) : (
    
    <>
      
      <div className="profile-wrapper" ref={profileRef}>
        <div
          className="icon"
          onClick={() => setProfileOpen(!profileOpen)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
          </svg>
        </div>

        {profileOpen && (
          <div className="profile-dropdown">
            <button onClick={() => navigate("/profile")}>
              Profile
            </button>

            {/* <button
              // onClick={() => {
              //    logoutUser(navigate);
              //   toast.success("Logged out");
              // }}
              onClick={() => {
                const confirmLogout = window.confirm("Do you want to logout?");
                if (confirmLogout) {
                   logoutUser(navigate);
  toast.success("Logged out successfully");
                }
              }}
            >
              Logout
            </button> */}
            <button
  // className="logout-btn"
  onClick={async () => {
    const confirmLogout = await confirm({
      title: "Do you want to LOG-OUT?",
      // subText: "You will need to sign in again to continue.",
      confirmText: "Yes",
      cancelText: "No",
      image: logout,
      variant:"logout",
    });

    if (!confirmLogout) return;

    logoutUser(navigate);
    toast.success("Logged out successfully");
  }}
>
  Logout
</button>
          </div>
        )}
      </div>

      
      <div className="icon" onClick={() => navigate("/wishlist")}>
        <span className="wshlst-count">{wishlistItems.length}</span>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M20.8 4.6c-1.5-1.4-3.9-1.4-5.4 0L12 8l-3.4-3.4c-1.5-1.4-3.9-1.4-5.4 0-1.6 1.5-1.6 4 0 5.5L12 21l8.8-10.9c1.6-1.5 1.6-4 0-5.5z" />
        </svg>
      </div>

      
      {!isCartPage && (
        <div className="icon badge" onClick={() => navigate("/cart")}>
          <span className="count">{cartItems.length}</span>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.6 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
          </svg>
        </div>
      )}
    </>
  )}

</div>

        {/* Hamburger */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

