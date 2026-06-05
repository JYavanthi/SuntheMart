// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { API_URLS } from "./src/API-Urls";


// interface Category {
//   ProductCategoryID: number;
//   CategoryName: string;
// }

// const CategorySection=()=>{
    
//       const [categories, setCategories] = useState<Category[]>([]);
//       const [activeCategory, setActiveCategory] = useState<number | null>(null);

//         const user = JSON.parse(localStorage.getItem("user") || "null");
//         const userId = user?.UserID;

//         useEffect(() => {

//     fetch(`${API_URLS.BASE_URL}categories`)
//       .then((res) => res.json())
//       .then((data) => {

//         setCategories(data);

        

//       })
//       .catch((err) => console.error("Category load error:", err));

//   });

//   return(
//     <div className="cat-bar">
//         {categories.map((cat) => (
//           <button
//             key={cat.ProductCategoryID}
//             className={`cat-tab ${
//               activeCategory === cat.ProductCategoryID ? "active" : ""
//             }`}
//             onClick={() => setActiveCategory(cat.ProductCategoryID)}
//           >
//             {cat.CategoryName}
//           </button>
//         ))}
//       </div>
//   );
// };
// export default CategorySection;


// import React, { useEffect, useState } from "react";
// import { API_URLS } from "./API-Urls";
// import "./styles/HeroCategory.css";

// interface Category {
//   ProductCategoryID: number;
//   CategoryName: string;
//   ImageUrl?: string;
// }

// const CategorySection = () => {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [activeCategory, setActiveCategory] = useState<number | null>(null);

//   useEffect(() => {
//     fetch(`${API_URLS.BASE_URL}categories`)
//       .then((res) => res.json())
//       .then((data) => setCategories(data))
//       .catch((err) => console.error("Category load error:", err));
//   }, []);

//   return (
//     <div className="hero-cat-section">
//       <div className="hero-cat-container">
//         <div className="hero-cat-title">Shop by Category</div>

//         <div className="hero-cat-row">
//           {categories.map((cat) => (
//             <div
//               key={cat.ProductCategoryID}
//               onClick={() => setActiveCategory(cat.ProductCategoryID)}
//               className={`hero-cat-item ${
//                 activeCategory === cat.ProductCategoryID
//                   ? "hero-cat-active"
//                   : ""
//               }`}
//             >
//               <div className="hero-cat-circle">
//                 <img
//                   src={
//                     cat.ImageUrl ||
//                     "https://via.placeholder.com/100?text=Category"
//                   }
//                   alt={cat.CategoryName}
//                 />
//               </div>
//               <div className="hero-cat-name">{cat.CategoryName}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategorySection;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/HeroCategory.css";

interface Category {
  ProductCategoryID: number;
  CategoryName: string;
  CategoryImage: string;
  Status: number;
}

function HeroCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/product-categories");
      const data = await res.json();
      setCategories(data.data || []);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="hero-cat-container">
        <div className="hero-cat-title-div">
            <h2 className="hero-cat-title">Shop by Category</h2>
            <button>View All Categories</button>
        </div>
      

      <div className="hero-cat-grid">
        {categories.map((item) => (
          <div
            key={item.ProductCategoryID}
            className="hero-cat-card"
            onClick={() => navigate(`/category/${item.ProductCategoryID}`)}
          >
            <div className="hero-cat-image-wrapper">
              {item.CategoryImage ? (
                <img
                  src={`http://localhost:4000${item.CategoryImage}`}
                  alt={item.CategoryName}
                  className="hero-cat-image"
                />
              ) : (
                <div className="hero-cat-placeholder">No Image</div>
              )}
            </div>

            <p className="hero-cat-name">{item.CategoryName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeroCategory;