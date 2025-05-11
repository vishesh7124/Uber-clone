import { useState, useRef } from "react";
import logo from "../assets/logo.png";
import { useForm } from "react-hook-form";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitForDriver from "../components/WaitForDriver";

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [panel, setPanel] = useState<boolean>(false)
  const [vehiclePanel, setVehiclePanel] = useState<boolean>(false)
  const [confirmedRidePanel, setConfirmedRidePanel] = useState<boolean>(false)
  const [vehicleFound, setVehicleFound] = useState<boolean>(false)
  const [waitingForDriverPanel, setWaitingForDriverPanel] = useState<boolean>(false)

  const panelRef = useRef<null | HTMLDivElement>(null)
  const panelCloseRef = useRef<null | HTMLHeadingElement>(null)
  // const vehiclePanelCloseRef = useRef<null | HTMLHeadingElement>(null)
  const tripRef = useRef<null | HTMLDivElement>(null)
  const vehiclePanelRef = useRef<null | HTMLDivElement>(null)
  const confirmRidePanelRef = useRef<null | HTMLDivElement>(null)
  const vehicleFoundPanelRef = useRef<null | HTMLDivElement>(null)
  const waitingForDriverPanelRef = useRef<null | HTMLDivElement>(null)


  useGSAP(()=>{
    if(panel){
      
      gsap.to(panelRef.current,{
        height:'70%',  
      })
      gsap.to(panelCloseRef.current,{
        opacity:1
      })
      gsap.to(tripRef.current,{
        borderRadius:'2rem 2rem 0 0'
      })
    }else{
      gsap.to(panelRef.current,{
        height:'0%',
      })
      gsap.to(tripRef.current,{
        borderRadius:'2rem'
      })
      gsap.to(panelCloseRef.current,{
        opacity:0
      })
      
    }
  },[panel])
  
  useGSAP(()=>{
    if(vehiclePanel){
      
      gsap.to(vehiclePanelRef.current,{
        height:"fit-content",
        display:"block",

      })

      setPanel(false)
    }else{
      gsap.to(vehiclePanelRef.current,{
        height:0,
        display:"none",
      })

      
    }
  },[vehiclePanel])

  useGSAP(function(){
    if(confirmedRidePanel){
      gsap.to(confirmRidePanelRef.current,{
        height:"fit-content",
        display:"block",
        y:0
      })
      
      
    }else{
      gsap.to(confirmRidePanelRef.current,{
        height:0,
        display:"none",
        y:50
      })
    }
  },[confirmedRidePanel])
  useGSAP(function(){
    if(vehicleFound){
      gsap.to(vehicleFoundPanelRef.current,{

        display:"block",
        transform:"translateY(0)"
      })
      setConfirmedRidePanel(false)
      
      
    }else{
      gsap.to(vehicleFoundPanelRef.current,{
        display:"none",
        transform:"translateY(100%)"
      })
    }
  },[vehicleFound])
  useGSAP(function(){
    if(waitingForDriverPanel){
      gsap.to(waitingForDriverPanelRef.current,{

        display:"block",
        transform:"translateY(0)"
      })
      setConfirmedRidePanel(false)
      
      
    }else{
      gsap.to(vehicleFoundPanelRef.current,{
        display:"none",
        transform:"translateY(100%)"
      })
    }
  },[vehicleFound])

  const submitHandler = (payload:object) => {
    console.log(payload)
  }

  return (
    <div className=" h-full relative overflow-hidden overflow-y-hidden  rounded-4xl flex flex-col justify-between w-full bg-white ">
      <img className="absolute m-6 w-18 object-contain" src={logo} alt="" />
      <div className="h-full w-full rounded-4xl">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjgBWkh-2RpEXtRmA1vxakcVsTzG3XVMnd3Q&s" className="object-cover h-full w-full rounded-4xl " alt="" />
      </div>
      <div className="absolute top-0 h-full w-full flex flex-col justify-end   rounded-b-4xl">
        <div ref={tripRef} className=" h-[30%] p-5 bg-white rounded-4xl   relative" >
          <h5 ref={panelCloseRef} className="absolute top-6 right-6 text-xl opacity-0 hover:bg-gray-100 rounded-full cursor-pointer " onClick={()=> setPanel(false)} >
            <i className="ri-arrow-down-wide-fill"></i>
          </h5>
          <h4 className="text-2xl font-semibold" >Find a trip</h4>
          <form onSubmit={handleSubmit(submitHandler)
          } >
            <div className="line absolute h-16 w-1 top-[45%] left-8 bg-gray-800 rounded-full">

            </div>
            <input onClick={()=>setPanel(true)} className="bg-[#eee] px-8 py-2 text-base rounded-lg w-full mt-5 " type="text" placeholder="Add a pick-up location" {...register("pickup",{required:true})} />
            <input onClick={()=>setPanel(true)} className="bg-[#eee] px-8 py-2 text-base rounded-lg w-full mt-3 " type="text" placeholder="Enter your destination" {...register("drop",{required:true})} />
            {(errors.pickup || errors.drop) && (
                <span className="text-red-500 text-sm">Please fill in all fields</span>
            )}
          </form>

        </div>
        <div ref={panelRef} className="  bg-white rounded-b-4xl overflow-scroll   " >
            <LocationSearchPanel setVehiclePanel={setVehiclePanel} />
        </div>
      </div>
      <div ref={vehiclePanelRef} className="absolute w-full z-10 bottom-0 rounded-4xl bg-white p-4 h-0  hidden " >
            <VehiclePanel setConfirmedRidePanel={setConfirmedRidePanel} setVehiclePanel={setVehiclePanel} />
      </div>
      <div ref={confirmRidePanelRef} className=" absolute w-full z-10 bottom-0 rounded-4xl bg-white p-4  h-fit hidden  " >
        {confirmedRidePanel && 
        <ConfirmedRide setVehicleFoundPanel={setVehicleFound} setConfirmedRidePanel={setConfirmedRidePanel} />
        
        }
      </div>
      <div ref={vehicleFoundPanelRef}  className=" absolute w-full z-10 bottom-0 rounded-4xl bg-white p-4  h-fit hidden  " >
        <LookingForDriver/>
      </div>
      <div ref={waitingForDriverPanelRef} className=" absolute w-full z-10 bottom-0 rounded-4xl bg-white p-4  h-fit hidden   " >
        <WaitForDriver setWaitForDriverPanel={setWaitingForDriverPanel} />
      </div>

    </div>
  );
};

export default Home;
