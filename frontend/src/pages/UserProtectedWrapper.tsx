import { useNavigate } from "react-router"
import axios from "axios"
import { useState,useEffect, useContext } from "react"
import { UserDataContext } from "../context/UserContext"
import { UserContextType } from "../types/user"

const UserProtectedWrapper: React.FC<{children: React.ReactNode}> = ({children}) => {
    const token = localStorage.getItem('token')
    const {setUser} = useContext(UserDataContext) as UserContextType
    const navigate = useNavigate()
    const [isLoading, setIsLoading]  = useState<boolean>(true)
    
    useEffect(() => {
        
        if(!token){
            console.log("no token")
            navigate('/login')
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
            headers:{
                Authorization: `Bearer ${token}`

            }
        }).then(response =>{
            if(response.status === 200){
                setUser(response.data)
                setIsLoading(false)
            }
        }).catch(err=>{
            console.log(err);
            localStorage.removeItem('token')
            navigate('/login')
        })

    }, [navigate,token,setUser])

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

export default UserProtectedWrapper