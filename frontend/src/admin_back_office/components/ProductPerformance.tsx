// import React from "react";
// import { useNavigate } from "react-router-dom";

// const ProductPerformance = () => {

//   const navigate = useNavigate();

//   return (

//     <div>

//       <div className="vendor-performance-top">

//         <input
//           placeholder="Search product..."
//         />

//         <button>
//           Filter
//         </button>

//         <button
//           className="add-product-btn"
//           onClick={() =>
            
//         >
//           + Add Product
//         </button>

//       </div>

//       <div className="vendor-stat-grid">

//         <div className="vendor-stat-card">
//           <h4>Total Products</h4>
//           <h2>28</h2>
//         </div>

//         <div className="vendor-stat-card">
//           <h4>Total Revenue</h4>
//           <h2>₹18,75,600</h2>
//         </div>

//         <div className="vendor-stat-card">
//           <h4>Profitable Products</h4>
//           <h2>20</h2>
//         </div>

//         <div className="vendor-stat-card">
//           <h4>Loss Products</h4>
//           <h2>8</h2>
//         </div>

//       </div>

//       <div className="vendor-box">

//         <table className="vendor-table">

//           <thead>

//             <tr>
//               <th>Product</th>
//               <th>Category</th>
//               <th>Stock</th>
//               <th>Revenue</th>
//               <th>Profit</th>
//             </tr>

//           </thead>

//           <tbody>

//             <tr>
//               <td>Organic Apples</td>
//               <td>Fruits</td>
//               <td>1245</td>
//               <td>₹1,24,500</td>
//               <td>₹46,500</td>
//             </tr>

//             <tr>
//               <td>Fresh Bananas</td>
//               <td>Fruits</td>
//               <td>2154</td>
//               <td>₹1,29,240</td>
//               <td>₹32,310</td>
//             </tr>

//           </tbody>

//         </table>

//       </div>

//     </div>

//   );

// };

// export default ProductPerformance;

import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  VendorID: number;
}

const ProductPerformance = ({
  VendorID
}: Props) => {

  const navigate = useNavigate();

  return (

    <div>

      <div className="vendor-performance-top">

        <input
          placeholder="Search product..."
        />

        <button>
          Filter
        </button>

        <button
          className="add-product-btn"
          onClick={() =>
            navigate(
              "/addProduct",
              {
                state: {
                  VendorID
                }
              }
            )
          }
        >
          + Add Product
        </button>

      </div>

      <div className="vendor-stat-grid">

        <div className="vendor-stat-card">
          <h4>Total Products</h4>
          <h2>28</h2>
        </div>

        <div className="vendor-stat-card">
          <h4>Total Revenue</h4>
          <h2>₹18,75,600</h2>
        </div>

        <div className="vendor-stat-card">
          <h4>Profitable Products</h4>
          <h2>20</h2>
        </div>

        <div className="vendor-stat-card">
          <h4>Loss Products</h4>
          <h2>8</h2>
        </div>

      </div>

      <div className="vendor-box">

        <table className="vendor-table">

          <thead>

            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Revenue</th>
              <th>Profit</th>
            </tr>

          </thead>

          <tbody>

            <tr>
              <td>Organic Apples</td>
              <td>Fruits</td>
              <td>1245</td>
              <td>₹1,24,500</td>
              <td>₹46,500</td>
            </tr>

            <tr>
              <td>Fresh Bananas</td>
              <td>Fruits</td>
              <td>2154</td>
              <td>₹1,29,240</td>
              <td>₹32,310</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default ProductPerformance;