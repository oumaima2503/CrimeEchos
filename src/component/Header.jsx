import React, { useState } from 'react';
import '../App.css';
import profil from '../assets/profil.jpg';
import { TbLayoutDashboard } from "react-icons/tb";
import { FaList } from "react-icons/fa6";
import { PiUsersThreeBold } from "react-icons/pi";
import { GrMapLocation } from "react-icons/gr";
import { HiOutlineLogout } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { TbUrgent } from "react-icons/tb";
import { AiOutlineFileProtect } from "react-icons/ai";

const Header = () => {
    const location = useLocation();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [profileImage, setProfileImage] = useState(() => localStorage.getItem('profileImage') || profil);
    const [profileName, setProfileName] = useState(() => localStorage.getItem('profileName') || "Oumaima Ikram");
    const [tempName, setTempName] = useState(profileName);
    const [tempImage, setTempImage] = useState(profileImage); // Aperçu temporaire

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setTempImage(reader.result); // Mettre à jour l'aperçu temporaire
            };
            reader.readAsDataURL(file);
        }
    };

    const handleNameSave = () => {
        if (tempName.trim()) {
            setProfileName(tempName);
            setProfileImage(tempImage); // Sauvegarder l'image sélectionnée
            localStorage.setItem('profileName', tempName);
            localStorage.setItem('profileImage', tempImage);
            setDropdownOpen(false);
        }
    };

    const handleCancelChanges = () => {
        setTempName(profileName); // Réinitialiser le nom temporaire
        setTempImage(profileImage); // Réinitialiser l'aperçu de l'image
        setDropdownOpen(false); // Fermer la fenêtre
    };

    const menus = [
        { name: "Dashboard", link: '/DashBoard', icon: TbLayoutDashboard },
        { name: "Crimes", link: '/List_Crimes', icon: FaList },
        { name: "Witness", link: '/Witness', icon: PiUsersThreeBold },
        { name: "Map", link: '/Map', icon: GrMapLocation },
        { name: "Security", link: '/Security', icon: AiOutlineFileProtect },
        { name: "SOS", link: '/Help-center', icon: TbUrgent },
        
        { name: "Log Out", link: '/', icon: HiOutlineLogout },
    ];

    return (
        <div className='z-10 pl-10 pr-10 py-6 '>
            {/* Header */}
            <div className='flex justify-between z-20'>
                <div>
                    <p className="text-3xl koulen max-[600px]:text-xl max-[500px]:text-lg text-white">CRIMECHOS</p>
                </div>
                <div className='relative z-40'>
                    <div
                        className='flex items-center gap-4 cursor-pointer'
                        onClick={() => setDropdownOpen(true)}
                    >
                       <div
                       className="flex items-center gap-4 cursor-pointer"
                       onClick={() => setDropdownOpen(false)}
                   >
                       <Link to="/profile-edit"   state={{ from: location.pathname }} >
                           <img
                               className="w-10 h-10 rounded-full max-[600px]:size-8 max-[500px]:size-6"
                               src={profileImage}
                               alt="Profile"
                           />
                       </Link>
                       <Link to="/profile-edit"   state={{ from: location.pathname }}>
                       <p className="text-white text-xl font-bold py-1 max-[500px]:text-xs max-[500px]:py-1 max-[600px]:py-0 max-[600px]:text-sm">
                           {profileName}
                       </p>
                       </Link>
                   </div>
                   
                    </div>
                    
                </div>
            </div>

            {/* NavBar */}
            <div className='flex justify-between relative text-blueDark px-40
                max-[800px]:px-20 max-[600px]:px-10 max-[480px]:px-2 max-[380px]:px-1
                py-1 bg-white/90 rounded-xl mt-6 max-[550px]:justify-center max-[550px]:gap-[1px] ' >
                {menus.map((menu, i) => (
                    <Link
                        to={menu.link}
                        key={i}
                        className={`group flex flex-col items-center text-xs gap-1 font-medium p-2 text-center 
                            ${location.pathname === menu.link ? 'text-[#982222]' : 'hover:text-[#982222] hover:scale-105'}`}
                    >
                        <div className={`duration-500 ${location.pathname === menu.link ? 'scale-150' : 'scale-100'} 
                            max-[600px]:scale-75 max-[550px]:size-[20px] max-[400px]:size-[15px]`}>
                            {React.createElement(menu.icon, { size: location.pathname === menu.link ? "20" : "18" })}
                        </div>
                        <h2
                            className={`whitespace-pre duration-500 -mt-1 ${
                                location.pathname === menu.link ? 'opacity-0' : 'block'
                            } max-[600px]:text-[10px] max-[550px]:text-[8px] max-[400px]:text-[6px]`}
                        >
                            {menu.name}
                        </h2>
                        <div
                            className={`h-0.5 w-10 -mt-3 max-[550px]:w-4 max-[400px]:w-2 ${
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
