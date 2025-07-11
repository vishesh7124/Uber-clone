import car2 from "../assets/car2.png";
import bike from "../assets/bike.webp";
import auto from "../assets/auto.webp";
import { Fare } from "../types/fair";

interface VehiclePanelProps {
  setVehiclePanel: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirmedRidePanel: React.Dispatch<React.SetStateAction<boolean>>;
  fare : Fare | null;
  setVehicleType: React.Dispatch<React.SetStateAction<"auto"|"car"|"motorcycle">>
}

const VehiclePanel = ({ setVehiclePanel, setConfirmedRidePanel,fare, setVehicleType }: VehiclePanelProps) => {

  const handleVehicleSelect = (vehicleType:"auto"|"car"|"motorcycle")=>{
    setConfirmedRidePanel(true);
    setVehicleType(vehicleType)
  }

  return (
    <>
      <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
      <h5
        className="absolute top-6 right-6 text-xl  hover:bg-gray-100 rounded-full cursor-pointer "
        onClick={() => setVehiclePanel(false)}
      >
        <i className="ri-arrow-down-wide-fill"></i>
      </h5>
      <div onClick={()=>handleVehicleSelect("car")} className="flex w-full mb-5  gap-2 p-1  items-center justify-between border-2 rounded-2xl border-gray-100 active:border-black ">
        <img className="h-15 w-15 object-contain" src={car2} alt="" />
        <div className="">
          <h4 className="font-medium text-base ">
            UberGo{" "}
            <span>
              <i className="ri-user-3-fill"></i>4
            </span>
          </h4>
          <h5 className="font-medium text-sm ">2 mins away</h5>
          <p className=" text-xs text-gray-600 ">Affordable, compact rides</p>
        </div>
        <h2 className="text-sm font-semibold">{fare?.car}</h2>
      </div>
      <div onClick={()=>handleVehicleSelect("motorcycle")} className="flex w-full mb-5  gap-2 p-1  items-center justify-between border-2 rounded-2xl border-gray-100 active:border-black ">
        <img className="h-15 w-15 object-contain" src={bike} alt="" />
        <div className="">
          <h4 className="font-medium text-base ">
            Moto{" "}
            <span>
              <i className="ri-user-3-fill"></i>2
            </span>
          </h4>
          <h5 className="font-medium text-sm ">3 mins away</h5>
          <p className=" text-xs text-gray-600 ">Affordable motorcycle rides</p>
        </div>
        <h2 className="text-sm font-semibold">{fare?.motorcycle}</h2>
      </div>
      <div onClick={()=>handleVehicleSelect("auto")} className="flex w-full mb-5 p-1  gap-2  items-center justify-between border-2 border-gray-100 active:border-black  rounded-2xl ">
        <img className="h-15 w-15 object-contain" src={auto} alt="" />
        <div className="">
          <h4 className="font-medium text-base ">
            UberAuto{" "}
            <span>
              <i className="ri-user-3-fill"></i>2
            </span>
          </h4>
          <h5 className="font-medium text-sm ">2 mins away</h5>
          <p className=" text-xs text-gray-600 ">Quick Auto rides</p>
        </div>
        <h2 className="text-sm font-semibold">{fare?.auto}</h2>
      </div>
    </>
  );
};

export default VehiclePanel;
