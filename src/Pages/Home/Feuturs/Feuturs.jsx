import React from "react";
import live from "../../../assets/athurs/live-tracking.png";
import delivary from "../../../assets/athurs/safe-delivery.png";

const features = [
  {
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    icon: live,
  },
  {
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    icon: delivary,
  },
  {
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    icon: delivary,
  },
];

const Features = () => {
  return (
    <section className="mx-10 p-6">
      <div className="space-y-6">
        <div className="w-full border-b-2 opacity-50 border-dashed border-secondary mb-16"></div>
        {features.map((card, index) => {
          return <article key={index} className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 overflow-hidden">
            {/* Icon column */}
            <div className="w-full md:w-1/3 lg:w-1/4 p-6 flex items-center justify-center">
              <div className="flex items-center gap-6">
                <div className="p-2 rounded-full">
                  <img src={card.icon} alt="mmmmmmmmmm" />
                </div>
                {/* small dotted vertical line for large screens */}
                <div
                  className="hidden md:block h-38 border-r-2 border-dashed border-secondary opacity-50"
                  aria-hidden
                />
              </div>
            </div>

            {/* Text column */}
            <div className="w-full md:w-2/3 p-6">
              <h3 className="text-lg md:text-2xl font-semibold text-secondary">
                {card.title}
              </h3>
              <p className="mt-2 text-sm md:text-base text-slate-500 leading-relaxed">
                {
                  card.description
                }
              </p>
            </div>
          </article>;
        })}
         <div className="w-full border-b-2 opacity-50 border-dashed border-secondary mt-14"></div>
      </div>
    </section>
  );
};

export default Features;
