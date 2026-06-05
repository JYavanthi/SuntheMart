import React from "react";
import "./styles/HowItWorksPage.css";
import storyImg from "./assets/about-story.png";
import truck from "./assets/truck.png"
import home from "./assets/house.png"
import box from "./assets/box.png"
import farmer from "./assets/farmer.png"
import Navbar from "./Navbar/navbar";
import Footer from "./footer";
import farm from "./assets/why_chse-farmers.png";
import ntrl from "./assets/why_chse-ntrl.png";
import sust from "./assets/cat_sustainable.png";
import truckdel from "./assets/why_chse-truck.png";


function Works() {
  return (
    <>
    <Navbar/>
    <div className="works-container">

      {/* TITLE */}

      <div className="works-header">

        <h1>
          How Sunthe Mart Works
        </h1>

        <p>
          From Farm to Home in 4 Simple Steps
        </p>

      </div>

      {/* STEPS */}

      <div className="works-steps-wrapper">

        {/* STEP 1 */}

        <div className="works-step-card">

          <div className="works-step-image">
            <img src={farmer} alt="" />
          </div>

          <h3>Farm Fresh</h3>

          <p>
            Farmers harvest the
            freshest produce.
          </p>

        </div>

        <div className="works-arrow">
          ➜
        </div>

        {/* STEP 2 */}

        <div className="works-step-card">

          <div className="works-step-image">
            <img src={box} alt="" />
          </div>

          <h3>We Collect</h3>

          <p>
            We collect directly
            from farms.
          </p>

        </div>

        <div className="works-arrow">
          ➜
        </div>

        {/* STEP 3 */}

        <div className="works-step-card">

          <div className="works-step-image">
            <img src={home} alt="" />
          </div>

          <h3>Quality Check</h3>

          <p>
            Every product is checked
            for quality.
          </p>

        </div>

        <div className="works-arrow">
          ➜
        </div>

        {/* STEP 4 */}

        <div className="works-step-card">

          <div className="works-step-image">
         <img src={truck} alt="" />
          </div>

          <h3>Delivered to You</h3>

          <p>
            We deliver healthy
            food to your home.
          </p>

        </div>

      </div>

      {/* FEATURES */}

      <div className="works-features-wrapper">

        <div className="works-feature-card">
          <img src={ntrl} alt="" />
            <div className="works-feature-card-info">
                   <span>100% Fresh</span>
                   <h4>Handpicked and naturally grown</h4>
            </div>
       
        </div>

        <div className="works-feature-card">
          <img src={sust} alt="" />
          <div className="works-feature-card-info">
             <span>Safe & Natural</span>
             <h4>Pestcide free and chemical free</h4>
          </div>
         
        </div>

        <div className="works-feature-card">
          <img src={farm} alt="" />
          <div className="works-feature-card-info">
             <span>Support Farmers</span>
             <h4>Directly empowering local farmers</h4>
          </div>
         
        </div>

        <div className="works-feature-card">
          <img src={truckdel} alt="" />
          <div className="works-feature-card-info">
             <span>Fast Delivery</span>
             <h4>On time delivery to your home</h4>
          </div>
          
        </div>

      </div>

      {/* WHY CHOOSE */}

      <div className="works-why-section">

        <div className="works-why-left">

          <img
            src={storyImg}
            alt=""
          />

        </div>

        <div className="works-why-right">

          <h2>
            Why Choose Sunthe Mart?
          </h2>

          <ul>

            <li>
              ✔ We source directly from trusted farmers.
            </li>

            <li>
              ✔ We ensure every product is fresh,
              natural & safe.
            </li>

            <li>
              ✔ We offer fair prices for both farmers
              and customers.
            </li>

            <li>
              ✔ We are committed to sustainable &
              healthy living.
            </li>

          </ul>

        </div>

      </div>

      {/* TESTIMONIAL */}

      <div className="works-testimonial-section">

        <h2>
          What Our Customers Say
        </h2>

        <div className="works-testimonial-box">

          <button className="works-arrow-btn">
            ❮
          </button>

          <div className="works-testimonial-content">

            <p>
              Sunthe Mart has completely changed the
              way I buy groceries. The quality is
              unbelievable and I love supporting our farmers!
            </p>

            <h4>
              - Anjali Sharma, Lucknow
            </h4>

          </div>

          <button className="works-arrow-btn">
            ❯
          </button>

        </div>

      </div>

      {/* FARMERS */}

      <div className="works-farmers-section">

        <h2>
          Our Farmer Partners
        </h2>

        <div className="works-farmers-wrapper">

          <div className="works-farmer-card">

            {/* <img
              src={farmer1}
              alt=""
            /> */}

            <h4>Ramesh Yadav</h4>

            <p>Lucknow, UP</p>

          </div>

          <div className="works-farmer-card">

            {/* <img
              src={farmer2}
              alt=""
            /> */}

            <h4>Sunita Devi</h4>

            <p>Bangalore, KA</p>

          </div>

          <div className="works-farmer-card">

            {/* <img
              src={farmer3}
              alt=""
            /> */}

            <h4>Mahesh Patil</h4>

            <p>Nashik, MH</p>

          </div>

          <div className="works-farmer-card">

            {/* <img
              src={farmer4}
              alt=""
            /> */}

            <h4>Praveen Kumar</h4>

            <p>Shimla, HP</p>

          </div>

          <div className="works-farmer-card">
{/* 
            <img
              src={farmer5}
              alt=""
            /> */}

            <h4>Vijay Reddy</h4>

            <p>Hyderabad, TS</p>

          </div>

        </div>

        <button className="works-view-btn">
          View All Farmers
        </button>

      </div>

    </div>
    <Footer/>
    </>
  );
}

export default Works;