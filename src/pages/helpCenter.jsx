import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../App.css';
import blood from '../assets/blood.svg';
import arriere from '../assets/arriere.png';
import Header from '../component/Header';
import { MdDelete } from "react-icons/md";
import { FaHistory } from "react-icons/fa";

function HelpCenter() {
  const [cityCoordinates, setCityCoordinates] = useState([33.5731, -7.5898]);
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
  const [showPopup, setShowPopup] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showHistoryPopup, setShowHistoryPopup] = useState(false);

  const cities = [
    'Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir', 'Oujda', 'Tétouan', 'Meknès', 'Salé'
  ];

const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newCrime = { ...crimeData, id: Date.now() };

    // Mettre à jour l'historique local
    const updatedHistory = [...crimeHistory, newCrime];
    setCrimeHistory(updatedHistory);
    localStorage.setItem('crimeHistory', JSON.stringify(updatedHistory));

    // Envoi des données à l'API pour les stocker temporairement (sans base de données)
    try {
      await axios.post('http://localhost:3000/api/emergencies', { emergencies: [newCrime] }); // Envoi du nouveau crime uniquement

      // Affichage du message de succès
      setAlertMessage('Your emergency has been reported successfully! We are sending help, don\'t worry.');
      setShowPopup(true);
    } catch (error) {
      // Si l'API retourne une erreur, affichage du message d’erreur
      console.error('Error sending emergencies to API:', error);
      setAlertMessage('There was an error reporting your emergency.');
      setShowPopup(true);
    }

    // Réinitialisation des données du crime après soumission
    const currentDate = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toLocaleTimeString();
    setCrimeData({ title: '', description: '', date: currentDate, time: currentTime, type: '', witness: '', location: null, city: '' });
};

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toLocaleTimeString();
    setCrimeData((prev) => ({ ...prev, date: currentDate, time: currentTime }));
    getCityCoordinates('Casablanca');
  }, []);

  const handleCityChange = (e) => {
    const city = e.target.value;
    setCrimeData({ ...crimeData, city });
    getCityCoordinates(city);
  };

  const handleAddressChange = async (e) => {
    setAddress(e.target.value);
    if (e.target.value.length > 3) {
      try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
          params: {
            q: e.target.value,
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
      <div className="flex justify-between pl-10 mr-10 z-0 flex-wrap mb-2">
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
    className="bg-[#580B0B] text-white hover:bg-[#982222] nosifer py-2 px-4 rounded-lg z-20 max-[550px]:text-xs max-[700px]:ml-auto text-xs max-[490px]:hidden"
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
<div className='flex-grow overflow-auto no-scrollbar pl-10 pr-10 space-y-4 mb-2 items-center '>
<div className="  flex max-[640px]:flex-col max-[640px]:space-y-4 h-[90%] max-[1000px]:h-full items-center   justify-between  w-full space-x-2   mt-4">
  {/* Form */}
  <div className='bg-white/90 px-4 py-4 rounded-lg shadow-lg w-full sm:w-1/2 h-full flex max-[640px]:order-1'>
  <form onSubmit={handleFormSubmit} className="flex w-full flex-col justify-between h-full ">
    <h2 className="text-xl font-bold text-center koulen">What's your Emergency?</h2>
    <input
      type="text"
      placeholder="Crime Title"
      value={crimeData.title}
      onChange={(e) => setCrimeData({ ...crimeData, title: e.target.value })}
      className="w-full px-2 py-1 border rounded koulen"
      required
    />
    <div className='flex gap-4'>
      <input
        type="date"
        value={crimeData.date}
        onChange={(e) => setCrimeData({ ...crimeData, date: e.target.value })}
        className="w-full px-2 py-1 border rounded koulen"
        required
      />
      <input
        type="time"
        value={crimeData.time}
        onChange={(e) => setCrimeData({ ...crimeData, time: e.target.value })}
        className="w-full px-2 py-1 border rounded koulen"
        required
      />
    </div>
    <select
      value={crimeData.type}
      onChange={(e) => setCrimeData({ ...crimeData, type: e.target.value })}
      className="w-full px-2 py-1 border rounded koulen"
      required
    >
      <option value="">Crime Category</option>
      <option value="Vol">Vol</option>
      <option value="Agression">Agression</option>
      <option value="Fraude">Fraude</option>
      <option value="Autre">Autre</option>
    </select>

    <select
      value={crimeData.city}
      onChange={handleCityChange}
      className="w-full px-2 py-1 border rounded koulen"
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
      className="w-full px-2 py-1 border rounded koulen"
    />

    <button type="submit" className="w-full py-2 bg-[#580B0B] text-white hover:bg-[#982222] koulen rounded">
      Call for Emergency
    </button>
  </form></div>

  {/* Map */}
  <div className="w-full sm:w-1/2 h-full bg-white/90 rounded-lg shadow-lg p-2  max-[640px]:hidden">
    <MapContainer center={cityCoordinates} zoom={12} style={{ height: '100%', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={cityCoordinates}>
        <Popup>Your emergency is here!</Popup>
      </Marker>
    </MapContainer>
  </div>
</div>
<div className="w-full h-full bg-white/90 rounded-lg shadow-lg p-2  min-[641px]:hidden">
    <MapContainer center={cityCoordinates} zoom={12} style={{ height: '100%', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={cityCoordinates}>
        <Popup>Your emergency is here!</Popup>
      </Marker>
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
      <span>{crime.title} - {crime.date} {crime.time} - {crime.type}</span>
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
