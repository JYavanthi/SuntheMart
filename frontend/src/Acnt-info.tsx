import React, {
  useEffect,
  useState,
} from "react";

import "./styles/acnt-info.css";

import Navbar from "./Navbar/navbar";
import Footer from "./footer";

import {
  useNavigate,
} from "react-router-dom";

import {
  API_URLS,
} from "./API-Urls";

import {
  toast,
} from "react-hot-toast";

import {
  useConfirm,
} from "./context/ConfirmContext";

import ProfileSidebar from "./ProfileSidebar";

import logout from "./assets/log_out.png";
import del from "./assets/delete_acnt.jpeg";
import banner from "./assets/cart-bg.jpeg";

interface User {
  UserID: number;
  FirstName: string;
  Email: string;
  ContactNo: string;
}

interface Order {
  orderId: number;
  finalAmount: number;
}

const AccountInfo = () => {

  const navigate =
    useNavigate();

  const { confirm } =
    useConfirm();

  const [user, setUser] =
    useState<User | null>(null);

  const [orders, setOrders] =
    useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [emailNotifications, setEmailNotifications] =
    useState(true);

  const [smsNotifications, setSmsNotifications] =
    useState(true);

  /* =========================
     LOGOUT
  ========================= */

  const logoutUser = (
    navigate: any
  ) => {

    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "userId"
    );

    localStorage.removeItem(
      "roleId"
    );

    window.dispatchEvent(
      new Event("userChanged")
    );

    navigate("/");

  };

  /* =========================
     INIT
  ========================= */

  useEffect(() => {

    const storedUser =
      JSON.parse(
        localStorage.getItem(
          "user"
        ) || "null"
      );

    if (
      !storedUser?.UserID
    ) {

      navigate("/");

      return;

    }

    getUserProfileById(
      storedUser.UserID
    );

    getUserOrders(
      storedUser.UserID
    );

  }, []);

  /* =========================
     PROFILE API
  ========================= */

  const getUserProfileById =
    async (
      userId: number
    ) => {

      try {

        const response =
          await fetch(
            `${API_URLS.BASE_URL}${API_URLS.USERS}/${userId}`
          );

        const result =
          await response.json();

        if (
          result.success
        ) {

          setUser(
            result.data
          );

        }

      } catch (error) {

        console.error(
          "❌ Error fetching profile:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

  /* =========================
     ORDERS API
  ========================= */

  const getUserOrders =
    async (
      userId: number
    ) => {

      try {

        const res =
          await fetch(
            `http://localhost:4000/api/orders/user/${userId}`
          );

        const data =
          await res.json();

        if (
          data.success
        ) {

          setOrders(
            data.data
          );

        }

      } catch (err) {

        console.error(
          "❌ Order fetch error:",
          err
        );

      }

    };

  /* =========================
     CHANGE PASSWORD
  ========================= */

  const handleChangePassword =
    async () => {

      if (
        !currentPassword ||
        !newPassword ||
        !confirmPassword
      ) {

        toast.error(
          "Please fill all fields"
        );

        return;

      }

      if (
        newPassword !==
        confirmPassword
      ) {

        toast.error(
          "Passwords do not match"
        );

        return;

      }

      toast.success(
        "Password changed successfully"
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

    };

  /* =========================
     DELETE ACCOUNT
  ========================= */

  const handleDeleteAccount =
    async () => {

      const confirmDelete =
        await confirm({
          title:
            "Are you sure, you want to DELETE this Account?",
          subText:
            "This action can be recovered later.",
          confirmText:
            "Yes",
          cancelText:
            "No",
          image: del,
          variant:
            "delete",
        });

      if (
        !confirmDelete
      )
        return;

      try {

        const userId =
          localStorage.getItem(
            "userId"
          );

        if (
          !userId
        ) {

          toast.error(
            "User not found"
          );

          return;

        }

        const res =
          await fetch(
            `${API_URLS.BASE_URL}users/${userId}/delete`,
            {
              method:
                "PUT",
            }
          );

        const data =
          await res.json();

        if (
          data.success
        ) {

          localStorage.clear();

          toast.success(
            "Account deleted successfully"
          );

          navigate(
            "/signup"
          );

        } else {

          toast.error(
            "Failed to delete account"
          );

        }

      } catch (error) {

        console.error(
          "❌ Delete error:",
          error
        );

        toast.error(
          "Server error while deleting account"
        );

      }

    };

  return (
    <>
      <Navbar />

      <div className="acnt-info-page">

        {/* =====================
            BANNER
        ===================== */}

        <div className="acnt-info-banner">

          <img
            src={banner}
            alt=""
            className="acnt-info-banner-img"
          />

          <div className="acnt-info-banner-overlay"></div>

          <div className="acnt-info-banner-content">

            <div className="acnt-info-banner-left">

              <h1>
                Account Settings
              </h1>

              <p>
                Manage your account
                preferences and security
                to keep your experience
                seamless.
              </p>

            </div>

            <div className="acnt-info-banner-right">

              <div className="acnt-info-banner-card">

                <div className="acnt-info-banner-icon">
                  🔒
                </div>

                <div>

                  <h3>
                    Your account is secure
                  </h3>

                  <p>
                    We keep your information
                    safe and protected.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =====================
            MAIN
        ===================== */}

        <div className="acnt-info-container">

          {/* SIDEBAR */}

          <ProfileSidebar />

          {/* RIGHT */}

          <div className="acnt-info-right">

            {/* PERSONAL INFO */}

            <div className="acnt-info-card">

              <div className="acnt-info-card-top">

                <div>

                  <h2>
                    Personal Information
                  </h2>

                  <p>
                    Update your personal
                    details and email
                    address.
                  </p>

                </div>

                <button
                  className="acnt-info-edit-btn"
                  onClick={() =>
                    navigate(
                      "/signup",
                      {
                        state: {
                          userData:
                            user,
                        },
                      }
                    )
                  }
                >
                  Edit
                </button>

              </div>

              <div className="acnt-info-grid">

                <div className="acnt-info-box">

                  <div className="acnt-info-icon">
                    👤
                  </div>

                  <div>

                    <span>
                      Full Name
                    </span>

                    <h4>
                      {
                        user?.FirstName
                      }
                    </h4>

                  </div>

                </div>

                <div className="acnt-info-box">

                  <div className="acnt-info-icon">
                    📞
                  </div>

                  <div>

                    <span>
                      Phone Number
                    </span>

                    <h4>
                      +91{" "}
                      {
                        user?.ContactNo
                      }
                    </h4>

                  </div>

                </div>

                <div className="acnt-info-box">

                  <div className="acnt-info-icon">
                    ✉
                  </div>

                  <div>

                    <span>
                      Email Address
                    </span>

                    <h4>
                      {
                        user?.Email
                      }
                    </h4>

                  </div>

                </div>

                <div className="acnt-info-box">

                  <div className="acnt-info-icon">
                    📅
                  </div>

                  <div>

                    <span>
                      Date Of Birth
                    </span>

                    <h4>
                      15 May, 1990
                    </h4>

                  </div>

                </div>

              </div>

            </div>

            {/* PASSWORD */}

            <div className="acnt-info-card">

              <div className="acnt-info-card-top">

                <div>

                  <h2>
                    Change Password
                  </h2>

                  <p>
                    Choose a strong
                    password to keep your
                    account secure.
                  </p>

                </div>

                <button
                  className="acnt-info-edit-btn"
                  onClick={
                    handleChangePassword
                  }
                >
                  Change Password
                </button>

              </div>

              <div className="acnt-info-password-grid">

                <input
                  type="password"
                  placeholder="Enter current password"
                  value={
                    currentPassword
                  }
                  onChange={(e) =>
                    setCurrentPassword(
                      e.target.value
                    )
                  }
                />

                <input
                  type="password"
                  placeholder="Enter new password"
                  value={
                    newPassword
                  }
                  onChange={(e) =>
                    setNewPassword(
                      e.target.value
                    )
                  }
                />

                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={
                    confirmPassword
                  }
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

            {/* PREFERENCES */}

            <div className="acnt-info-card">

              <div className="acnt-info-card-top">

                <div>

                  <h2>
                    Preferences
                  </h2>

                  <p>
                    Manage your preferences
                    and communication
                    settings.
                  </p>

                </div>

                <button className="acnt-info-edit-btn">
                  Manage
                </button>

              </div>

              <div className="acnt-info-preference-item">

                <div className="acnt-info-pref-left">

                  <div className="acnt-info-icon">
                    🔔
                  </div>

                  <div>

                    <h4>
                      Email Notifications
                    </h4>

                    <p>
                      Receive updates about
                      orders and offers.
                    </p>

                  </div>

                </div>

                <label className="acnt-info-switch">

                  <input
                    type="checkbox"
                    checked={
                      emailNotifications
                    }
                    onChange={() =>
                      setEmailNotifications(
                        !emailNotifications
                      )
                    }
                  />

                  <span className="acnt-info-slider"></span>

                </label>

              </div>

              <div className="acnt-info-preference-item">

                <div className="acnt-info-pref-left">

                  <div className="acnt-info-icon">
                    💬
                  </div>

                  <div>

                    <h4>
                      SMS Notifications
                    </h4>

                    <p>
                      Receive delivery
                      alerts on your phone.
                    </p>

                  </div>

                </div>

                <label className="acnt-info-switch">

                  <input
                    type="checkbox"
                    checked={
                      smsNotifications
                    }
                    onChange={() =>
                      setSmsNotifications(
                        !smsNotifications
                      )
                    }
                  />

                  <span className="acnt-info-slider"></span>

                </label>

              </div>

            </div>

            {/* DELETE */}

            <div className="acnt-info-card">

              <div className="acnt-info-card-top">

                <div>

                  <h2>
                    Delete Account
                  </h2>

                  <p>
                    Once you delete your
                    account there is no
                    going back.
                  </p>

                </div>

                <button
                  className="acnt-info-delete-btn"
                  onClick={
                    handleDeleteAccount
                  }
                >
                  Delete Account
                </button>

              </div>

              <div className="acnt-info-warning">

                ⚠ Deleting your account
                will permanently remove
                your data and access.

              </div>

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default AccountInfo;