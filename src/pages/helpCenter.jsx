import React, { useState } from 'react';
import '../App.css';
import blood from '../assets/blood.svg';
import arriere from '../assets/arriere.png';
import Header from '../component/Header';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // Import de Leaflet
import { Icon } from 'leaflet'; // Pour les icônes personnalisées
import axios from 'axios';
import 'leaflet/dist/leaflet.css'; // Assurez-vous d'importer les styles de Leaflet

function HelpCenter() {
  const [crimeDetails, setCrimeDetails] = useState({
    category: '',
    name: '',
    criminalInfo: {
      sex: '',
      description: '',
    },
    crimeAddress: {
      city: '',
      district: '',
    },
    longitude: '',
    latitude: '',
    isSolved: false,
    crimeDate: '',
    criminalAddress: '',
    description: '',
    responsibleForce: {
      name: '',
      address: '',
      coordinates: {
        latitude: '',
        longitude: '',
      },
    },
  });
  const [sosSent, setSosSent] = useState(false);
  const [calls, setCalls] = useState([]); // Liste des appels faits

  // Handle form submit
  const handleCrimeSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/crimes', crimeDetails);
      setCalls([...calls, response.data]); // Ajoute la nouvelle déclaration à la liste des appels
      setCrimeDetails({
        category: '',
        name: '',
        criminalInfo: { sex: '', description: '' },
        crimeAddress: { city: '', district: '' },
        longitude: '',
        latitude: '',
        isSolved: false,
        crimeDate: '',
        criminalAddress: '',
        description: '',
        responsibleForce: { name: '', address: '', coordinates: { latitude: '', longitude: '' } },
      });
    } catch (error) {
      console.error('Error reporting crime:', error);
    }
  };

  // Handle SOS button
  const handleSosClick = async () => {
    try {
      // API call to send SOS
      await axios.post('/api/sos');
      setSosSent(true);
    } catch (error) {
      console.error('Error sending SOS:', error);
    }
  };

  // Icône personnalisée pour les marqueurs sur la carte
  const customIcon = new Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <div className="h-screen bg-cover bg-no-repeat flex flex-col relative" style={{ backgroundImage: `url(${arriere})`, backgroundPosition: '90% 0%' }}>
      <img className="absolute -z-10 opacity-80" src={blood} alt="Blood Icon" />
      <Header />
      <div className="flex flex-col items-center justify-center z-0 space-y-6 py-8 px-4">
        <h1 className="text-2xl font-bold text-[#580B0B] nosifer text-center max-[700px]:text-lg max-[480px]:text-xs max-[700px]:mt-2 max-[480px]:mt-4">Help Center</h1>

        {/* Crime Declaration Form */}
        <form onSubmit={handleCrimeSubmit} className="bg-white p-4 rounded-lg shadow-md max-w-md w-full">
          {/* Category */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Crime Category</label>
            <input
              type="text"
              id="category"
              value={crimeDetails.category}
              onChange={(e) => setCrimeDetails({ ...crimeDetails, category: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="e.g. Drug trafficking"
            />
          </div>
          {/* Crime Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Crime Name</label>
            <input
              type="text"
              id="name"
              value={crimeDetails.name}
              onChange={(e) => setCrimeDetails({ ...crimeDetails, name: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="Crime Name"
            />
          </div>
          {/* Criminal Info */}
          <div className="mb-4">
            <label htmlFor="sex" className="block text-sm font-medium text-gray-700">Criminal Sex</label>
            <input
              type="text"
              id="sex"
              value={crimeDetails.criminalInfo.sex}
              onChange={(e) => setCrimeDetails({ ...crimeDetails, criminalInfo: { ...crimeDetails.criminalInfo, sex: e.target.value } })}
              className="w-full p-2 border rounded"
              placeholder="Sex"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="criminalDescription" className="block text-sm font-medium text-gray-700">Criminal Description</label>
            <textarea
              id="criminalDescription"
              value={crimeDetails.criminalInfo.description}
              onChange={(e) => setCrimeDetails({ ...crimeDetails, criminalInfo: { ...crimeDetails.criminalInfo, description: e.target.value } })}
              className="w-full p-2 border rounded"
              placeholder="Criminal description"
            />
          </div>
          {/* Crime Address */}
          <div className="mb-4">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              id="city"
              value={crimeDetails.crimeAddress.city}
              onChange={(e) => setCrimeDetails({ ...crimeDetails, crimeAddress: { ...crimeDetails.crimeAddress, city: e.target.value } })}
              className="w-full p-2 border rounded"
              placeholder="City"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="district" className="block text-sm font-medium text-gray-700">District</label>
            <input
              type="text"
              id="district"
              value={crimeDetails.crimeAddress.district}
              onChange={(e) => setCrimeDetails({ ...crimeDetails, crimeAddress: { ...crimeDetails.crimeAddress, district: e.target.value } })}
              className="w-full p-2 border rounded"
              placeholder="District"
            />
          </div>
          {/* Coordinates */}
          <div className="mb-4">
            <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">Longitude</label>
            <input
              type="text"
              id="longitude"
              value={crimeDetails.longitude}
              onChange={(e) => setCrimeDetails({ ...crimeDetails, longitude: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="Longitude"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">Latitude</label>
            <input
              type="text"
              id="latitude"
              value={crimeDetails.latitude}
              onChange={(e) => setCrimeDetails({ ...crimeDetails, latitude: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="Latitude"
            />
          </div>
          {/* Crime Date */}
          <div className="mb-4">
            <label htmlFor="crimeDate" className="block text-sm font-medium text-gray-700">Crime Date</label>
            <input
              type="date"
              id="crimeDate"
              value={crimeDetails.crimeDate}
              onChange={(e) => setCrimeDetails({ ...crimeDetails, crimeDate: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          {/* Criminal Address */}
          <div className="mb-4">
            <label htmlFor="criminalAddress" className="block text-sm font-medium text-gray-700">Criminal Address</label>
            <textarea
              id="criminalAddress"
              value={crimeDetails.criminalAddress}
              onChange={(e) => setCrimeDetails({ ...crimeDetails, criminalAddress: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="Criminal's address"
            />
          </div>
          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Crime Description</label>
            <textarea
              id="description"
              value={crimeDetails.description}
              onChange={(e) => setCrimeDetails({ ...crimeDetails, description: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="Crime description"
            />
          </div>
          {/* Responsible Force */}
          <div className="mb-4">
            <label htmlFor="responsibleForceName" className="block text-sm font-medium text-gray-700">Responsible Force Name</label>
            <input
              type="text"
              id="responsibleForceName"
              value={crimeDetails.responsibleForce.name}
              onChange={(e) => setCrimeDetails({ ...crimeDetails, responsibleForce: { ...crimeDetails.responsibleForce, name: e.target.value } })}
              className="w-full p-2 border rounded"
              placeholder="Responsible Force"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="responsibleForceAddress" className="block text-sm font-medium text-gray-700">Responsible Force Address</label>
            <input
              type="text"
              id="responsibleForceAddress"
              value={crimeDetails.responsibleForce.address}
              onChange={(e) => setCrimeDetails({ ...crimeDetails, responsibleForce: { ...crimeDetails.responsibleForce, address: e.target.value } })}
              className="w-full p-2 border rounded"
              placeholder="Force Address"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="responsibleForceCoordinates" className="block text-sm font-medium text-gray-700">Responsible Force Coordinates</label>
            <input
              type="text"
              id="responsibleForceCoordinates"
              value={crimeDetails.responsibleForce.coordinates.latitude + ', ' + crimeDetails.responsibleForce.coordinates.longitude}
              onChange={(e) => setCrimeDetails({ ...crimeDetails, responsibleForce: { ...crimeDetails.responsibleForce, coordinates: { latitude: e.target.value.split(',')[0], longitude: e.target.value.split(',')[1] } } })}
              className="w-full p-2 border rounded"
              placeholder="Coordinates"
            />
          </div>
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Submit Crime Report</button>
        </form>

        {/* SOS Button */}
        <button
          onClick={handleSosClick}
          className="mt-4 p-3 bg-red-500 text-white rounded-full max-[700px]:mt-2"
        >
          {sosSent ? 'SOS Sent!' : 'Send SOS'}
        </button>

        {/* Map Display */}
        <div className="mt-8 w-full h-[400px]">
          <MapContainer center={[crimeDetails.latitude || 35.7602, crimeDetails.longitude || -5.7364]} zoom={13} style={{ width: '100%', height: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[crimeDetails.latitude || 35.7602, crimeDetails.longitude || -5.7364]} icon={customIcon}>
              <Popup>
                Crime Location: {crimeDetails.crimeAddress.city}, {crimeDetails.crimeAddress.district}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default HelpCenter;
