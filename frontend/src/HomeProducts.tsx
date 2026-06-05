import React, { useEffect, useState } from "react";
import { useCart } from "./context/CartContext";
import { useWishlist } from "./context/WishlistContext";
import { useNavigate } from "react-router-dom";
import { showToast } from "./components/CustomToast";
import "./styles/HomeProducts.css";

interface Product {
  ProductID: number;
  ProductName: string;
  ProductDescription: string;
  ProductWeight: string;
  CategoryName: string;
  Price: number;
  ImageUrl: string;
}

const HomeProducts = () => {
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [freshPicks, setFreshPicks] = useState<Product[]>([]);
  const [bestDeals, setBestDeals] = useState<Product[]>([]);

  const fetchSection = async (section: string, setter: any) => {
    const res = await fetch(`http://localhost:4000/api/home-products/${section}`);
    const data = await res.json();
    if (data.success) setter(data.data);
  };

  useEffect(() => {
    fetchSection("FRESH_PICKS", setFreshPicks);
    fetchSection("BEST_DEALS", setBestDeals);
  }, []);

  const renderCards = (products: Product[]) =>
    products.slice(0, 6).map((item) => (
      <div key={item.ProductID} className="hp-tile">
        <img
          src={item.ImageUrl}
          alt={item.ProductName}
          className="hp-tile-img"
          onClick={() => navigate(`/product/${item.ProductID}`)}
        />

        <div className="hp-tile-content">
          {/* <p className="hp-cat">{item.CategoryName}</p> */}
          <h3 className="hp-name">{item.ProductName}</h3>
          {/* <p className="hp-desc">{item.ProductDescription}</p> */}

          <div className="hp-bottom">
            <div>
              <span className="hp-price">₹ {item.Price}</span>
            </div>
            <div><span className="hp-weight">{item.ProductWeight}</span></div>
            </div>

            <button
              className="hp-add-btn"
              onClick={() => {
                if (!userId) {
                  navigate("/login");
                  return;
                }
                addToCart({
                  id: item.ProductID,
                  title: item.ProductName,
                  price: item.Price,
                  qty: 1,
                  img: item.ImageUrl,
                  weight: item.ProductWeight,
                });
              }}
            >
              Add to Cart
            </button>
          
        </div>
      </div>
    ));

  return (
    <div className="hp-wrapper">
      <div className="hp-section">
        <div className="hp-head-row">
          <h2>Fresh Picks for You</h2>
          <span>View All</span>
        </div>
        <div className="hp-row">{renderCards(freshPicks)}</div>
      </div>

      <div className="hp-section">
        <div className="hp-head-row">
          <h2>Best Deals of the Day</h2>
          <span>View All</span>
        </div>
        <div className="hp-row">{renderCards(bestDeals)}</div>
      </div>
    </div>
  );
};

export default HomeProducts;