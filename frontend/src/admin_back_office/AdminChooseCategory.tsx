// import React, { useEffect, useState } from "react";
// import "./styles/AdminChooseCategory.css";
// import NewCategorySlider from "./NewCategorySlider";

// interface Category {
//   ProductCategoryID: number;
//   CategoryName: string;
//   CategoryImage: string;
// }

// function AdminChooseCategory() {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [isSliderOpen, setIsSliderOpen] = useState(false);

//   const fetchCategories = async () => {
//     const res = await fetch("http://localhost:4000/api/product-categories");
//     const data = await res.json();
//     setCategories(data.data);
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   return (
//     <div className="admin-choose-category-overlay">
//       <div className="admin-choose-category-container">
//         <div className="admin-choose-category-header">
//           <h2>Choose Your Category</h2>
//         </div>
//         <h2 className="admin-choose-category-subtitle">Please choose your category before adding a new product</h2>

//         <div className="admin-choose-category-grid">
//           {categories.map((item) => (
//             <div key={item.ProductCategoryID} className="admin-choose-category-card">
//               <div className="admin-choose-category-image-wrapper">
//                 {item.CategoryImage ? (
//                   <img src={`http://localhost:4000${item.CategoryImage}`} alt={item.CategoryName} />
//                 ) : (
//                   <div className="placeholder">No Image</div>
//                 )}
//               </div>
//               <p>{item.CategoryName}</p>
//             </div>
//           ))}

//           <div
//             className="admin-choose-category-card"
//             onClick={() => setIsSliderOpen(true)}
//           >
//             <div className="admin-choose-category-image-wrapper admin-choose-category-add-new">
//               <span>+</span>
//             </div>
//             <p>Add New</p>
//           </div>
//         </div>
//       </div>

//       <NewCategorySlider
//         isOpen={isSliderOpen}
//         onClose={() => {
//           setIsSliderOpen(false);
//           fetchCategories(); // refresh
//         }}
//       />
//     </div>
//   );
// }

// export default AdminChooseCategory;


import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./styles/AdminChooseCategory.css";
import NewCategorySlider from "./NewCategorySlider";

interface Category {
  ProductCategoryID: number;
  CategoryName: string;
  CategoryImage: string;
  Status: number;
}
type LocationState = {
  product?: any;
  price?: any;
  images?: any[];
  ProductCategoryID?: number;
  CategoryName?: string;
};

function AdminChooseCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation() as { state: LocationState };

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



  const handleCategorySelect = (category: Category) => {
  navigate("/AddProduct", {
  state: {
    ProductCategoryID: category.ProductCategoryID,
    CategoryName: category.CategoryName,
    product: location.state?.product,
    price: location.state?.price,
    images: location.state?.images
  }
});
  };
  return (
    <div className="admin-choose-category-overlay">
      <div className="admin-choose-category-container">

        <div className="admin-choose-category-header">
          <h2>Choose Your Category</h2>
        </div>

        <h2 className="admin-choose-category-subtitle">
          Please choose your category before adding a new product
        </h2>

        <div className="admin-choose-category-grid">

          {categories.map((item) => (
            <div
              key={item.ProductCategoryID}
              className="admin-choose-category-card"
              onClick={() => handleCategorySelect(item)}
            >
              <div className="admin-choose-category-image-wrapper">
                {item.CategoryImage ? (
                  <img
                    src={`http://localhost:4000${item.CategoryImage}`}
                    alt={item.CategoryName}
                  />
                ) : (
                  <div className="placeholder">No Image</div>
                )}
              </div>
              <p>{item.CategoryName}</p>
            </div>
          ))}

          {/* Add New Category */}
          <div
            className="admin-choose-category-card"
            onClick={() => setIsSliderOpen(true)}
          >
            <div className="admin-choose-category-image-wrapper admin-choose-category-add-new">
              <span>+</span>
            </div>
            <p>Add New</p>
          </div>

        </div>
      </div>

      <NewCategorySlider
        isOpen={isSliderOpen}
        onClose={() => {
          setIsSliderOpen(false);
          fetchCategories(); // refresh after adding category
        }}
      />
    </div>
  );
}

export default AdminChooseCategory;

