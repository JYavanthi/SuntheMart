

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  ProductID: number | null;
  productData: any;
  priceData: any;
  setPriceData: any;
  onBack: () => void;
}

const PricingSection = ({
  ProductID,
  productData,
  priceData,
  setPriceData,
  onBack
}: Props) => {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement
    >
  ) => {

    setPriceData({

      ...priceData,

      [e.target.name]:
        e.target.value

    });

  };

  /* CREATE PRICE */

  const savePrice =
    async () => {

      try {

        setLoading(true);

        const currentProductId =
          ProductID ||
          Number(
            localStorage.getItem(
              "CurrentProductID"
            )
          );

        if (!currentProductId) {

          alert(
            "Product not found"
          );

          return;

        }

        const response =
          await fetch(

            "http://localhost:4000/api/product-prices",

            {

              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify({

                ProductID:
                  currentProductId,

                Price:
                  Number(
                    priceData.Price
                  ),

                DiscountPrice:
                  priceData.DiscountPrice
                    ? Number(
                        priceData.DiscountPrice
                      )
                    : null,

                ValidFrom:
                  priceData.ValidFrom,

                ValidTo:
                  priceData.ValidTo,

                CreatedBy: 1

              })

            }

          );

        const result =
          await response.json();

        if (
          result.success
        ) {

          alert(
            "Product Created Successfully"
          );

          localStorage.removeItem(
            "CurrentProductID"
          );

          navigate(
            "/vendor-details"
          );

        }

      }

      catch (error) {

        console.log(error);

        alert(
          "Failed to save pricing"
        );

      }

      finally {

        setLoading(false);

      }

    };

  /* UPDATE PRICE */

  const updatePrice =
    async () => {

      try {

        const currentProductId =
          ProductID ||
          Number(
            localStorage.getItem(
              "CurrentProductID"
            )
          );

        if (!currentProductId)
          return;

        const response =
          await fetch(

            `http://localhost:4000/api/product-prices/${currentProductId}`,

            {

              method: "PUT",

              headers: {

                "Content-Type":
                  "application/json"

              },

              body: JSON.stringify({

                Price:
                  Number(
                    priceData.Price
                  ),

                DiscountPrice:
                  priceData.DiscountPrice
                    ? Number(
                        priceData.DiscountPrice
                      )
                    : null,

                ValidFrom:
                  priceData.ValidFrom,

                ValidTo:
                  priceData.ValidTo,

                ModifiedBy: 1

              })

            }

          );

        const result =
          await response.json();

        if (
          result.success
        ) {

          alert(
            "Price Updated Successfully"
          );

        }

      }

      catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="pric-sec-section">

      <div className="pric-sec-card">

        <h3>
          Pricing Details
        </h3>

        <div className="pric-sec-layout">

          {/* LEFT */}

          <div className="pric-sec-form">

            <div className="pric-sec-grid">

              <div>

                <label>
                  Selling Price
                </label>

                <input
                  type="number"
                  name="Price"
                  value={
                    priceData.Price
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

              <div>

                <label>
                  Discount Price
                </label>

                <input
                  type="number"
                  name="DiscountPrice"
                  value={
                    priceData.DiscountPrice
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

              <div>

                <label>
                  Valid From
                </label>

                <input
                  type="date"
                  name="ValidFrom"
                  value={
                    priceData.ValidFrom
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

              <div>

                <label>
                  Valid To
                </label>

                <input
                  type="date"
                  name="ValidTo"
                  value={
                    priceData.ValidTo
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

            </div>

            <div className="pric-sec-actions">

              <button
                className="pric-sec-back-btn"
                onClick={onBack}
              >
                Back
              </button>

              <button
                className="pric-sec-update-btn"
                onClick={
                  updatePrice
                }
              >
                Update
              </button>

              <button
                className="pric-sec-save-btn"
                onClick={
                  savePrice
                }
                disabled={
                  loading
                }
              >
                {
                  loading
                    ? "Saving..."
                    : "Finish"
                }
              </button>

            </div>

          </div>

          {/* RIGHT */}

          <div className="pric-sec-summary-card">

            <h4>
              Product Summary
            </h4>

            <div className="pric-sec-summary-row">

              <span>
                Product Name
              </span>

              <strong>
                {
                  productData.ProductName
                }
              </strong>

            </div>

            <div className="summary-row">

              <span>
                SKU
              </span>

              <strong>
                {
                  productData.SKU
                }
              </strong>

            </div>

            <div className="summary-row">

              <span>
                Quantity
              </span>

              <strong>
                {
                  productData.Quantity
                }
              </strong>

            </div>

            <div className="summary-row">

              <span>
                Weight
              </span>

              <strong>
                {
                  productData.ProductWeight
                }
              </strong>

            </div>

            <div className="summary-row">

              <span>
                Selling Price
              </span>

              <strong>

                ₹
                {
                  priceData.Price || 0
                }

              </strong>

            </div>

            <div className="summary-row">

              <span>
                Discount Price
              </span>

              <strong>

                ₹
                {
                  priceData.DiscountPrice || 0
                }

              </strong>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default PricingSection;