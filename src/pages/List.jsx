import React, { useState, useEffect } from 'react';
import { MdPlace } from "react-icons/md";
import { FaCalendarCheck } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { crimes } from '../api/crimeData';  // Remove this line since we will fetch data now
import blood from '../assets/blood.svg';
import arriere from '../assets/arriere.png';
import Header from '../component/Header';
import '../App.css';
import { MdLabelImportant } from "react-icons/md";
import { MdLabelImportantOutline } from "react-icons/md";

import { useFavorites } from '../context/FavoritesContext';



// Modal Component
const CrimeModal = ({ crime, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-40" onClick={onClose}>
      <div className=" z-40 relative bg-black bg-opacity-40   p-6 rounded-lg w-3/4 md:w-1/2
       text-white shadow-lg max-[900px]:text-[15px] max-[600px]:text-[10px] "
      style={{ backgroundImage: `url(${arriere})`, backgroundPosition: '90% 0%' , backgroundBlendMode: 'overlay',
      opacity:0.9, }}>
        <div className="my-6"></div>
        <div className='flex gap-4 text-center items-center justify-center max-[600px]:text-[15px] max-[900px]:text-2xl neon font-bold text-3xl py-3'>
          <h2 className='nosifer mb-6 max-[600px]:mb-0'>{crime?.category || "No category"}</h2>
        </div>
        <div className="my-4"></div>
        <p><strong className="koulen">Criminal Info:</strong><br /> {crime?.criminalInfo?.sex || "Unknown"}, {crime?.criminalInfo?.description || "No description"}</p>
        <div className="my-4"></div>
        <p><strong className="koulen">Description:</strong><br /> {crime?.description || "No description available"}</p>
        <div className="my-4"></div>
        <p><strong className="koulen">Responsible Force:</strong><br />  {crime?.responsibleForce?.name || "Unknown force"}</p>
        <div className="my-4"></div>
        <p><strong className="koulen">Solved:</strong> {crime?.isSolved ? "Yes" : "No"}</p>
        <div className="flex justify-end">
          <button className="bg-[#982222] text-white px-6 py-2 koulen -mt-8 max-[600px]:text-[10px] max-[600px]:px-3 max-[600px]:py-1 text-sm rounded transition-transform transform hover:scale-105 hover:bg-[#c12c2c] shadow-lg" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
      <style>
        {`
          .neon {
            text-shadow: 0 0 5px #982222, 0 0 10px #982222, 0 0 20px #982222, 0 0 40px #ff4747;
          }
        `}
      </style>
    </div>
  );
};



