import React from 'react';

const NavHome = ({ currentSection, setCurrentSection, scrollToSection }) => {
  const handleSectionClick = (section, ref) => {
    setCurrentSection(section); // Mettre à jour la section active
    scrollToSection(ref); // Effectuer le défilement vers la section correspondante
  };

  return (
    <div className="flex justify-between items-center text-white font-bold pt-6 pl-10 pr-10 z-10">
      {/* Logo */}
      <div>
        <p className="text-3xl">CRIMECHOS</p>
      </div>

      {/* Hamburger Button for Small Screens */}
      <div className="md:hidden">
        <button
          onClick={() => setCurrentSection(currentSection)} // Placeholder pour menu toggle
          className="text-white text-3xl focus:outline-none"
        >
          {currentSection === 'home' ? '✖' : '☰'}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="absolute right-10 bg-[#982222] text-white rounded-md shadow-lg p-4 md:flex md:relative md:bg-transparent md:shadow-none md:p-0 md:gap-6">
        <ul className="flex flex-col md:flex-row gap-6 text-2xl">
          <li>
            <button
              onClick={() => handleSectionClick('home', homeRef)}
              className={`py-2 px-4 ${
                currentSection === 'home' ? 'border-b-4 border-white ' : ''
              }`}
            >
              HOME
            </button>
          </li>
          <li>
            <button
              onClick={() => handleSectionClick('services', servicesRef)}
              className={`py-2 px-4 ${
                currentSection === 'services' ? 'border-b-4 border-white' : ''
              }`}
            >
              SERVICES
            </button>
          </li>
          <li>
            <button
              onClick={() => handleSectionClick('about', aboutRef)}
              className={`py-2 px-4 ${
                currentSection === 'about' ? 'border-b-4 border-white' : ''
              }`}
            >
              ABOUT
            </button>
          </li>
          <li>
            <button className="py-2 px-4">SIGN IN</button>
          </li>
          <li>
            <button className="bg-[#982222] py-2 px-4">SIGN UP</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavHome;
