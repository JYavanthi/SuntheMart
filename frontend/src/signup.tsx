
// import "./styles/signup.css";
// import React, { useState } from "react";
// import plant from "../src/assets/plant.jpg";
// import ggl from "../src/assets/ggl.png";
// import fcbk from "../src/assets/fcbk.png";
// import { useNavigate, useLocation } from "react-router-dom";
// import { API_URLS } from "../src/API-Urls";
// import { toast } from "react-hot-toast";
// import { useConfirm } from "../src/context/ConfirmContext";
// import recover from "./assets/recover.jpeg"

// export default function Signup() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { confirm } = useConfirm();

//   // 🔥 GET EDIT DATA
//   const editUser = location.state?.userData;

//   const [formData, setFormData] = useState({
//     name: editUser?.FirstName || "",
//     Phone: editUser?.ContactNo || "",
//     email: editUser?.Email || "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);

//   /* HANDLE INPUT CHANGE */
//   const handleChange = (e: any) => {
//     const { id, value } = e.target;

//     setFormData({
//       ...formData,
//       [id]: value,
//     });
//   };

//   /* VALIDATION FUNCTION */
//   const validateForm = () => {
//     const nameRegex = /^[A-Za-z\s]{3,}$/;
//     const phoneRegex = /^[0-9]{10}$/;
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!nameRegex.test(formData.name)) {
//       toast.error("Name must contain only letters and at least 3 characters");
//       return false;
//     }

//     if (!phoneRegex.test(formData.Phone)) {
//       toast.error("Phone number must be exactly 10 digits");
//       return false;
//     }

//     if (!emailRegex.test(formData.email)) {
//       toast.error("Enter a valid email address");
//       return false;
//     }

//     if (!editUser && formData.password.length < 10) {
//       toast.error("Password must be at least 10 characters");
//       return false;
//     }

//     return true;
//   };

//   /* SUBMIT */
//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     setLoading(true);

//     const payload = {
//       RoleID: 1,
//       FirstName: formData.name,
//       LastName: "",
//       Email: formData.email,
//       ContactNo: formData.Phone,
//       DOB: null,
//       Gender: null,
//       PasswordHash: formData.password,
//       Status: 1,
//       CreatedBy: 1,
//     };

//     try {
//       const url = editUser
//         ? `${API_URLS.BASE_URL}users/${editUser.UserID}`
//         : `${API_URLS.BASE_URL}${API_URLS.USERS}`;

//       const method = editUser ? "PUT" : "POST";

//       const response = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();

     
//       if (!editUser && data.recover) {
//   const confirmRecover = await confirm({
//     title: "",
//     subText: data.message,
//     confirmText: "Recover",
//     cancelText: "Cancel",
//     image:recover,
//     variant: "recovery",
//   });

//   if (confirmRecover) {
//     const recoverResponse = await fetch(
//       `${API_URLS.BASE_URL}users/${data.userData.UserID}/recover`,
//       { method: "PUT" }
//     );

//     const recoverData = await recoverResponse.json();

//     if (!recoverResponse.ok) {
//       toast.error(recoverData.message || "Failed to recover account");
//       return;
//     }

//     setFormData({
//       name: data.userData.FirstName,
//       Phone: data.userData.ContactNo,
//       email: data.userData.Email,
//       password: "",
//     });

//     toast.success("Account recovered. Please login.");
//     navigate("/login");
//     return;
//   } else {
//     toast.error("Use different email/phone to create new account");
//     return;
//   }
// }

//       if (!response.ok) {
//         toast.error(data.message || "Signup failed");
//         return;
//       }

//       // ✅ SUCCESS
//       if (editUser) {
//         toast.success("Profile updated successfully ✅");
//         navigate("/profile");
//       } else {
//         toast.success("Signup successful ✅");
//         navigate("/login");
//       }

//     } catch (error) {
//       console.error("Signup Error:", error);
//       toast.error("Server error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="signup-page">
//       <button className="back-home" onClick={() => navigate("/")}>
//         Back to Home
//       </button>

//       <div className="signup-card">

//         {/* LEFT */}
//         <div className="signup-left">
//           <h2>
//             Where <span>Healthy</span> Living <br /> Begins!
//           </h2>
//           <img src={plant} alt="Healthy plant" className="signup-plant-img" />
//         </div>

//         {/* RIGHT */}
//         <div className="signup-right">
//           <h2>
//             {editUser ? "Edit Profile" : "Sign "}
//             <span className="up">{editUser ? "" : "Up"}</span>
//           </h2>

//           <form onSubmit={handleSubmit}>

//             <label>Name</label>
//             <input
//               id="name"
//               type="text"
//               placeholder="Enter your Name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />

//             <label>Phone</label>
//             <input
//               id="Phone"
//               type="text"
//               placeholder="Enter your Contact No"
//               value={formData.Phone}
//               onChange={(e) => {
//                 const value = e.target.value.replace(/\D/g, "");
//                 if (value.length <= 10) {
//                   setFormData({
//                     ...formData,
//                     Phone: value,
//                   });
//                 }
//               }}
//               required
//             />

//             <label>Email</label>
//             <input
//               id="email"
//               type="email"
//               placeholder="Enter your Email id"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />

//             <label>Password</label>
//             <input
//               id="password"
//               type="password"
//               placeholder={editUser ? "Leave blank to keep same password" : "Minimum 10 characters"}
//               value={formData.password}
//               onChange={handleChange}
//             />

          
       
//   <button
//     type="submit"
//     className="signup-btn"
//     disabled={loading}
//   >
//     {loading
//       ? editUser
//         ? "Updating..."
//         : "Signing Up..."
//       : editUser
//       ? "Update Profile"
//       : "Sign Up"}
//   </button>


//   {editUser && (
//     <button
//       type="button"
//       className="cancel-btn-update"
//       onClick={() => navigate("/profile")}
//     >
//       Cancel
//     </button>
//   )}

             


//             {/* <div className="divider">------ O R ------</div> */}

//             {/* <div className="social-login">

//               <button type="button" className="google">
//                 <img src={ggl} alt="" /> Google
//               </button>

//               <button type="button" className="facebook">
//                 <img src={fcbk} alt="" /> Facebook
//               </button>

//             </div> */}

//           </form>
//         </div>

//       </div>
//     </div>
//   );
// }

import "./styles/signup.css";

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { toast } from "react-hot-toast";

import { API_URLS } from "../src/API-Urls";
import { useConfirm } from "../src/context/ConfirmContext";

import recover from "./assets/recover.jpeg";
import villageBg from "../src/assets/login-background.jpeg";

// import leafIcon from "../src/assets/leaf.png";
// import emailIcon from "../src/assets/email.png";
// import phoneIcon from "../src/assets/phone.png";
// import lockIcon from "../src/assets/lock.png";
// import userIcon from "../src/assets/user.png";

function Signup() {

  const navigate = useNavigate();

  const location = useLocation();

  const { confirm } = useConfirm();

  // EDIT USER
  const editUser = location.state?.userData;

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({

    name: editUser?.FirstName || "",

    Phone: editUser?.ContactNo || "",

    email: editUser?.Email || "",

    password: "",

    confirmPassword: "",

  });

  // INPUT CHANGE
  const handleChange = (e: any) => {

    const { id, value } = e.target;

    setFormData({
      ...formData,
      [id]: value,
    });
  };

  // VALIDATION
  const validateForm = () => {

    const nameRegex = /^[A-Za-z\s]{3,}$/;

    const phoneRegex = /^[0-9]{10}$/;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(formData.name)) {

      toast.error(
        "Name must contain only letters and minimum 3 characters"
      );

      return false;
    }

    if (!phoneRegex.test(formData.Phone)) {

      toast.error(
        "Phone number must be exactly 10 digits"
      );

      return false;
    }

    if (!emailRegex.test(formData.email)) {

      toast.error(
        "Enter valid email address"
      );

      return false;
    }

    if (!editUser && formData.password.length < 10) {

      toast.error(
        "Password must be minimum 10 characters"
      );

      return false;
    }

    if (
      !editUser &&
      formData.password !== formData.confirmPassword
    ) {

      toast.error(
        "Passwords do not match"
      );

      return false;
    }

    return true;
  };

  // SUBMIT
  const handleSubmit = async (e: any) => {

    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    const payload = {

      RoleID: 1,

      FirstName: formData.name,

      LastName: "",

      Email: formData.email,

      ContactNo: formData.Phone,

      DOB: null,

      Gender: null,

      PasswordHash: formData.password,

      Status: 1,

      CreatedBy: 1,

    };

    try {

      const url = editUser
        ? `${API_URLS.BASE_URL}users/${editUser.UserID}`
        : `${API_URLS.BASE_URL}${API_URLS.USERS}`;

      const method = editUser ? "PUT" : "POST";

      const response = await fetch(url, {

        method,

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),

      });

      const data = await response.json();

      // RECOVER FLOW
      if (!editUser && data.recover) {

        const confirmRecover = await confirm({

          title: "",

          subText: data.message,

          confirmText: "Recover",

          cancelText: "Cancel",

          image: recover,

          variant: "recovery",

        });

        if (confirmRecover) {

          const recoverResponse = await fetch(
            `${API_URLS.BASE_URL}users/${data.userData.UserID}/recover`,
            {
              method: "PUT",
            }
          );

          const recoverData = await recoverResponse.json();

          if (!recoverResponse.ok) {

            toast.error(
              recoverData.message ||
                "Failed to recover account"
            );

            return;
          }

          toast.success(
            "Account recovered successfully!"
          );

          navigate("/login");

          return;

        } else {

          toast.error(
            "Use different email or phone number"
          );

          return;
        }
      }

      // FAILED
      if (!response.ok) {

        toast.error(
          data.message || "Signup failed"
        );

        return;
      }

      // SUCCESS
      if (editUser) {

        toast.success(
          "Profile updated successfully"
        );

        navigate("/profile");

      } else {

        toast.success(
          "Signup successful"
        );

        navigate("/login");
      }

    } catch (error) {

      console.error("Signup Error:", error);

      toast.error(
        "Server error. Please try again."
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div
      className="signup-page"
      style={{
        backgroundImage: `url(${villageBg})`,
      }}
    >

      <div className="signup-overlay">

        {/* LEFT */}

        <div className="signup-left">

          <div className="signup-logo">

            <div className="signup-logo-icon">
              🌱
            </div>

            <div>

              <h2>SunThe Mart</h2>

              <p>
                From Our Farms To Your Home
              </p>

            </div>

          </div>

          <div className="signup-left-content">

            <h1>
              <span>From Farmers.</span>
              <br />
              To Your Family.
            </h1>

            <p>
              Join SunThe Mart and enjoy
              fresh, healthy and chemical-free
              products delivered to your home.
            </p>

            <div className="signup-feature-list">

              <div className="signup-feature-card">

                <div className="signup-feature-icon">
                  🌿
                </div>

                <div>

                  <h4>Direct from Farmers</h4>

                  <p>
                    Fresh & trusted products
                  </p>

                </div>

              </div>

              <div className="signup-feature-card">

                <div className="signup-feature-icon">
                  🍃
                </div>

                <div>

                  <h4>100% Fresh & Natural</h4>

                  <p>
                    No chemicals added
                  </p>

                </div>

              </div>

              <div className="signup-feature-card">

                <div className="signup-feature-icon">
                  ₹
                </div>

                <div>

                  <h4>No Middlemen</h4>

                  <p>
                    Better market pricing
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="signup-right">

          <div className="signup-form-card">

            <h2>

              {editUser
                ? "Edit Your Profile"
                : "Create Your Account"}
{/* 
              <img
                src={leafIcon}
                alt=""
              /> */}

            </h2>

            <p className="signup-subtitle">

              Sign up and start your fresh journey
              with SunThe Mart

            </p>

            <form onSubmit={handleSubmit}>

              {/* NAME */}

              <div className="signup-input-group">

                <label>Full Name</label>

                <div className="signup-input-wrapper">

                  {/* <img
                    src={userIcon}
                    alt=""
                  /> */}

                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                  />

                </div>

              </div>

              {/* EMAIL */}

              <div className="signup-input-group">

                <label>Email Address</label>

                <div className="signup-input-wrapper">

                  {/* <img
                    src={emailIcon}
                    alt=""
                  /> */}

                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                  />

                </div>

              </div>

              {/* PHONE */}

              <div className="signup-input-group">

                <label>Phone Number</label>

                <div className="signup-input-wrapper">

                  {/* <img
                    src={phoneIcon}
                    alt=""
                  /> */}

                  <input
                    id="Phone"
                    type="text"
                    placeholder="Enter your phone number"
                    value={formData.Phone}
                    onChange={(e) => {

                      const value =
                        e.target.value.replace(/\D/g, "");

                      if (value.length <= 10) {

                        setFormData({
                          ...formData,
                          Phone: value,
                        });
                      }
                    }}
                  />

                </div>

              </div>

              {/* PASSWORD ROW */}

              <div className="signup-password-row">

                {/* PASSWORD */}

                <div className="signup-input-group">

                  <label>Password</label>

                  <div className="signup-input-wrapper">

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
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                    />

                    <span
                      className="signup-eye"
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

                {/* CONFIRM PASSWORD */}

                {!editUser && (

                  <div className="signup-input-group">

                    <label>
                      Confirm Password
                    </label>

                    <div className="signup-input-wrapper">

                      {/* <img
                        src={lockIcon}
                        alt=""
                      /> */}

                      <input
                        id="confirmPassword"
                        type={
                          showConfirmPassword
                            ? "text"
                            : "password"
                        }
                        placeholder="Confirm password"
                        value={
                          formData.confirmPassword
                        }
                        onChange={handleChange}
                      />

                      <span
                        className="signup-eye"
                        onClick={() =>
                          setShowConfirmPassword(
                            !showConfirmPassword
                          )
                        }
                      >
                        👁
                      </span>

                    </div>

                  </div>
                )}

              </div>

              {/* TERMS */}

              <div className="signup-terms">

                <input type="checkbox" required />

                <span>
                  I agree to the
                  <b>
                    Terms & Conditions
                  </b>
                  and
                  <b>
                    Privacy Policy
                  </b>
                </span>

              </div>

              {/* BUTTON */}

              <button
                type="submit"
                className="signup-btn"
                disabled={loading}
              >

                {loading
                  ? editUser
                    ? "Updating..."
                    : "Signing Up..."
                  : editUser
                  ? "Update Profile"
                  : "Sign Up"}

              </button>

              {/* GOOGLE */}

              <div className="signup-divider">

                <span>
                  or continue with
                </span>

              </div>

              <button
                type="button"
                className="signup-google-btn"
              >

                <img
                  src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                  alt=""
                />

                Continue with Google

              </button>

              {/* LOGIN */}

              <p className="signup-login-link">

                Already have an account?

                <button
                  type="button"
                  className="signup-login-btn"
                  onClick={() =>
                    navigate("/login")
                  }
                >
                  Login
                </button>

              </p>

            </form>

          </div>

        </div>

      </div>

      {/* BOTTOM STRIP */}

      <div className="signup-bottom-strip">

        <div className="signup-bottom-item">
          🌱 Farm Fresh Produce
        </div>

        <div className="signup-bottom-item">
          🛡 Safe & Chemical Free
        </div>

        <div className="signup-bottom-item">
          🚚 Fast & Reliable Delivery
        </div>

        <div className="signup-bottom-item">
          ₹ Easy Returns
        </div>

      </div>

    </div>
  );
}

export default Signup;