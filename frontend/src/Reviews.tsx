import React, { useState } from "react";
import "./styles/Reviews.css";
import user from "./assets/user.png"

const reviews = [
  {
    name: "Priya S.",
    location: "Bangalore",
    text: "The vegetables are so fresh and last longer than anything I get in the market. Happy to support our farmers!",
    image: user,
  },
  {
    name: "Ramesh K.",
    location: "Mysore",
    text: "SunThe Mart has become our go-to for all daily essentials. Great quality and super fast delivery.",
    image:user,
  },
  {
    name: "Anita P.",
    location: "Tumkur",
    text: "It feels good to know we are helping farmers and getting chemical-free food for our family.",
    image: user,
  },
  {
    name: "Rahul M.",
    location: "Chennai",
    text: "Very good service and fresh products every time. Highly recommended!",
    image: user,
  },
];

const Reviews: React.FC = () => {
  const [index, setIndex] = useState(0);

  const next = () => {
    if (index < reviews.length - 3) {
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <section className="santhe-rev-sec">
      <div className="santhe-rev-header">
        <h2>What Our Customers Say</h2>
        {/* <span className="santhe-rev-link">View All Reviews</span> */}
      </div>

      <div className="santhe-rev-carousel">

        {/* LEFT ARROW */}
        <button className="santhe-rev-arrow lft" onClick={prev}>
          ‹
        </button>

        {/* CARDS */}
        <div className="santhe-rev-container">
          {reviews.slice(index, index + 3).map((rev, i) => (
            <div className="santhe-rev-card" key={i}>
              
              <div className="santhe-rev-stars">★★★★★</div>

              <p className="santhe-rev-text">"{rev.text}"</p>

              <div className="santhe-rev-user">
                <img src={rev.image} alt={rev.name} />
                <div>
                  <h4>{rev.name}</h4>
                  <span>{rev.location}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* RIGHT ARROW */}
        <button className="santhe-rev-arrow rght" onClick={next}>
          ›
        </button>

      </div>
    </section>
  );
};

export default Reviews;