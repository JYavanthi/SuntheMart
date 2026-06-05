import React from "react";
import "./styles/t&c.css";

import bgImg from "./assets/terms-bg.jpeg";
import Navbar from "./Navbar/navbar";
import Footer from "./footer";

// import shieldIcon from "../assets/shield.png";
// import docIcon from "../assets/document.png";
// import userIcon from "../assets/user.png";
// import orderIcon from "../assets/card.png";
// import deliveryIcon from "../assets/delivery.png";
// import refundIcon from "../assets/refund.png";
// import refreshIcon from "../assets/refresh.png";
// import privacyIcon from "../assets/privacy.png";
// import updateIcon from "../assets/update.png";
// import mailIcon from "../assets/mail.png";

function TermsConditions() {
  return (
    <>
    <Navbar/>
    <div className="terms-page">

      {/* HERO */}
      <div
        className="terms-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url(${bgImg})`,
        }}
      >
        <div className="terms-hero-content">

          <h1>
            Terms & Conditions
            <span>🌿</span>
          </h1>

          <p>
            Please read these terms and conditions carefully
            before using our website or services.
          </p>

          <div className="terms-breadcrumb">
            <span>🏠 Home</span>
            <span>/</span>
            <span>Terms & Conditions</span>
          </div>

        </div>
      </div>

      {/* CONTENT */}
      <div className="terms-content-wrapper">

        <div className="terms-card">

          {/* INTRO */}
          <div className="terms-intro">

            <div className="terms-intro-icon">
              {/* <img src={shieldIcon} alt="" /> */}
            </div>

            <div>
              <p>
                Welcome to SunThe Mart. By accessing or using our
                website and services, you agree to comply with and
                be bound by the following Terms & Conditions and
                our Privacy Policy.
              </p>
            </div>

          </div>

          {/* GRID */}
          <div className="terms-grid">

            {/* LEFT */}
            <div className="terms-column">

              <div className="terms-item">
                <div className="terms-icon">
                  {/* <img src={docIcon} alt="" /> */}
                </div>

                <div className="terms-text">
                  <h3>1. Acceptance of Terms</h3>

                  <p>
                    By using our website or placing an order,
                    you agree to these Terms & Conditions and
                    our Privacy Policy. If you do not agree,
                    please do not use our services.
                  </p>
                </div>
              </div>

              <div className="terms-item">
                <div className="terms-icon">
                  {/* <img src={userIcon} alt="" /> */}
                </div>

                <div className="terms-text">
                  <h3>2. Account Registration</h3>

                  <p>
                    To place an order, you may need to create
                    an account. You agree to provide accurate,
                    current, and complete information and keep
                    your account details secure.
                  </p>
                </div>
              </div>

              <div className="terms-item">
                <div className="terms-icon">
                  {/* <img src={orderIcon} alt="" /> */}
                </div>

                <div className="terms-text">
                  <h3>3. Orders & Payments</h3>

                  <p>
                    All orders are subject to availability and
                    confirmation. Prices are displayed in INR
                    and may change without prior notice.
                  </p>
                </div>
              </div>

              <div className="terms-item">
                <div className="terms-icon">
                  {/* <img src={deliveryIcon} alt="" /> */}
                </div>

                <div className="terms-text">
                  <h3>4. Delivery</h3>

                  <p>
                    We strive to deliver your order within the
                    delivery timelines mentioned. Delivery time
                    may vary due to external factors.
                  </p>
                </div>
              </div>

              <div className="terms-item">
                <div className="terms-icon">
                  {/* <img src={refundIcon} alt="" /> */}
                </div>

                <div className="terms-text">
                  <h3>5. Product Quality</h3>

                  <p>
                    We ensure fresh and quality products.
                    Due to the nature of fresh produce,
                    slight variations in size, color and
                    freshness may occur.
                  </p>
                </div>
              </div>

            </div>

            {/* RIGHT */}
            <div className="terms-column">

              <div className="terms-item">
                <div className="terms-icon">
                  {/* <img src={refreshIcon} alt="" /> */}
                </div>

                <div className="terms-text">
                  <h3>6. Returns & Refunds</h3>

                  <p>
                    We offer hassle-free returns for eligible
                    items as per our Returns & Refund Policy.
                    Refunds will be processed to the original
                    payment method.
                  </p>
                </div>
              </div>

              <div className="terms-item">
                <div className="terms-icon">
                  {/* <img src={shieldIcon} alt="" /> */}
                </div>

                <div className="terms-text">
                  <h3>7. Limitation of Liability</h3>

                  <p>
                    SunThe Mart is not liable for indirect,
                    incidental, or consequential damages arising
                    from the use of our services or products.
                  </p>
                </div>
              </div>

              <div className="terms-item">
                <div className="terms-icon">
                  {/* <img src={privacyIcon} alt="" /> */}
                </div>

                <div className="terms-text">
                  <h3>8. Privacy</h3>

                  <p>
                    Your privacy is important to us.
                    Please review our Privacy Policy to
                    understand how we collect, use, and
                    protect your information.
                  </p>
                </div>
              </div>

              <div className="terms-item">
                <div className="terms-icon">
                  {/* <img src={updateIcon} alt="" /> */}
                </div>

                <div className="terms-text">
                  <h3>9. Changes to Terms</h3>

                  <p>
                    We may update these terms from time
                    to time. Changes will be effective
                    upon posting on this page.
                  </p>
                </div>
              </div>

              <div className="terms-item">
                <div className="terms-icon">
                  {/* <img src={mailIcon} alt="" /> */}
                </div>

                <div className="terms-text">
                  <h3>10. Contact Us</h3>

                  <p>
                    If you have any questions about these
                    Terms & Conditions, please contact us
                    at support@sunthemart.com
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* FOOT */}
          <div className="terms-footer">

            <div className="terms-updated">
              📅 Last Updated: May 20, 2024
            </div>

            <div className="terms-leaf">
              🌿
            </div>

          </div>

        </div>

      </div>

      {/* BOTTOM STRIP */}
      <div className="terms-bottom-strip">

        <div className="terms-bottom-item">
          🌿 Farm Fresh Produce
        </div>

        <div className="terms-bottom-item">
          🛡️ Safe & Chemical Free
        </div>

        <div className="terms-bottom-item">
          🚚 Fast & Reliable Delivery
        </div>

        <div className="terms-bottom-item">
          💳 Easy Returns
        </div>

      </div>

    </div>
    <Footer/>
    </>
  );
}

export default TermsConditions;