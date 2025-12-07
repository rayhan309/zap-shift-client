import React from "react";
import Logo from "../../../Components/Logo/Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { FaArrowUp } from "react-icons/fa";

const Navber = () => {
  const { user, signOutUser } = useAuth();
  const links = (
    <>
      <li>
        <NavLink to={"/"}>Services</NavLink>
      </li>
      <li>
        <NavLink to={"/coverage"}>Coverage</NavLink>
      </li>
      <li>
        <NavLink to={"/aboutUs"}>About Us</NavLink>
      </li>
      <li>
        <NavLink to={"/"}>Pricing</NavLink>
      </li>
      <li>
        <NavLink to={"/"}>Be a Rider</NavLink>
      </li>
      {/* <li>
        <NavLink to={'/'}>Contact</NavLink>
      </li> */}
    </>
  );

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        signOutUser()
          .then((res) => {
            if (res) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((err) => {
            console.log(err?.message);
          });
      }
    });
  };
  return (
    <div className="pt-5">
      <div className="navbar bg-white rounded-2xl px-6">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Logo />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <a
              className="btn btn-outline btn-primary textsec"
              onClick={handleLogOut}
            >
              LogOut
            </a>
          ) : (
            <Link to={"/login"} className="btn btn-outline btn-primary textsec">
              LogIn
            </Link>
          )}

          <div className="flex items-center">
            <Link to={'/rider'} className="btn btn-primary text-secondary ml-2">
              Be a rider?
            </Link>
            <Link to={'/rider'} className="btn rounded-full bg-gray-800 text-primary font-bold">
              <FaArrowUp className="rotate-45" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navber;
