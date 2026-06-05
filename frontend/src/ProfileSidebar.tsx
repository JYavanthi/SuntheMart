// ==============================
// FILE: src/components/ProfileSidebar.tsx
// ==============================

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./styles/ProfileSidebar.css";

const ProfileSidebar = () => {

  const navigate = useNavigate();

  const location = useLocation();

  const currentPath = location.pathname;

  const handleLogout = () => {

    const confirmLogout =
      window.confirm(
        "Do you want to logout?"
      );

    if (confirmLogout) {

      localStorage.clear();

      navigate("/");

    }

  };

  return (

    <div className="profile-sidebar">

      <button
        className={
          currentPath === "/profile"
            ? "active"
            : ""
        }
        onClick={() =>
          navigate("/profile")
        }
      >
        👤 Profile Information
      </button>

      <button
        className={
          currentPath === "/address"
            ? "active"
            : ""
        }
        onClick={() =>
          navigate("/address")
        }
      >
        📍 Addresses
      </button>

      <button onClick={()=>navigate("/MyOrders")}>
        📦 Orders
      </button>

      <button onClick={()=>navigate("/profwishlist")}>
        ♡ Wishlist
      </button>

     

      <button>
        🔔 Notifications
      </button>

      <button>
        ⭐ My Reviews
      </button>


      <button onClick={()=>navigate("/acntinfo")}>
        ⚙ Account Settings
      </button>

      <button
        className="profile-sidebar-logout"
        onClick={handleLogout}
      >
        ↪ Logout
      </button>

    </div>

  );

};

export default ProfileSidebar;