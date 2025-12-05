import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import image1 from "../../../assets/banner/banner1.png";
import image2 from "../../../assets/banner/banner2.png";
import image3 from "../../../assets/banner/banner3.png";
import { FaArrowUp } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="relative">
      <Carousel infiniteLoop={true} interval={4000} autoPlay={true}>
        <div>
          <img src={image1} />
        </div>
        <div>
          <img src={image2} />
        </div>
        <div>
          <img src={image3} />
        </div>
      </Carousel>

      <div className="flex hidden md:block items-center gap-1 absolute md:bottom-20 lg:bottom-32 md:leading-16 lg:left-20 left-14">
        <button className="btn btn-primary text-secondary rounded-full">Track Your Parcel</button>
        <button className="btn rounded-full bg-gray-800 text-primary font-bold">
          <FaArrowUp className="rotate-45" />
        </button>
        <button className="btn ml-2 rounded-2xl">Be A Rider</button>
      </div>
    </div>
  );
};

export default Banner;
