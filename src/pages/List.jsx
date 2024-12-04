import React, { useState, useEffect } from 'react';
import blood from '../assets/blood.svg';
import arriere from '../assets/arriere.png';
import Header from '../component/Header';

const List = () => {
  const [stops, setStops] = useState([]); // Data for stops
  const [locations, setLocations] = useState([]); // List of available locations
  const [selectedLocation, setSelectedLocation] = useState('1609590'); // Default location ID
  const [selectedDate, setSelectedDate] = useState('2024-01'); // Default date (YYYY-MM)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch stop data
  const fetchStops = async (locationId = '', date = '') => {
    setLoading(true);
    setError(null);
  
    try {
      // Si locationId et date sont vides, on ne les inclut pas dans la query
      const query = `${locationId ? `?location_id=${locationId}` : ''}${date ? `${locationId ? '&' : '?'}date=${date}` : ''}`;
      const response = await fetch(`https://data.police.uk/api/stops-at-location${query}`);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      setStops(data);
  
      // Récupérer toutes les locations uniques
      const uniqueLocations = data.reduce((acc, stop) => {
        const locationId = stop.location?.street?.id;
        const locationName = stop.location?.street?.name;
  
        if (locationId && locationName && !acc.some((loc) => loc.id === locationId)) {
          acc.push({
            id: locationId,
            name: locationName,
          });
        }
  
        return acc;
      }, []);
      
      // Mettre à jour les locations
      setLocations(uniqueLocations);
  
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  // Load data on initial render with default values
  useEffect(() => {
    fetchStops(selectedLocation, selectedDate); // Fetch data with default location and date
  }, []); // Empty dependency array ensures it runs only once on mount

  // Handle search functionality
  const handleSearch = () => {
    const locationId = selectedLocation;
    fetchStops(locationId, selectedDate); // Fetch data based on selected location and date
  };

  // Function to handle location selection
  const handleLocationChange = (e) => {
    const locationId = e.target.value;
    setSelectedLocation(locationId); // Update selected location ID
  };

  return (
    <div
      className=" bg-cover bg-no-repeat flex flex-col relative"
      style={{ backgroundImage: `url(${arriere})`, backgroundPosition: '90% 0%' }}
    >
      <img className="absolute z-0 opacity-80" src={blood} alt="Blood Icon" />
       
      <Header />
      
      {/* Search bar */}
      <div className="p-4 bg-white shadow-md rounded mb-4 z-20">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Location filter */}
          <div className="flex flex-col">
            <label htmlFor="location" className="font-semibold mb-2">
              Location:
            </label>
            <select
              id="location"
              value={selectedLocation}
              onChange={handleLocationChange}
              className="border rounded p-2"
            >
              <option value="">All Locations</option>
              {locations.length > 0 ? (
                locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.id} - {loc.name} {/* Display location ID and street name */}
                  </option>
                ))
              ) : (
                <option value="">No locations available</option> // Display message if no locations
              )}
            </select>
          </div>

          {/* Date filter */}
          <div className="flex flex-col">
            <label htmlFor="date" className="font-semibold mb-2">
              Date:
            </label>
            <input
              type="month"
              id="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border rounded p-2"
            />
          </div>

          {/* Search button */}
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Display results */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {stops.length > 0 ? (
            stops.map((stop, index) => (
              <StopCard
                key={index}
                type={stop.type || 'Unknown type'}
                gender={stop.gender || 'Unknown'}
                ageRange={stop.age_range || 'Unknown age'}
                ethnicity={stop.self_defined_ethnicity || 'Unknown ethnicity'}
                location={stop.location ? stop.location.street.name : 'Unknown location'}
                outcome={stop.outcome || 'No outcome'}
                operationName={stop.operation_name || 'N/A'}
                date={stop.datetime}
              />
            ))
          ) : (
            <p className="text-center col-span-full">No data found for the selected filters.</p>
          )}
        </div>
      )}
    </div>
  );
};

const StopCard = ({ type, gender, ageRange, ethnicity, location, outcome, operationName, date }) => {
  return (
    <div className="flex items-stretch bg-white rounded-lg shadow-md overflow-hidden">
      {/* Left section */}
      <div className="bg-red-700 text-white p-4 flex flex-col justify-center">
        <div className="mb-2">
          <i className="fas fa-map-marker-alt"></i> {location}
        </div>
        <div className="mb-2">
          <i className="fas fa-users"></i> {gender}
        </div>
        <div className="mb-2">
          <i className="fas fa-calendar"></i> {date}
        </div>
        <div className="mb-2">
          <i className="fas fa-user-circle"></i> Age Range: {ageRange}
        </div>
        <div className="mb-2">
          <i className="fas fa-globe"></i> Ethnicity: {ethnicity}
        </div>
      </div>

      {/* Right section */}
      <div className="flex-1 p-4">
        <h2 className="text-xl font-bold mb-2 capitalize">{type}</h2>
        <p className="text-gray-700 text-sm">Outcome: {outcome}</p>
        <p className="text-gray-700 text-sm">Operation: {operationName}</p>
        <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded">
          See More
        </button>
      </div>
    </div>
  );
};

export default List;
