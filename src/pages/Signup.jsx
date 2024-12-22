import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Importation de Framer Motion
import blood from '../assets/blood.svg';
import arr from '../assets/arrieresansblood.svg';
import logo from '../assets/logo_crime.png';
import { IoMdArrowRoundBack } from "react-icons/io";

function SignUpPage() {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false); // État pour gérer la transition

  const handleSignUp = (e) => {
    e.preventDefault();
    navigate('/DashBoard');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleLogInClick = () => {
    setIsTransitioning(true); // Déclencher la transition
    setTimeout(() => navigate('/login'), 10); // Naviguer après la transition
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white relative">
      <img 
        className="absolute z-0 opacity-60 top-0 left-0 w-full object-cover h-[250px] md:h-64" 
        src={blood} 
        alt="Blood Icon" 
      />
      
      {/* Formulaire d'inscription */}
      <motion.div
        className={`w-full md:w-3/5 relative flex items-center justify-center px-4 ${
          isTransitioning ? "z-0" : "z-10"
        }`}
        animate={isTransitioning ? { x: "-100%" } : { x: 0 }} // Déplacement vers la gauche
        transition={{ duration: 0.8 }}
      >
        <div className="w-full max-w-md h-auto lg:h-[450px]  bg-white p-6 flex flex-col justify-center border border-white rounded-3xl backdrop-blur-xl bg-opacity-30">
          <h1 className="text-3xl font-bold mb-4 text-center koulen">CREATE ACCOUNT</h1>
          <p className="text-lg text-center text-white mb-6">
            Already have an Account?{" "}
            <span
              onClick={handleLogInClick}
              className="text-yellow-400 hover:underline cursor-pointer"
            >
              Log in
            </span>
          </p>
          <form className="space-y-4">
            <div className="group">
              <label className="block text-lg font-medium group-focus-within:text-yellow-400">Name</label>
              <input
                type="text"
                className="w-full px-3 py-1 bg-transparent border-b-2 border-white focus:outline-none focus:border-yellow-400"
              />
            </div>

            <div className="group">
              <label className="block text-lg font-medium group-focus-within:text-yellow-400">Email</label>
              <input
                type="text"
                className="w-full px-3 py-1 bg-transparent border-b-2 border-white focus:outline-none focus:border-yellow-400"
              />
            </div>

            <div className="group">
              <label className="block text-lg font-medium group-focus-within:text-yellow-400">Password</label>
              <input
                type="text"
                className="w-full px-3 py-1 bg-transparent border-b-2 border-white focus:outline-none focus:border-yellow-400"
              />
            </div>
            
            <div className="flex justify-center">
              <button
                type="submit" 
                onClick={handleSignUp}
                className="w-24 bg-[#982222] text-white py-2 rounded-md font-bold hover:bg-red-700 text-2xl koulen"
              >
                SIGN UP
              </button>
            </div>
          </form>
        </div>
      </motion.div>

      {/* Section à droite */}
      <motion.div
        className={`w-full md:w-2/5 bg-cover bg-right relative h-screen ml-auto hidden sm:block ${
          isTransitioning ? "z-10" : "z-0"
        }`}
        animate={isTransitioning ? { x: "100%" } : { x: 0 }} // Déplacement vers la droite
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
          <h1 className="text-white text-3xl md:text-3xl font-bold z-10 -mt-12 nosifer">GET STARTED</h1>
          <h1 className="text-[#580B0B] text-3xl md:text-3xl font-bold z-0 nosifer -mt-[30px] md:-mt-[30px] ">
            GET STARTED
          </h1>
          <img className="w-48 h-auto mb-2 mt-2" src={logo} alt="logo" />
          <p className="text-3xl text-white uppercase font-bold tracking-wide koulen">Crimechos</p>

          {/* Back to Home Button */}
          <button
            onClick={handleGoHome}
            className="flex items-center text-white bg-[#580B0B] px-4 py-2 nosifer text-xs mt-8 p-2 rounded-full hover:bg-[#330d0d] transition-all"
          >
            <IoMdArrowRoundBack className="text-2xl mr-2 koulen" />
            Back to Home
          </button>
        </div>

        {/* Image de fond */}
        <img 
          src={arr} 
          alt="Crime Scene Background"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
}

export default SignUpPage;
