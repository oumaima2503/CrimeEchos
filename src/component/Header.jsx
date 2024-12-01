import React from 'react';
import '../App.css';
import profil from '../assets/profil.jpg';
import { TbLayoutDashboard } from "react-icons/tb";
import { FaList } from "react-icons/fa6";
import { PiUsersThreeBold } from "react-icons/pi";
import { GrMapLocation } from "react-icons/gr";
import { HiOutlineLogout } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
    const location = useLocation(); // Récupère le chemin actuel
    const menus = [
        { name: "Dashboard", link: '/DashBoard', icon: TbLayoutDashboard },
        { name: "Crimes", link: '/List_Crimes', icon: FaList },
        { name: "Witness", link: '/Witness', icon: PiUsersThreeBold },
        { name: "Map", link: '/Map', icon: GrMapLocation },
        { name: "Log Out", link: '/', icon: HiOutlineLogout },
    ];

    return (
        <div className='z-20 pl-10 pr-10 py-6'>
            {/* Header */}
            <div className='flex justify-between'>
                <div>
                    <p className="text-3xl koulen max-[600px]:text-xl max-[500px]:text-lg text-white">CRIMECHOS</p>
                </div>
                <div className='flex gap-4'>
                    <img className='w-10 h-10 rounded-full max-[600px]:size-8  max-[500px]:size-6' src={profil} alt="" />
                    <p className='text-white text-xl font-bold py-1 max-[500px]:text-xs max-[500px]:py-1
                    max-[600px]:py-0 max-[600px]:text-sm'>
                        Oumaima Ikram
                    </p>
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
                        <div className={`duration-500 ${
                            location.pathname === menu.link ? 'scale-150' : 'scale-100'
                        } 
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
                        {/* Ligne soulignée */}
                        <div
                            className={`h-0.5  w-10 -mt-3 max-[450px]:w-6 ${
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
