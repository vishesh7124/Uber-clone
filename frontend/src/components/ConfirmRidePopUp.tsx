import { useState } from 'react'
import { Ride } from '../types/ride';
import axios from 'axios';
import { useNavigate } from 'react-router';

interface ConfirmRidePopUpProps {
    ride?: Ride
    setRidePopupPanel: React.Dispatch<React.SetStateAction<boolean>>;
    setConfirmRidePopupPanel:React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmRidePopUp = (props:ConfirmRidePopUpProps) => {
    const [otp, setOtp] = useState('')
    const navigate = useNavigate();

    const submitHander = async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        if(!otp){
            alert("Please enter OTP")
            return
        }
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/ride/start-ride`,
                {  },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    params: {
                        rideId: props.ride?._id,
                        otp: otp,
                    }
                }
            );

            if(response.status === 200){
                props.setConfirmRidePopupPanel(false);
                navigate('/captain-riding',{state: { ride: props.ride }});
            }
        } catch (error) {
            console.error("Error confirming ride:", error);
            alert("Failed to confirm ride. Please try again.");
        }

    }
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setConfirmRidePopupPanel(false)
                props.setRidePopupPanel(true)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-xl font-semibold mb-5'>Confirm this ride to Start</h3>
            <div className='flex items-center justify-between p-3 border-2 border-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3 '>
                    <img className='h-7 rounded-full object-cover w-7' src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" alt="" />
                    <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname}</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>
            <div className='flex justify-between flex-col items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-md font-medium'>{props.ride?.pickup.split(" ")[0]}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup.split(" ").slice(1)}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-md font-medium'>{props.ride?.destination.split(" ")[0]}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination.split(" ").slice(1)}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-md font-medium'>₹{props.ride?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash </p>
                        </div>
                    </div>
                </div>

                <div className='mt-2 w-full'>
                    <form onSubmit={(e)=>{
                        submitHander(e)
                    }}>
                        <input value={otp} onChange={(e)=>setOtp(e.target.value)} type="text" className='bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3' placeholder='Enter OTP' />

                    <button type='submit'  className='w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>Confirm</button>
                    <button onClick={() => {
                        props.setConfirmRidePopupPanel(false)
                        props.setRidePopupPanel(false)

                    }} className='w-full mt-2 bg-red-600 text-lg text-white font-semibold p-3 rounded-lg'>Cancel</button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRidePopUp