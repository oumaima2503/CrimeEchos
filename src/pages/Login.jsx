import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Importer framer-motion
import blood from '../assets/blood.svg';
import arr from '../assets/arrieresansblood.svg';
import logo from '../assets/logo_crime.png';
import { IoMdArrowRoundBack } from "react-icons/io";

function SigninPage() {
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    navigate('/DashBoard');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleSignUp = () => {
    // Déclenche la sortie des deux sections avant de rediriger
    navigate('/signup');
  };

  const sideVariants = {
    initial: { x: "-100%" }, // Début hors écran
    animate: { x: 0 },       // En position finale
    exit: { x: "-100%" },    // Repart à gauche
    transition: { duration: 0.8 }
  };

  const formVariants = {
    initial: { x: "100%" },  // Début hors écran
    animate: { x: 0 },       // En position finale
    exit: { x: "100%" },     // Repart à droite
    transition: { duration: 0.8 }
  };

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center bg-black text-white"
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <img 
        className="absolute z-0 opacity-60 top-0 right-0 h-64 transform scale-x-[-1] md:h-auto" 
        src={blood} 
        alt="Blood Icon" 
      />

      {/* Formulaire de connexion */}
      <motion.div 
        className="w-full md:w-2/5 bg-cover bg-right relative h-screen ml-auto hidden sm:block"
        variants={sideVariants} // Appliquer les variantes
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-0 p-6 mt-20">
          <h1 className="text-white text-3xl md:text-4xl font-bold z-10 -mt-40 nosifer">WELCOME</h1>
          <h1 className="text-[#580B0B] text-3xl md:text-4xl font-bold z-0 nosifer -mt-[30px] md:-mt-[30px]">
            WELCOME
          </h1>
          <img className="w-48 h-auto mb-2 mt-6" src={logo} alt="logo" />
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
        <img 
          src={arr} 
          alt="Crime Scene Background"
          className="w-[600px] h-full object-cover md:w-full"
        />
      </motion.div>

      {/* Section à droite */}
      <motion.div 
        className="w-full md:w-3/5 relative flex items-center justify-center"
        variants={formVariants} // Appliquer les variantes
      >
        <div className="w-full sm:max-w-md lg:max-w-lg lg:h-[450px] bg-white p-6 flex flex-col justify-center border border-white rounded-3xl backdrop-blur-xl bg-opacity-30 mx-4 sm:mx-0">
          <h1 className="text-3xl font-bold mb-4 text-center koulen">SIGN IN</h1>
          <p className="text-lg text-center text-white mb-6">
            You don't have an Account?{' '}
            <a
              onClick={handleSignUp} // Ajouter l'événement de clic
              className="text-yellow-400 hover:underline cursor-pointer"
            >
              Sign up
            </a>
          </p>
          <form className="space-y-4">
            <div className="group">
              <label className="block text-lg font-medium group-focus-within:text-yellow-400">Username</label>
              <input
                type="text"
                className="w-full px-3 py-1 bg-transparent border-b-2 border-white focus:outline-none focus:border-yellow-400"
              />
            </div>

            <div className="group">
              <label className="block text-lg font-medium group-focus-within:text-yellow-400">Password</label>
              <input
                type="password"
                className="w-full px-3 py-1 bg-transparent border-b-2 border-white focus:outline-none focus:border-yellow-400"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit" 
                onClick={handleSignIn}
                className="w-24 bg-[#982222] text-white py-2 rounded-md font-bold hover:bg-red-700 text-2xl koulen"
              >
                LOG IN
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default SigninPage;
