import React, { useEffect, useState } from "react";
import "./styles/checkout.css";
import Navbar from "./Navbar/navbar";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";
import { useAddress } from "./context/AddressContext";
import { useCart } from "./context/CartContext";
import AddressFormModal from "./addressFormModal";
import { API_URLS } from "./API-Urls";
import { useConfirm } from "./context/ConfirmContext";
import axios from "axios";
import ordscs from "./assets/order_sucess.jpeg";
import banner from "./assets/cart-bg.jpeg";

import upiIcon from "./assets/upi_paymode.png";
import cardIcon from "./assets/card_paymode_new.png";
import bankIcon from "./assets/netbanking_paymode_new.png";
import codIcon from "./assets/cod.png";

const emptyForm = {
  flat: "",
  street: "",
  landmark: "",
  pincode: "",
  city: "",
  state: "",
  name: "",
  mobile: "",
  type: "Home",
  default: false,
};

const Checkout = () => {

  const navigate = useNavigate();

  const {
    addresses,
    selectedAddress,
    selectAddress,
    fetchAddresses,
    deleteAddress,
  } = useAddress();

  const { cartItems } = useCart();

  const { confirm } = useConfirm();

  const [selectedMethod, setSelectedMethod] =
    useState("upi");

  const [loading, setLoading] = useState(false);

  const [showForm, setShowForm] =
    useState(false);

  const [form, setForm] =
    useState<any>(emptyForm);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [coupons, setCoupons] = useState<any[]>(
    []
  );

  const [autoDiscount, setAutoDiscount] =
    useState(0);

  const userId = Number(
    localStorage.getItem("userId")
  );

  const couponDiscount = Number(
    localStorage.getItem(
      "couponDiscount"
    ) || 0
  );

  const couponCode =
    localStorage.getItem("couponCode") || "";

  const total = cartItems.reduce(
    (sum, item) =>
      sum +
      (item.discount || item.price) * item.qty,
    0
  );

  const gst = cartItems.reduce(
    (sum, item) =>
      sum +
      (((item.discount || item.price) *
        item.qty *
        item.gstPercent) /
        100),
    0
  );

  const subTotal =
    total - autoDiscount - couponDiscount;

  const finalTotal = subTotal + gst;

  useEffect(() => {
    if (userId) {
      fetchAddresses(userId);
    }
  }, [userId]);

  useEffect(() => {

    const fetchCoupons = async () => {

      try {

        const res = await fetch(
          `${API_URLS.BASE_URL}discounts`
        );

        const data = await res.json();

        if (data.success) {
          setCoupons(data.data);
        }

      } catch (err) {
        console.log(err);
      }

    };

    fetchCoupons();

  }, []);

  useEffect(() => {

    if (coupons.length === 0) return;

    const auto = coupons.find(
      (c: any) =>
        !c.CouponCode ||
        c.CouponCode.trim() === ""
    );

    if (!auto) return;

    const discountValue = Number(
      auto.DiscountValue || 0
    );

    const maxDiscount = Number(
      auto.MaxDiscount || 0
    );

    let discount = 0;

    if (auto.DiscountType === "Flat") {

      discount = discountValue;

    } else {

      discount =
        (total * discountValue) / 100;

      if (maxDiscount > 0) {
        discount = Math.min(
          discount,
          maxDiscount
        );
      }

    }

    setAutoDiscount(discount);

  }, [coupons, total]);

  const openAddForm = () => {

    setEditingId(null);

    setForm({ ...emptyForm });

    setShowForm(true);

  };

  const handleDelete = async (
    id: number,
    e: any
  ) => {

    e.stopPropagation();

    await deleteAddress(id);

    if (userId) {
      fetchAddresses(userId);
    }

  };

  const handleConfirmOrder = async () => {

    if (!selectedAddress) {
      alert("Please select address");
      return;
    }

    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {

      setLoading(true);

      const orderRes = await axios.post(
        "http://localhost:4000/api/order/create",
        {
          userId,

          cartItems: cartItems.map(
            (item) => ({
              productId: item.id,
              quantity: item.qty,
              unitPrice: item.price,
              totalPrice: item.price * item.qty,
            })
          ),

          subTotalAmount: total,

          discountAmount: autoDiscount,

          couponCode,

          couponDiscount,

          totalAmount: finalTotal,

          taxAmount: gst,

          paymentMode:
            selectedMethod === "upi"
              ? "PHONEPE"
              : selectedMethod === "cod"
              ? "COD"
              : selectedMethod.toUpperCase(),

          shippingAddress: {
            name: selectedAddress.name,
            mobile: selectedAddress.mobile,
            flat: selectedAddress.flat,
            street: selectedAddress.street,
            landmark:
              selectedAddress.landmark,
            city: selectedAddress.city,
            state: selectedAddress.state,
            pincode:
              selectedAddress.pincode,
            type: selectedAddress.type,
          },
        }
      );

      const orderId =
        orderRes.data.orderId;

      if (selectedMethod === "upi") {

        const payRes = await axios.post(
          "http://localhost:4000/api/payment/create",
          {
            orderId,
            amount: finalTotal,
          }
        );

        const redirectUrl =
          payRes.data.redirectUrl;

        if (!redirectUrl) {
          throw new Error(
            "Payment failed"
          );
        }

        window.location.href =
          redirectUrl;

        return;

      }

      await confirm({
        title: "Order Update",
        subText:
          "Your order has been placed successfully.",
        cancelText: "Close",
        image: ordscs,
        variant: "success",
      });

      navigate(
        `/success?orderId=${orderId}`
      );

    } catch (err) {

      console.log(err);

      alert("Payment Failed");

    } finally {

      setLoading(false);

    }

  };

  return (
    <>
      <Navbar />

      <div className="checkout-page">

        <div className="checkout-top-banner">
          
                    <img
                      src={banner}
                      alt=""
                      className="checkout-banner-img"
                    />

          <div className="checkout-banner-overlay"></div>
            <div className="checkout-banner-content">

            <div className="checkout-banner-left">

              <h1>
                Checkout
              </h1>

              <div className="checkout-breadcrumb">

                Home
                <span>›</span>
                Checkout
              </div>

            </div>

            <div className="checkout-banner-right">

              <div className="checkout-banner-card">

                <div className="checkout-banner-icon">
                  ♡
                </div>

                <div>

                  <h3>
                    Fresh picks you love.
                  </h3>

                  <p>
                    Handpicked from our farms,
                    saved just for you.
                  </p>

                </div>

              </div>

            </div>

          </div>


          </div>

        </div>

        <div className="checkout-container">

          {/* LEFT */}

          <div className="checkout-left">

            {/* ADDRESS */}

            <div className="checkout-card">

              <h3 className="checkout-title">
                1. Delivery Address
              </h3>

              <div className="checkout-address-grid">

                {addresses.map((item: any) => (

                  <div
                    key={item.id}
                    className={`checkout-address-card ${
                      selectedAddress?.id ===
                      item.id
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      selectAddress(item)
                    }
                  >

                    <div className="checkout-address-top">

                      <input
                        type="radio"
                        checked={
                          selectedAddress?.id ===
                          item.id
                        }
                        readOnly
                      />

                      <div className="checkout-address-head">

                        <span className="checkout-address-type">
                          {item.type}
                        </span>

                        {item.isDefault && (
                          <span className="checkout-default-badge">
                            Default
                          </span>
                        )}

                      </div>

                    </div>
                    
                    <div className="checkout-address-dtls">
                   <h4>{item.name}</h4>

                    <p>
                      {item.flat},{" "}
                      {item.street}
                    </p>

                    <p>
                      {item.city},{" "}
                      {item.state}
                    </p>

                    <p>{item.mobile}</p>
                    </div>


                  </div>

                ))}

              </div>

              <button
                className="checkout-add-address"
                onClick={openAddForm}
              >
                + Add New Address
              </button>

            </div>

            {/* DELIVERY */}

            <div className="checkout-card">

              <h3 className="checkout-title">
                2. Delivery Options
              </h3>

              <div className="checkout-delivery-grid">

                <div className="checkout-delivery-card active">

                  <div>

                    <h4>
                      Standard Delivery
                    </h4>

                    <p>
                      24 - 48 hours
                    </p>

                  </div>

                  <span>FREE</span>

                </div>

                <div className="checkout-delivery-card">

                  <div>

                    <h4>
                      Express Delivery
                    </h4>

                    <p>
                      Within 4 - 6 hours
                    </p>

                  </div>

                  <span>₹49</span>

                </div>

              </div>

            </div>

            {/* PAYMENT */}

            <div className="checkout-card">

              <h3 className="checkout-title">
                3. Payment Methods
              </h3>

              <div className="checkout-payment-grid">

                <div
                  className={`checkout-payment-card ${
                    selectedMethod === "upi"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedMethod("upi")
                  }
                >

                  <div className="checkout-payment-top">
                     <input
                      type="radio"
                      checked={
                        selectedMethod === "upi"
                      }
                      readOnly
                    />

                    <div className="checkout-payment-title">
                      UPI / UPI ID
                      <div className="checkout-payment-desc">
                        Pay using any UPI app
                      </div>
                    </div>
                    
                    
                   <div className="checkout-payment-icons">
                    <img
                      src={upiIcon}
                      alt=""
                    />
                   </div>  
                  </div>
                </div>

                <div
                  className={`checkout-payment-card ${
                    selectedMethod === "card"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedMethod("card")
                  }
                >

                  <div className="checkout-payment-top">
                     <input
                      type="radio"
                      checked={
                        selectedMethod ===
                        "card"
                      }
                      readOnly
                    />
                    <div className="checkout-payment-title">
                      Credit / Debit Card
                      <div className="checkout-payment-desc">
                        Visa, Mastercard, Rupay
                      </div>
                    </div>

                   
                  <div className="checkout-payment-icons">
                    <img
                      src={cardIcon}
                      alt=""
                    />
                  </div>

                  </div>
                </div>

                <div
                  className={`checkout-payment-card ${
                    selectedMethod === "bank"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedMethod("bank")
                  }
                >

                  <div className="checkout-payment-top">
                    <input
                      type="radio"
                      checked={
                        selectedMethod ===
                        "bank"
                      }
                      readOnly
                    />

                    <div className="checkout-payment-title">
                      Net Banking
                      <div className="checkout-payment-desc">
                         All major banks supported
                      </div>
                    </div>

                   <div className="checkout-payment-icons">
                    <img
                      src={bankIcon}
                      alt=""
                    />
                   </div>
                  </div>
                </div>

                <div
                  className={`checkout-payment-card ${
                    selectedMethod === "cod"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedMethod("cod")
                  }
                >

                  <div className="checkout-payment-top">
                    <input
                      type="radio"
                      checked={
                        selectedMethod ===
                        "cod"
                      }
                      readOnly
                    />

                    <div className="checkout-payment-title">
                      Cash on Delivery
                      <div className="checkout-payment-desc">
                        Pay when your order arrives
                      </div>
                    </div>


                    <div className="checkout-payment-icons">
                      <img
                        src={codIcon}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>

             
              <div className="checkout-bottom-row">

                <button
                  className="checkout-back-btn"
                  onClick={() =>
                    navigate("/cart")
                  }
                >
                  ← Back to Cart
                </button>

                <div>

                  <button
                    className="checkout-place-order"
                    onClick={
                      handleConfirmOrder
                    }
                    disabled={loading}
                  >
                    {loading
                      ? "PROCESSING..."
                      : "Place Order"}
                  </button>

                  <div className="checkout-save-text-bottom">
                    You will save ₹
                    {(
                      autoDiscount +
                      couponDiscount
                    ).toFixed(2)}
                    {" "}on this order
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="checkout-right">

            <div className="checkout-summary-card">

              <h3 className="checkout-summary-heading">
                Order Summary
              </h3>

              <div className="checkout-summary-row">
                <span>
                  Subtotal ({cartItems.length} items)
                </span>

                <span>
                  ₹{total.toFixed(0)}
                </span>
              </div>

              {autoDiscount > 0 && (
                <div className="checkout-summary-row checkout-green-row">
                  <span>Savings</span>

                  <span>
                    -₹{autoDiscount.toFixed(0)}
                  </span>
                </div>
              )}

              {couponDiscount > 0 && (
                <div className="checkout-summary-row checkout-green-row">
                  <span>
                    Coupon Discount
                  </span>

                  <span>
                    -₹{couponDiscount.toFixed(0)}
                  </span>
                </div>
              )}

              <div className="checkout-summary-row">

                <span>
                  Delivery Charges
                </span>

                <span>FREE</span>

              </div>
                            <div className="checkout-summary-row">

                <p>
                  GST
                </p>

                <span>
                  ₹ {gst.toFixed(2)}
                </span>

              </div>


              <hr className="checkout-summary-divider" />

              <div className="checkout-total-row">

                <div>

                  <h2>
                    Total Amount
                  </h2>

                  <p>
                    Inclusive of all taxes
                  </p>

                </div>

                <span>
                  ₹{finalTotal.toFixed(0)}
                </span>

              </div>

              <div className="checkout-save-banner">

                <span>
                  🏷
                </span>

                <p>
                  You will save ₹
                  {(
                    autoDiscount +
                    couponDiscount
                  ).toFixed(0)}
                  {" "}on this order
                </p>

              </div>

              <div className="checkout-feature-list">

                <div className="checkout-feature-item">

                  <span>
                    🛡
                  </span>

                  <div>

                    <h4>
                      100% Safe & Secure Payments
                    </h4>

                    <p>
                      Your transactions are protected
                    </p>

                  </div>

                </div>

                <div className="checkout-feature-item">

                  <span>
                    ♻
                  </span>

                  <div>

                    <h4>
                      Freshness Guaranteed
                    </h4>

                    <p>
                      We deliver only the freshest produce
                    </p>

                  </div>

                </div>

                <div className="checkout-feature-item">

                  <span>
                    🚚
                  </span>

                  <div>

                    <h4>
                      On-time Delivery
                    </h4>

                    <p>
                      Fast and reliable delivery at your doorstep
                    </p>

                  </div>

                </div>

                <div className="checkout-feature-item">

                  <span>
                    🔄
                  </span>

                  <div>

                    <h4>
                      Easy Returns
                    </h4>

                    <p>
                      Hassle-free returns within 24 hours
                    </p>

                  </div>

                </div>

              </div>

              <div className="checkout-help-section">

                <h4>
                  Need Help?
                </h4>

                <div className="checkout-help-row">

                  <span>
                    📞 +91 81000 12345
                  </span>

                  <span>
                    ✉ support@lushharvest.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      <Footer />
    </>
  );
};

export default Checkout;