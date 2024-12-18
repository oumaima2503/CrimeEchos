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

  const cityCoordinates = {
    Casablanca: { lat: 33.5941, lng: -7.5374 },
    Rabat: { lat: 34.020882, lng: -6.84165 },
    Marrakech: { lat: 31.6295, lng: -7.9811 },
    Fes: { lat: 34.0333, lng: -5.0000 },
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
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      }
    };

    fetchData();
  }, []);

  const filteredCrimes = crimes.filter((crime) => {
    const cityFilter = selectedCity ? crime.crimeAddress?.city === selectedCity : true;
    const solvedFilter = selectedSolvedStatus !== '' ? (selectedSolvedStatus === 'solved' ? crime.isSolved : !crime.isSolved) : true;
    const dateFilter = selectedDateRange[0] && selectedDateRange[1] ? (
      new Date(crime.date) >= new Date(selectedDateRange[0]) && new Date(crime.date) <= new Date(selectedDateRange[1])
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
  <div className="flex flex-col -mt-4">
    <h1 className="text-2xl font-bold text-[#580B0B] nosifer max-[700px]:text-lg max-[480px]:text-xs max-[700px]:mt-2 max-[480px]:mt-4"> Map</h1>
    <h1 className="text-2xl font-bold text-white -mt-9 nosifer max-[700px]:text-lg max-[480px]:text-xs max-[480px]:-mt-6"> Map</h1>
  </div>
  <div className="flex flex-col items-end w-full z-10 ml-40">
    {/* Ligne contenant les filtres et le texte Map */}
    <div className="flex items-center justify-between w-full -mt-6 ml-20">
      {/* Filtres */}
      <div className="flex flex-wrap space-x-4 w-full  max-[700px]:space-x-2">
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="border p-2 text-[#982222] koulen bg-white/90 font-bold rounded-md flex-1 max-[700px]:w-1/3 max-[480px]:w-full"
        >
          <option value="">Select City</option>
          {Object.keys(cityCoordinates).map((city) => (
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

  {/* Section de la carte */}
  <div className="relative z-10 w-full h-full flex justify-center items-center -mt-12 z-10 pl-10 pr-10 py-6 ">
    <div className="bg-white/90 rounded-lg shadow-lg w-full xl:w-5/6 h-4/5 flex p-4">
      {/* Carte */}
      <div className="w-3/4 h-full pr-4 ">
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
  {crimes.map((crime) =>
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
  {forces.map((force, index) =>
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
      <div className="w-1/4  bg-white/0 border-l border-gray-300 p-4 flex flex-col justify-center h-full text-center">
  <h2 className="text-xl nosifer font-bold mb-4">Légende</h2>
  <div className="flex items-center mb-2 justify-center">
    <img src={locationsolved} alt="Crime résolu" className="w-6 h-6 mr-2" />
    <span className='text-xl koulen'>Crime résolu</span>
  </div>
  <div className="flex items-center mb-2 justify-center">
    <img src={locationDangerous} alt="Crime non résolu" className="w-6 h-6 mr-2" />
    <span className='text-xl koulen'>Crime non résolu</span>
  </div>
  <div className="flex items-center justify-center mb-8">
    <img src={locationPolice} alt="Force de police" className="w-6 h-6 mr-2" />
    <span className='text-xl koulen '>Force de police</span>
  </div>
</div>

    </div>
  </div>
</div>

  );
};

export default Map;
