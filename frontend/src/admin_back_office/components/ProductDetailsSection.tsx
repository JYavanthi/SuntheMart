import React, { useState } from "react";

interface Props {
  VendorID: number;
  productData: any;
  setProductData: any;
  setProductId: any;
  onNext: () => void;
}

const ProductDetailsSection = ({
  VendorID,
  productData,
  setProductData,
  setProductId,
  onNext
}: Props) => {

  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState<File[]>([]);

  const [productIdLocal, setProductIdLocal] =
    useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {

    setProductData({
      ...productData,
      [e.target.name]: e.target.value
    });

  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    if (!e.target.files) return;

    const files =
      Array.from(e.target.files);

    setImages(files);

  };

  /* CREATE PRODUCT */

  const createProduct = async () => {

    try {

      setLoading(true);

      const response = await fetch(
        "http://localhost:4000/api/products",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({

            VendorID,

            ProductCategoryID:
              Number(
                productData.ProductCategoryID
              ),

            ProductName:
              productData.ProductName,

            ProductDescription:
              productData.ProductDescription,

            Quantity:
              Number(
                productData.Quantity
              ),

            SKU:
              productData.SKU,

            Status:
              productData.Status,

            ProductWeight:
              productData.ProductWeight,

            HomeSection:
              productData.HomeSection,

            IsFeatured: 0,

            CreatedBy: 1

          })

        }
      );

      const result =
        await response.json();

      if (!result.success) {

        alert(
          "Failed to create product"
        );

        return;

      }

      const ProductID =
        result.ProductID;

      setProductId(ProductID);

      setProductIdLocal(ProductID);

      localStorage.setItem(
        "CurrentProductID",
        ProductID
      );

      /* UPLOAD IMAGES */

      if (images.length > 0) {

        const formData =
          new FormData();

        images.forEach((file) => {

          formData.append(
            "images",
            file
          );

        });

        await fetch(

          `http://localhost:4000/api/attachments/${ProductID}`,

          {

            method: "POST",

            body: formData

          }

        );

      }

      onNext();

    }

    catch (error) {

      console.log(error);

      alert(
        "Something went wrong"
      );

    }

    finally {

      setLoading(false);

    }

  };

  /* UPDATE PRODUCT */

  const updateProduct =
    async () => {

      const ProductID =
        localStorage.getItem(
          "CurrentProductID"
        );

      if (!ProductID) {

        alert(
          "No Product Found"
        );

        return;

      }

      try {

        await fetch(

          `http://localhost:4000/api/products/${ProductID}`,

          {

            method: "PUT",

            headers: {

              "Content-Type":
                "application/json"

            },

            body: JSON.stringify({

              VendorID,

              ProductCategoryID:
                Number(
                  productData.ProductCategoryID
                ),

              ProductName:
                productData.ProductName,

              ProductDescription:
                productData.ProductDescription,

              Quantity:
                Number(
                  productData.Quantity
                ),

              SKU:
                productData.SKU,

              Status:
                productData.Status,

              ProductWeight:
                productData.ProductWeight,

              HomeSection:
                productData.HomeSection

            })

          }

        );

        /* UPDATE IMAGES */

        if (images.length > 0) {

          const formData =
            new FormData();

          images.forEach(
            (file) => {

              formData.append(
                "images",
                file
              );

            }
          );

          await fetch(

            `http://localhost:4000/api/attachments/${ProductID}`,

            {

              method: "PUT",

              body: formData

            }

          );

        }

        alert(
          "Product Updated"
        );

      }

      catch (error) {

        console.log(error);

      }

    };

  /* DELETE PRODUCT */

  const deleteProduct =
    async () => {

      const ProductID =
        localStorage.getItem(
          "CurrentProductID"
        );

      if (!ProductID) return;

      const confirmDelete =
        window.confirm(
          "Delete Product?"
        );

      if (!confirmDelete) return;

      try {

        await fetch(

          `http://localhost:4000/api/products/${ProductID}`,

          {

            method: "DELETE"

          }

        );

        alert(
          "Product Deleted"
        );

      }

      catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="add-prod-section">

      <div className="add-prod-card">

        <h3>
          Product Details
        </h3>

        <div className="add-prod-grid">

          <div>

            <label>
              Product Name
            </label>

            <input
              type="text"
              name="ProductName"
              value={
               productData?.ProductName || ""
              }
              onChange={
                handleChange
              }
            />

          </div>

          <div>

            <label>
              Category ID
            </label>

            <input
              type="number"
              name="ProductCategoryID"
              value={
                productData?.ProductCategoryID || ""
              }
              onChange={
                handleChange
              }
            />

          </div>

          <div>

            <label>
              SKU
            </label>

            <input
              type="text"
              name="SKU"
              value={
                productData?.SKU || ""
              }
              onChange={
                handleChange
              }
            />

          </div>

          <div>

            <label>
              Quantity
            </label>

            <input
              type="number"
              name="Quantity"
              value={
                productData?.Quantity || ""
              }
              onChange={
                handleChange
              }
            />

          </div>

          <div>

            <label>
              Product Weight
            </label>

            <input
              type="text"
              name="ProductWeight"
              value={
                productData?.ProductWeight || ""
              }
              onChange={
                handleChange
              }
            />

          </div>

          <div>

            <label>
              Home Section
            </label>

            <input
              type="text"
              name="HomeSection"
              value={
                productData?.HomeSection || ""
              }
              onChange={
                handleChange
              }
            />

          </div>

        </div>

        <div className="add-prod-description">

          <label>
            Description
          </label>

          <textarea
            rows={5}
            name="ProductDescription"
            value={
              productData?.ProductDescription || ""
            }
            onChange={
              handleChange
            }
          />

        </div>

        {/* IMAGE SECTION */}

        <div
          className="add-prod-image-section"
        >

          <label>
            Product Images
          </label>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={
              handleImageChange
            }
          />

          <div className="add-prod-image-preview">

            {images.map(
              (
                image,
                index
              ) => (

                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt=""
                  width="100"
                />

              )
            )}

          </div>

        </div>

        <div className="add-prod-actions">

          <button
            className="add-prod-save-btn"
            onClick={
              createProduct
            }
            disabled={
              loading
            }
          >
            Save & Continue
          </button>

          <button
            className="add-prod-update-btn"
            onClick={
              updateProduct
            }
          >
            Update
          </button>

          <button
            className="add-prod-delete-btn"
            onClick={
              deleteProduct
            }
          >
            Delete
          </button>

        </div>

      </div>

    </div>

  );

};

export default ProductDetailsSection;
