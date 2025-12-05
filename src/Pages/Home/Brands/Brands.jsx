import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import amazon from "../../../assets/brands/amazon.png";
import vector_vector from "../../../assets/brands/amazon_vector.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import star from "../../../assets/brands/star.png";
import start_people from "../../../assets/brands/start_people.png";
// import { div } from "motion/react-client";

const brandLogos = [
  amazon,
  vector_vector,
  casio,
  moonstar,
  randstad,
  star,
  start_people,
];

const Brands = () => {
  return (
    <div className="mb-10 mt-20">
      <h2 className="text-3xl font-bold text-secondary text-center">
        We've helped thousands of sales teams
      </h2>

      <Swiper
        loop={true}
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={10}
        grabCursor={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        modules={[Autoplay]}
        className="mySwiper mt-8 w-6xl mx-auto ml-2"
      >
        {brandLogos.map((logo, index) => (
          <SwiperSlide key={index}>
            <img src={logo} alt="logo" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Brands;
