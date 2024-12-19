import React, { useState ,useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import '../App.css';

import Header from '../component/Header';
import blood from '../assets/blood.svg';
import arriere from '../assets/arriere.png';
import { MdPlace } from "react-icons/md";

const ProfileEdit = () => {


    const navigate = useNavigate();
    const location = useLocation();
    const lastPath = location.state?.from || '/'; // Récupérer le dernier chemin ou '/' par défaut

    const [tempName, setTempName] = useState(() => localStorage.getItem('profileName') || "Oumaima Ikram");
    const [tempImage, setTempImage] = useState(() => localStorage.getItem('profileImage') || '');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setTempImage(reader.result); // Aperçu temporaire
            };
            reader.readAsDataURL(file);
        }
    };

    const handleNameSave = () => {
        if (tempName.trim()) {
            localStorage.setItem('profileName', tempName);
            localStorage.setItem('profileImage', tempImage);
            navigate(lastPath); // Rediriger vers le dernier chemin
        }
    };

    const handleCancelChanges = () => {
        navigate(lastPath); // Rediriger vers le dernier chemin
    };

    const [crimes, setCrimes] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");  // Initialement vide
    const [crimeCount, setCrimeCount] = useState(0);
    const [cities, setCities] = useState([]);
  
    useEffect(() => {
      fetch("http://localhost:3000/api/crimes")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setCrimes(data);
          // Extraire les villes uniques et les trier par ordre alphabétique
          const uniqueCities = [...new Set(data.map((crime) => crime.crimeAddress.city))];
          const sortedCities = uniqueCities.sort((a, b) => a.localeCompare(b)); // Tri alphabétique
          setCities(sortedCities);
          
          // Si on veut définir une ville par défaut, utilisez la ville de l'utilisateur
          const currentLocation = "Casablanca"; // Vous pouvez ajuster cela en fonction de la localisation réelle
          setSelectedCity(currentLocation);
          updateCrimeCount(currentLocation);
        })
        .catch((error) => console.error("Error fetching crimes data:", error));
    }, []);
  
    const updateCrimeCount = (city) => {
      const count = crimes.filter((crime) => crime.crimeAddress.city === city).length;
      setCrimeCount(count);
    };
  
    const handleCityClick = (city) => {
      setSelectedCity(city);
      updateCrimeCount(city);
    };
  

    return (
        <div
      className={`h-screen bg-cover bg-no-repeat flex flex-col items-center justify-center relative`}
      style={{ backgroundImage: `url(${arriere})`, backgroundPosition: '90% 50%' }}
    >
      <img className="absolute -z-10 opacity-80" src={blood} alt="Blood Icon" />
      <div className='flex justify-center gap-10'>
      <div className='flex-col space-y-10'>
            <div className="bg-white w-96 max-w-full p-6 rounded-lg shadow-lg flex-col">
                {/* Aperçu de l'image */}
                <div className="mb-4 flex justify-center">
                    <img
                        className="w-20 h-20 rounded-full border border-gray-300"
                        src={tempImage || '/default-profile.jpg'}
                        alt="Preview"
                    />
                </div>
                {/* Modification de l'image */}
                <label
                    htmlFor="image-upload"
                    className="block px-4 py-2 text-[#982222] font-bold hover:scale-105 bg-gray-100 rounded-md cursor-pointer mb-4"
                >
                    Change Profile Picture
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                    />
                </label>
                {/* Modification du nom */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Change Name</label>
                    <input
                        type="text"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#982222]"
                        placeholder="Enter your name"
                    />
                </div>
                {/* Boutons */}
                <div className="flex gap-4">
                    <button
                        onClick={handleNameSave}
                        className="flex-1 bg-[#982222] text-white py-2 rounded-md hover:bg-[#7a1919] duration-300"
                    >
                        Save Changes
                    </button>
                    <button
                        onClick={handleCancelChanges}
                        className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 duration-300"
                    >
                        Cancel
                    </button>
                </div>

                
            </div>
            <div className="bg-white w-96 p-6  rounded-lg shadow-lg koulen">
            <div className='flex justify-between py-2'>
        <h3 className='flex items-center koulen gap-2'><MdPlace />  {selectedCity}</h3>
        <p>Number of crimes: {crimeCount}</p>
      </div>
            <div>
      <div className='flex overflow-x-scroll p-2  no-scrollbar' >
        {cities.map((city) => (
        <button className='rounded-md koulen'
        key={city}
        onClick={() => handleCityClick(city)}
        style={{
          marginRight: "10px",
          padding: "10px",
          backgroundColor: city === selectedCity ? "rgb(243 244 246 / var(--tw-bg-opacity, 1))" : "white",
          color: city === selectedCity ? "#982222" : "black",
          fontWeight: city === selectedCity ? "bold" : "lighter", 
          border: "1px solid #ccc",
          cursor: "pointer",
        }}
      >
        {city}
      </button>
        ))}
      </div>

     
    </div>
                </div>
                </div>
                
                

         {/*info general */}
         <div className="bg-white w-96 max-w-full p-6 rounded-lg shadow-lg">

            </div>
            </div>
        </div>
    );
};

export default ProfileEdit;
