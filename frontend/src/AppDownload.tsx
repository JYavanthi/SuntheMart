import React from "react";
import "./styles/AppDownload.css";

import phoneImg from "./assets/mbl.png";
import googlePlay from "./assets/ggl_store.png";
import appStore from "./assets/app-store.png";
import qrCode from "./assets/scanner.png";

const AppDownload: React.FC = () => {
  return (
    <section className="santhe-app-sec">
      <div className="santhe-app-container">

        {/* LEFT IMAGE */}
        <div className="santhe-app-left">
          <img src={phoneImg} alt="App Preview" />
        </div>

        {/* CENTER CONTENT */}
        <div className="santhe-app-center">
            <div>
                <h2>Download the SunThe Mart App</h2>
          <p>
            Shop fresh produce, track orders, get exclusive offers
            and more – all at your fingertips!
          </p>
            </div>
          

          <div className="santhe-app-buttons">
            <img src={googlePlay} alt="Google Play" />
            <img src={appStore} alt="App Store" />
          </div>
        </div>

        {/* RIGHT QR */}
        <div className="santhe-app-right">
          <img src={qrCode} alt="QR Code" />
        </div>

      </div>
    </section>
  );
};

export default AppDownload;