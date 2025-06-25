import logo from "../assets/logo.png";
import car2 from "../assets/car2.png";
import { Link } from "react-router";

const Riding = () => {
  return (
    <div className=" h-full relative overflow-hidden overflow-y-hidden  rounded-4xl flex flex-col justify-between w-full bg-white ">
      <img className="absolute m-6 w-18 object-contain" src={logo} alt="" />
      <Link
        to="/home"
        className="absolute right-6 top-4 w-10 h-10 flex justify-center items-center rounded-full  bg-white hover:bg-gray-300 cursor-pointer "
      >
        <i className="  text-2xl  ri-home-2-fill"></i>
      </Link>
      <div className="h-1/2 w-full rounded-4xl">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjgBWkh-2RpEXtRmA1vxakcVsTzG3XVMnd3Q&s"
          className="object-cover h-full w-full rounded-4xl "
          alt=""
        />
      </div>
      <div className="h-1/2 flex flex-col px-4 justify-center items-center gap-6">
        <div className="flex items-center justify-between w-full ">
          <img className="h-20 w-20 object-contain" src={car2} alt="" />
          <div className="text-right">
            <h2 className="text-md font-medium">Sarthak</h2>
            <h4 className="text-lg font-semibold -mt-1 -mb-1">MP04 AB 1234</h4>
            <p className="text-sm text-gray-600">Maruit Suzuki Alto</p>
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-start gap-4 ">
          <div className="flex justify-start items-center gap-4 border-b-[0.25px] border-gray-300 w-full ">
            <i className=" text-2xl ri-map-pin-2-fill"></i>
            <div className="flex flex-col items-start justify-center ">
              <h3 className="font-semibold text-sm">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">New Delhi</p>
            </div>
          </div>
          <div className="flex justify-start items-center gap-4 border-b-[0.25px] border-gray-300 w-full ">
            <i className=" text-2xl ri-cash-line"></i>{" "}
            <div className="flex flex-col items-start justify-center ">
              <h3 className="font-semibold text-sm">₹634.9</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>
        <button className="inline-block text-center bg-[#10b461] font-semibold text-white rounded-lg px-2 py-2 w-full mt-3 text-md placeholder:text-sm ">
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
