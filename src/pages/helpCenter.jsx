import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../App.css';
import blood from '../assets/blood.svg';
import arriere from '../assets/arriere.png';
import Header from '../component/Header';
import { MdDelete } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import locationDangerous from '../assets/locationdangerous.png';

function HelpCenter() {
  const [cityCoordinates, setCityCoordinates] = useState([33.5731, -7.5898]); // Casablanca par défaut
  const [address, setAddress] = useState('');
  const [crimeData, setCrimeData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    type: '',
    witness: '',
    location: null,
    city: 'Casablanca',
  });
  const [crimeHistory, setCrimeHistory] = useState(JSON.parse(localStorage.getItem('crimeHistory')) || []);
  const [emergencies, setEmergencies] = useState([]); // Urgences provenant de l'API
  const [showPopup, setShowPopup] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showHistoryPopup, setShowHistoryPopup] = useState(false);
const redIcon = new L.Icon({
  iconUrl: locationDangerous,
  iconSize: [41, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
  const cities = [
    'Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir', 'Oujda', 'Tétouan', 'Meknès', 'Salé'
  ];

  useEffect(() => {
    const fetchEmergencies = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/emergencies');
        console.log(response.data);  // Ajoutez ceci pour vérifier les données
        setEmergencies(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des urgences depuis l\'API :', error);
      }
    };
    fetchEmergencies();
  }, []);
  useEffect(() => {
    if (mapRef.current && cityCoordinates) {
      mapRef.current.flyTo(cityCoordinates, 12); // Déplace la carte vers les nouvelles coordonnées
    }
  }, [cityCoordinates]);
  
  

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    const newCrime = { 
      ...crimeData, 
      id: Date.now(),
      location: cityCoordinates // L'emplacement est directement pris à partir de cityCoordinates
    };
  
    const updatedHistory = [...crimeHistory, newCrime];
    setCrimeHistory(updatedHistory);
    localStorage.setItem('crimeHistory', JSON.stringify(updatedHistory));
  
    try {
      await axios.post('http://localhost:3000/api/emergencies', { emergencies: [newCrime] });
      setAlertMessage('Your emergency has been reported successfully! We are sending help, don\'t worry.');
      setShowPopup(true);
    } catch (error) {
      console.error('Error sending emergencies to API:', error);
      setAlertMessage('There was an error reporting your emergency.');
      setShowPopup(true);
    }
  
    // Resetting crimeData after submission
    const currentDate = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toLocaleTimeString();
    setCrimeData({ title: '', description: '', date: currentDate, time: currentTime, type: '', witness: '', location: null, city: '' });
    setEmergencies(prevEmergencies => [...prevEmergencies, newCrime]); // Ajoute la nouvelle urgence

    // Déplace la carte vers la nouvelle localisation après la soumission
    if (mapRef.current) {
      mapRef.current.setView(cityCoordinates, 12); // Ajuste le niveau de zoom selon tes besoins
    }
  };
  
  const mapRef = useRef();

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toLocaleTimeString();
    setCrimeData((prev) => ({ ...prev, date: currentDate, time: currentTime }));
    getCityCoordinates('Casablanca');
  }, []);

  const handleCityChange = (e) => {
    const city = e.target.value;
    setCrimeData({ ...crimeData, city });
    const newAddress = city + ' Maroc'; // Add the selected city and "Maroc" to the address
    setAddress(newAddress); // Update the address field
    getCityCoordinates(city);
  };
  
  const handleAddressChange = async (e) => {
    const newAddress = e.target.value;
    setAddress(newAddress);
  
    // Allow the user to manually add more to the address
    if (newAddress.length > 3) {
      try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
          params: {
            q: newAddress,
            format: 'json',
            addressdetails: 1,
            limit: 1
          }
        });
        const { lat, lon } = response.data[0] || {};
        if (lat && lon) {
          setCityCoordinates([parseFloat(lat), parseFloat(lon)]);
        }
      } catch (error) {
        console.error('Error fetching address coordinates:', error);
      }
    }
  };
  

  const getCityCoordinates = async (city) => {
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: city,
          format: 'json',
          limit: 1,
        }
      });
      const { lat, lon } = response.data[0] || {};
      if (lat && lon) {
        setCityCoordinates([parseFloat(lat), parseFloat(lon)]);
      }
    } catch (error) {
      console.error('Error retrieving city coordinates:', error);
    }
  };

  const handleHistoryButtonClick = () => {
    setShowHistoryPopup(true);
  };

  const deleteCrime = (id) => {
    const updatedHistory = crimeHistory.filter(crime => crime.id !== id);
    setCrimeHistory(updatedHistory);
    localStorage.setItem('crimeHistory', JSON.stringify(updatedHistory));
  };

  return (
    <div
      className="h-screen bg-cover bg-no-repeat flex flex-col relative"
      style={{ backgroundImage: `url(${arriere})`, backgroundPosition: '90% 0%' }}
    >
      <img className="absolute -z-10 opacity-80" src={blood} alt="Blood Icon" />
      <Header />
      <div className="flex justify-between pl-10 mr-10 z-0 flex-wrap mb-2 ">
  <div>
    <h1 className="text-2xl  font-bold text-[#580B0B] nosifer max-[700px]:text-lg max-[480px]:text-sm max-[700px]:mt-2  max-[480px]:-mt-2 ">
      Help Center
    </h1>
    <h1 className="text-2xl font-bold text-white -mt-9 nosifer max-[700px]:text-lg max-[480px]:text-sm max-[480px]:-mt-4">
      Help Center
    </h1>
  </div>

  {/* Emergency history button */}
  <button 
    onClick={handleHistoryButtonClick} 
    className="bg-[#580B0B] text-white hover:bg-[#982222]
     nosifer py-2 px-4 rounded-lg z-20 max-[550px]:text-xs max-[700px]:ml-auto text-sm max-[490px]:hidden"
  >
    Emergency's history
  </button>
 {/* Emergency history button small */}
  <button 
    onClick={handleHistoryButtonClick} 
    className="bg-[#580B0B] text-white hover:bg-[#982222] hidden nosifer py-2 px-4 rounded-lg z-20 max-[550px]:hidden max-[700px]:hidden max-[490px]:block -mt-2"
  >
    <FaHistory />
  </button>
</div> 
<div className='flex-grow overflow-auto no-scrollbar pl-10 pr-10 space-y-4 mb-2 items-center mt-4 max-[1000px]:text-sm '>
<div className="  flex max-[640px]:flex-col max-[640px]:space-y-4 h-[90%] 
max-[1000px]:h-full  items-center   justify-between  w-full space-x-2   ">
  {/* Form */}
  <div className='bg-white/90   px-4 py-2 rounded-lg shadow-lg w-full sm:w-1/2 h-full flex max-[640px]:order-1 '>
  <form onSubmit={handleFormSubmit} className="flex w-full flex-col justify-between h-full  ">
    <h2 className="text-xl py-2 font-bold text-center koulen max-[750px]:text-sm ">What's your Emergency?</h2>
    <input
      type="text"
      placeholder="Crime Title"
      value={crimeData.title}
      onChange={(e) => setCrimeData({ ...crimeData, title: e.target.value })}
      className="w-full px-2 py-2  border rounded koulen emergenc max-[1000px]:py-1"
      required
    />
    <div className='flex gap-4'>
      <input
        type="date"
        value={crimeData.date}
        onChange={(e) => setCrimeData({ ...crimeData, date: e.target.value })}
        className="w-full px-2 py-1 border rounded koulen  emergenc"
        required
      />
      <input
        type="time"
        value={crimeData.time}
        onChange={(e) => setCrimeData({ ...crimeData, time: e.target.value })}
        className="w-full px-2 py-1 border rounded koulen  emergenc"
        required
      />
    </div>
    <select
      value={crimeData.type}
      onChange={(e) => setCrimeData({ ...crimeData, type: e.target.value })}
      className="w-full px-2 py-1 border rounded koulen emergenc"
      required
    >
      <option value="">Crime Category</option>
      <option value="Vol">Vandalism</option>
      <option value="Agression">Drug trafficking</option>
      <option value="Fraude">Arson</option>
      <option value="Autre">Kidnapping</option>
      <option value="Autre">Human trafficking
      </option>
      <option value="Autre">Fraud
      </option>
      <option value="Autre">Murder
      </option> 
       <option value="Autre">Theft
      </option>
      <option value="Autre">Other
      </option>
    </select>

    <select
      value={crimeData.city}
      onChange={handleCityChange}
      className="w-full px-2 py-1 border rounded koulen emergenc"
      required
    >
      <option value="">Select City</option>
      {cities.map((city, index) => (
        <option key={index} value={city}>
          {city}
        </option>
      ))}
    </select>

    <input
      type="text"
      placeholder="Or type your address"
      value={address}
      onChange={handleAddressChange}
      className="w-full px-2 py-2 border rounded koulen emergenc max-[1000px]:py-1"
    />

    <button type="submit" className="w-full py-2  bg-[#580B0B] text-white hover:bg-[#982222] koulen
     rounded max-[600px]:h-8 max-[600px]:text-xs max-[600px]:w-28 mt-[2px]  max-[600px]:mx-auto ">
      Call for Emergency
    </button>
  </form></div>

  {/* Map */}
  <div className="w-full sm:w-1/2 h-full bg-white/90 rounded-lg shadow-lg p-2 max-[640px]:hidden">
  <MapContainer
  ref={mapRef}
  center={cityCoordinates}
  zoom={12}
  style={{ height: "100%", width: "100%" }}
>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  {emergencies.length > 0 ? (
    emergencies.map((emergency) => (
      <Marker key={emergency.id} position={emergency.location} icon={redIcon}>
        <Popup>
          <strong>{emergency.title}</strong>
          <br />
          {emergency.date} {emergency.time}
          <br />
          {emergency.type}
          <br />
          {emergency.city}
        </Popup>
      </Marker>
    ))
  ) : (
    <div>Loading emergencies...</div>
  )}
</MapContainer>
    </div>
</div>

<div className="w-full  h-full bg-white/90 rounded-lg shadow-lg p-2 min-[641px]:hidden">
  <MapContainer
  ref={mapRef}
  center={cityCoordinates}
  zoom={12}
  style={{ height: "100%", width: "100%" }}
>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  {emergencies.length > 0 ? (
    emergencies.map((emergency) => (
      <Marker key={emergency.id} position={emergency.location} icon={redIcon}>
        <Popup>
          <strong>{emergency.title}</strong>
          <br />
          {emergency.date} {emergency.time}
          <br />
          {emergency.type}
          <br />
          {emergency.city}
        </Popup>
      </Marker>
    ))
  ) : (
    <div>Loading emergencies...</div>
  )}
</MapContainer>
    </div>

  </div>


      {/* Reassurance Popup */}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-[#580B0B] text-black p-6 rounded-lg shadow-lg w-11/12 lg:w-1/2 text-center koulen">
            <p className='text-white text-2xl'>{alertMessage}</p>
            <button onClick={() => setShowPopup(false)} className="mt-2 bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-700">
              Ok
            </button>
          </div>
        </div>
      )}

      {/* History Popup */}
      {showHistoryPopup && (
        <div  className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div style={{
                        backgroundImage: `url(${arriere})`,
                        backgroundPosition: '90% 30%',
                        backgroundBlendMode: 'overlay',
                        opacity: 5.9,
                      }} className=" text-black p-6 rounded-lg shadow-lg w-11/12 lg:w-1/2 text-center koulen">
                                    <div className="text-white text-2xl flex items-end justify-end -mt-2 mb-4 cursor-pointer hover:text-[#982222] " onClick={() => setShowHistoryPopup(false)} >
              X{/* Close Icon */}
            </div>
            <h2 className="text-xl text-white -mt-8 nosifer neon mb-2">Emergency History</h2>
            {crimeHistory.length > 0 ? (
              <ul className="flex-col justify-center">
  {crimeHistory.map((crime, index) => (
    <li key={index} className="text-white text-xl flex items-center justify-center">
      <span>{crime.title} - {crime.date} {crime.time} - {crime.type}- {crime.city}</span>
      <MdDelete 
        onClick={() => deleteCrime(crime.id)} 
        className="ml-4 text-red-500 hover:text-red-700 cursor-pointer"
      />
    </li>
  ))}
</ul>

            ) : (
              <p className="text-white">No emergencies recorded.</p>
            )}
            <button onClick={() => setShowHistoryPopup(false)} className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-700">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HelpCenter;
