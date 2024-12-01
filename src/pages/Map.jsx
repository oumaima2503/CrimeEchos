import React from 'react'
import blood from '../assets/blood.svg';
import arriere from '../assets/arriere.png';
import Header from '../component/Header';

const Map = () => {
  return (
    <div
      className="h-screen bg-cover bg-no-repeat flex flex-col relative"
      style={{ backgroundImage: `url(${arriere})`, backgroundPosition: '90% 0%' }}
    >
      <img className="absolute z-0 opacity-80" src={blood} alt="Blood Icon" />

      <Header/>
        Map</div>
  )
}

export default Map