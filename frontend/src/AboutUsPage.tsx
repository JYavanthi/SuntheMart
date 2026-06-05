import React from "react";
import "./styles/AboutUsPage.css";

import aboutHero from "./assets/about-hero.png";
import storyImg from "./assets/about-story.png";
import Navbar from "./Navbar/navbar";
import Footer from "./footer";
import farmer from "./assets/abt_farmer.png";
import leaf from "./assets/abt_leaf.png";
import world from "./assets/abt_world.png";
import whyfarmers from "./assets/why_chse-farmers.png";
import whyntrl from "./assets/why_chse-ntrl.png";
import whyprice from "./assets/why_chse-prices.png";
import whytruck from "./assets/why_chse-truck.png";
import whytrust from "./assets/why_chse_trust.png";

function AboutUsPage() {
  return (
    <>
    <Navbar/>
    <div className="abt-page-container">

      {/* HERO SECTION */}

      <div className="abt-page-hero">

        {/* LEFT */}

        <div className="abt-page-hero-left">

          <h1 className="abt-hero-text">
            About <span>Sunthe Mart</span>
          </h1>

          <p>
            Sunthe Mart is a farmer-first marketplace that
            brings you the freshest fruits and vegetables
            directly from trusted farmers.
          </p>

          <p>
            We believe in supporting farmers, promoting
            sustainable farming, and providing healthy,
            100% natural food.
          </p>

          <div className="abt-page-points">

            <div className="abt-page-point">
              <img src={farmer} alt=""/>
               <h1 className="icon-text">Support Local Farmers</h1>
            </div>

            <div className="abt-page-point">
              <img src={leaf} alt=""/>
              <h1 className="icon-text">Pure & Natural Produce</h1>
            </div>

            <div className="abt-page-point">
              <img src={world} alt=""/>
               <h1 className="icon-text">Sustainable & Safe Farming</h1>
            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="abt-page-hero-right">

          <img
            src={aboutHero}
            alt=""
          />

        </div>

      </div>

      {/* STATS */}

      <div className="abt-page-stats">

        <div className="abt-page-stat-box">
          <h2>1000+</h2>
          <p>Happy Farmers</p>
        </div>

        <div className="abt-page-stat-box">
          <h2>50,000+</h2>
          <p>Happy Customers</p>
        </div>

        <div className="abt-page-stat-box">
          <h2>500+</h2>
          <p>Villages Connected</p>
        </div>

        <div className="abt-page-stat-box">
          <h2>100%</h2>
          <p>Quality Assured</p>
        </div>

      </div>

      {/* STORY SECTION */}

      <div className="abt-page-story-section">

        <div className="abt-page-story-left">

          <img
            src={storyImg}
            alt=""
          />

        </div>

        <div className="abt-page-story-right">

          <h2>Our Story</h2>

          <p>
            Sunthe Mart was born out of a simple idea —
            to bridge the gap between farmers and families.
          </p>

          <p>
            We noticed how hard-working farmers often
            don’t get the right price for their produce,
            while customers struggle to find fresh,
            chemical-free food.
          </p>

          <p>
            So, we built Sunthe Mart — a platform that
            ensures fair prices for farmers and fresh,
            healthy produce for you.
          </p>

          <p>
            Today, we are proud to be a growing community
            that values trust, transparency, and sustainability.
          </p>

        </div>

      </div>

      {/* WHY CHOOSE */}

      <div className="abt-page-why-section">

        <h2>Why Choose Sunthe Mart?</h2>

        <div className="abt-page-why-grid">

          <div className="abt-page-why-card">
            <div className="abt-page-why-icon"><img src={whyfarmers} alt="" /></div>
            <h3>Direct from Farmers</h3>
            <p>
              We bring produce straight from farms
              to your homes.
            </p>
          </div>

          <div className="abt-page-why-card">
            <div className="abt-page-why-icon"><img src={whyntrl} alt="" /></div>
            <h3>100% Natural</h3>
            <p>
              No chemicals, no preservatives —
              only pure food.
            </p>
          </div>

          <div className="abt-page-why-card">
            <div className="abt-page-why-icon"><img src={whyprice} alt="" /></div>
            <h3>Fair Prices</h3>
            <p>
              Better prices for farmers and
              great value for you.
            </p>
          </div>

          <div className="abt-page-why-card">
            <div className="abt-page-why-icon"><img src={whytruck} alt="" /></div>
            <h3>Fast & Safe Delivery</h3>
            <p>
              Freshness delivered safely and
              on time, every time.
            </p>
          </div>

          <div className="abt-page-why-card">
            <div className="abt-page-why-icon"><img src={whytrust} alt="" /></div>
            <h3>Trust & Transparency</h3>
            <p>
              We believe in honesty,
              quality, and long-term relationships.
            </p>
          </div>

        </div>

      </div>

      {/* TESTIMONIAL */}

      <div className="abt-page-testimonial">

        <h2>What Our Customers Say</h2>

        <div className="abt-page-review-box">

          <button className="abt-page-arrow">
            ❮
          </button>

          <div className="abt-page-review-content">

            <p>
              Sunthe Mart has changed the way I shop
              for groceries. The vegetables are so fresh
              and last longer.
            </p>

            <h4>- Priya S, Bangalore</h4>

            <div className="abt-page-dots">
              <span className="active"></span>
              <span></span>
              <span></span>
            </div>

          </div>

          <button className="abt-page-arrow">
            ❯
          </button>

        </div>

      </div>

    </div>
    <Footer/>
    </>
  );
}

export default AboutUsPage;