const List = () => {
  const [crimes, setCrimes] = useState([]); // State for storing crimes data
  const [categoryFilter, setCategoryFilter] = useState('');
  const [solvedFilter, setSolvedFilter] = useState(null);
  const [placeFilter, setPlaceFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCrime, setSelectedCrime] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const crimesPerPage = 6;
  

  // Fetch crimes data from the backend when the component mounts
  useEffect(() => {
    fetch('http://localhost:3000/api/crimes')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setCrimes(data))
      .catch((error) => console.error('Error fetching crimes data:', error));
  }, []);
  

  const handlePlaceChange = (e) => setPlaceFilter(e.target.value);
  const handleDateChange = (e) => setDateFilter(e.target.value);

  const uniquePlaces = [
    ...new Set(
      crimes
        .filter((crime) => crime.crimeAddress && crime.crimeAddress.city)
        .map((crime) => crime.crimeAddress.city)
    ),
  ];

  

  // Filter crimes based on selected filters
  const filteredCrimes = crimes.filter((crime) => {
    const isCategoryMatch = categoryFilter ? crime.category?.toLowerCase().includes(categoryFilter.toLowerCase()) : true;
    const isSolvedMatch = solvedFilter !== null ? crime.isSolved === solvedFilter : true;
    const isDateMatch = dateFilter ? crime.crimeDate && crime.crimeDate.includes(dateFilter) : true;
    const isPlaceMatch = placeFilter ? crime.crimeAddress?.city && crime.crimeAddress.city === placeFilter : true;

    return isCategoryMatch && isSolvedMatch && isPlaceMatch && isDateMatch;
  });

  const indexOfLastCrime = currentPage * crimesPerPage;
  const indexOfFirstCrime = indexOfLastCrime - crimesPerPage;
  const currentCrimes = filteredCrimes.slice(indexOfFirstCrime, indexOfLastCrime);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredCrimes.length / crimesPerPage);

  const handleSeeMore = (crime) => setSelectedCrime(crime);
  const closeModal = () => setSelectedCrime(null);

  return (
    <div className="h-screen bg-cover bg-no-repeat flex flex-col relative  " style={{ backgroundImage: `url(${arriere})`, backgroundPosition: '90% 0%' }}>
      <img className="absolute -z-10 opacity-80" src={blood} alt="Blood Icon" />
      <Header />
       {/* Filter Section */}
<div className="z-20 relative mb-2">
  {/* Bouton de filtre pour les petites tailles */}
  <div className="md:hidden flex justify-end px-4 pr-10">
    <button
      className="bg-[#982222] text-white py-2 px-4 rounded-md shadow-md flex items-center text-sm max-[450px]:text-[10px]"
      onClick={() => setDropdownVisible(!dropdownVisible)} // Gérer la visibilité du dropdown
    >
      <FiFilter />
      <span className="ml-2 koulen ">Filter</span>
    </button>
  </div>

  {/* Dropdown Menu */}
  {dropdownVisible && (
    <div className="absolute top-10  right-20 bg-[#982222] shadow-md w-1/2 rounded-md p-4 z-20">
      <div className="flex flex-col gap-4 text-white font-bold">
        {/* Place Filter */}
        <div className='flex justify-between items-center'>
          <label htmlFor="placeFilter" className="block text-sm font-semibold mb-1">
            Select Place :
          </label>
          <select
            id="placeFilter"
            value={placeFilter}
            onChange={handlePlaceChange}
            className="p-2 border rounded w-[60%] text-black text-xs"
          >
            <option value="">Select Place</option>
            {uniquePlaces.map((place, index) => (
              <option key={index} value={place}>
                {place}
              </option>
            ))}
          </select>
        </div>

        {/* Date Filter */}
        <div className='flex justify-between items-center'>
          <label htmlFor="dateFilter" className="block text-sm font-semibold mb-1 ">
            Select Date :
          </label>
          <input
            id="dateFilter"
            type="date"
            value={dateFilter}
            onChange={handleDateChange}
            className=" border p-2 rounded w-[60%] text-black text-xs"
          />
        </div>

        {/* Category Filter */}
        <div className='flex justify-between items-center'>
          <label htmlFor="categoryFilter" className="block text-sm font-semibold mb-1">
             Category :
          </label>
          <select
            id="categoryFilter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 border rounded w-[60%] text-black text-xs"
          >
            <option value="">All Categories</option>
            <option value="Theft">Theft</option>
            <option value="Murder">Murder</option>
            <option value="Fraud">Fraud</option>
            <option value="Assault">Assault</option>
            <option value="Cybercrime">Cybercrime</option>
          </select>
        </div>

        {/* Solved Status Filter */}
        <div className='flex justify-between items-center'>
          <label htmlFor="solvedFilter" className="block text-sm font-semibold mb-1">
            Solved Status :
          </label>
          <select
            id="solvedFilter"
            value={solvedFilter}
            onChange={(e) => setSolvedFilter(e.target.value ? JSON.parse(e.target.value) : null)}
            className="p-2 border rounded w-[60%] text-black text-xs"
          >
            <option value="">Solved Status</option>
            <option value="true">Solved</option>
            <option value="false">Unsolved</option>
          </select>
        </div>
      </div>
    </div>
  )}
  

  {/* Section toujours visible pour les grandes tailles */}
  <div className="  hidden md:flex flex-row gap-4 pr-10 pl-10 text-[#982222] koulen font-bold ">
    <div className="flex-1">
      <select
        value={placeFilter}
        onChange={handlePlaceChange}
        className="mt-2 p-2 border rounded w-full bg-white/90"
      >
        <option value="">Select Place</option>
        {uniquePlaces.map((place, index) => (
          <option key={index} value={place}>
            {place}
          </option>
        ))}
      </select>
    </div>
    <div className="flex-1  ">
      <input
        type="date"
        value={dateFilter}
        onChange={handleDateChange}
        className="mt-2 px-2 py-[10px] border rounded w-full bg-white/90"
      />
    </div>
    <div className="flex-1">
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="mt-2 p-2 border rounded w-full bg-white/90"
      >
        <option value="">All Categories</option>
        <option value="Theft">Theft</option>
        <option value="Murder">Murder</option>
        <option value="Fraud">Fraud</option>
        <option value="Assault">Assault</option>
        <option value="Cybercrime">Cybercrime</option>
      </select>
    </div>
    <div className="flex-1">
      <select
        value={solvedFilter}
        onChange={(e) => setSolvedFilter(e.target.value ? JSON.parse(e.target.value) : null)}
        className="mt-2 p-2 border rounded w-full bg-white/90"
      >
        <option value="">Solved Status</option>
        <option value="true">Solved</option>
        <option value="false">Unsolved</option>
      </select>
    </div>
  </div>
</div>
      <div className="flex-grow overflow-auto no-scrollbar px-2  max-[600px]:text-[10px]  ">
    


        {/* Display results */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 z-10 py-6 pr-10 pl-10   ">


          {currentCrimes.length > 0 ? (
            currentCrimes.map((crime) => (
              <CrimeCard
                key={crime.id}
                crime={crime}
                onSeeMore={handleSeeMore}
              />
            ))
          ) : (
            <div className="w-full text-center col-span-full h-full flex-col items-center relative py-6">
              <p className="text-center col-span-full nosifer text-[#580B0B] py-6 text-3xl w-full z-0 mt-10">No crimes selected.</p>
              <p className="text-center col-span-full nosifer text-white text-3xl w-full z-20 -mt-[70px]">No crimes selected.</p>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center gap-4 py-4 max-[500px]:-mt-8 max-[750px]:-mt-6 ">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-[#982222] text-white koulen px-4 py-1 rounded disabled:opacity-50 max-[500px]:w-16 text-xs max-[500px]:h-8 max-[750px]:w-20  max-[750px]:h-8 "
          >
            Previous
          </button>
          <span className="text-lg font-medium text-white koulen py-2 max-[500px]:text-xs max-[750px]:text-sm  ">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-[#982222] text-white koulen px-4 py-1 rounded disabled:opacity-50 max-[500px]:w-16 text-xs max-[500px]:h-8 max-[750px]:w-20  max-[750px]:h-8 "
          >
            Next
          </button>
        </div>

        {/* Show the modal if a crime is selected */}
        {selectedCrime && <CrimeModal crime={selectedCrime} onClose={closeModal} />}
      </div>
    </div>
  );
};

const CrimeCard = ({ crime, onSeeMore }) => {

  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  // Vérifie si le crime est dans la liste des favoris
  const isFavorite = favorites.some((fav) => fav.id === crime.id);


  return (
    <div className="z-0 flex items-stretch bg-white/90 rounded-lg max-[600px]:-mt-4 shadow-md overflow-hidden koulen">
      <div className="bg-[#982222] text-white p-4 flex flex-col justify-center">
        <div className="mb-2 flex items-center gap-2">
          <MdPlace />
          <div className="text-sm max-[600px]:text-[10px]">
            <p>{crime.crimeAddress?.city || 'Unknown City'},</p>
            <p>{crime.crimeAddress?.district || 'Unknown District'}</p>
          </div>
        </div>
        <div className="mb-2 flex items-center gap-2">
          <FaCalendarCheck />
          <p>{crime.crimeDate}</p>
        </div>
        <div className="mb-2 flex items-center gap-2">
          <FaQuestionCircle />
          <p>{crime.isSolved ? 'Solved' : 'Not Solved'}</p>
        </div>
      </div>
      <div className="flex-1 p-4">
        <h2 className=" font-semibold mb-2 nosifer">{crime.name}</h2>
        <p className='text-black/80'>The category of the crime is : {crime.category}</p>
        <div className='flex justify-between items-center'>

        
        <button
          onClick={() => onSeeMore(crime)}
          className="mt-4 bg-[#982222] text-white px-6 py-2 rounded hover:bg-[#c12c2c]
           transition-transform transform hover:scale-105"
        >
          See More
        </button>
        {/* button save */}
        <button
  onClick={() =>
    isFavorite
      ? removeFromFavorites(crime.id)
      : addToFavorites(crime)
  }
  className="mt-4 text-3xl -rotate-90 flex justify-end items-end"
>
  {isFavorite ? (
    <MdLabelImportant className="text-[#982222]" />
  ) : (
    <MdLabelImportantOutline />
  )}
</button>

        </div>
      </div>
    </div>
  );
};

export default List;
