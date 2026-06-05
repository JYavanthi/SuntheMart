import React from "react";
import "./styles/HowItWorks.css";
import truck from "./assets/truck.png"
import home from "./assets/house.png"
import box from "./assets/box.png"
import farmer from "./assets/farmer.png"
const steps = [
  {
    title: "1. Farmers Harvest",
    desc: "Fresh produce is carefully harvested by our trusted farmers.",
    icon: farmer,
  },
  {
    title: "2. Direct to our Collection Centers",
    desc: "We collect and quality-check the produce.",
    icon: truck,
  },
  {
    title: "3. Packed with Care",
    desc: "Hygienically packed to retain freshness.",
    icon: box,
  },
  {
    title: "4. Delivered to Your Home",
    desc: "Fast and reliable delivery to your doorstep.",
    icon: home,
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="hw-it-wrks">
      <h2 className="hw-it-wrks-title">How It Works</h2>

      <div className="hw-it-wrks-steps-container">
        {steps.map((step, index) => (
          <div className="hw-it-wrks-step-wrapper" key={index}>
            <div className="hw-it-wrks-step-card">
              <div className="hw-it-wrks-icon-circle">
                <img src={step.icon} alt={step.title} />
              </div>
              <h3 className="hw-it-wrks-step-title">{step.title}</h3>
              <p className="hw-it-wrks-step-desc">{step.desc}</p>
            </div>

            {index !== steps.length - 1 && (
              <div className="hw-it-wrks-arrow">›</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;