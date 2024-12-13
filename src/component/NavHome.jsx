import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import for react-router-dom

const NavHome = ({ currentSection, setCurrentSection, scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSectionClick = (section) => {
    if (setCurrentSection) setCurrentSection(section);
    if (scrollToSection) scrollToSection(section); // Pass section if refs are not used
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
          aria-label="Toggle menu"
        >
          {isMenuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Navigation Links for Large Screens */}
      <div className="hidden md:flex md:gap-6 text-2xl">
        <button
          onClick={() => handleSectionClick("home")}
          className={`py-2 px-4 ${
            currentSection === "home" ? "border-b-4 border-white" : ""
          }`}
        >
          <a href="#home">HOME</a>
        </button>
        <button
          onClick={() => handleSectionClick("services")}
          className={`py-2 px-4 ${
            currentSection === "services" ? "border-b-4 border-white" : ""
          }`}
        >
          <a href="#services">SERVICES</a>
        </button>
        <button
          onClick={() => handleSectionClick("about")}
          className={`py-2 px-4 ${
            currentSection === "about" ? "border-b-4 border-white" : ""
          }`}
        >
          <a href="#about">ABOUT</a>
        </button>
        <Link to="/Login" className="py-2 px-4">
          SIGN IN
        </Link>
        <Link to="/signup" className="bg-[#982222] py-2 px-4">
          SIGN UP
        </Link>
      </div>

      {/* Hamburger Dropdown Menu for Small Screens */}
      {isMenuOpen && (
        <div className="absolute top-20 right-10 bg-[#982222] text-white rounded-md shadow-lg p-4 md:hidden">
          <ul className="flex flex-col gap-4 text-lg">
            <li>
              <Link

                to="/login"


                className="py-2 px-4"
                onClick={toggleMenu}
              >
                SIGN IN
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="bg-white text-[#982222] rounded py-2 px-4"
                onClick={toggleMenu}
              >
                SIGN UP
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavHome;
