
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Category.css";
import top_banner from "./assets/catgry-top-banner.png";
import farmer_banner from "./assets/hero_img.jpeg";
import Navbar from "./Navbar/navbar";
import Footer from "./footer";
import frsh from "./assets/cat_fresh_farm.png";
import chem from "./assets/cat_chem_free.png";
import sust from "./assets/cat_sustainable.png";
import trust from "./assets/cat-trust.png";
import sec from "./assets/cat-secure.png"
import farm from "./assets/why_chse-farmers.png";
import ntrl from "./assets/why_chse-ntrl.png";
import price from "./assets/why_chse-prices.png";
import truck from "./assets/why_chse-truck.png";
// import fruits from "./assets/fruits.png";
// import veg from "./assets/vegetables.png";
// import millets from './assets/millets.png';
// import green from "./assets/leafy-greens.png";

interface Category {
  ProductCategoryID: number;
  CategoryName: string;
  CategoryImage: string;
  Status: number;
}

function Category() {

  const [categories, setCategories] = useState<Category[]>([]);

  const navigate = useNavigate();

  // FETCH CATEGORIES
  const fetchCategories = async () => {

    try {

      const res = await fetch(
        "http://localhost:4000/api/product-categories"
      );

      const data = await res.json();

      setCategories(data.data || []);

    } catch (error) {

      console.error(
        "Failed to fetch categories",
        error
      );
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
    <Navbar/>
    <div className="catgry-page">

      {/* HERO SECTION */}
      <div className="catgry-hero-section">
        <div className="catgry-hero-right">
          <img  src={top_banner} alt="banner" />
        </div>
      </div>
      <div className="catgry-heading-section">

        <h2>
          Browse Categories
        </h2>

        <p>
          Handpicked fresh produce directly
          from farmers to your home.
        </p>

      </div>

      {/* GRID */}
      <div className="catgry-grid">

        {categories.map((item) => (

          <div
            key={item.ProductCategoryID}
            className="catgry-card"
            onClick={() =>
              navigate(
                `/category/${item.ProductCategoryID}`
              )
            }
          >

            <div className="catgry-image-wrapper">

              {item.CategoryImage ? (

                <img
                  src={`http://localhost:4000${item.CategoryImage}`}
                  alt={item.CategoryName}
                  className="catgry-image"
                />

              ) : (

                <div className="catgry-placeholder">
                  No Image
                </div>
              )}
            </div>

            <div className="catgry-content">

              <div className="catgry-icon">
                <img src="" alt="" />
              </div>

              <p className="catgry-name">
                {item.CategoryName}
              </p>

              <span className="catgry-desc">
                Fresh & Healthy
              </span>

              <button className="catgry-shop-btn">
                Shop Now
              </button>

            </div>
          </div>
        ))}
      </div>

      {/* FEATURES */}
      <div className="catgry-features">

        <div className="catgry-feature-item">
          <img src={farm}alt="" /> <h1>Directly from Farmers</h1>
        </div>

        <div className="catgry-feature-item">
          <img src={ntrl}alt="" /> <h1>100% Fresh & Natural</h1>
        </div>

        <div className="catgry-feature-item">
           <img src={price}alt="" /> <h1> Fair Price for Everyone</h1>
         
        </div>

        <div className="catgry-feature-item">
           <img src={truck}alt="" /> <h1> Fast & Safe Delivery </h1>
          
        </div>

      </div>

      {/* WHY SHOP */}
      <div className="catgry-why-section">

        <h2>
          Why Shop with Us?
        </h2>

        <div className="catgry-why-grid">

          <div className="catgry-why-card">
            <img src={frsh} alt="" />
            <h3>Farm Fresh</h3>
            <p>
              Handpicked produce directly
              from local farms.
            </p>
          </div>

          <div className="catgry-why-card">
            <img src={chem} alt="" />
            <h3>Chemical Free</h3>
            <p>
              Organic and healthy products.
            </p>
          </div>

          <div className="catgry-why-card">
           <img src={sust} alt="" />
            <h3>Sustainable</h3>
            <p>
              Supporting sustainable farming.
            </p>
          </div>

          <div className="catgry-why-card">
            <img src={trust} alt="" />
            <h3>Trusted</h3>
            <p>
              Loved by thousands of happy customers.
            </p>
          </div>

          <div className="catgry-why-card">
            <img src={sec} alt="" />
            <h3>Secure Packaging</h3>
            <p>
              Hygienic packing and safe delivery.
            </p>
          </div>

        </div>
      </div>

      {/* BOTTOM BANNER */}
      <div className="catgry-bottom-banner">

        {/* <div className="catgry-bottom-left">

          <h2>
            From Our Farms
            <br />
            To Your Home
          </h2>

          <p>
            Bringing the freshest fruits and vegetables
            directly from our trusted local farmers.
          </p>

          <button>
            Shop All Products
          </button>

        </div> */}

        <div className="catgry-bottom-right">

          <img
            src={farmer_banner}
            alt="farmer"
          />

        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default Category;

