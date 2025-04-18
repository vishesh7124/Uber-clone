import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { CaptainContextType } from "../types/captain";
import { useNavigate } from "react-router";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

import logo from "../assets/driver.png";

const CaptainSignup = () => {
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext) as CaptainContextType;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (payload: object) => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, payload);
    if (response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }
  };

  return (
    <div className=" pb-7 flex flex-col justify-between h-full overflow-y-scroll   rounded-4xl  bg-white ">
      <div>
        <img className="m-6 w-18 object-contain" src={logo} alt="" />
        <form className="px-7   " onSubmit={handleSubmit(onSubmit)}>
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
          <h3 className="text-base font-medium mb-2 ">Vehicle Info</h3>
          <div className="flex gap-4 ">
            <input
              className=" bg-[#eeeeee] mb-7 rounded px-4 py-2 w-1/2 text-lg placeholder:text-sm"
              type="text"
              required
              placeholder="e.g., Red"
              {...register("vehicle.color", { required: true })}
            />
            <input
              className=" bg-[#eeeeee] mb-7 rounded px-4 py-2 w-1/2 text-lg placeholder:text-sm"
              type="text"
              required
              placeholder="e.g., ABC-1234"
              {...register("vehicle.plate", { required: true })}
            />
          </div>
          <div className="flex gap-4 ">
            <select
              className="bg-[#eeeeee] mb-7 rounded px-4 py-2 w-1/2 text-lg"
              required
              {...register("vehicle.vehicleType", { required: true })}
            >
              <option value="">Select vehicle type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="motorcycle">Motorcycle</option>
            </select>
            <input
              className="bg-[#eeeeee] mb-7 rounded px-4 py-2 w-1/2 text-lg placeholder:text-sm"
              type="number"
              required
              placeholder="e.g., 4"
              {...register("vehicle.capacity", { required: true })}
            />
          </div>

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
      <div className="px-7 py-2">
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
