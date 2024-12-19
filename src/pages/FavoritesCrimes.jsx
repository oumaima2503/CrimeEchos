import React from "react";
import { useFavorites } from "../context/FavoritesContext";
import { MdPlace, MdLabelImportant, MdLabelImportantOutline } from "react-icons/md";
import { FaCalendarCheck, FaQuestionCircle } from "react-icons/fa";

function FavoriteCrimes({ crimes, onSeeMore }) {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  const isFavorite = (id) => favorites.some((item) => item.id === id);

  return (
    <div className="min-h-screen bg-[#ddd4cd] p-6">
      <h2 className="text-2xl font-bold mb-4">Crimes Favoris</h2>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
                <p className="text-black/80">
                  The category of the crime is: {crime.category}
                </p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => onSeeMore(crime)}
                    className="mt-4 bg-[#982222] text-white px-6 py-2 rounded hover:bg-[#c12c2c] transition-transform transform hover:scale-105"
                  >
                    See More
                  </button>
                  <button
                    onClick={() =>
                      isFavorite(crime.id)
                        ? removeFromFavorites(crime.id)
                        : addToFavorites(crime)
                    }
                    className="mt-2"
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
  );
}

export default FavoriteCrimes;
