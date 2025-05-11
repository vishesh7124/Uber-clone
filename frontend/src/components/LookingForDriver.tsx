import car2 from "../assets/car2.png";

const LookingForDriver = () => {
  return (
    <>
      <h3 className="text-2xl font-semibold mb-5">Looking For Driver</h3>
      <div className="flex flex-col justify-center items-center gap-2 mb-10 ">
        <img className="h-40 w-40 object-contain" src={car2} alt="" />
        <div className="w-full flex flex-col justify-center items-start gap-6 ">
          <div className="flex justify-start items-center gap-4 border-b-[0.25px] border-gray-300 w-full ">
            <i className=" text-3xl ri-map-pin-2-line"></i>{" "}
            <div className="flex flex-col items-start justify-center ">
              <h3 className="font-semibold text-lg">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">New Delhi</p>
            </div>
          </div>
          <div className="flex justify-start items-center gap-4 border-b-[0.25px] border-gray-300 w-full ">
            <i className=" text-3xl ri-map-pin-2-fill"></i>
            <div className="flex flex-col items-start justify-center ">
              <h3 className="font-semibold text-lg">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">New Delhi</p>
            </div>
          </div>
          <div className="flex justify-start items-center gap-4 border-b-[0.25px] border-gray-300 w-full ">
            <i className=" text-3xl ri-cash-line"></i>{" "}
            <div className="flex flex-col items-start justify-center ">
              <h3 className="font-semibold text-lg">₹634.9</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LookingForDriver;
