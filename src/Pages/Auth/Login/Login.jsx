import ShocaleLogin from "../ShocaleLogin/ShocaleLogin";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const { signinUser, resetPassword } = useAuth();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  // console.log('locatrion ios login',location);

  // handle login
  const handleLogin = (data) => {
    // console.log(data);
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

        // naviogate currect page
        navigate(location.state || "/");
      })
      .catch((err) => {
        console.log(err?.message);
        toast.error('mama khaicho!')
      });
  };

  // handleResetPassword
  const handleResetPassword = () => {
    const email = getValues("email"); 

    if(!email) {
      toast.error("Please type your email")
      return;
    }

    resetPassword(email).then(() => {
      toast.success("Please check your email & set new password")
    }).catch(err => {
      console.log(err.code, err.message);
    });

  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl card-body">
      <h2 className="text-3xl font-extrabold">Welcome Back</h2>
      <p className="font-medium">Login with ZapShift</p>
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
          <div onClick={handleResetPassword}>
            <a className="link link-hover">Forgot password?</a>
          </div>

          <button className="btn btn-primary text-secondary mt-4">Login</button>
        </fieldset>
      </form>
      <ShocaleLogin />
      <p className="py-2 px-6">
        Dont have a account?{" "}
        <Link
          state={location?.state}
          className="text-primary underline"
          to={"/register"}
        >
          Please Register
        </Link>
      </p>
      <ToastContainer />
    </div>
  );
};

export default Login;
