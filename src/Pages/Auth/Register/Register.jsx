import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../../AtuhContext/AuthContext";

const Register = () => {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const {createUser} = useContext(AuthContext);
  // console.log(createUser);

  const handleRegister = (data) => {
    // console.log(data);
    const email = data?.email;
    const pass = data?.password;

    createUser(email, pass).then(res => {
      console.log(res?.user)
    }).catch(err => {
      console.log(err?.message)
    })
    // console.log({name, pass})
  };


  return (
    <div>
      <form onSubmit={handleSubmit(handleRegister)}>
        <fieldset className="fieldset">
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
          {errors.password && <p className="text-red-400">password must be one loarcase, one uppercase, must 8 charecter , one spshale charecter & one number</p>}
        

          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
