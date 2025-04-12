import { Routes, Route } from "react-router"

import Home from "./pages/Home"
import UserLogin from "./pages/UserLogin"
import UserSignup from "./pages/UserSignup"
import CaptainLogin from "./pages/CaptainLogin"
import CaptainSignup from "./pages/CaptainSignup"
// import { useContext } from "react"
// import { UserDataContext } from "./context/UserContext"

const App = () => {

  // const user = useContext(UserDataContext)

  return (
      <div className="top-10  absolute left-1/2 -translate-x-1/2  h-5/6 w-80 rounded-4xl ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/captain-login" element={<CaptainLogin />} />
          <Route path="/captain-signup" element={<CaptainSignup />} />
        </Routes>
      </div>

  )
}

export default App