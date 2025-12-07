import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../../AtuhContext/AuthContext";
import ShocaleLogin from "../ShocaleLogin/ShocaleLogin";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import fileImg from "../../../assets/athurs/photo.png";
import axios from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location);
  // console.log(createUser);

  const handleRegister = async (data) => {
    const email = data?.email;
    const pass = data?.password;
    const name = data?.name;
    const photo = data?.photo;
    console.log(name, photo);

    createUser(email, pass)
      .then((res) => {
        if (res?.user) {
          const file = data?.photo[0];
          const formData = new FormData();
          formData.append("image", file);

          const url = `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_imgbb_api_key
          }`;

          try {
            axios.post(url, formData).then((res) => {
              console.log(res?.data?.data?.url);
              if (res) {
                updateUserProfile(name, res?.data?.data?.url)
                .then(res => {
                  console.log("photo uploade done", res)
                })
                .catch(err => console.log(err?.message))
              }
            });
          } catch (err) {
            console.log("Error", err);
          }

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Successfully Login!",
            showConfirmButton: false,
            timer: 1500,
          });

          console.log(res.user)
          navigate(location.state || "/");
        }
      })
      .catch((err) => {
        console.log(err?.message);
      });
  };

  return (
    <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl card-body">
      <h2 className="text-3xl font-extrabold">Create an Account</h2>
      <p className="font-medium">Register with ZapShift</p>
      <form className="" onSubmit={handleSubmit(handleRegister)}>
        <fieldset className="fieldset w-full">
          {/* name */}
          <label className="label">Photo</label>
          <div className="relative">
            <input
              type="file"
              {...register("photo", { required: true })}
              className="input w-full border-none mb-3"
              placeholder={"photo"}
            />
            <img className="absolute top-0" src={fileImg} alt="" />
          </div>

          {errors.photo?.type === "required" && (
            <p className="text-red-400">Photo is required</p>
          )}

          {/* name */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input w-full"
            placeholder="Name"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-400">Name is required</p>
          )}

          {/* email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input w-full"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-400">Email is required</p>
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
            className="input w-full"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-400">
              password must be one loarcase, one uppercase, must 8 charecter ,
              one spshale charecter & one number
            </p>
          )}

          <button className="btn btn-primary text-secondary mt-4">
            Register
          </button>
        </fieldset>
      </form>
      <ShocaleLogin />
      <p className="py-2 px-6">
        Alrady have a account?{" "}
        <Link
          state={location?.state}
          className="text-primary underline"
          to={"/login"}
        >
          Please Login
        </Link>
      </p>
    </div>
  );
};
export default Register;
