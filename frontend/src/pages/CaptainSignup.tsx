import { Link } from "react-router";
import { useForm } from "react-hook-form";

import logo from "../assets/driver.png";

const CaptainSignup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (d: object) => {
    console.log(d);
  };

  return (
    <div className=" pb-7 flex flex-col justify-between h-full   rounded-4xl  bg-white ">
      <div>
        <img className="m-6 w-18 object-contain" src={logo} alt="" />
        <form className="px-7" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-base font-medium mb-2">
            What's your full name ?
          </h3>
          <input
            className="bg-[#eeeeee]  mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-sm "
            type="text"
            required
            placeholder="Bengali Bala"
            {...register("fullname", { required: true })}
          />
          <h3 className="text-base font-medium mb-2">What's your email</h3>
          <input
            className="bg-[#eeeeee]  mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-sm "
            type="email"
            required
            placeholder="email@example.com"
            {...register("email", { required: true })}
          />
          <h3 className="text-base font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeee]  mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-sm "
            type="password"
            required
            placeholder="password"
            {...register("password", { required: true })}
          />
          {(errors.email || errors.password) && (
            <span className="text-red-500 text-sm">
              Please fill in all fields
            </span>
          )}
          <button
            type="submit"
            className="bg-[#111] font-semibold text-white mb-2 rounded px-4 py-2 w-full text-lg placeholder:text-sm "
          >
            Sign Up
          </button>
        </form>
        <p className="text-center">
          Already Registered?{" "}
          <Link className="text-blue-600 py-1" to="/captain-login">
            Sign In
          </Link>
        </p>
      </div>
      <div className="px-7 ">
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
      {/* <div className="bg-white p-4 pb-7 rounded-b-4xl  ">
            <h2 className="text-2xl font-bold" >Get Started with Uber</h2>
        </div> */}
    </div>
  );
};

export default CaptainSignup;
