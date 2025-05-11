import car2 from "../assets/car2.png";
interface ConfirmedRideProps {
  setVehicleFoundPanel: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirmedRidePanel: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmedRide = ({
  setVehicleFoundPanel,
  setConfirmedRidePanel,
}: ConfirmedRideProps) => {
  return (
    <>
      <h5
        className="absolute top-6 right-6 text-xl  hover:bg-gray-100 rounded-full cursor-pointer "
        onClick={() => setConfirmedRidePanel(false)}
      >
        <i className="ri-arrow-down-wide-fill"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Confirm Your Ride</h3>
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
      <div className="px-7 ">
        <button onClick={()=>setVehicleFoundPanel(true)} className=" inline-block text-center bg-[#10b461] font-semibold text-white rounded-lg px-2 py-2 w-full text-lg placeholder:text-sm ">
          Confirm Ride
        </button>
      </div>
    </>
  );
};

export default ConfirmedRide;
