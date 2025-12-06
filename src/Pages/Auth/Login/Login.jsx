import React from "react";
import ShocaleLogin from "../ShocaleLogin/ShocaleLogin";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
  const { signinUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    console.log(data);
    signinUser(data?.email, data?.password)
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
      })
      .catch((err) => {
        console.log(err?.message);
      });
  };
  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl card-body">
      <h2 className="text-2xl font-bold">Welcome Back</h2>
      <p>Login with ZapShift</p>
      <form onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset">
          {/* email */}
          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            {...register("email", { required: true })}
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-400">Email is required</p>
          )}

          {/* password */}
          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            {...register("password", {
              required: true,
              pattern:
                /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
            })}
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-400">Password is required</p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-400">
              password must be one loarcase, one uppercase, must 8 charecter ,
              one spshale charecter & one number
            </p>
          )}

          {/* forgate password */}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>

          <button className="btn btn-primary text-secondary mt-4">Login</button>
        </fieldset>
      </form>
      <ShocaleLogin />
      <p className="py-2 px-6">
        Dont have a account?{" "}
        <Link className="text-primary underline" to={"/register"}>
          Please Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
