import React from "react";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router";

const ShocaleLogin = () => {
  const { signinWithGoggle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location)

  const handleSigninWithGoggle = () => {
    signinWithGoggle()
      .then((res) => {
        if (res?.user) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Successfully Login!",
            showConfirmButton: false,
            timer: 1500,
          });
        }

        // navigate to currect page
        navigate(location.state || "/");
      })
      .catch((err) => {
        console.log(err?.message);
      });
  };

  return (
    <div className="text-center mb-2">

      {/* OR Divider */}
      <div className="flex items-center gap-4 mb-2">
        <div className="flex-1 h-px bg-gray-400"></div>
        <span className="text-gray-400">or</span>
        <div className="flex-1 h-px bg-gray-400"></div>
      </div>

      {/* Google */}
      <button
        onClick={handleSigninWithGoggle}
        className="btn bg-gray-200 text-black border-none w-full"
      >
        <svg
          aria-label="Google logo"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <path d="m0 0H512V512H0" fill="#fff"></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            ></path>
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            ></path>
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            ></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>
        Login with Google
      </button>
    </div>
  );
};

export default ShocaleLogin;
