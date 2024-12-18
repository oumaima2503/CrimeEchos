import React from 'react'
import '../App.css';
import blood from '../assets/blood.svg';
import arriere from '../assets/arriere.png';
import Header from '../component/Header';

function helpCenter() {
  return (
    <div
    className={`h-screen bg-cover bg-no-repeat flex flex-col relative `}
    style={{ backgroundImage: `url(${arriere})`, backgroundPosition: '90% 0%'  }}
    
  >
    <img className="absolute -z-10 opacity-80" src={blood} alt="Blood Icon" />
    <Header />
    <div className="flex justify-between pl-10 mr-10 z-0 ">
    <div>
          <h1 className="text-2xl font-bold text-[#580B0B] nosifer max-[700px]:text-lg max-[480px]:text-xs max-[700px]:mt-2 max-[480px]:mt-4">Help Center</h1>
          <h1 className="text-2xl font-bold text-white -mt-9 nosifer max-[700px]:text-lg max-[480px]:text-xs max-[480px]:-mt-6 ">Help Center</h1>
        </div>
        </div>
    
    </div>
  )
}

export default helpCenter