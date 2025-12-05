import { motion } from "framer-motion";
import logo from '../../../../assets/athurs/service.png'


const OurServices = () => {
  const services = [
    {
      title: "Express & Standard Delivery",
      desc: "We deliver parcels within 24–72 hours in major cities. Express delivery available within 4–6 hours in Dhaka.",
    },
    {
      title: "Nationwide Delivery",
      desc: "We deliver nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    },
    {
      title: "Fulfillment Solution",
      desc: "Customized service with inventory management support, online order processing, packaging, and after‑sales support.",
    },
    {
      title: "Cash on Home Delivery",
      desc: "100% cash on delivery anywhere in Bangladesh with guaranteed product safety.",
    },
    {
      title: "Corporate Service / Contract In Logistics",
      desc: "Customized corporate logistics including warehouse and inventory management support.",
    },
    {
      title: "Parcel Return",
      desc: "Reverse logistics enabling end‑customers to return or exchange products with online merchants.",
    },
  ];

  //  initial={{ opacity: 0, y: 40 }}
  // whileInView={{ opacity: 1, y: 0 }}
  // transition={{ duration: 0.8 }}

  return (
    <section className="w-full mt-5 py-16 bg-[#053B44] rounded-4xl">
      <div className="px-14 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Our Services</h2>
        <p className="text-white/80 max-w-2xl mx-auto mb-12">
          Enjoy fast, reliable parcel delivery with real‑time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item, i) => (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              key={i}
              className={`rounded-3xl p-8 shadow-lg bg-white flex flex-col justify-center transition duration-300 hover:bg-primary`}
            >
              <div className="flex justify-center">
                <img className="w-12 pb-5" src={logo} alt="" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                {item.title}
              </h3>
              <p className="text-gray-700 font-medium text-sm leading-relaxed text-center">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
