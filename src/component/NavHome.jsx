import React, { useState } from 'react';

const NavHome = ({ currentSection, setCurrentSection, scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // État pour le menu hamburger

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Basculer entre affiché/masqué
  };

  const handleSectionClick = (section, ref) => {
    setCurrentSection(section); // Mettre à jour la section active
    scrollToSection(ref); // Effectuer le défilement vers la section correspondante
  };

  return (
    <div className="flex justify-between items-center text-white font-bold pt-6 pl-10 pr-10 z-20 koulen">
      {/* Logo */}
      <div>
        <p className="text-3xl">CRIMECHOS</p>
      </div>

      {/* Hamburger Button for Small Screens */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="text-white text-3xl focus:outline-none"
        >
          {isMenuOpen ? '✖' : '☰'}
        </button>
      </div>

      {/* Navigation Links for Large Screens */}
      <div className="hidden md:flex md:gap-6 text-2xl">
        <button
          onClick={() => handleSectionClick('home')}
          className={`py-2 px-4 ${
            currentSection === 'home' ? 'border-b-4 border-white' : ''
          }`}
        >
          HOME
        </button>
        <button
          onClick={() => handleSectionClick('services')}
          className={`py-2 px-4 ${
            currentSection === 'services' ? 'border-b-4 border-white' : ''
          }`}
        >
          SERVICES
        </button>
        <button
          onClick={() => handleSectionClick('about')}
          className={`py-2 px-4 ${
            currentSection === 'about' ? 'border-b-4 border-white' : ''
          }`}
        >
          ABOUT
        </button>
        <button className="py-2 px-4">SIGN IN</button>
        <button className="bg-[#982222] py-2 px-4">SIGN UP</button>
      </div>

      {/* Hamburger Dropdown Menu for Small Screens */}
      {isMenuOpen && (
        <div className="absolute top-20 right-10 bg-[#982222] text-white rounded-md shadow-lg p-4 md:hidden">
          <ul className="flex flex-col gap-4 text-lg">
            <li>
              <button className="py-2 px-4" onClick={toggleMenu}>
                SIGN IN
              </button>
            </li>
            <li>
              <button className="bg-white text-[#982222] rounded py-2 px-4" onClick={toggleMenu}>
                SIGN UP
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavHome;
