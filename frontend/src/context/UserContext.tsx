import { createContext, ReactNode, useState } from "react"
import { UserContextType, User } from "../types/user"

// eslint-disable-next-line react-refresh/only-export-components
export const UserDataContext = createContext<UserContextType | null>(null)

const UserContext = ({children}:{children:ReactNode}) => {
    const [user] = useState<User>({
        email:"",
        fullName:{
            firstName:'',
            lastName:''
        }
    })
  return (
    <div>
        <UserDataContext.Provider value={{user}} >
            {children}
        </UserDataContext.Provider>
    
    </div>
  )
}


export default UserContext