import React from "react";
import "./styles/Contact.css";
import Navbar from "./Navbar/navbar";
import Footer from "./footer";

// BACKGROUND IMAGE
import contactBg from "./assets/contact-background.png";
import clck from "./assets/cntct-clck-icon.png"
import phn from "./assets/cntct-phn-icon.png"
import loc from "./assets/cntct-loc-icon.png"
import mail from "./assets/cntct-mail-icon.png"

function ContactUs() {
  return (
    <>
     <Navbar/>
    <div
      className="contact-page"
      style={{
        backgroundImage: `url(${contactBg})`,
      }}
    >
      {/* OVERLAY */}
      <div className="contact-overlay">

        {/* LEFT CONTENT */}
        <div className="contact-left">

          <h1>
            Contact <span>Us</span>
          </h1>

          <p className="contact-subtitle">
            We'd love to hear from you!
          </p>

          {/* PHONE */}
          <div className="contact-info-box">

            <div className="contact-icon">
              <img src={phn} alt="" />
            </div>

            <div>
              <h3>Phone</h3>
              <p>+91 123 456 7890</p>
            </div>

          </div>

          {/* EMAIL */}
          <div className="contact-info-box">

            <div className="contact-icon">
               <img src={mail} alt="" />
            </div>

            <div>
              <h3>Email</h3>
              <p>hello@sunthemart.com</p>
            </div>

          </div>

          {/* ADDRESS */}
          <div className="contact-info-box">

            <div className="contact-icon">
               <img src={loc} alt="" />
            </div>

            <div>
              <h3>Address</h3>

              <p>
                Sunthe Mart Pvt. Ltd.
                <br />
                Lucknow, Uttar Pradesh, India
              </p>
            </div>

          </div>

          {/* HOURS */}
          <div className="contact-info-box">

            <div className="contact-icon">
               <img src={clck} alt="" />
            </div>

            <div>
              <h3>Business Hours</h3>

              <p>
                Mon - Sat: 8:00 AM - 8:00 PM
              </p>

              <p>
                Sunday: 9:00 AM - 6:00 PM
              </p>
            </div>

          </div>

        </div>

        {/* RIGHT FORM */}
        <div className="contact-right">

          <form className="contact-form">

            <input
              type="text"
              placeholder="Your Name"
            />

            <input
              type="email"
              placeholder="Your Email"
            />

            <input
              type="text"
              placeholder="Subject"
            />

            <textarea
              placeholder="Your Message"
              rows={6}
            />

            <button type="submit">
              Send Message
            </button>

          </form>

        </div>

      </div>
    </div>
    <Footer/>
    </>
  );
}

export default ContactUs;