import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import blood from '../assets/blood.svg';
import arriere from '../assets/arriere.png';
import Header from '../component/Header';
import locationDangerous from '../assets/locationdangerous.png';
import locationsolved from '../assets/locationsolved.png';
import locationPolice from '../assets/locationpolice.png'; // Icône pour les forces
import L from 'leaflet';
import axios from 'axios';
import { FiFilter } from 'react-icons/fi'; // Add missing FiFilter import
import { FiChevronUp, FiChevronDown} from 'react-icons/fi';

// Icônes personnalisées
const redIcon = new L.Icon({
  iconUrl: locationDangerous,
  iconSize: [41, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const greenIcon = new L.Icon({
  iconUrl: locationPolice,
  iconSize: [41, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const blueIcon = new L.Icon({
  iconUrl: locationsolved,
  iconSize: [41, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Map = () => {
  const [crimes, setCrimes] = useState([]);
  const [forces, setForces] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSolvedStatus, setSelectedSolvedStatus] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState([null, null]);
  const [dropdownVisible, setDropdownVisible] = useState(false); // Define state for dropdown visibility
  const [cities, setCities] = useState([]); // Ajouter un état pour les villes

  const cityCoordinates = {
    Casablanca: { lat: 33.5941, lng: -7.5374 },
    Rabat: { lat: 34.020882, lng: -6.84165 },
    Marrakech: { lat: 31.6295, lng: -7.9811 },
    Fès: { lat: 34.0333, lng: -5.0000 },
    Tanger: { lat: 35.7595, lng: -5.8340 },
    Oujda: { lat: 34.6816, lng: -1.9103 },
    Kenitra: { lat: 34.2617, lng: -6.5771 },
    Agadir: { lat: 30.4200, lng: -9.5985 },
    Meknès: { lat: 33.8938, lng: -5.5513 },
    Tetouan: { lat: 35.5743, lng: -5.3699 }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [crimesResponse, forcesResponse] = await Promise.all([ 
          axios.get('http://localhost:3000/api/crimes'),
          axios.get('http://localhost:3000/api/force')
        ]);
    
        setCrimes(crimesResponse.data || []);
        setForces(forcesResponse.data || []);
    
        // Extraire les villes uniques des crimes reçus
        const citiesFromCrimes = [...new Set(crimesResponse.data.map(crime => crime.crimeAddress?.city))];
        setCities(citiesFromCrimes);
    
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      }
    };
  
    fetchData();
  }, []);
  const [showForces, setShowForces] = useState(true); // Contrôle de l'affichage des forces

  const filteredCrimes = crimes.filter((crime) => {
    // Filtrer par ville
    const cityFilter = selectedCity ? crime.crimeAddress?.city === selectedCity : true;
  
    // Filtrer par statut (résolu ou non résolu)
    const solvedFilter = selectedSolvedStatus !== '' ? (
      selectedSolvedStatus === 'solved' ? crime.isSolved === true : crime.isSolved === false
    ) : true;
  
    // Filtrer par plage de dates
    const dateFilter = selectedDateRange[0] && selectedDateRange[1] ? (
      new Date(crime.crimeDate) >= new Date(selectedDateRange[0]) && new Date(crime.crimeDate) <= new Date(selectedDateRange[1])
    ) : true;
  
    return cityFilter && solvedFilter && dateFilter;
  });
  

  const bounds = [
    [21.0, -17.0],
    [36.0, -1.0],
  ];

  function CityZoom() {
    const map = useMap();
    useEffect(() => {
      if (selectedCity) {
        map.flyTo(cityCoordinates[selectedCity], 12);
      }
    }, [selectedCity, map]);

    return null;
  }

  return (
    <div className="h-screen bg-cover bg-no-repeat flex flex-col relative" style={{ backgroundImage: `url(${arriere})`, backgroundPosition: '90% 0%' }}>
      <Header />
      <div className="flex justify-between z-10 pl-10 pr-10 py-6">

        <div className="flex flex-col items-end w-full z-10 ml-2">
  <div className="items-center justify-between w-full -mt-6 ml-20 md:block hidden lg:block">
    <div className="flex flex-nowrap space-x-4 w-full max-[700px]:space-x-2">
    <select
  value={selectedCity}
  onChange={(e) => setSelectedCity(e.target.value)}
  className="border p-2 text-[#982222] koulen bg-white/90 font-bold rounded-md flex-1 max-[700px]:w-1/3 max-[480px]:w-full"
>
  <option value="">Select City</option>
  {cities.map((city) => (
    <option key={city} value={city}>
      {city}
    </option>
  ))}
</select>

      <select
        value={selectedSolvedStatus}
        onChange={(e) => setSelectedSolvedStatus(e.target.value)}
        className="border p-2 text-[#982222] koulen bg-white/90 font-bold rounded-md flex-1 max-[700px]:w-1/3 max-[480px]:w-full"
      >
        <option value="">Crime Status</option>
        <option value="unsolved">Unsolved</option>
        <option value="solved">Solved</option>
      </select>
      <input
        type="date"
        value={selectedDateRange[0] || ''}
        onChange={(e) => setSelectedDateRange([e.target.value, selectedDateRange[1]])}
        className="border p-2 text-[#982222] koulen bg-white/90 font-bold rounded-md flex-1 max-[700px]:w-1/3 max-[480px]:w-full"
      />
      <span className="text-white font-bold self-center max-[480px]:w-full max-[480px]:text-center">TO</span>
      <input
        type="date"
        value={selectedDateRange[1] || ''}
        onChange={(e) => setSelectedDateRange([selectedDateRange[0], e.target.value])}
        className="border p-2 text-[#982222] koulen bg-white/90 font-bold rounded-md flex-1 max-[700px]:w-1/3 max-[480px]:w-full"
      />
    </div>
  </div>
</div>


      </div>
      <div className="z-50 relative">
  {/* Button for small screen filter */}
  <div className="md:hidden flex justify-end p-4 -mt-20 pr-10  ">
    <button
      className="bg-[#982222] text-white py-2 px-4 rounded-md shadow-md 
      koulen flex items-center text-sm max-[450px]:text-[10px]"
      onClick={() => setDropdownVisible(!dropdownVisible)}
    >
      <FiFilter />
      <span className="ml-2">Filter</span>
    </button>
  </div>

 {/* Dropdown Menu */}
{dropdownVisible && (
  <div className="absolute left-10 right-0 bg-[#982222]  shadow-md rounded-md z-20 p-4 w-4/5  ">
    <div className="flex flex-col gap-3 text-[#982222] font-bold min-h-[100px] bg-[#982222] ">
      {/* City Filter */}
      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        className="border p-2 text-[#982222] bg-white rounded-md text-xs"
      >
        <option value="">Select City</option>
        {Object.keys(cityCoordinates).map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {/* Crime Status Filter */}
      <select
        value={selectedSolvedStatus}
        onChange={(e) => setSelectedSolvedStatus(e.target.value)}
        className="border p-2 text-[#982222] bg-white rounded-md text-xs"
      >
        <option value="">Crime Status</option>
        <option value="unsolved">Unsolved</option>
        <option value="solved">Solved</option>
      </select>

      {/* Date Range Filters */}
      <div className="flex gap-2">
        <input
          type="date"
          value={selectedDateRange[0] || ''}
          onChange={(e) => setSelectedDateRange([e.target.value, selectedDateRange[1]])}
          className="border p-2 text-[#982222] bg-white rounded-md text-xs w-1/2"
        />
        <input
          type="date"
          value={selectedDateRange[1] || ''}
          onChange={(e) => setSelectedDateRange([selectedDateRange[0], e.target.value])}
          className="border p-2 text-[#982222] bg-white rounded-md text-xs w-1/2"
        />
      </div>
    </div>
  </div>
)}

</div>

<div className=" h-full  max-[600px]:-mt-4  mb-4  z-10 pl-10 pr-10 flex-grow overflow-auto no-scrollbar  ">
  
    <div className="bg-white/90 rounded-lg shadow-lg w-full 
    h-full flex p-4 max-[600px]:flex-col items-center justify-between">
      {/* Carte */}
      <div className="w-full h-full max-[600px]:order-1 ">
      <MapContainer
  center={[33.5941, -7.5374]}
  zoom={12}
  style={{ height: '100%', width: '100%' }}
  bounds={bounds}
  maxBounds={bounds}
>
  <CityZoom />
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  />
  {filteredCrimes.map((crime) =>
    crime.latitude && crime.longitude ? (
      <Marker
        key={crime.id}
        position={[parseFloat(crime.latitude), parseFloat(crime.longitude)]}
        icon={crime.isSolved ? blueIcon : redIcon} // Affiche l'icône en fonction du statut
      >
        <Popup>
          <strong>Crime:</strong> {crime.category || 'Unknown'}
          <br />
          <strong>Status:</strong> {crime.isSolved ? 'Solved' : 'Unsolved'}
          <br />
          <strong>Location:</strong> {crime.crimeAddress?.district || 'Unknown District'}
          <br />
          <strong>Description:</strong> {crime.description || 'No description'}
        </Popup>
      </Marker>
    ) : null
  )}
{showForces && forces.map((force, index) =>
  force.coordinates?.latitude && force.coordinates?.longitude ? (
    <Marker
      key={index}
      position={[parseFloat(force.coordinates.latitude), parseFloat(force.coordinates.longitude)]}
      icon={greenIcon}
    >
      <Popup>
        <strong>Police Force:</strong> {force.name || 'Unknown'}
        <br />
        <strong>Address:</strong> {force.address || 'No address'}
      </Popup>
    </Marker>
  ) : null
)}

</MapContainer>


      </div>
{/* Légende */}
<div className="  lg:w-1/4 bg-white/0 border-l border-gray-300 p-4 
 flex-col justify-center h-full text-center mt-4 lg:mt-0 max-[600px]:hidden">
  <h2 className="text-sm lg:text-2xl nosifer font-bold mb-4 max-[650px]:text-xs">Description</h2>
  <div className="flex justify-center p-4 -mt-4">
  <button
    className="bg-[#982222] text-white py-2 px-4 rounded-md shadow-md koulen flex items-center text-sm max-[450px]:text-[10px]"
    onClick={() => setShowForces(!showForces)} // Toggle l'état showForces
  >
    <FiFilter />
    {/* Afficher une flèche différente en fonction de l'état */}
    {showForces ? (
      <span className="ml-2">Hide forces</span> // Si les forces sont affichées
    ) : (
      <span className="ml-2">View forces</span> // Si les forces sont cachées
    )}
    <span className="ml-2">
      {showForces ? <FiChevronUp /> : <FiChevronDown />} {/* Icône dynamique */}
    </span>
  </button>
</div>

  <div className="flex items-center mb-2 justify-center text-xs  lg:text-xl">
    <img src={locationsolved} alt="Crime résolu" className="w-6 h-6 mr-2" />
    <span className="koulen truncate">Solved Crime</span>
  </div>
  <div className="flex items-center mb-2 justify-center text-xs lg:text-xl">
    <img src={locationDangerous} alt="Crime non résolu" className="w-6 h-6 mr-2" />
    <span className="koulen truncate">Unsolved Crime</span>
  </div>
  <div className="flex items-center justify-center mb-8 text-xs lg:text-xl">
    <img src={locationPolice} alt="Force de police" className="w-6 h-6 mr-2" />
    <span className="koulen truncate">Police Force</span>
  </div>
</div>



    </div>
    
    <div className=" w-full bg-white/90 border-l border-gray-300 py-2 mb-4 rounded-md
 flex-col justify-center text-center mt-4 lg:mt-0 min-[601px]:hidden">
  
  <h2 className="text-sm lg:text-2xl nosifer font-bold mb-4 max-[650px]:text-xs">Description</h2>


  <div className="md:hidden flex justify-center p-4 -mt-6">
  <button
    className="bg-[#982222] text-white py-2 px-4 rounded-md shadow-md koulen flex items-center text-sm max-[450px]:text-[10px]"
    onClick={() => setShowForces(!showForces)} // Toggle l'état showForces
  >
    <FiFilter />
    {/* Afficher une flèche différente en fonction de l'état */}
    {showForces ? (
      <span className="ml-2">Hide forces</span> // Si les forces sont affichées
    ) : (
      <span className="ml-2">View forces</span> // Si les forces sont cachées
    )}
    <span className="ml-2">
      {showForces ? <FiChevronUp /> : <FiChevronDown />} {/* Icône dynamique */}
    </span>
  </button>
</div>


  <div className="flex items-center mb-2 justify-center text-xs  lg:text-xl">
    <img src={locationsolved} alt="Crime résolu" className="w-6 h-6 mr-2" />
    <span className="koulen truncate">Solved Crime</span>
  </div>
  <div className="flex items-center mb-2 justify-center text-xs lg:text-xl">
    <img src={locationDangerous} alt="Crime non résolu" className="w-6 h-6 mr-2" />
    <span className="koulen truncate">Unsolved Crime</span>
  </div>
  <div className="flex items-center justify-center  text-xs lg:text-xl">
    <img src={locationPolice} alt="Force de police" className="w-6 h-6 mr-2" />
    <span className="koulen truncate">Police Force</span>
  </div>
</div>
  </div>
    </div>
  );
};

export default Map;
