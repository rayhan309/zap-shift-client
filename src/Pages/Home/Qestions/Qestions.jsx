import { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function Question() {
  const faqs = [
    {
      question: "How does this posture corrector work?",
      answer:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
    },
    {
      question: "Is it suitable for all ages and body types?",
      answer:
        "Yes, it is designed to be adjustable and comfortable for most body types across different ages.",
    },
    {
      question: "Does it really help with back pain and posture improvement?",
      answer:
        "Consistent use can help improve posture and reduce strain-related discomfort over time.",
    },
    {
      question: "Does it have smart features like vibration alerts?",
      answer:
        "Some models include vibration reminders to encourage proper posture.",
    },
    {
      question: "How will I be notified when the product is back in stock?",
      answer: "You can subscribe to restock notifications via email or SMS.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="w-full max-w-3xl mx-auto p-6 mt-10 text-center">
      <h2 className="text-3xl text-secondary font-bold mb-2">
        Frequently Asked Question (FAQ)
      </h2>
      <p className="text-gray-600 mb-6 max-w-4xl mx-auto">
        Enhance posture, mobility, and well-being effortlessly with Posture Pro.
        Achieve proper alignment, reduce pain, and strengthen your body with
        ease!
      </p>

      <div className="flex flex-col gap-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`collapse bg-base-100 rounded-xl shadow-sm ${
              openIndex === index ? "border-primary" : ""
            }`}
          >
            <input
              type="checkbox"
              checked={openIndex === index}
              onChange={() => setOpenIndex(openIndex === index ? null : index)}
            />
            <div className="collapse-title text-left font-semibold flex justify-between items-center">
              {faq.question}
              {openIndex === index ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            <div className="collapse-content text-left text-gray-600">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="btn btn-primary text-secondary rounded-xl mt-5">
        See More FAQ’s
      </button>
      <button className="btn rounded-full bg-gray-800 text-primary font-bold mt-5">
        <FaArrowUp className="rotate-45" />
      </button>
    </div>
  );
}
