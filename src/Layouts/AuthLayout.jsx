import React from "react";
import Logo from "../Components/Logo/Logo";
import authLogo from "../assets/athurs/authImage.png";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto min-h-screen">
      <Logo />
      <div className="flex items-center">
        <div className="flex-1 flex justify-center">
          <Outlet />
        </div>
        <img className="flex-1" src={authLogo} alt="logo" />
      </div>
    </div>
  );
};

export default AuthLayout;
