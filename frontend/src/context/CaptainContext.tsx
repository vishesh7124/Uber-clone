import { createContext, ReactNode, useState } from "react"
import { CaptainContextType, Captain } from "../types/captain"

// eslint-disable-next-line react-refresh/only-export-components
export const CaptainDataContext = createContext<CaptainContextType | null>(null)

const CaptainContext = ({children}:{children:ReactNode}) => {
    const [captain, setCaptain] = useState<Captain |null>(null)
  return (
    <div>
        <CaptainDataContext.Provider value={{captain, setCaptain}} >
            {children}
        </CaptainDataContext.Provider>
    
    </div>
  )
}


export default CaptainContext