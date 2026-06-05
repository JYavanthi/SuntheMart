
// // primry image issue


// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Sidebar from "./sidebar";
// import Header from "./topbar";
// import "./styles/addProduct.css";
// type LocationState = {
//   product?: any;
//   price?: any;
//   images?: any[];
//   ProductCategoryID?: number;
//   CategoryName?: string;
// };

// const AddProduct = () => {

// // const location = useLocation();
// const location = useLocation() as { state: LocationState };
// const navigate = useNavigate();

// const editProduct = location.state?.product;
// const editPrice = location.state?.price;
// const editImages = location.state?.images || [];

// const ProductCategoryID =
// location.state?.ProductCategoryID || editProduct?.ProductCategoryID;

// const CategoryName =
// location.state?.CategoryName || editProduct?.CategoryName;

// const [productName, setProductName] = useState("");
// const [productDescription, setProductDescription] = useState("");
// const [weight, setWeight] = useState("");
// const [weightUnit, setWeightUnit] = useState("ml");
// const [price, setPrice] = useState("");
// const [discountPrice, setDiscountPrice] = useState("");
// const [stock, setStock] = useState("In Stock");
// const [quantity, setQuantity] = useState("");
// const [sku, setSku] = useState("");
// const [homeSection, setHomeSection] = useState("");

// const [images, setImages] = useState<File[]>([]);
// const [existingImages, setExistingImages] = useState<any[]>([]);
// const [primaryIndex, setPrimaryIndex] = useState(0);
// const [primaryImageType, setPrimaryImageType] = useState<'existing' | 'new' | null>(null); // 🔥 ADDED

// /* PREFILL DATA */

// useEffect(() => {

// if (editProduct) {

// setProductName(editProduct.ProductName || "");
// setProductDescription(editProduct.ProductDescription || "");
// setQuantity(editProduct.Quantity || "");
// setSku(editProduct.SKU || "");

// if (editPrice) {
// setPrice(editPrice.Price || "");
// setDiscountPrice(editPrice.DiscountPrice || "");
// }

// if (editProduct.ProductWeight) {
// const parts = editProduct.ProductWeight.split(" ");
// setWeight(parts[0]);
// setWeightUnit(parts[1] || "ml");
// }

// setStock(editProduct.Status === 1 ? "In Stock" : "Out of Stock");
// setHomeSection(editProduct.HomeSection || "");

// if (editImages.length > 0) {
// setExistingImages(editImages);
// setPrimaryImageType('existing'); // 🔥 ADDED
// setPrimaryIndex(0); // 🔥 ADDED
// }

// }

// }, [editProduct, editPrice, editImages]);

// /* DELETE EXISTING IMAGE */

// const deleteExistingImage = async (attachmentId: number, index: number) => { // 🔥 CHANGED: Added index parameter

// try {

// await fetch(`http://localhost:4000/api/attachments/${attachmentId}`, {
// method: "DELETE"
// });

// setExistingImages(prev => {
// const updated = prev.filter(img => img.AttachmentID !== attachmentId);
  
// // 🔥 ADDED: If deleting the primary image (first one)
// if (index === 0 && primaryImageType === 'existing') {
// if (updated.length > 0) {
// // Set next existing image as primary
// setPrimaryIndex(0);
// setPrimaryImageType('existing');
// } else if (images.length > 0) {
// // Set first new image as primary
// setPrimaryIndex(0);
// setPrimaryImageType('new');
// } else {
// // No images left
// setPrimaryImageType(null);
// setPrimaryIndex(0);
// }
// }

// return updated;
// });

// } catch (err) {
// console.error("Delete image failed", err);
// }

// };

// /* IMAGE SELECT */

// const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {

// if (!e.target.files) return;

// const selectedFiles = Array.from(e.target.files);

// setImages((prev) => {

// const combined = [...prev, ...selectedFiles];
// const final = combined.slice(0, 4);

// // 🔥 ADDED: If no primary image is set, set the first new image as primary
// if (primaryImageType === null && final.length > 0) {
// setPrimaryImageType('new');
// setPrimaryIndex(0);
// }

// return final;

// });

// e.target.value = "";

// };

// // 🔥 UPDATED: Set primary image when clicking on thumbnail
// const setPrimary = (index: number, type: 'existing' | 'new') => {
// setPrimaryIndex(index);
// setPrimaryImageType(type);
// };

