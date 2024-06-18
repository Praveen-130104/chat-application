import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useMyContext } from '../context/Mycontext';


const LoginComp = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);



  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post("http://localhost:3000/api/login", {
      username: username,
      password: password
    })
    const token = response.data.token;
    const user = response.data.userDetails;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    if (response.status === 200) {
      window.location.href = "/dashboard?menu=chat";
    }
    else if (response.status === 401) alert("Incorrect Password");
    else if (response.status === 404) alert("User Not Found");

  }



  return (
    <div className='w-full h-screen bg-gray-200 backgrnd flex md:gap-20 justify-center md:justify-end items-center '>

      <form onSubmit={handleSubmit} className='h-[50%] w-[50%] md:w-[30%] rounded-2xl shadow-g   mr-[15%] flex flex-col gap-2  justify-center items-center'>
        <h1 className='text-3xl font-bold text-[#1b262c]'>Welcome Again!!</h1>
        <p className='text-lg text-[#1b262c]'>Not a member? <Link to='/signup' className='underline'>Sign Up</Link></p>
        <div className='flex flex-col justify-center items-center gap-4 my-3 '>
          <div className="w-72">
            <div className="relative w-full min-w-[200px] h-10">
              <input
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 border-black focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                placeholder=" " 
                onChange={(e) => setUsername(e.target.value)}
                />
              <label
                className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Username
              </label>
            </div>
          </div>
          <div className="w-72">
            <div className="relative w-full min-w-[200px] h-10">
              <input
                type="password"
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 border-black focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                placeholder=" "
                onChange={(e) => setPassword(e.target.value)}
                />
              <label
                className="flex  w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                Password
              </label>
            </div>
          </div>
          
        </div>
        <div className='w-72'>
          <button type="submit" className='bg-[#1b262c] w-full text-white rounded-[7px] px-4 py-2'>Login</button>
        </div>

      </form>
    </div>
  )
}
export default LoginComp