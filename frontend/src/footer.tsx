import React from "react";
import "./styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      {/* 🔹 Newsletter Section */}
      <div className="newsletter">
        <div className="newsletter-left">
          <div className="icon">📩</div>
          <div>
            <h3>Subscribe to our Newsletter</h3>
            <p>Get the latest updates on fresh arrivals, offers and more.</p>
          </div>
        </div>

        <div className="newsletter-right">
          <input type="email" placeholder="Enter your email address" />
          <button>Subscribe</button>
        </div>
      </div>

      {/* 🔹 Main Footer */}
      <div className="footer-main">

        {/* Logo Section */}
        <div className="footer-col logo-col">
          <h2 className="logo">🌱 SunThe Mart</h2>
          <p>
            Connecting farmers directly with customers to provide fresh,
            healthy, and chemical-free products.
          </p>

          <div className="socials">
            <span>🌐</span>
            <span>📘</span>
            <span>📸</span>
            <span>▶️</span>
          </div>
        </div>

        {/* Shop */}
        <div className="footer-col">
          <h4>Shop</h4>
          <ul>
            <li>Fruits</li>
            <li>Vegetables</li>
            <li>Leafy Greens</li>
            <li>Herbs</li>
            <li>Millets & Grains</li>
            <li>Farm Specials</li>
            <li>Organic</li>
            <li>Offers</li>
          </ul>
        </div>

        {/* Customer Care */}
        <div className="footer-col">
          <h4>Customer Care</h4>
          <ul>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>FAQs</li>
            <li>Shipping & Delivery</li>
            <li>Returns & Refunds</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* My Account */}
        <div className="footer-col">
          <h4>My Account</h4>
          <ul>
            <li>Login / Signup</li>
            <li>My Orders</li>
            <li>My Wishlist</li>
            <li>Track Order</li>
            <li>Profile</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4>Contact Us</h4>
          <ul className="contact">
            <li>📞 +91 91000 12345</li>
            <li>✉️ support@sunthemart.com</li>
            <li>
              📍 SunThe Mart, #123, Green Fields Layout, Bangalore,
              Karnataka - 560001
            </li>
          </ul>
        </div>

      </div>

      {/* 🔹 Bottom Bar */}
      <div className="footer-bottom">
        <p>© 2024 SunThe Mart. All Rights Reserved.</p>
        <p>Made with ❤️ for Farmers & Families</p>
      </div>
    </footer>
  );
};

export default Footer;