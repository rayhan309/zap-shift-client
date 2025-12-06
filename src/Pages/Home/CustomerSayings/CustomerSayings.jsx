import customer from "../../../assets/athurs/customer-top.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { use } from "react";
import rewiesLogo from "../../../assets/athurs/reviewQuote.png";

const CustomerSayings = ({ rewiesPromiss }) => {
  const rewiesData = use(rewiesPromiss);
  // console.log(rewiesData);

  return (
    <div className="mt-16 space-y-5">
      <div className="flex flex-col justify-center items-center gap-3">
        <img className="w-[230px]" src={customer} alt="customer" />
        <h2 className="text-4xl font-bold text-secondary">
          What our customers are sayings
        </h2>
        <p>
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>
      <div>
        <Swiper
          loop={true}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 30,
            stretch: '50%',
            depth: 200,
            modifier: 1,
            scale: 0.75,
            slideShadows: true,
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: true,
          }}
          modules={[EffectCoverflow, Autoplay]}
          className="mySwiper"
        >
          {rewiesData.map((reviw) => {
           return <SwiperSlide>
              <div className="p-5 bg-white rounded-2xl space-y-3">
                <img src={rewiesLogo} alt="" />
                <h2>
                  {reviw?.review}.{" "}
                </h2>
                <div className="border-b border-dashed border-secondary w-full"></div>
                <div className="flex flex-col md:flex-row items-center gap-2">
                  <img className="w-12 h-12 rounded-full" src={reviw?.user_photoURL} alt="" />
                  <div>
                    <h2 className="text-lg text-secondary font-bold">{reviw?.userName}</h2>
                    <p className="text-xs">{reviw?.pick_up_email}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>;
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default CustomerSayings;
