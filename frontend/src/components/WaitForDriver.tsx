import car2 from "../assets/car2.png";
interface WaitForDriverProps {
  setWaitForDriverPanel: React.Dispatch<React.SetStateAction<boolean>>;
}

const WaitForDriver = ({
  setWaitForDriverPanel,
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

        <img className="h-20 w-20 object-contain" src={car2} alt="" />
        <div className="text-right">
            <h2 className="text-lg font-medium" >Sarthak</h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1" >MP04 AB 1234</h4>
            <p className="text-sm text-gray-600" >Maruit Suzuki Alto</p>
        </div>
        </div>
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

export default WaitForDriver;
