// import icons from "../../../assets/bookingIcon.png"

export default function HowItWorks() {

  const items = [
    {
      title: "Premium Pick & Drop",
      desc: "From high‑value gadgets to business consignments — delivered with priority handling.",
    },
    {
      title: "Secure Cash On Delivery",
      desc: "Trusted COD service with fraud‑free collection and real‑time payment updates.",
    },
    {
      title: "Express Delivery Hub",
      desc: "Fast‑lane processing for urgent, time‑critical shipments with guaranteed routing.",
    },
    {
      title: "Corporate & Enterprise Logistics",
      desc: "Tailored delivery solutions for SME to large enterprises with dedicated support.",
    },
  ];

  return (
    <section className="w-full py-12 px-10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-secondary mb-8">How It Works</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition duration-300"
            >
              {/* <div className="mb-4"><img src={icons} alt="" /></div> */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
