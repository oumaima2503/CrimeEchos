import React, { useState } from 'react';
import { crimes } from '../api/crimeData'; 
import blood from '../assets/blood.svg';
import arriere from '../assets/arriere.png';
import Header from '../component/Header';
import '../App.css';
import { MdPlace } from "react-icons/md";
import { FaCalendarCheck } from "react-icons/fa";
import { RiCriminalFill } from "react-icons/ri";
import { TbProgressHelp } from "react-icons/tb";
import { FiFilter } from "react-icons/fi";
import { FaQuestionCircle } from "react-icons/fa";

// Modal Component
const CrimeModal = ({ crime, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-40" onClick={onClose}>
      <div
        className="relative bg-gradient-to-br from-gray-800 via-black to-gray-900 p-6 rounded-lg w-3/4
         md:w-1/2 text-white shadow-lg  max-[900px]:text-[15px] max-[600px]:text-[10px]    "
        style={{
          backgroundImage: `url(${arriere})`,
          backgroundPosition: '90% 30%',
          backgroundBlendMode: 'overlay',
          
        }}
      >
       
       
        <div className=" my-6"></div>
    
        <div className='flex gap-4 text-center items-center justify-center max-[600px]:text-[15px] max-[900px]:text-2xl
         neon font-bold text-3xl py-3'>
        
          <h2 className='nosifer mb-6 max-[600px]:mb-0'>{crime?.category || "No category"}</h2>
        </div>
        <div className=" my-4"></div>
    
        <p className=''>
          <strong className="nosifer">Criminal Info:</strong> 
          <br /> {crime?.criminalInfo?.sex || "Unknown"}, {crime?.criminalInfo?.description || "No description"}
        </p>
        <div className=" my-4"></div>
    
        <p>
          <strong className="nosifer">Description:</strong> <br /> {crime?.description || "No description available"}
        </p>
        <div className=" my-4"></div>
     
        
        <div className=" my-4"></div>
    
        <p>
          <strong className="nosifer">Responsible Force:</strong> <br />  {crime?.responsibleForce?.name || "Unknown force"}
        </p>
        <div className="my-4"></div>
    
        <p>
          <strong className="nosifer">Solved:</strong>   {crime?.isSolved ? "Yes" : "No"}
        </p>
    
        {/* Bouton stylisé */}
        <div className="flex justify-end">
  <button
    className=" bg-[#982222] text-white px-6 py-2 koulen -mt-8  max-[600px]:text-[10px] max-[600px]:px-3 max-[600px]:py-1
    text-sm rounded transition-transform transform hover:scale-105 hover:bg-[#c12c2c] shadow-lg"
    onClick={onClose}
  >
    Close
  </button>
</div>

      </div>
    
      {/* Effet néon */}
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
    const [categoryFilter, setCategoryFilter] = useState('');
    const [solvedFilter, setSolvedFilter] = useState(null);
    const [placeFilter, setPlaceFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');

      // Déclaration de l'état pour gérer la visibilité du menu déroulant
  const [dropdownVisible, setDropdownVisible] = useState(false);

  
    // State for handling modal visibility
    const [selectedCrime, setSelectedCrime] = useState(null);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const crimesPerPage = 6;

    // Function to handle place filter change
    const handlePlaceChange = (e) => {
        setPlaceFilter(e.target.value);
    };

    // Function to handle date filter change
    const handleDateChange = (e) => {
        setDateFilter(e.target.value);
    };

    const uniquePlaces = [
        ...new Set(
            crimes
                .filter(crime => crime.crimeAddress && crime.crimeAddress.city)
                .map(crime => crime.crimeAddress.city)
        ),
    ];

    // Filter crimes based on selected filters
    const filteredCrimes = crimes.filter((crime) => {
     const isCategoryMatch = categoryFilter ? (crime.category?.toLowerCase().includes(categoryFilter.toLowerCase())) : true;

      const isSolvedMatch = solvedFilter !== null ? crime.isSolved === solvedFilter : true;
      const isDateMatch = dateFilter ? (crime.crimeDate && crime.crimeDate.includes(dateFilter)) : true;
      const isPlaceMatch = placeFilter ? (crime.crimeAddress?.city && crime.crimeAddress.city === placeFilter) : true;
      


        return isCategoryMatch && isSolvedMatch && isPlaceMatch && isDateMatch;
    });

    // Pagination logic
    const indexOfLastCrime = currentPage * crimesPerPage;
    const indexOfFirstCrime = indexOfLastCrime - crimesPerPage;
    const currentCrimes = filteredCrimes.slice(indexOfFirstCrime, indexOfLastCrime);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(filteredCrimes.length / crimesPerPage);

    // Function to open the modal with crime details
    const handleSeeMore = (crime) => {
        setSelectedCrime(crime);
    };

    // Function to close the modal
    const closeModal = () => {
        setSelectedCrime(null);
    };

    return (
        <div className="h-screen bg-cover bg-no-repeat flex flex-col relative " style={{ backgroundImage: `url(${arriere})`, backgroundPosition: '90% 0%' }}>
            <img className="absolute -z-10 opacity-80" src={blood} alt="Blood Icon" />
            <Header />
            <div className="z-20 flex-grow p-2 overflow-auto max-[600px]:text-[10px] ">


            {/* Filter Section */}
<div className="z-10 relative">
  {/* Bouton de filtre pour les petites tailles */}
  <div className="md:hidden flex justify-end p-4 pr-10">
    <button
      className="bg-[#982222] text-white py-2 px-4 rounded-md shadow-md flex items-center text-sm"
      onClick={() => setDropdownVisible(!dropdownVisible)} // Gérer la visibilité du dropdown
    >
      <FiFilter />
      <span className="ml-2 ">Filter</span>
    </button>
  </div>

  {/* Dropdown Menu */}
  {dropdownVisible && (
    <div className="absolute top-16 left-0 right-0 bg-white/90 shadow-md rounded-md p-4 z-20">
      <div className="flex flex-col gap-4 text-[#982222] font-bold">
        {/* Place Filter */}
        <div>
          <label htmlFor="placeFilter" className="block text-sm font-semibold mb-1">
            Select Place
          </label>
          <select
            id="placeFilter"
            value={placeFilter}
            onChange={handlePlaceChange}
            className="p-2 border rounded w-full"
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
        <div>
          <label htmlFor="dateFilter" className="block text-sm font-semibold mb-1">
            Select Date
          </label>
          <input
            id="dateFilter"
            type="date"
            value={dateFilter}
            onChange={handleDateChange}
            className="p-2 border rounded w-full"
          />
        </div>

        {/* Category Filter */}
        <div>
          <label htmlFor="categoryFilter" className="block text-sm font-semibold mb-1">
            Select Category
          </label>
          <select
            id="categoryFilter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 border rounded w-full"
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
        <div>
          <label htmlFor="solvedFilter" className="block text-sm font-semibold mb-1">
            Solved Status
          </label>
          <select
            id="solvedFilter"
            value={solvedFilter}
            onChange={(e) => setSolvedFilter(e.target.value ? JSON.parse(e.target.value) : null)}
            className="p-2 border rounded w-full"
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
  <div className="hidden md:flex flex-row gap-4 pr-10 pl-10 text-[#982222] font-bold">
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
    <div className="flex-1">
      <input
        type="date"
        value={dateFilter}
        onChange={handleDateChange}
        className="mt-2 p-2 border rounded w-full bg-white/90"
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


            {/* Display results */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 z-10 py-6  pr-10 pl-10">
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
                        <p className="text-center col-span-full nosifer text-[#580B0B] py-6  text-3xl  w-full  z-0 mt-10">No crimes selected.</p>
                        <p className="text-center col-span-full nosifer text-white text-3xl w-full z-20 -mt-[70px]">No crimes selected.</p>
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center gap-4 py-4 ">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-[#982222] text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-lg font-medium text-white koulen py-2">{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="bg-[#982222] text-white px-4 py-2 rounded disabled:opacity-50"
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
    return (
        <div className="flex items-stretch bg-white/90 rounded-lg shadow-md overflow-hidden koulen  ">
            <div className="bg-[#982222] text-white p-4 flex flex-col justify-center">
            <div className="mb-2 flex items-center gap-2">
              <MdPlace />
              <div className="text-sm max-[600px]:text-[10px] ">
                  {/* Safe access to city and district */}
                  <p className="fas fa-map-marker-alt">{crime.crimeAddress?.city || 'Unknown City'},</p> 
                  <p className="fas fa-map-marker-alt">{crime.crimeAddress?.district || 'Unknown District'}</p>
              </div>
          </div>

                <div className="mb-2 flex items-center gap-2">
                    <FaCalendarCheck />
                    {crime.crimeDate}
                </div>
                <div className="mb-2 flex items-center gap-2">
                <FaQuestionCircle />
                    Solved: {crime.isSolved ? 'Yes' : 'No'}
                </div>
            </div>

            <div className="flex-1 p-4">
                <h2 className="text-xl font-semibold mb-2 max-[600px]:text-lg nosifer ">{crime.name}</h2>
                <p className="text-md text-gray-600 ">Crime Category : {crime.category}</p>
                <button
                    className="bg-[#982222] text-white px-4 py-2 rounded text-xs max-[600px]:text-[8px] 
                     mt-4  hover:text-[#982222] hover:bg-[#982222]/50 hover:scale-110"
                    onClick={() => onSeeMore(crime)}
                >
                    See More
                </button>
            </div>
        </div>
    );
};

export default List;
