import car from "../assets/car2.png";
import motorcycle from "../assets/bike.webp";
import auto from "../assets/auto.webp";
import { Fare } from "../types/fair";

const icon = {
  car:car,
  motorcycle:motorcycle,
  auto:auto
}
interface LookForDriverProps {
  vehicleType: "auto" | "car" | "motorcycle";
  destination:string,
  pickup:string,
  fare: Fare | null
}



const LookingForDriver = ({vehicleType,destination,pickup,fare}:LookForDriverProps) => {
  return (
    <>
      <h3 className="text-2xl font-semibold mb-5">Looking For Driver</h3>
      <div className="flex flex-col justify-center items-center gap-2 mb-10 ">
        <img className="h-40 w-40 object-contain" src={icon[vehicleType]} alt="" />
        <div className="w-full flex flex-col justify-center items-start gap-6 ">
          <div className="flex justify-start items-center gap-4 border-b-[0.25px] border-gray-300 w-full ">
            <i className=" text-3xl ri-map-pin-2-line"></i>{" "}
            <div className="flex flex-col items-start justify-center ">
              <h3 className="font-semibold text-lg">{pickup?.split(" ")[0]}</h3>
              <p className="text-sm -mt-1 text-gray-600">{pickup?.split(" ").slice(1)}</p>
            </div>
          </div>
          <div className="flex justify-start items-center gap-4 border-b-[0.25px] border-gray-300 w-full ">
            <i className=" text-3xl ri-map-pin-2-fill"></i>
            <div className="flex flex-col items-start justify-center ">
              <h3 className="font-semibold text-lg">{destination?.split(" ")[0]}</h3>
              <p className="text-sm -mt-1 text-gray-600">{destination?.split(" ").slice(1)}</p>
            </div>
          </div>
          <div className="flex justify-start items-center gap-4 border-b-[0.25px] border-gray-300 w-full ">
            <i className=" text-3xl ri-cash-line"></i>{" "}
            <div className="flex flex-col items-start justify-center ">
              <h3 className="font-semibold text-lg">₹{fare ? fare[vehicleType] : "--"}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LookingForDriver;
