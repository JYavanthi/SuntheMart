import React from "react";
import "./styles/AboutSection.css";
import farmers from "./assets/about.jpeg";
import far_icon from "./assets/farmersicon.png";
import cst_icon from "./assets/customersicon.png";
import vlg_icon from "./assets/villageicon.png";
import qlty_icon from "./assets/qualityicon.png";
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <section className="santhe-abt-sec">
      <div className="santhe-abt-container">
        
        {/* LEFT CONTENT */}
        <div className="santhe-abt-left">
          <p className="santhe-abt-subtitle">About SunThe Mart</p>

          <h2 className="santhe-abt-title">
            Empowering Farmers.<br />
            Enriching Lives.
          </h2>

          <p className="santhe-abt-desc">
            Sunthe Mart is built on a simple belief – farmers deserve better,
            and so do you. We connect you directly with farmers, ensuring fair
            prices for them and fresh, healthy produce for you.
          </p>

          <button className="santhe-abt-btn">
            Know More About Us →
          </button>
        </div>

        {/* RIGHT IMAGE + STATS */}
        <div className="santhe-abt-right">
          <img
            src={farmers}
            alt="Farmer"
            className="santhe-abt-image"
          />

          <div className="santhe-abt-stats">
            <div className="santhe-abt-icon">
              <img src={far_icon} alt="" />
              <div className="santhe-abt-stat">
               <h3>5000+</h3>
               <p>Happy Farmers</p>
              </div>
            </div>
            
             <div className="santhe-abt-icon">
              <img src={cst_icon} alt="" />
              <div className="santhe-abt-stat">
              <h3>1L+</h3>
              <p>Happy Customers</p>
            </div>
             </div>
            

             <div className="santhe-abt-icon">
               <img src={vlg_icon} alt="" />
                <div className="santhe-abt-stat">
              <h3>200+</h3>
              <p>Villages Connected</p>
            </div>
             </div>
           
            
            <div className="santhe-abt-icon">
              <img src={qlty_icon} alt="" />
              <div className="santhe-abt-stat">
               <h3>100%</h3>
               <p>Quality Assured</p>
              </div>
            </div>
            
          </div>
        </div>

      </div>
      <Link to="/virtual-tour">Try Virtual Market Experience</Link>
    </section>
  );
};

export default AboutSection;