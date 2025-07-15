import car from "../assets/car2.png";
import motorcycle from "../assets/bike.webp";
import auto from "../assets/auto.webp";

import { Ride } from "../types/ride";


const icon = {
  car:car,
  motorcycle:motorcycle,
  auto:auto
}

interface WaitForDriverProps {
  setWaitForDriverPanel: React.Dispatch<React.SetStateAction<boolean>>;
  ride?: Ride;
}

const WaitForDriver = ({
  setWaitForDriverPanel,
  ride
}: WaitForDriverProps) => {
  return (
    <>
      <h5
        className="absolute top-2 right-1/2 text-xl  hover:bg-gray-100 rounded-full cursor-pointer "
        onClick={() => setWaitForDriverPanel(false)}
      >
        <i className="ri-arrow-down-wide-fill"></i>
      </h5>

      <div className="flex flex-col justify-center items-center gap-2 mb-10 mt-4 w-full">

        <div className="flex items-center justify-between w-full " >

        <img
          className="h-20 w-20 object-contain"
          src={
            ride && ride.captain && ride.captain.vehicle && ride.captain.vehicle.vehicleType
              ? icon[ride.captain.vehicle.vehicleType as keyof typeof icon]
              : car
          }
          alt=""
        />
        <div className="text-right">
            <h2 className="text-lg font-medium" >{ride?.captain?.fullname.firstname}</h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1" >{ride?.captain?.vehicle.plate}</h4>
            <p className="text-sm text-gray-600" >{ride?.captain?.vehicle.color}</p>
            <h1 className="text-lg font-semibold" >{ride?.otp}</h1>
        </div>
        </div>
        <div className="w-full flex flex-col justify-center items-start gap-6 ">
          <div className="flex justify-start items-center gap-4 border-b-[0.25px] border-gray-300 w-full ">
            <i className=" text-3xl ri-map-pin-2-line"></i>{" "}
            <div className="flex flex-col items-start justify-center ">
              <h3 className="font-semibold text-lg">{ride?.pickup.split(" ").slice(1)}</h3>
              <p className="text-sm -mt-1 text-gray-600">{ride?.pickup.split(" ").slice(1)}</p>
            </div>
          </div>
          <div className="flex justify-start items-center gap-4 border-b-[0.25px] border-gray-300 w-full ">
            <i className=" text-3xl ri-map-pin-2-fill"></i>
            <div className="flex flex-col items-start justify-center ">
              <h3 className="font-semibold text-lg">{ride?.destination.split(" ")[0]}</h3>
              <p className="text-sm -mt-1 text-gray-600">{ride?.destination.split(" ").slice(1)}</p>
            </div>
          </div>
          <div className="flex justify-start items-center gap-4 border-b-[0.25px] border-gray-300 w-full ">
            <i className=" text-3xl ri-cash-line"></i>{" "}
            <div className="flex flex-col items-start justify-center ">
              <h3 className="font-semibold text-lg">₹{ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WaitForDriver;
