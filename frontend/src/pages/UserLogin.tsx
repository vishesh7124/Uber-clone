import {  Link } from "react-router";
import {useForm} from "react-hook-form"
import { useNavigate } from "react-router";
import axios from "axios";
import { UserContextType } from "../types/user";
import { useContext } from "react";
import { UserDataContext } from "../context/UserContext";


import logo from "../assets/logo.png"




const UserLogin = () => {
    const navigate = useNavigate()
    const {setUser} = useContext(UserDataContext) as UserContextType

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const onSubmit = async (payload:object)=>{
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,payload)
        if(response.status===200){
            const data = response.data
            setUser(data.user)
            localStorage.setItem('token',data.token)
            navigate('/home')
            
        }

      }

    

  return (
    <div className=" pb-7 flex flex-col justify-between h-full   rounded-4xl  bg-white ">
        <div>
            <img className="m-6 w-18 object-contain" src={logo} alt="" />
        <form className="px-7" onSubmit={handleSubmit(onSubmit)} >
            <h3 className="text-lg font-medium mb-2">What's your email</h3>
            <input
            className="bg-[#eeeeee]  mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-sm "
            type="email"
            required
            placeholder="email@example.com"
            {...register("email", { required: true })}
            />
            <h3 className="text-lg font-medium mb-2" >Enter Password</h3>
            <input className="bg-[#eeeeee]  mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-sm " type="password" required placeholder="password" {...register('password',{required:true})} />
            {(errors.email || errors.password) && (
                <span className="text-red-500 text-sm">Please fill in all fields</span>
            )}
            <button type="submit" className="bg-[#111] font-semibold text-white mb-2 rounded px-4 py-2 w-full text-lg placeholder:text-sm " >Login</button>
        </form>
        <p className="text-center">
        New here? <Link className="text-blue-600 py-1" to="/signup" >Create New Account</Link>
            
        </p>

        </div>
      <div className="px-7 " >
        <Link to="/captain-login" className=" inline-block text-center bg-[#10b461] font-semibold text-white rounded px-4 py-2 w-full text-lg placeholder:text-sm " >Sign in as Captain</Link>

      </div>
      {/* <div className="bg-white p-4 pb-7 rounded-b-4xl  ">
            <h2 className="text-2xl font-bold" >Get Started with Uber</h2>
        </div> */}
    </div>
  );
};

export default UserLogin;
