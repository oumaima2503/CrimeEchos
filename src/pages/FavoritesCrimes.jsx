import React from "react";
import { useFavorites } from "../context/FavoritesContext";
import { MdPlace, MdLabelImportant, MdLabelImportantOutline } from "react-icons/md";
import { FaCalendarCheck, FaQuestionCircle } from "react-icons/fa";
import blood from '../assets/blood.svg';
import arriere from '../assets/arriere.png';
import Header from '../component/Header';



function FavoriteCrimes({ crimes, onSeeMore }) {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  const isFavorite = (id) => favorites.some((item) => item.id === id);

  return (
    <div className="h-screen bg-cover bg-no-repeat flex flex-col relative  " style={{ backgroundImage: `url(${arriere})`, backgroundPosition: '90% 0%' }}>
    <img className="absolute -z-10 opacity-80" src={blood} alt="Blood Icon" />
    <Header />
    <div className="z-20 flex-grow p-2 overflow-auto max-[600px]:text-[10px]  no-scrollbar pl-10 pr-10  ">
    <div>
          <h1 className="text-2xl font-bold text-[#580B0B] nosifer max-[700px]:text-lg max-[480px]:text-xs max-[700px]:mt-2 max-[480px]:mt-4">Your saved crimes</h1>
          <h1 className="text-2xl font-bold text-white -mt-9 nosifer max-[700px]:text-lg max-[480px]:text-xs max-[480px]:-mt-6 ">Your saved crimes</h1>
        </div>
        
      
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {favorites.map((crime) => (
            <div
              key={crime.id}
              className="flex items-stretch bg-white/90 rounded-lg shadow-md overflow-hidden koulen"
            >
              <div className="bg-[#982222] text-white p-4 flex flex-col justify-center">
                <div className="mb-2 flex items-center gap-2">
                  <MdPlace />
                  <div className="text-sm max-[600px]:text-[10px]">
                    <p>{crime.crimeAddress?.city || "Unknown City"},</p>
                    <p>{crime.crimeAddress?.district || "Unknown District"}</p>
                  </div>
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <FaCalendarCheck />
                  <p>{crime.crimeDate}</p>
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <FaQuestionCircle />
                  <p>{crime.isSolved ? "Solved" : "Not Solved"}</p>
                </div>
              </div>
              <div className="flex-1 p-4">
                <h2 className="text-xl font-semibold mb-2 nosifer">{crime.name}</h2>
                <p className="text-black/80"> {crime.description}</p>
                <div className="flex justify-between items-center">
                  
                  <button 
                    onClick={() =>
                      isFavorite(crime.id)
                        ? removeFromFavorites(crime.id)
                        : addToFavorites(crime)
                    }
                    className="mt-2 text-3xl -rotate-90 flex justify-end items-end"
                  >
                    {isFavorite(crime.id) ? (
                      <MdLabelImportant className="text-[#982222]" />
                    ) : (
                      <MdLabelImportantOutline />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg">Aucun crime favori pour le moment.</p>
      )}
       </div>
       </div>
   
  );
}

export default FavoriteCrimes;
