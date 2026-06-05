import React from "react";
import "./styles/privacy-policy.css";

import bgImg from "./assets/terms-bg.jpeg";
import Navbar from "./Navbar/navbar";
import Footer from "./footer";
// import shieldIcon from "../assets/shield.png";
// import userIcon from "../assets/user.png";
// import shareIcon from "../assets/share.png";
// import cookieIcon from "../assets/cookie.png";
// import externalIcon from "../assets/external-link.png";
// import mailIcon from "../assets/mail.png";
// import settingsIcon from "../assets/settings.png";
// import databaseIcon from "../assets/database.png";
// import rightsIcon from "../assets/rights.png";
// import docIcon from "../assets/document.png";

function PrivacyPolicy() {

  return (
<><Navbar/>

    <div className="privacy-page">

      {/* HERO */}

      <div
        className="privacy-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url(${bgImg})`,
        }}
      >

        <div className="privacy-hero-content">

          <h1>
            Privacy Policy
          </h1>

          <p>
            Your privacy is important to us.
            This policy explains how we collect,
            use and protect your information.
          </p>

          <div className="privacy-breadcrumb">
            <span>🏠 Home</span>
            <span>/</span>
            <span>Privacy Policy</span>
          </div>

        </div>

      </div>

      {/* MAIN CARD */}

      <div className="privacy-content-wrapper">

        <div className="privacy-card">

          {/* INTRO */}

          <div className="privacy-intro">

            <div className="privacy-intro-icon">

              {/* <img
                src={shieldIcon}
                alt=""
              /> */}

            </div>

            <p>
              At SunThe Mart, we are committed to protecting your privacy
              and ensuring a safe and seamless shopping experience.
            </p>

          </div>

          {/* GRID */}

          <div className="privacy-grid">

            {/* LEFT */}

            <div className="privacy-column">

              <div className="privacy-item">

                <div className="privacy-icon">
                  {/* <img src={userIcon} alt="" /> */}
                </div>

                <div className="privacy-text">

                  <h3>
                    1. Information We Collect
                  </h3>

                  <p>
                    We collect information you provide to us such as your
                    name, email address, phone number, delivery address,
                    and payment details when you place an order or create
                    an account.
                  </p>

                </div>

              </div>

              <div className="privacy-item">

                <div className="privacy-icon">
                  {/* <img src={shareIcon} alt="" /> */}
                </div>

                <div className="privacy-text">

                  <h3>
                    3. Information Sharing
                  </h3>

                  <p>
                    We do not sell or rent your personal information.
                    We may share information only with trusted service
                    providers who help us operate our website and deliver orders.
                  </p>

                </div>

              </div>

              <div className="privacy-item">

                <div className="privacy-icon">
                  {/* <img src={cookieIcon} alt="" /> */}
                </div>

                <div className="privacy-text">

                  <h3>
                    5. Cookies
                  </h3>

                  <p>
                    We use cookies to enhance your browsing experience,
                    remember preferences, and analyze website traffic.
                    You can disable cookies through your browser settings.
                  </p>

                </div>

              </div>

              <div className="privacy-item">

                <div className="privacy-icon">
                  {/* <img src={externalIcon} alt="" /> */}
                </div>

                <div className="privacy-text">

                  <h3>
                    7. Third-Party Links
                  </h3>

                  <p>
                    Our website may contain links to third-party sites.
                    We are not responsible for their privacy practices.
                    Please review their policies before providing any information.
                  </p>

                </div>

              </div>

              <div className="privacy-item">

                <div className="privacy-icon">
                  {/* <img src={mailIcon} alt="" /> */}
                </div>

                <div className="privacy-text">

                  <h3>
                    9. Contact Us
                  </h3>

                  <p>
                    If you have any questions about this Privacy Policy
                    or our data practices, please contact us at
                    support@sunthemart.com or call +91 90000 12345.
                  </p>

                </div>

              </div>

            </div>

            {/* RIGHT */}

            <div className="privacy-column">

              <div className="privacy-item">

                <div className="privacy-icon">
                  {/* <img src={settingsIcon} alt="" /> */}
                </div>

                <div className="privacy-text">

                  <h3>
                    2. How We Use Your Information
                  </h3>

                  <p>
                    We use your information to process orders,
                    deliver products, improve our services,
                    communicate with you, and personalize your shopping experience.
                  </p>

                </div>

              </div>

              <div className="privacy-item">

                <div className="privacy-icon">
                  {/* <img src={databaseIcon} alt="" /> */}
                </div>

                <div className="privacy-text">

                  <h3>
                    4. Data Security
                  </h3>

                  <p>
                    We implement industry-standard security measures
                    to protect your personal information from unauthorized
                    access, alteration, disclosure, or destruction.
                  </p>

                </div>

              </div>

              <div className="privacy-item">

                <div className="privacy-icon">
                  {/* <img src={rightsIcon} alt="" /> */}
                </div>

                <div className="privacy-text">

                  <h3>
                    6. Your Rights
                  </h3>

                  <p>
                    You have the right to access, update, or delete your
                    personal information. You can also opt out of marketing
                    communications at any time.
                  </p>

                </div>

              </div>

              <div className="privacy-item">

                <div className="privacy-icon">
                  {/* <img src={docIcon} alt="" /> */}
                </div>

                <div className="privacy-text">

                  <h3>
                    8. Changes to This Policy
                  </h3>

                  <p>
                    We may update this Privacy Policy from time to time.
                    Changes will be posted on this page with the updated
                    effective date.
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* FOOTER */}

          <div className="privacy-footer">

            <div className="privacy-updated">
              📅 Last Updated: May 20, 2024
            </div>

            <div className="privacy-leaf">
              🌿
            </div>

          </div>

        </div>

      </div>

      {/* BOTTOM STRIP */}

      <div className="privacy-bottom-strip">

        <div className="privacy-bottom-item">
          🌿 Farm Fresh Produce
        </div>

        <div className="privacy-bottom-item">
          🛡️ Safe & Chemical Free
        </div>

        <div className="privacy-bottom-item">
          🚚 Fast & Reliable Delivery
        </div>

        <div className="privacy-bottom-item">
          💳 Easy Returns
        </div>

      </div>

    </div>
    <Footer/>
    </>
  );
}

export default PrivacyPolicy;