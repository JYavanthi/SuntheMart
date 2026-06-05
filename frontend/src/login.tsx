
// import "./styles/login.css";
// import React, { useState } from "react";
// import plant from "../src/assets/plant.jpg";
// import { useNavigate } from "react-router-dom";
// import { API_URLS } from "./API-Urls";
//  import { toast } from "react-hot-toast";

// export default function Login() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({ 
//     emailOrPhone: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e: any) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await fetch(
//         `${API_URLS.BASE_URL}${API_URLS.LOGIN}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             EmailOrPhone: formData.emailOrPhone,
//             Password: formData.password,
//           }),
//         }
//       );

//       const data = await response.json();

//       //🔥 ACCOUNT DELETED FLOW
//       if (data.code === "ACCOUNT_DELETED") {
//         const confirmRestore = window.confirm(
//           `Hi ${data.userData.FirstName}, your account is deleted.\nDo you want to restore it?`
//         );

//         if (confirmRestore) {
//           // restore API
//           await fetch(
//             `${API_URLS.BASE_URL}users/${data.userId}/recover`,
//             { method: "PUT" }
//           );

//           toast.error("✅ Account restored! Please login again.");
//           navigate("/login");
//         }

//         setLoading(false);
//         return;
//       }

//       // ❌ normal errors
//       if (!response.ok) {
//         toast.error(data.message || "Login failed");
//         setLoading(false);
//         return;
//       }

//       // ✅ SUCCESS LOGIN
//       localStorage.setItem("userId", data.user.UserID.toString());
// localStorage.setItem("user", JSON.stringify(data.user));
// localStorage.setItem("roleId", String(data.user.RoleID));

//       window.dispatchEvent(new Event("userChanged"));


//       // const roleId = data.user.RoleID;   
//       const roleId = Number(data.user.RoleID);

// console.log("ROLE ID:", roleId, typeof roleId);


//       // toast.error("✅ Login successful!");

//       // 🔁 ROLE BASED REDIRECT
//       if (roleId === 1) {
//         navigate("/admin");   // admin_back_office UI
//       }        // customer UI
//        else {
//         navigate("/");        // fallback safety
//       }

//     } catch (error) {
//       console.error("❌ Login Error:", error);
//       toast.error("Server error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="login-card">

//         {/* LEFT */}
//         <div className="login-left">
//           <h2>
//             Where <span>Healthy</span> Living <br /> Begins!
//           </h2>
//           <img src={plant} alt="Healthy plant" className="plant-img" />
//         </div>

//         {/* RIGHT */}
//         <div className="login-right">
//           <h2>Welcome Back</h2>

//           <form onSubmit={handleSubmit}>
//             <label>Email / Phone No.</label>
//             <input
//               id="emailOrPhone"
//               type="text"
//               placeholder="Enter your Email or Phone"
//               value={formData.emailOrPhone}
//               onChange={handleChange}
//               required
//             />

//             <label>Password</label>
//             <input
//               id="password"
//               type="password"
//               placeholder="Enter your password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />

//             <div className="login-options">
//               <label>
//                 <input type="checkbox" /> Remember Me
//               </label>
//               {/* <span className="forgot">Forgot Password</span> */}
//             </div>

//             <button type="submit" className="login-btn" disabled={loading}>
//               {loading ? "Logging In..." : "Log In"}
//             </button>

//             <p className="signup-link">
//               Don't Have An Account?{" "}
//               <button   type="button"    className="signup" onClick={() => navigate("/signup")}>
//                 Sign Up
//               </button>
//             </p>
//           </form>
//         </div>

//       </div>
//     </div>
//   );
// }


import "./styles/login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URLS } from "./API-Urls";
import { toast } from "react-hot-toast";

import villageBg from "./assets/login-background.jpeg";

// import phoneIcon from "../src/assets/phone.png";
// import emailIcon from "../src/assets/email.png";
// import lockIcon from "../src/assets/lock.png";
// import leafIcon from "../src/assets/leaf.png";

