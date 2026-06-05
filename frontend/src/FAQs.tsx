import React, { useState } from "react";
import "./styles/FAQs.css";

import faqBasket from "./assets/faq-basket.png";
import Navbar from "./Navbar/navbar";
import Footer from "./footer";
import call from "./assets/call_us.png";
import mail from "./assets/email.png";
import chat from "./assets/livechat.png";
import whatsapp from "./assets/whatsapp.png";
function FAQ() {

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData = [
    {
      question:
        "How does Sunthe Mart ensure product quality?",
      answer:
        "Every product is carefully inspected and sourced directly from trusted farmers to ensure freshness and quality.",
    },

    {
      question:
        "Do you use pesticides or chemicals?",
      answer:
        "No. We focus on natural and chemical-free farming practices for healthier produce.",
    },

    {
      question:
        "How long does delivery take?",
      answer:
        "Most orders are delivered within 24 hours depending on your location.",
    },

    {
      question:
        "What is your return policy?",
      answer:
        "If you receive damaged or poor-quality items, we offer easy replacement or refund options.",
    },

    {
      question:
        "How can I support farmers through Sunthe Mart?",
      answer:
        "By shopping with us, you directly contribute to supporting local farmers and sustainable farming.",
    },
  ];

  return (
    <>
    <Navbar/>
   
    <div className="faq-page-container">

      {/* HEADER */}

      <div className="faq-page-header">

        <h1>
          Frequently Asked
          <span> Questions</span>
        </h1>

        <p>
          Find answers to common questions
        </p>

      </div>

      {/* FAQ SECTION */}

      <div className="faq-page-main-section">

        {/* LEFT IMAGE */}

        <div className="faq-page-left">

          <img
            src={faqBasket}
            alt=""
          />

        </div>

        {/* RIGHT FAQ */}

        <div className="faq-page-right">

          {faqData.map((item, index) => (

            <div
              className="faq-page-item"
              key={index}
            >

              <div
                className="faq-page-question"
                onClick={() =>
                  setOpenIndex(
                    openIndex === index
                      ? null
                      : index
                  )
                }
              >

                <h3>
                  {item.question}
                </h3>

                <span>
                  {openIndex === index
                    ? "−"
                    : "+"}
                </span>

              </div>

              {openIndex === index && (

                <div className="faq-page-answer">

                  <p>
                    {item.answer}
                  </p>

                </div>
              )}

            </div>
          ))}

        </div>

      </div>

      {/* CONTACT */}

      <div className="faq-page-contact-section">

        <h2>
          Still Have Questions?
        </h2>

        <p>
          We're here to help! Reach out to our support team.
        </p>

        <div className="faq-page-contact-wrapper">

          {/* CALL */}

          <div className="faq-page-contact-card">

            <div className="faq-page-contact-icon">
              <img src={call} alt="" />
            </div>

            <h3>Call Us</h3>

            <p>
              +91 123 456 7890
            </p>

            <span>
              Mon - Sat: 9 AM - 7 PM
            </span>

          </div>

          {/* EMAIL */}

          <div className="faq-page-contact-card">

            <div className="faq-page-contact-icon">
              <img src={mail} alt="" />
            </div>

            <h3>Email Us</h3>

            <p>
              hello@sunthemart.com
            </p>

            <span>
              We reply within 24 hrs
            </span>

          </div>


          <div className="faq-page-contact-card">

            <div className="faq-page-contact-icon">
              <img src={chat} alt="" />
            </div>

            <h3>Live Chat</h3>

            <p>
              Chat with our team
            </p>

            <span>
              9 AM - 7 PM
            </span>

          </div>


          <div className="faq-page-contact-card">

            <div className="faq-page-contact-icon">
              <img src={whatsapp} alt="" />
            </div>

            <h3>WhatsApp</h3>

            <p>
              +91 123 456 7890
            </p>

            <span>
              Quick Support
            </span>

          </div>

        </div>

      </div>

      {/* WHY SHOP */}

      <div className="faq-page-why-section">

        <h2>
          Why Shop with Sunthe Mart?
        </h2>

        <div className="faq-page-why-wrapper">

          <div className="faq-page-why-card">

            <div className="faq-page-why-icon">
              🍃
            </div>

            <h4>
              100% Natural
            </h4>

            <p>
              Fresh & Chemical Free Produce
            </p>

          </div>

          <div className="faq-page-why-card">

            <div className="faq-page-why-icon">
              👨‍🌾
            </div>

            <h4>
              Direct from Farmers
            </h4>

            <p>
              No middlemen, better prices
            </p>

          </div>

          <div className="faq-page-why-card">

            <div className="faq-page-why-icon">
              🛡️
            </div>

            <h4>
              Quality Assured
            </h4>

            <p>
              Carefully handpicked and quality checked
            </p>

          </div>

          <div className="faq-page-why-card">

            <div className="faq-page-why-icon">
              🚚
            </div>

            <h4>
              Fast & Safe Delivery
            </h4>

            <p>
              On-time delivery to your doorstep
            </p>

          </div>

          <div className="faq-page-why-card">

            <div className="faq-page-why-icon">
              ♻️
            </div>

            <h4>
              Sustainable
            </h4>

            <p>
              Supporting sustainable farming & local farmers
            </p>

          </div>

          <div className="faq-page-why-card">

            <div className="faq-page-why-icon">
              💚
            </div>

            <h4>
              Trusted by Thousands
            </h4>

            <p>
              Happy customers across the country
            </p>

          </div>

        </div>

      </div>

    </div>
    <Footer/>
     </>
  );
}

export default FAQ;