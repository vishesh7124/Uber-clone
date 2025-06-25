import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { useContext } from "react"
import { CaptainDataContext } from "../context/CaptainContext"
import {CaptainContextType, Captain} from "../types/captain"
import axios from "axios"

const CaptainProtectWrapper: React.FC<{children: React.ReactNode}> = ({children}) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { setCaptain} = useContext(CaptainDataContext) as CaptainContextType
    const [isLoading, setIsLoading]  = useState<boolean>(true)
    
    useEffect(() => {
        
        if(!token){
            console.log("no token")
            navigate('/captain-login')
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response: {status:number,data:{
            captain:Captain
        }})=>{
            if(response.status === 200){
                setCaptain(response.data.captain)
                setIsLoading(false)
            }
        }).catch(err=>{
            console.log(err)
            localStorage.removeItem('token')
            navigate('/captain-login')
        })
    }, [navigate,token,setCaptain])


     if(isLoading){
        return(
            <div>Loading...</div>
        )
     }

    return(
        <>
            {children}
        </>
    )

}

export default CaptainProtectWrapper