import { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import logo from "../assets/logo.png";
import { useForm } from "react-hook-form";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitForDriver from "../components/WaitForDriver";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { UserContextType } from "../types/user";

import { Fare } from "../types/fair";
import { Ride } from "../types/ride";

interface FormData {
  pickup: string;
  drop: string;
}

interface Suggestion {
  place_id: string;
  description: string;
  structured_formatting?: {
    main_text: string;
    secondary_text: string;
  };
}

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>();

  const [panel, setPanel] = useState<boolean>(false)
  const [vehiclePanel, setVehiclePanel] = useState<boolean>(false)
  const [confirmedRidePanel, setConfirmedRidePanel] = useState<boolean>(false)
  const [vehicleFound, setVehicleFound] = useState<boolean>(false)
  const [waitingForDriverPanel, setWaitingForDriverPanel] = useState<boolean>(false)
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [activeField, setActiveField] = useState<'pickup' | 'drop' | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [fare, setFare] = useState<Fare|null>(null)
  const [vehicleType, setVehicleType] = useState<"auto"|"car"|"motorcycle">("car") 
  const [ride, setRide] = useState<Ride>();

  const {socket,sendMessage, receiveMessage} = useContext(SocketContext);
  const {user} = useContext(UserDataContext) as UserContextType
  
  const navigate = useNavigate();

  useEffect(() => {
    sendMessage("join",{userType:"user",userId:user._id})

  

  }, [user])
  
  socket?.on('ride-confirmed', ride=>{
    setRide(ride)
    setVehicleFound(false)
    setWaitingForDriverPanel(true);
  })  

  socket?.on('ride-started',ride=>{
    setWaitingForDriverPanel(false);
    navigate('/riding',{state: {ride: ride}})

  })

  const panelRef = useRef<null | HTMLDivElement>(null)
  const panelCloseRef = useRef<null | HTMLHeadingElement>(null)
  const tripRef = useRef<null | HTMLDivElement>(null)
  const vehiclePanelRef = useRef<null | HTMLDivElement>(null)
  const confirmRidePanelRef = useRef<null | HTMLDivElement>(null)
  const vehicleFoundPanelRef = useRef<null | HTMLDivElement>(null)
  const waitingForDriverPanelRef = useRef<null | HTMLDivElement>(null)

  // Watch form values to trigger suggestions
  const pickupValue = watch("pickup");
  const dropValue = watch("drop");

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
      gsap.to(waitingForDriverPanelRef.current,{
        display:"none",
        transform:"translateY(100%)"
      })
    }
  },[waitingForDriverPanel])

  // Function to fetch suggestions from backend
  const fetchSuggestions = async (input: string) => {
    if (!input || input.length < 3) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.status === 'OK') {
        setSuggestions(response.data.suggestions);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change and fetch suggestions
  const handleInputChange = (field: 'pickup' | 'drop', value: string) => {
    setValue(field, value);
    setActiveField(field);
    
    // Debounce API calls
    const timeoutId = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: Suggestion) => {
    if (activeField) {
      setValue(activeField, suggestion.description);
      setSuggestions([]);

    }
  };

  const findRide = async (payload: FormData) => {
    console.log(payload)
    setVehiclePanel(true);
    setPanel(false)

    // Call backend to get distance and time between pickup and drop
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/get-fare`, {
      params: {
        pickup: payload.pickup,
        destination: payload.drop
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
      });

      setFare(response.data)
      
    } catch (error) {
      console.error('Error fetching fare:', error);
      setFare(null);
    }
  }

  const createRide = async (vehicleType: "auto" | "car" | "motorcycle")=>{
    const token = localStorage.getItem('token');

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/ride/create`,
      {
        pickup: pickupValue,
        destination: dropValue,
        vehicleType: vehicleType
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )

    console.log(response.data)

  }

  return (
    <div className=" h-full relative overflow-hidden overflow-y-hidden  rounded-4xl flex flex-col justify-between w-full bg-white ">
      <img className="absolute m-6 w-18 object-contain" src={logo} alt="" />
      <div className="h-full w-full rounded-4xl">
        <img src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" className="object-cover h-full w-full rounded-4xl " alt="" />
      </div>
      <div className="absolute top-0 h-full w-full flex flex-col justify-end    rounded-b-4xl">
        <div ref={tripRef} className=" h-fit p-5 bg-white rounded-4xl   relative" >
          <h5 ref={panelCloseRef} className="absolute top-6 right-6 text-xl opacity-0 hover:bg-gray-100 rounded-full cursor-pointer " onClick={()=> setPanel(false)} >
            <i className="ri-arrow-down-wide-fill"></i>
          </h5>
          <h4 className="text-2xl font-semibold" >Find a trip</h4>
          <form onSubmit={handleSubmit(findRide)}>
            <div className="line absolute h-16 w-1 top-[35%] left-8 bg-gray-800 rounded-full">

            </div>
            <input 
              onClick={()=>setPanel(true)} 
              className="bg-[#eee] px-8 py-2 text-base rounded-lg w-full mt-5 " 
              type="text" 
              placeholder="Add a pick-up location" 
              {...register("pickup",{required:true})} 
              onChange={(e) => handleInputChange('pickup', e.target.value)}
              value={pickupValue || ''}
            />
            <input 
              onClick={()=>setPanel(true)} 
              className="bg-[#eee] px-8 py-2 text-base rounded-lg w-full mt-3 " 
              type="text" 
              placeholder="Enter your destination" 
              {...register("drop",{required:true})} 
              onChange={(e) => handleInputChange('drop', e.target.value)}
              value={dropValue || ''}
            />
            {(errors.pickup || errors.drop) && (
                <span className="text-red-500 text-sm">Please fill in all fields</span>
            )}
            <button type="submit" className="bg-black text-white px-6 py-2 rounded-lg mt-4 w-full font-semibold hover:bg-gray-900 transition">
              Find a ride
            </button>
          </form>

        </div>
        <div ref={panelRef} className="  bg-white rounded-b-4xl overflow-scroll   " >
            <LocationSearchPanel 
              setVehiclePanel={setVehiclePanel} 
              suggestions={suggestions}
              loading={loading}
              onSuggestionSelect={handleSuggestionSelect}
            />
        </div>
      </div>
      <div ref={vehiclePanelRef} className="absolute w-full z-10 bottom-0 rounded-4xl bg-white p-4 h-0  hidden " >
            <VehiclePanel setVehicleType={setVehicleType} fare={fare} setConfirmedRidePanel={setConfirmedRidePanel} setVehiclePanel={setVehiclePanel} />
      </div>
      <div ref={confirmRidePanelRef} className=" absolute w-full z-10 bottom-0 rounded-4xl bg-white p-4  h-fit hidden  " >
        {confirmedRidePanel && 
        <ConfirmedRide pickup={pickupValue} destination={dropValue} fare={fare} vehicleType={vehicleType} createRide={createRide} setVehicleFoundPanel={setVehicleFound} setConfirmedRidePanel={setConfirmedRidePanel} />
        
        }
      </div>
      <div ref={vehicleFoundPanelRef}  className=" absolute w-full z-10 bottom-0 rounded-4xl bg-white p-4  h-fit hidden  " >
        <LookingForDriver pickup={pickupValue} destination={dropValue} fare={fare} vehicleType={vehicleType} />
      </div>
      <div ref={waitingForDriverPanelRef} className=" absolute w-full z-10 bottom-0 rounded-4xl bg-white p-4  h-fit hidden   " >
        <WaitForDriver ride={ride} setWaitForDriverPanel={setWaitingForDriverPanel} />
      </div>

    </div>
  );
};

export default Home;