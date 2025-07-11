import  { useRef, useState } from 'react'
import { Link } from 'react-router'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import logo from "../assets/driver.png";
import CaptainContext from '../context/CaptainContext'


const CaptainHome = () => {

    const [ridePopupPanel, setRidePopupPanel] = useState(true)
    const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)

    const ridePopupPanelRef = useRef(null)
    const confirmRidePopupPanelRef = useRef(null)


    useGSAP(function () {
        if (ridePopupPanel) {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ridePopupPanel])

    useGSAP(function () {
        if (confirmRidePopupPanel) {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [confirmRidePopupPanel])

    return (
        <div className='h-full relative overflow-hidden overflow-y-hidden  rounded-4xl flex flex-col justify-between w-full bg-white'>
            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
            <img className="m-6 w-18 object-contain" src={logo} alt="" />
                <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div className='h-3/5'>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />

            </div>
            <div className='h-2/5 p-6'>
                <CaptainDetails />
            </div>
            <div className='overflow-scroll'>
              <div ref={ridePopupPanelRef} className='absolute w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                  <RidePopUp setRidePopupPanel={setRidePopupPanel}  setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
              </div>
              <div ref={confirmRidePopupPanelRef} className='absolute w-full h-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-8'>
                  <ConfirmRidePopUp setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel}  />
              </div>

            </div>
        </div>
    )
}

export default CaptainHome