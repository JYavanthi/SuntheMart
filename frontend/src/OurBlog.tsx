import React from "react";
import "./styles/OurBlog.css";
import recepies from "./assets/recipies.jpg"
import blogfarms from "./assets/blogfarmers.jpg"

const blogData = [
  {
    category: "Health & Wellness",
    title: "Benefits of Eating Seasonal Fruits",
    desc: "Discover why seasonal fruits are better for your health and the environment.",
    img: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
  },
  {
    category: "Sustainable Farming",
    title: "How We Support Farmers",
    desc: "Learn about our initiatives to empower farmers and build sustainable communities.",
    img:blogfarms ,
  },
  {
    category: "Recipes",
    title: "5 Easy Veg Recipes for Your Family",
    desc: "Simple, healthy and delicious recipes using fresh vegetables.",
    img: recepies,
  },
];

const Blog = () => {
  return (
    <div className="blog-container">
      <div className="blog-header">
        <h2>From Our Blog</h2>
        <p className="view-all">View All Blogs</p>
      </div>

      <div className="blog-grid">
        {blogData.map((item, index) => (
          <div className="blog-card" key={index}>
            <div className="blog-upper">
              <img src={item.img} alt={item.title} />
            </div>

            <div className="blog-lower">
              <p className="blog-category">{item.category}</p>
              <h3 className="blog-title">{item.title}</h3>
              <p className="blog-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;