// // 🔥 ADDED: Handle clicking on big container to select primary image
// const handleBigContainerClick = () => {
// document.getElementById("imageUpload")?.click();
// };

// /* SUBMIT */

// const handleSubmit = async () => {

// try {

// if (!ProductCategoryID || !productName || !price) {
// alert("Fill required fields");
// return;
// }

// let ProductID = editProduct?.ProductID;

// /* CREATE PRODUCT */

// if (!editProduct) {

// const productRes = await fetch(
// "http://localhost:4000/api/products",
// {
// method: "POST",
// headers: { "Content-Type": "application/json" },
// body: JSON.stringify({
// ProductCategoryID,
// ProductName: productName,
// ProductDescription: productDescription,
// ProductWeight: `${weight} ${weightUnit}`,
// Quantity: quantity || 0,
// Status: stock === "In Stock" ? 1 : 0,
// SKU: sku,
// HomeSection: homeSection ,
// IsFeatured: 0,
// CreatedBy: 1
// })
// }
// );

// const productData = await productRes.json();
// ProductID = productData.ProductID;

// } else {

// /* UPDATE PRODUCT */

// await fetch(
// `http://localhost:4000/api/products/${ProductID}`,
// {
// method: "PUT",
// headers: { "Content-Type": "application/json" },
// body: JSON.stringify({
// ProductCategoryID,
// ProductName: productName,
// ProductDescription: productDescription,
// ProductWeight: `${weight} ${weightUnit}`,
// Quantity: quantity || 0,
// Status: stock === "In Stock" ? 1 : 0,
// SKU: sku,
// HomeSection: homeSection 
// })
// }
// );

// }

// /* CREATE / UPDATE PRICE */

// if (editProduct) {

// await fetch(
// `http://localhost:4000/api/product-prices/${ProductID}`,
// {
// method: "PUT",
// headers: { "Content-Type": "application/json" },
// body: JSON.stringify({
// Price: Number(price),
// DiscountPrice: discountPrice ? Number(discountPrice) : null
// })
// }
// );

// } else {

// await fetch(
// "http://localhost:4000/api/product-prices",
// {
// method: "POST",
// headers: { "Content-Type": "application/json" },
// body: JSON.stringify({
// ProductID,
// Price: Number(price),
// DiscountPrice: discountPrice ? Number(discountPrice) : null,
// CreatedBy: 1
// })
// }
// );

// }

// /* UPLOAD NEW IMAGES */

// if (images.length > 0) {

// // 🔥 UPDATED: Reorder images based on primary selection
// let reorderedImages = [...images];
  
// if (primaryImageType === 'new') {
// reorderedImages = [
// images[primaryIndex],
// ...images.filter((_, i) => i !== primaryIndex)
// ];
// }

// const formData = new FormData();

// reorderedImages.forEach((file) => {
// formData.append("images", file);
// });

// await fetch(
// `http://localhost:4000/api/attachments/${ProductID}`,
// {
// method: editProduct ? "PUT" : "POST",
// body: formData
// }
// );

// }

// alert(editProduct ? "✅ Product Updated" : "✅ Product Added");

// navigate("/adminProduct");

// } catch (err) {

// console.error(err);
// alert("Something went wrong");

// }

// };

// const removeImage = (index: number) => {

// setImages((prev) => {

// const updated = prev.filter((_, i) => i !== index);

// // 🔥 UPDATED: Handle primary image selection after deletion
// if (primaryImageType === 'new') {
// if (index === primaryIndex) {
// // Deleted the primary image
// if (updated.length > 0) {
// // Set first remaining new image as primary
// setPrimaryIndex(0);
// setPrimaryImageType('new');
// } else if (existingImages.length > 0) {
// // Set first existing image as primary
// setPrimaryIndex(0);
// setPrimaryImageType('existing');
// } else {
// // No images left
// setPrimaryImageType(null);
// setPrimaryIndex(0);
// }
// } else if (index < primaryIndex) {
// setPrimaryIndex((prevIndex) => prevIndex - 1);
// }
// }

// return updated;

// });

// };

// // 🔥 ADDED: Function to get primary image display
// const getPrimaryImageDisplay = () => {
// if (primaryImageType === 'new' && images.length > 0 && images[primaryIndex]) {
// return (
// <img
// src={URL.createObjectURL(images[primaryIndex])}
// style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "15px" }}
// alt="Primary"
// />
// );
// } else if (primaryImageType === 'existing' && existingImages.length > 0 && existingImages[primaryIndex]) {
// return (
// <img
// src={`http://localhost:4000${existingImages[primaryIndex].AttachmentFile}`}
// style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "15px" }}
// alt="Primary"
// />
// );
// } else {
// return <span style={{ fontSize: "40px", color: "#7ddc7a" }}>+</span>;
// }
// };

