import logo from "../assets/logo.png"
import bgHome from "../assets/homeBg.jpg"
import { Link } from "react-router"


const Home = () => {
  return (
    <div style={{background:`url(${bgHome})`,backgroundSize:"contain"}} className=" h-full  rounded-4xl flex flex-col justify-between w-full bg-red-50 " >
        <img className="m-6 w-18 object-contain" src={logo} alt="" />
        <div className="bg-white p-4 pb-7 rounded-b-4xl  ">
            <h2 className="text-2xl font-bold" >Get Started with Uber</h2>
            <Link to="/login" className=" flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5 " >Continue</Link>
        </div>
    </div>
  )
}

export default Home