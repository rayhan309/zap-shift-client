import React from "react";
import { NavLink, Outlet } from "react-router";

const AboutUs = () => {
  return (
    <div className="bg-white rounded-2xl my-6 p-12">
      <h1 className="text-3xl font-extrabold text-secondary">About Us</h1>
      <p className="text-gray-500 mt-4">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal <br /> packages to business shipments — we deliver
        on time, every time.
      </p>

      <div className="bg-gray-100 w-full h-1 my-5"></div>

      <div className="flex flex-wrap gap-10 lis">
        {" "}
        <li>
          <NavLink to={""}>Story</NavLink>
        </li>
        <li>
          <NavLink to={"mission"}>Mission</NavLink>
        </li>
        <li>
          <NavLink to={"success"}>Success</NavLink>
        </li>
        <li>
          <NavLink to={"teams"}>Team & Others</NavLink>
        </li>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AboutUs;
