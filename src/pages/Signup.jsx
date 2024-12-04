import React from "react";
import blood from '../assets/blood.svg';
import arriere from '../assets/arriere.png';
import logo from '../assets/logo_crime.png';

function SignUpPage() {
  return (
    
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
<img 
  className="absolute z-0 opacity-60 top-0 left-0 h-64" 
  src={blood} 
  alt="Blood Icon" 
/>
      {/* Left Side: Form */}
      <div className="w-full md:w-1/2  relative flex items-center justify-center koulen "> 
      <div className="w-full md:w-1/2 bg-white p-6 rounded-lg flex flex-col justify-center border border-white rounded-3xl backdrop-blur-sm bg-opacity-40 ml-10 mr-10">     
           <h1 className="text-3xl font-bold mb-4 text-center koulen">CREATE ACCOUNT</h1>
          <p className="text-sm text-center text-white mb-6">
            Already have an Account?{" "}
            <a href="/login" className="text-yellow-400 hover:underline">
              Log in
            </a>
          </p>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-gray-700 rounded-md outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 bg-gray-700 rounded-md outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 bg-gray-700 rounded-md outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w- bg-[#982222] text-white py-2 rounded-md font-bold hover:bg-red-700 "
            >
              SIGN UP
            </button>
          </form>
        </div>
        </div>
        {/* Right Side: Logo and Decoration */}
        <div className="w-full md:w-1/2  bg-cover bg-center relative h-screen ">
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-0 p-6">
            <h1 className="text-4xl font-bold mb-4"></h1>
            
            <h1 className="text-white text-3xl md:text-4xl font-bold z-10 -mt-40 nosifer">GET STARTED</h1>
            <h1 className="text-[#580B0B] text-3xl md:text-4xl font-bold z-0 nosifer -mt-[30px] md:-mt-[30px]">
            GET STARTED
          </h1>
            <img 
  className="w-32 h- mb-2" 
  src={logo} 
  alt="logo " 
/>  
            <p className="text-3xl text-white uppercase font-bold tracking-wide koulen">
              Crimechos
            </p>
          </div>
          
          {/* Background (Crime Scene Tape) */}

          <img 
            src={arriere}
            alt="Crime Scene Background"
            className=" w-full h-full rounded-3xl "
          />
        </div>
    
    </div>
  );
}

export default SignUpPage;
