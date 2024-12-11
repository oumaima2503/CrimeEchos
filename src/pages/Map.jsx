import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import fetchCrimes from '../api/fetchData';
import blood from '../assets/blood.svg';
import arriere from '../assets/arriere.png';
import Header from '../component/Header';
import locationDangerous from '../assets/locationdangerous.png';
import L from 'leaflet';

const redIcon = new L.Icon({
  iconUrl: locationDangerous, 
  iconSize: [41, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Map = () => {
  const [crimes, setCrimes] = useState([]);
  const [popupPosition, setPopupPosition] = useState(null);

  useEffect(() => {
    const getCrimes = async () => {
      const data = await fetchCrimes(51.505, -0.09); // Coordonnées de départ
      const limitedCrimes = data.slice(0, 50); // Limite les résultats à 20 crimes
      setCrimes(limitedCrimes);
    };

    getCrimes();
  }, []);

  const handleMapClick = (e) => {
    const clickedLatLng = e.latlng;

    setPopupPosition(clickedLatLng);
  };

  const bounds = [
    [49.5, -8], // Sud-ouest du Royaume-Uni
    [60, 2],    // Nord-est du Royaume-Uni
  ];

  return (
    <div
      className="h-screen bg-cover bg-no-repeat flex flex-col relative"
      style={{ backgroundImage: `url(${arriere})`, backgroundPosition: '90% 0%' }}
    >
      <img className="absolute z-0 opacity-80" src={blood} alt="Blood Icon" />
      <Header />
      <div className="relative z-10 w-full h-full flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-lg w-11/12 lg:w-3/4 xl:w-1/2 h-3/4 justify-center items-center">
          <MapContainer
            center={[51.505, -0.09]}
            zoom={14}
            style={{ height: '100%', width: '100%' }}
            bounds={bounds}
            maxBounds={bounds}
            onClick={handleMapClick} // Handle map click
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {crimes.map((crime, index) => (
              <Marker
                key={index}
                position={[parseFloat(crime.location.latitude), parseFloat(crime.location.longitude)]}
                icon={redIcon}
              >
                <Popup>
                  <strong>Category :</strong> {crime.category}
                  <br />
                  <strong>Location :</strong> {crime.location.street.name}
                </Popup>
              </Marker>
            ))}
            {/* Conditionally render a popup if map is clicked */}
            {popupPosition && (
              <Popup position={popupPosition}>
                <strong>Custom Popup:</strong> Location clicked at {popupPosition.lat}, {popupPosition.lng}
              </Popup>
            )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Map;
