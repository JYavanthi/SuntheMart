
// import React from "react";
// import { useNavigate } from "react-router-dom";

// interface Props {
//   VendorID: number;
// }

// const ProductPerformance = ({
//   VendorID
// }: Props) => {

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
//             navigate(
//               "/addProduct",
//               {
//                 state: {
//                   VendorID
//                 }
//               }
//             )
//           }
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

import React, {
  useEffect,
  useState
} from "react";

import { useNavigate } from "react-router-dom";

interface Props {
  VendorID:number;
}

const ProductPerformance=({
  VendorID
}:Props)=>{

  const navigate=useNavigate();

  const [summary,setSummary]=
    useState<any>({});

  const [products,setProducts]=
    useState<any[]>([]);

  const [highlights,setHighlights]=
    useState<any>({});

  const [topProfit,setTopProfit]=
    useState<any[]>([]);

  const [topLoss,setTopLoss]=
    useState<any[]>([]);

  useEffect(()=>{

    if(!VendorID) return;

    loadData();

  },[VendorID]);

  const loadData=async()=>{

    try{

      const[
        summaryRes,
        productsRes,
        highlightRes,
        profitRes,
        lossRes
      ]=await Promise.all([

        fetch(
          `http://localhost:4000/api/admin/vendor-product-summary/${VendorID}`
        ),

        fetch(
          `http://localhost:4000/api/admin/vendor-product-performance/${VendorID}`
        ),

        fetch(
          `http://localhost:4000/api/admin/vendor-product-highlights/${VendorID}`
        ),

        fetch(
          `http://localhost:4000/api/admin/vendor-profitable-products/${VendorID}`
        ),

        fetch(
          `http://localhost:4000/api/admin/vendor-loss-products/${VendorID}`
        )

      ]);

      const summaryData=
        await summaryRes.json();

      const productData=
        await productsRes.json();

      const highlightData=
        await highlightRes.json();

      const profitData=
        await profitRes.json();

      const lossData=
        await lossRes.json();

      if(summaryData.success)
        setSummary(summaryData.data);

      if(productData.success)
        setProducts(productData.data);

      if(highlightData.success)
        setHighlights(highlightData.data);

      if(profitData.success)
        setTopProfit(profitData.data);

      if(lossData.success)
        setTopLoss(lossData.data);

    }
    catch(err){

      console.log(err);

    }

  };

  return(

    <div className="prd-perf-page">

      <div className="prd-perf-toolbar">

        <input
          className="prd-perf-search"
          placeholder="Search any product name, SKU..."
        />

        <button className="prd-perf-filter-btn">
          Filters
        </button>

        <button
          className="prd-perf-add-btn"
          onClick={()=>
            navigate("/addProduct",{
              state:{VendorID}
            })
          }
        >
          + Add Product
        </button>

      </div>

      <div className="prd-perf-layout">

        <div className="prd-perf-left">

          <div className="prd-perf-stats">

            <div className="prd-perf-stat-card">
              <span>Total Products</span>
              <h3>{summary.TotalProducts||0}</h3>
            </div>

            <div className="prd-perf-stat-card">
              <span>Total Revenue</span>
              <h3>
                ₹{Number(summary.TotalRevenue||0).toLocaleString()}
              </h3>
            </div>

            <div className="prd-perf-stat-card">
              <span>Profitable Products</span>
              <h3>{summary.ProfitableProducts||0}</h3>
            </div>

            <div className="prd-perf-stat-card">
              <span>Loss Making Products</span>
              <h3>{summary.LossProducts||0}</h3>
            </div>

          </div>

          <div className="prd-perf-table-card">

            <table>

              <thead>

                <tr>

                  <th>Product Details</th>
                  <th>Category</th>
                  <th>Units Sold</th>
                  <th>Revenue</th>
                  <th>Profit / Loss</th>
                  <th>Status</th>

                </tr>

              </thead>

              <tbody>

                {products.map((item:any,index:number)=>(

                  <tr key={index}>

                    <td>{item.ProductName}</td>

                    <td>{item.CategoryName}</td>

                    <td>{item.UnitsSold}</td>

                    <td>
                      ₹{Number(item.Revenue).toLocaleString()}
                    </td>

                    <td
                      className={
                        item.Profit > 0
                          ? "profit-text"
                          : "loss-text"
                      }
                    >
                      ₹{Number(item.Profit).toLocaleString()}
                    </td>

                    <td>

                      <span
                        className={
                          item.Profit > 0
                            ? "profit-tag"
                            : "loss-tag"
                        }
                      >
                        {item.Status}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

        <div className="prd-perf-right">

          <div className="prd-side-card">

            <h4>
              Product Highlights
            </h4>

            <p>
              <strong>Top Performer</strong>
              <br/>
              {highlights.TopPerformer}
            </p>

            <p>
              <strong>Highest Selling</strong>
              <br/>
              {highlights.HighestSelling}
            </p>

            <p>
              <strong>Needs Attention</strong>
              <br/>
              {highlights.NeedsAttention}
            </p>

          </div>

          <div className="prd-side-card">

            <h4>
              Top Profitable Products
            </h4>

            {topProfit.map(
              (x:any,index:number)=>(
                <div key={index}>
                  {x.ProductName}
                </div>
              )
            )}

          </div>

          <div className="prd-side-card">

            <h4>
              Top Loss Products
            </h4>

            {topLoss.map(
              (x:any,index:number)=>(
                <div key={index}>
                  {x.ProductName}
                </div>
              )
            )}

          </div>

        </div>

      </div>

    </div>

  );

};

export default ProductPerformance;