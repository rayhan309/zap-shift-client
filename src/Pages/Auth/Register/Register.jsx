import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../../AtuhContext/AuthContext";
import ShocaleLogin from "../ShocaleLogin/ShocaleLogin";
import { Link } from "react-router";
import Swal from "sweetalert2";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser } = useContext(AuthContext);
  // console.log(createUser);

  const handleRegister = (data) => {
    const email = data?.email;
    const pass = data?.password;

    createUser(email, pass)
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
      <h2 className="text-2xl font-bold">Create an Account</h2>
      <p>Register with ZapShift</p>
      <form className="" onSubmit={handleSubmit(handleRegister)}>
        <fieldset className="fieldset">
          {/* name */}
          <label className="label">Email</label>
          <input
            type="Name"
            {...register("name", { required: true })}
            className="input"
            placeholder="Name"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-400">Please type your email</p>
          )}

          {/* email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-400">Please type your email</p>
          )}

          {/* password */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              pattern:
                /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
            })}
            className="input"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-400">
              password must be one loarcase, one uppercase, must 8 charecter ,
              one spshale charecter & one number
            </p>
          )}

          <button className="btn btn-primary text-secondary mt-4">Register</button>
        </fieldset>
      </form>
      <ShocaleLogin />
      <p className="py-2 px-6">
        Alrady have a account?{" "}
        <Link className="text-primary underline" to={"/login"}>
          Please Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