// return (

// <div className="ad-app">

// <Sidebar />

// <main className="ad-main">

// <Header />

// <div className="ap-wrapper">

// <div className="ap-card">

// <div className="ap-header">
// <h3>{editProduct ? "✏ Edit Product" : "➕ Add New Product"}</h3>
// </div>

// <div className="ap-lftrght">

// <div className="ap-left">

// <h4>General Information:</h4>

// <label>Product Name:</label>
// <input value={productName} onChange={(e) => setProductName(e.target.value)} />

// <label>Product Details:</label>

// <textarea value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />

// <div className="ap-row">

// <div>

// <label>Weight</label>

// <div className="ap-input-group">

// <input value={weight} onChange={(e) => setWeight(e.target.value)} />

// <select value={weightUnit} onChange={(e) => setWeightUnit(e.target.value)}>
// <option value="ml">ml</option>
// <option value="kg">kg</option>
// <option value="gm">gm</option>
// </select>

// </div>

// </div>

// <div>

// <label>Stock</label>

// <select value={stock} onChange={(e) => setStock(e.target.value)}>
// <option>In Stock</option>
// <option>Out of Stock</option>
// </select>

// </div>

// </div>

// <h4>Price and Stock</h4>

// <div className="ap-row">

// <div>

// <label>Base Pricing</label>

// <div className="ap-input-group">

// <input value={price} onChange={(e) => setPrice(e.target.value)} />
// <select><option>Rs.</option></select>

// </div>

// </div>

// <div>

// <label>Quantity In Stock</label>

// <input value={quantity} onChange={(e) => setQuantity(e.target.value)} />

// </div>

// </div>

// <div className="ap-row">

// <div>

// <label>Discount</label>
// <input value={discountPrice} onChange={(e) => setDiscountPrice(e.target.value)} />

// </div>

// <div>

// <label>S K U</label>
// <input value={sku} onChange={(e) => setSku(e.target.value)} />

// </div>
// <div><label>Show on Home Page</label>
// <select value={homeSection} onChange={(e) => setHomeSection(e.target.value)}>
//   <option value="">None</option>
//   <option value="FRESH_PICKS">Fresh Picks</option>
//   <option value="BEST_DEALS">Best Deals</option>
//   <option value="BOTH">Both</option>
// </select></div>

// </div>

// </div>

// <div className="ap-right">

// <div className="ap-actions">

// <button className="ap-draft">Save Draft</button>

// <button className="ap-add" onClick={handleSubmit}>
// {editProduct ? "Update Product" : "Add Product"}
// </button>

// </div>

// <h4>Upload Image</h4>

// <input
// type="file"
// multiple
// accept="image/*"
// id="imageUpload"
// style={{ display: "none" }}
// onChange={handleImageChange}
// />

// {/* 🔥 UPDATED: Big container */}
// <div
// className="ap-upload-box"
// onClick={handleBigContainerClick}
// style={{ cursor: "pointer", overflow: "hidden" }}
// >
// {getPrimaryImageDisplay()}
// </div>

// <div className="ap-thumbs">

// {/* EXISTING IMAGES */}

// {existingImages.map((img: any, index: number) => (
// <div
// key={index}
// className="ap-thumb"
// style={{ position: "relative" }}
// onClick={() => setPrimary(index, 'existing')} // 🔥 UPDATED
// >

// <img
// src={`http://localhost:4000${img.AttachmentFile}`}
// style={{
// width: "100%",
// height: "100%",
// objectFit: "cover",
// borderRadius: "50%",
// border: primaryImageType === 'existing' && primaryIndex === index ? "3px solid #4caf50" : "none" // 🔥 UPDATED
// }}
// alt={`Existing ${index}`}
// />

// <span
// onClick={(e) => {
// e.stopPropagation();
// deleteExistingImage(img.AttachmentID, index); // 🔥 UPDATED
// }}
// style={{
// position: "absolute",
// top: "-5px",
// right: "-5px",
// background: "red",
// color: "white",
// width: "16px",
// height: "16px",
// borderRadius: "50%",
// fontSize: "12px",
// display: "flex",
// alignItems: "center",
// justifyContent: "center",
// cursor: "pointer"
// }}
// >
// ×
// </span>

