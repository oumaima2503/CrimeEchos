import React, { useState, useEffect } from 'react';
import '../App.css';
import profil from '../assets/profil.jpg';
import { TbLayoutDashboard } from "react-icons/tb";
import { FaList } from "react-icons/fa6";
import { PiUsersThreeBold } from "react-icons/pi";
import { GrMapLocation } from "react-icons/gr";
import { HiOutlineLogout } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
    const location = useLocation();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [profileImage, setProfileImage] = useState(() => localStorage.getItem('profileImage') || profil);
    const [profileName, setProfileName] = useState(() => localStorage.getItem('profileName') || "Oumaima Ikram");
    const [tempName, setTempName] = useState(profileName);

    // Sauvegarder les données dans le localStorage
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfileImage(reader.result);
                localStorage.setItem('profileImage', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleNameSave = () => {
        if (tempName.trim()) {
            setProfileName(tempName);
            localStorage.setItem('profileName', tempName);
            setDropdownOpen(false);
        }
    };

    const menus = [
        { name: "Dashboard", link: '/DashBoard', icon: TbLayoutDashboard },
        { name: "Crimes", link: '/List_Crimes', icon: FaList },
        { name: "Witness", link: '/Witness', icon: PiUsersThreeBold },
        { name: "Map", link: '/Map', icon: GrMapLocation },
        { name: "Log Out", link: '/', icon: HiOutlineLogout },
    ];

    return (
        <div className='z-20 pl-10 pr-10 py-6 '>
            {/* Header */}
            <div className='flex justify-between z-20'>
                <div>
                    <p className="text-3xl koulen max-[600px]:text-xl max-[500px]:text-lg text-white">CRIMECHOS</p>
                </div>
                <div className='relative z-30'>
                    <div
                        className='flex items-center gap-4 cursor-pointer'
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        <img
                            className='w-10 h-10 rounded-full max-[600px]:size-8  max-[500px]:size-6'
                            src={profileImage}
                            alt="Profile"
                        />
                        <p className='text-white text-xl font-bold py-1 max-[500px]:text-xs max-[500px]:py-1
                            max-[600px]:py-0 max-[600px]:text-sm'>
                            {profileName}
                        </p>
                    </div>
                    {dropdownOpen && (
                        <div className='absolute right-0 mt-2 w-64 z-20 bg-white shadow-lg rounded-md p-4 max-[500px]:w-40 max-[500px]:text-xs '>
                            <label
                                htmlFor="image-upload"
                                className="block px-4 py-2 text-[#982222] font-bold hover:scale-105 bg-gray-100 rounded-md cursor-pointer mb-2 "
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
                            <div className='mb-3'>
                                <label className='block text-gray-700 font-medium mb-1'>Change Name</label>
                                <input
                                    type="text"
                                    value={tempName}
                                    onChange={(e) => setTempName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#982222]"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <button
                                onClick={handleNameSave}
                                className="w-full bg-[#982222] text-white py-2 rounded-md hover:bg-[#7a1919] duration-300"
                            >
                                Save Changes
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* NavBar */}
            <div className='flex justify-between relative text-blueDark px-40
                max-[800px]:px-20 max-[600px]:px-10 max-[450px]:px-4 max-[380px]:px-1
                py-1 bg-white/90 rounded-xl mt-6'>
                {menus.map((menu, i) => (
                    <Link
                        to={menu.link}
                        key={i}
                        className={`group flex flex-col items-center text-xs gap-1 font-medium p-2 text-center 
                            ${location.pathname === menu.link ? 'text-[#982222]' : 'hover:text-[#982222] hover:scale-105'}
                        `}
                    >
                        <div className={`duration-500 ${location.pathname === menu.link ? 'scale-150' : 'scale-100'} 
                            max-[600px]:scale-75`}>
                            {React.createElement(menu.icon, { size: location.pathname === menu.link ? "20" : "18" })}
                        </div>
                        <h2
                            className={`whitespace-pre duration-500 -mt-1 ${
                                location.pathname === menu.link ? 'opacity-0' : 'block'
                            } max-[600px]:text-[10px] max-[380px]:text-[8px]`}
                        >
                            {menu.name}
                        </h2>
                        <div
                            className={`h-0.5 w-10 -mt-3 max-[450px]:w-6 ${
                                location.pathname === menu.link ? 'bg-[#982222]' : 'opacity-0'
                            } duration-500`}
                        ></div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Header;
