import  { useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import axios from 'axios'
import { Ride } from '../types/ride'

const CaptainRiding = () => {

    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)
    const location = useLocation();
    const rideData:Ride = location.state?.ride;
    const navigate = useNavigate();

    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [finishRidePanel]);

    const endRide = async ()=>{
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/end-ride`,{},{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            },
            params:{
                rideId:rideData._id
            }
        })

        if(response.status===200){
            setFinishRidePanel(false);
            navigate('/captain-home');
        }
    }


    return (
        <div className='h-full relative overflow-hidden overflow-y-hidden  rounded-4xl flex flex-col justify-between w-full bg-white '>

            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div className='h-4/5'>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />

            </div>
            <div className='h-1/5 p-6 flex items-center justify-between relative bg-yellow-400 pt-10'
            onClick={()=>{
                setFinishRidePanel(true)
            }}
            >
                <h5 className='p-1 text-center w-[90%] absolute top-0' onClick={() => {

                }}><i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i></h5>
                <h4 className='text-xl font-semibold'>4 KM away</h4>
                <button className=' bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Complete Ride</button>
            </div>
            <div ref={finishRidePanelRef} className='absolute w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <FinishRide ride={rideData} endRide={endRide} setFinishRidePanel={setFinishRidePanel} />
            </div>

        </div>
    )
}

export default CaptainRiding