
// import "./styles/signup.css";
// import React, { useState } from "react";
// import plant from "../src/assets/plant.jpg";
// import ggl from "../src/assets/ggl.png";
// import fcbk from "../src/assets/fcbk.png";
// import { useNavigate } from "react-router-dom";
// import { API_URLS } from "../src/API-Urls";

// export default function Signup() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     Phone: "",
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);

//   /* HANDLE INPUT CHANGE */

//   const handleChange = (e) => {
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
//       alert("Name must contain only letters and at least 3 characters");
//       return false;
//     }

//     if (!phoneRegex.test(formData.Phone)) {
//       alert("Phone number must be exactly 10 digits");
//       return false;
//     }

//     if (!emailRegex.test(formData.email)) {
//       alert("Enter a valid email address");
//       return false;
//     }

//     if (formData.password.length < 10) {
//       alert("Password must be at least 10 characters");
//       return false;
//     }

//     return true;
//   };

//   /* SUBMIT */

//   const handleSubmit = async (e) => {
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
//       const response = await fetch(
//         `${API_URLS.BASE_URL}${API_URLS.USERS}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         }
//       );

//       const data = await response.json();

//       /* ACCOUNT RECOVERY FLOW */

//       if (data.recover) {
//         const confirmRecover = window.confirm(data.message);

//         if (confirmRecover) {

//           await fetch(
//             `${API_URLS.BASE_URL}users/${data.userData.UserID}/recover`,
//             { method: "PUT" }
//           );

//           setFormData({
//             name: data.userData.FirstName,
//             Phone: data.userData.ContactNo,
//             email: data.userData.Email,
//             password: "",
//           });

//           alert("Account recovered. Please login.");
//           navigate("/login");
//           return;
//         } else {
//           alert("Please use different email/phone to create new account.");
//           return;
//         }
//       }

//       if (!response.ok) {
//         alert(data.message || "Signup failed");
//         return;
//       }

//       alert("✅ Signup successful!");
//       navigate("/login");

//     } catch (error) {
//       console.error("Signup Error:", error);
//       alert("Server error");
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
//           <img src={plant} alt="Healthy plant" className="plant-img" />
//         </div>

//         {/* RIGHT */}

//         <div className="signup-right">
//           <h2>
//             Sign <span className="up">Up</span>
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
//                     Phone: value
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
//               placeholder="Minimum 10 characters"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />

//             <button
//               type="submit"
//               className="signup-btn"
//               disabled={loading}
//             >
//               {loading ? "Signing Up..." : "Sign Up"}
//             </button>

//             <div className="divider">------ O R ------</div>

//             <div className="social-login">

//               <button type="button" className="google">
//                 <img src={ggl} alt="" /> Google
//               </button>

//               <button type="button" className="facebook">
//                 <img src={fcbk} alt="" /> Facebook
//               </button>

//             </div>

//           </form>
//         </div>

//       </div>
//     </div>
//   );
// }


import "./styles/signup.css";
import React, { useState } from "react";
import plant from "../src/assets/plant.jpg";
import ggl from "../src/assets/ggl.png";
import fcbk from "../src/assets/fcbk.png";
import { useNavigate, useLocation } from "react-router-dom";
import { API_URLS } from "../src/API-Urls";
import { toast } from "react-hot-toast";
import { useConfirm } from "../src/context/ConfirmContext";
import recover from "./assets/recover.jpeg"

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const { confirm } = useConfirm();

  // 🔥 GET EDIT DATA
  const editUser = location.state?.userData;

  const [formData, setFormData] = useState({
    name: editUser?.FirstName || "",
    Phone: editUser?.ContactNo || "",
    email: editUser?.Email || "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  /* HANDLE INPUT CHANGE */
  const handleChange = (e: any) => {
    const { id, value } = e.target;

    setFormData({
      ...formData,
      [id]: value,
    });
  };

  /* VALIDATION FUNCTION */
  const validateForm = () => {
    const nameRegex = /^[A-Za-z\s]{3,}$/;
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(formData.name)) {
      toast.error("Name must contain only letters and at least 3 characters");
      return false;
    }

    if (!phoneRegex.test(formData.Phone)) {
      toast.error("Phone number must be exactly 10 digits");
      return false;
    }

    if (!emailRegex.test(formData.email)) {
      toast.error("Enter a valid email address");
      return false;
    }

    if (!editUser && formData.password.length < 10) {
      toast.error("Password must be at least 10 characters");
      return false;
    }

    return true;
  };

  /* SUBMIT */
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

     
      if (!editUser && data.recover) {
  const confirmRecover = await confirm({
    title: "",
    subText: data.message,
    confirmText: "Recover",
    cancelText: "Cancel",
    image:recover,
    variant: "recovery",
  });

  if (confirmRecover) {
    const recoverResponse = await fetch(
      `${API_URLS.BASE_URL}users/${data.userData.UserID}/recover`,
      { method: "PUT" }
    );

    const recoverData = await recoverResponse.json();

    if (!recoverResponse.ok) {
      toast.error(recoverData.message || "Failed to recover account");
      return;
    }

    setFormData({
      name: data.userData.FirstName,
      Phone: data.userData.ContactNo,
      email: data.userData.Email,
      password: "",
    });

    toast.success("Account recovered. Please login.");
    navigate("/login");
    return;
  } else {
    toast.error("Use different email/phone to create new account");
    return;
  }
}

      if (!response.ok) {
        toast.error(data.message || "Signup failed");
        return;
      }

      // ✅ SUCCESS
      if (editUser) {
        toast.success("Profile updated successfully ✅");
        navigate("/profile");
      } else {
        toast.success("Signup successful ✅");
        navigate("/login");
      }

    } catch (error) {
      console.error("Signup Error:", error);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <button className="back-home" onClick={() => navigate("/")}>
        Back to Home
      </button>

      <div className="signup-card">

        {/* LEFT */}
        <div className="signup-left">
          <h2>
            Where <span>Healthy</span> Living <br /> Begins!
          </h2>
          <img src={plant} alt="Healthy plant" className="signup-plant-img" />
        </div>

        {/* RIGHT */}
        <div className="signup-right">
          <h2>
            {editUser ? "Edit Profile" : "Sign "}
            <span className="up">{editUser ? "" : "Up"}</span>
          </h2>

          <form onSubmit={handleSubmit}>

            <label>Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label>Phone</label>
            <input
              id="Phone"
              type="text"
              placeholder="Enter your Contact No"
              value={formData.Phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 10) {
                  setFormData({
                    ...formData,
                    Phone: value,
                  });
                }
              }}
              required
            />

            <label>Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your Email id"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <input
              id="password"
              type="password"
              placeholder={editUser ? "Leave blank to keep same password" : "Minimum 10 characters"}
              value={formData.password}
              onChange={handleChange}
            />

            {/* <button
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
            </button> */}

       
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


  {editUser && (
    <button
      type="button"
      className="cancel-btn-update"
      onClick={() => navigate("/profile")}
    >
      Cancel
    </button>
  )}

             


            {/* <div className="divider">------ O R ------</div> */}

            {/* <div className="social-login">

              <button type="button" className="google">
                <img src={ggl} alt="" /> Google
              </button>

              <button type="button" className="facebook">
                <img src={fcbk} alt="" /> Facebook
              </button>

            </div> */}

          </form>
        </div>

      </div>
    </div>
  );
}