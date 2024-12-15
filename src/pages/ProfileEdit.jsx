import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Header from '../component/Header';
import blood from '../assets/blood.svg';
import arriere from '../assets/arriere.png';

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

    return (
        <div
      className={`h-screen bg-cover bg-no-repeat flex flex-col items-center justify-center relative`}
      style={{ backgroundImage: `url(${arriere})`, backgroundPosition: '90% 50%' }}
    >
      <img className="absolute -z-10 opacity-80" src={blood} alt="Blood Icon" />
      
            <div className="bg-white w-96 max-w-full p-6 rounded-lg shadow-lg">
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
        </div>
    );
};

export default ProfileEdit;