// </div>
// ))}

// {/* NEW IMAGES */}

// {images.map((img, index) => (
// <div
// key={index}
// className="ap-thumb"
// style={{ position: "relative" }}
// onClick={() => setPrimary(index, 'new')} // 🔥 UPDATED
// >

// <img
// src={URL.createObjectURL(img)}
// style={{
// width: "100%",
// height: "100%",
// objectFit: "cover",
// borderRadius: "50%",
// border: primaryImageType === 'new' && primaryIndex === index ? "3px solid #4caf50" : "none" // 🔥 UPDATED
// }}
// alt={`New ${index}`}
// />

// <span
// onClick={(e) => {
// e.stopPropagation();
// removeImage(index);
// }}
// style={{
// position: "absolute",
// top: "-5px",
// right: "-5px",
// background: "red",
// color: "white",
// width: "16px",
// height: "16px",
// borderRadius: "50%",
// fontSize: "12px",
// display: "flex",
// alignItems: "center",
// justifyContent: "center",
// cursor: "pointer"
// }}
// >
// ×
// </span>

// </div>
// ))}

// {/* ADD IMAGE */}

// {images.length < 4 && (
// <div
// className="ap-thumb ap-add-thumb"
// onClick={() => document.getElementById("imageUpload")?.click()}
// style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", cursor: "pointer" }}
// >
// +
// </div>
// )}

// </div>

// <label>Category</label>

// <input value={CategoryName || ""} disabled />

// {/* <button
// className="ap-add"
// style={{ marginTop: "10px", width: "100%" }}
// onClick={() => navigate("/AdminChooseCategory")}
// >
// Choose Category
// </button> */}
// <button
// className="ap-add"
// style={{ marginTop: "10px", width: "100%" }}
// onClick={() =>
//   navigate("/AdminChooseCategory", {
//     state: {
//       product: editProduct,
//       price: editPrice,
//       images: existingImages,
//       isEdit: true
//     }
//   })
// }
// >
// Choose Category
// </button>

// </div>

// </div>

// </div>

// </div>

// </main>

// </div>

// );

// };

// export default AddProduct;

import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import Sidebar from "./sidebar";
import Header from "./topbar";

import ProductDetailsSection from "./components/ProductDetailsSection";
import PricingSection from "./components/PricingSection";

import "./styles/addProduct.css";

const AddProduct = () => {

  const location = useLocation();

  const VendorID = location.state?.VendorID || 0;

  const [step, setStep] = useState(1);

  const [productId, setProductId] = useState<number | null>(null);

  const [productData, setProductData] = useState<any>({
    ProductCategoryID: "",
    ProductName: "",
    ProductDescription: "",
    Quantity: "",
    SKU: "",
    Status: true,
    ProductWeight: "",
    HomeSection: ""
  });

  const [priceData, setPriceData] = useState<any>({
    Price: "",
    DiscountPrice: "",
    ValidFrom: "",
    ValidTo: ""
  });

  return (

    <div className="addproduct-layout">

      <Sidebar />

      <div className="addproduct-main">

        <Header />

        <div className="addproduct-header">

          <h2>Add New Product</h2>

          <p>
            Create a new product for this vendor
          </p>

        </div>

        {/* STEPPER */}

        <div className="addproduct-stepper">

          <div
            className={
              step >= 1
                ? "addproduct-step active"
                : "addproduct-step"
            }
          >
            <span>1</span>
            <div>
              <h4>Basic Information</h4>
              <small>Product Details</small>
            </div>
          </div>

          <div
            className={
              step >= 2
                ? "addproduct-step active"
                : "addproduct-step"
            }
          >
            <span>2</span>
            <div>
              <h4>Pricing & Inventory</h4>
              <small>Price Information</small>
            </div>
          </div>

        </div>

        {/* STEP CONTENT */}

        {step === 1 && (

          <ProductDetailsSection

            VendorID={VendorID}

            productData={productData}

            setProductData={setProductData}

            setProductId={setProductId}

            onNext={() => setStep(2)}

          />

        )}

        {step === 2 && (

          <PricingSection

            ProductID={productId}

            productData={productData}

            priceData={priceData}

            setPriceData={setPriceData}

            onBack={() => setStep(1)}

          />

        )}

      </div>

    </div>

  );

};

export default AddProduct;