export default function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: any) => {

    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });

  };

  const validateForm = () => {

    if (!formData.emailOrPhone.trim()) {
      toast.error("Email or Phone is required");
      return false;
    }

    if (!formData.password.trim()) {
      toast.error("Password is required");
      return false;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be minimum 6 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: any) => {

    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {

      const response = await fetch(
        `${API_URLS.BASE_URL}${API_URLS.LOGIN}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            EmailOrPhone: formData.emailOrPhone,
            Password: formData.password,
          }),
        }
      );

      const data = await response.json();

      // ACCOUNT DELETED
      if (data.code === "ACCOUNT_DELETED") {

        const confirmRestore = window.confirm(
          `Hi ${data.userData.FirstName}, your account is deleted.\nDo you want to restore it?`
        );

        if (confirmRestore) {

          await fetch(
            `${API_URLS.BASE_URL}users/${data.userId}/recover`,
            {
              method: "PUT",
            }
          );

          toast.success("Account restored successfully!");
          navigate("/login");
        }

        setLoading(false);
        return;
      }

      // LOGIN FAILED
      if (!response.ok) {

        toast.error(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // SUCCESS LOGIN
      localStorage.setItem(
        "userId",
        data.user.UserID.toString()
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      localStorage.setItem(
        "roleId",
        String(data.user.RoleID)
      );

      window.dispatchEvent(
        new Event("userChanged")
      );

      const roleId = Number(data.user.RoleID);

      toast.success("Login successful!");

      // ROLE BASED NAVIGATION
      if (roleId === 1) {

        navigate("/admin");

      } else {

        navigate("/");
      }

    } catch (error) {

      console.error("Login Error:", error);

      toast.error(
        "Server error. Please try again."
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div
      className="login-page"
      style={{
        backgroundImage: `url(${villageBg})`,
      }}
    >

      <div className="login-overlay">

        {/* LEFT SIDE */}

        <div className="login-left">

          <div className="login-logo">

            <div className="login-logo-icon">
              🌱
            </div>

            <div>

              <h2>SunThe Mart</h2>

              <p>
                From Our Farms To Your Home
              </p>

            </div>

          </div>

          <div className="login-left-content">

            <h1>
              <span>From Farmers.</span>
              <br />
              To Your Family.
            </h1>

            <p>
              Fresh, nutritious and chemical-free
              fruits and vegetables directly from
              farmers.
            </p>

            <div className="login-feature-list">

              <div className="login-feature-card">

                <div className="login-feature-icon">
                  🌿
                </div>

                <div>
                  <h4>Direct from Farmers</h4>
                </div>

              </div>

              <div className="login-feature-card">

                <div className="login-feature-icon">
                  🍃
                </div>

                <div>
                  <h4>100% Fresh & Natural</h4>
                 
                </div>

              </div>

              <div className="login-feature-card">

                <div className="login-feature-icon">
                  ₹
                </div>

                <div>
                  <h4>No Middlemen</h4>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="login-right">

          <div className="login-form-card">

            <h2>
              Welcome Back!
              {/* <img
                src={leafIcon}
                alt=""
              /> */}
            </h2>

            <p className="login-subtitle">
              Login to continue to SunThe Mart
            </p>

            <form onSubmit={handleSubmit}>

              {/* EMAIL */}

              <div className="login-input-group">

                <label>
                  Email or Phone Number
                </label>

                <div className="login-input-wrapper">

                  {/* <img
                    src={emailIcon}
                    alt=""
                  /> */}

                  <input
                    id="emailOrPhone"
                    type="text"
                    placeholder="Enter your email or phone number"
                    value={formData.emailOrPhone}
                    onChange={handleChange}
                  />

                </div>

              </div>

              {/* PASSWORD */}

              <div className="login-input-group">

                <label>Password</label>

                <div className="login-input-wrapper">

                  {/* <img
                    src={lockIcon}
                    alt=""
                  /> */}

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />

                  <span
                    className="login-eye"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                  >
                    👁
                  </span>

                </div>

              </div>

              <div className="login-forgot">
                Forgot Password?
              </div>

              <button
                type="submit"
                className="login-btn"
                disabled={loading}
              >

                {loading
                  ? "Logging In..."
                  : "Login"}

              </button>

              <div className="login-divider">
                <span>
                  or continue with
                </span>
              </div>

              <button
                type="button"
                className="google-btn"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                  alt=""
                />

                Continue with Google

              </button>

              <p className="signup-link">

                Don't have an account?

                <button
                  type="button"
                  className="signup"
                  onClick={() =>
                    navigate("/signup")
                  }
                >
                  Sign Up
                </button>

              </p>

            </form>

          </div>

        </div>

      </div>

      {/* BOTTOM FEATURES */}

      <div className="login-bottom-strip">

        <div className="login-bottom-item">
          🌱 Farm Fresh Produce
        </div>

        <div className="login-bottom-item">
          🛡 Safe & Chemical Free
        </div>

        <div className="login-bottom-item">
          🚚 Fast Delivery
        </div>

        <div className="login-bottom-item">
          ₹ Easy Returns
        </div>

      </div>

    </div>
  );
}