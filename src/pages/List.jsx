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


const List = () => {
    // State to manage filter values
    const [categoryFilter, setCategoryFilter] = useState('');  // Make sure it's an empty string by default
const [solvedFilter, setSolvedFilter] = useState(null);
const [placeFilter, setPlaceFilter] = useState('');
const [dateFilter, setDateFilter] = useState('');


    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const crimesPerPage = 6; // Number of crimes to display per page

    // Function to handle place filter change
    const handlePlaceChange = (e) => {
        setPlaceFilter(e.target.value);
    };

    // Function to handle date filter change
    const handleDateChange = (e) => {
        setDateFilter(e.target.value);
    };

    // Get unique places (cities or districts) from the crime data
    const uniquePlaces = [
        ...new Set(
            crimes
                .filter(crime => crime.crimeAddress && crime.crimeAddress.city)  // Filter out crimes with missing crimeAddress or city
                .map(crime => crime.crimeAddress.city)  // Map to get cities
        ),
    ];

    // Function to filter crimes based on the selected filters
    const filteredCrimes = crimes.filter((crime) => {
      const isCategoryMatch = categoryFilter ? (crime.category && crime.category.toLowerCase().includes(categoryFilter.toLowerCase())) : true;
      const isSolvedMatch = solvedFilter !== null ? crime.isSolved === solvedFilter : true;
      const isPlaceMatch = placeFilter ? crime.crimeAddress?.city === placeFilter : true;  // Use optional chaining
      const isDateMatch = dateFilter ? crime.crimeDate.includes(dateFilter) : true;
  
      return isCategoryMatch && isSolvedMatch && isPlaceMatch && isDateMatch;
  });
  
    // Pagination logic
    const indexOfLastCrime = currentPage * crimesPerPage;
    const indexOfFirstCrime = indexOfLastCrime - crimesPerPage;
    const currentCrimes = filteredCrimes.slice(indexOfFirstCrime, indexOfLastCrime);

    // Function to change the page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(filteredCrimes.length / crimesPerPage);

    return (
        <div
            className="h-screen bg-cover bg-no-repeat flex flex-col relative"
            style={{ backgroundImage: `url(${arriere})`, backgroundPosition: '90% 0%' }}
        >
            <img className="absolute z-0 opacity-80" src={blood} alt="Blood Icon" />
            <Header />

            {/* Filter Section */}
            <div className="p-4 bg-white opacity-80 z-10">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium">Search by Place</label>
                        <select
                            value={placeFilter}
                            onChange={handlePlaceChange}
                            className="mt-2 p-2 border rounded w-full"
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
                        <label className="block text-sm font-medium">Search by Date</label>
                        <input
                            type="date"
                            value={dateFilter}
                            onChange={handleDateChange}
                            className="mt-2 p-2 border rounded w-full"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium">Category</label>
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="mt-2 p-2 border rounded w-full"
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
                        <label className="block text-sm font-medium">Solved</label>
                        <select
                            value={solvedFilter}
                            onChange={(e) => setSolvedFilter(e.target.value ? JSON.parse(e.target.value) : null)}
                            className="mt-2 p-2 border rounded w-full"
                        >
                            <option value="">Solved Status</option>
                            <option value="true">Solved</option>
                            <option value="false">Unsolved</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Display results */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {currentCrimes.length > 0 ? (
                    currentCrimes.map((crime) => (
                        <CrimeCard
                            key={crime.id}
                            category={crime.category}
                            name={crime.name}
                            criminalInfo={crime.criminalInfo}
                            crimeAddress={`${crime.crimeAddress.city}, ${crime.crimeAddress.district}`}
                            crimeCity={`${crime.crimeAddress.city}`}
                            crimeDistrict={`${crime.crimeAddress.district}`}
                            longitude={crime.longitude}
                            latitude={crime.latitude}
                            isSolved={crime.isSolved}
                            date={crime.crimeDate}
                            description={crime.description}
                            responsibleForce={crime.responsibleForce.name}
                        />
                    ))
                ) : (
                    <div className='w-full text-center col-span-full h-full flex-col items-center relative py-6'>
                        <p className="text-center col-span-full nosifer text-[#580B0B] py-6  text-3xl  w-full  z-0 mt-10">No crimes selected.</p>
                        <p className="text-center col-span-full nosifer text-white text-3xl w-full z-20 -mt-[70px]">No crimes selected.</p>
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center gap-4 py-4">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-lg font-medium">{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

const CrimeCard = ({
    category,
    name,
    criminalInfo,
    crimeAddress,
    longitude,
    latitude,
    isSolved,
    date,
    description,
    responsibleForce,
    crimeCity,
    crimeDistrict
}) => {
    return (
        <div className="flex items-stretch bg-white rounded-lg shadow-md overflow-hidden">
            {/* Left section */}
            <div className="bg-red-700 text-white p-4 flex flex-col justify-center">
                <div className="mb-2 flex">
                  <div>
                    <i className="fas fa-map-marker-alt"></i> {crimeCity}
                    <i className="fas fa-map-marker-alt"></i> {crimeDistrict}
                    </div>
                    <div>
                    
                    <MdPlace />
                   
                    
                    </div>
                </div>
                <div className="mb-2">
                    <i className="fas fa-calendar"></i> {date}
                    <FaCalendarCheck />
                </div>
                <div className="mb-2">
                    <i className="fas fa-check-circle"></i> Criminal: {criminalInfo.sex}
                    <RiCriminalFill/>
                    
                </div>
                <div className="mb-2">
                    <i className="fas fa-check-circle"></i> Solved: {isSolved ? 'Yes' : 'No'}
                    <TbProgressHelp />
                    
                </div>
                
            </div>

            {/* Right section */}
            <div className="flex-1 p-4">
                <h2 className="text-xl font-bold mb-2 capitalize">{name}</h2>
                <p className="text-gray-700 text-sm">Category: {category}</p>
                <p className="text-gray-700 text-sm">
                    Criminal Info: {criminalInfo.sex}, {criminalInfo.description}
                </p>

                <p className="text-gray-700 text-sm">Description: {description}</p>
                <p className="text-gray-700 text-sm">Responsible Force: {responsibleForce}</p>
                <div className="mb-2">
                    <i className="fas fa-globe"></i> Longitude: {longitude}
                </div>
                <div className="mb-2">
                    <i className="fas fa-globe"></i> Latitude: {latitude}
                </div>
                <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded">
                    See More
                </button>
            </div>
        </div>
    );
};

export default List;
