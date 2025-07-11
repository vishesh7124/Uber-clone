import car from "../assets/car2.png";
import motorcycle from "../assets/bike.webp";
import auto from "../assets/auto.webp";
import { Fare } from "../types/fair";

const icon = {
  car:car,
  motorcycle:motorcycle,
  auto:auto
}

interface ConfirmedRideProps {
  setVehicleFoundPanel: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirmedRidePanel: React.Dispatch<React.SetStateAction<boolean>>;
  vehicleType: "auto" | "car" | "motorcycle";
  createRide: (vehicleType: "auto" | "car" | "motorcycle") => Promise<void>;
  destination:string,
  pickup:string,
  fare: Fare | null
}

const ConfirmedRide = ({
  setVehicleFoundPanel,
  setConfirmedRidePanel,
  vehicleType,
  createRide,
  pickup,
  destination,
  fare
}: ConfirmedRideProps) => {

  const confirmRide=async()=>{
    await createRide(vehicleType);
    setVehicleFoundPanel(true);
    // setConfirmedRidePanel(false)
  }



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
        <img className="h-40 w-40 object-contain" src={icon[vehicleType]} alt="" />
        <div className="w-full flex flex-col justify-center items-start gap-6 ">
          <div className="flex justify-start items-center gap-4 border-b-[0.25px] border-gray-300 w-full ">
            <i className=" text-3xl ri-map-pin-2-line"></i>{" "}
            <div className="flex flex-col items-start justify-center ">
              <h3 className="font-semibold text-lg">{pickup.split(" ")[0]}</h3>
              <p className="text-sm -mt-1 text-gray-600">{pickup.split(" ").slice(1)}</p>
            </div>
          </div>
          <div className="flex justify-start items-center gap-4 border-b-[0.25px] border-gray-300 w-full ">
            <i className=" text-3xl ri-map-pin-2-fill"></i>
            <div className="flex flex-col items-start justify-center ">
              <h3 className="font-semibold text-lg">{destination.split(" ")[0]}</h3>
              <p className="text-sm -mt-1 text-gray-600">{destination.split(" ").slice(1)}</p>
            </div>
          </div>
          <div className="flex justify-start items-center gap-4 border-b-[0.25px] border-gray-300 w-full ">
            <i className=" text-3xl ri-cash-line"></i>{" "}
            <div className="flex flex-col items-start justify-center ">
              <h3 className="font-semibold text-lg">
                ₹{fare ? fare[vehicleType] : "--"}
              </h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-7 ">
        <button onClick={()=>confirmRide()} className=" inline-block text-center bg-[#10b461] font-semibold text-white rounded-lg px-2 py-2 w-full text-lg placeholder:text-sm ">
          Confirm Ride
        </button>
      </div>
    </>
  );
};

export default ConfirmedRide;
