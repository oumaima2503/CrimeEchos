import React, { useState, useRef } from 'react';
import arriere from '../assets/arriere.png';
import iconNext from '../assets/iconNext.svg';
import NavHome from '../component/NavHome';
import '../App.css';
import blood from '../assets/blood.svg';
import data from '../assets/data.svg';
import list from '../assets/list.svg';
import msg from '../assets/msg.svg';
import { useNavigate } from "react-router-dom";


function Home() {
  const navigate = useNavigate();
  const handleExplore = (e) => {
    e.preventDefault(); 
    
    navigate('/Signup');
  };
  const containerRef = useRef(null);
  const homeRef = useRef(null);
  const servicesRef = useRef(null);
  const aboutRef = useRef(null);

  const [currentSection, setCurrentSection] = useState('home');

  const scrollToSection = (section) => {
    switch (section) {
      case 'homeToAbout':
        aboutRef.current.scrollIntoView({ behavior: 'smooth', inline: 'start' });
        setCurrentSection('about');
        break;
      case 'homeToServices':
        servicesRef.current.scrollIntoView({ behavior: 'smooth', inline: 'start' });
        setCurrentSection('services');
        break;
      case 'servicesToHome':
        homeRef.current.scrollIntoView({ behavior: 'smooth', inline: 'start' });
        setCurrentSection('home');
        break;
      case 'servicesToAbout':
        aboutRef.current.scrollIntoView({ behavior: 'smooth', inline: 'start' });
        setCurrentSection('about');
        break;
      case 'aboutToServices':
        servicesRef.current.scrollIntoView({ behavior: 'smooth', inline: 'start' });
        setCurrentSection('services');
        break;
      case 'aboutToHome':
        homeRef.current.scrollIntoView({ behavior: 'smooth', inline: 'start' });
        setCurrentSection('home');
        break;
      default:
        break;
    }
  };

  return (
    <div
      className="h-screen bg-cover bg-no-repeat flex flex-col relative"
      style={{ backgroundImage: `url(${arriere})`, backgroundPosition: '90% 80%' }}
    >
      <img className="absolute z-0 opacity-80" src={blood} alt="Blood Icon" />
      <NavHome
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
        scrollToSection={scrollToSection}
      />

      <div
        ref={containerRef}
        className="w-full h-full overflow-x-auto snap-x scroll-smooth z-10 flex no-scrollbar"
      >
        {/* Section 1 - Home */}
        <div
          ref={homeRef} id='home'
          className="flex-shrink-0 w-full h-screen flex justify-center items-center flex-col text-center snap-start px-4 -mt-24 sm:-mt-16"
        >
          <h1 className="text-white text-3xl md:text-7xl font-bold z-10 nosifer">CRIMECHOS</h1>
          <h1 className="text-[#580B0B] text-3xl md:text-7xl font-bold z-0 nosifer -mt-[30px] md:-mt-[60px]">
            CRIMECHOS
          </h1>
          <p className="koulen text-white/70 text-xl md:text-3xl mt-4 md:mt-10">
            Welcome to CrimEchos, your interactive
            <br /> criminal analysis portal
          </p>
          <button className="bg-[#982222] rounded-md mt-6 md:mt-8 py-2 px-5 koulen text-white text-xl md:text-3xl"
          onClick={handleExplore } >
            GET STARTED
          </button>
        </div>

        {/* Section 2 - Services */}
        <div
          ref={servicesRef} id='services'
          className="flex-shrink-0 w-full h-screen flex justify-center items-center
           flex-col text-center px-4 snap-start gap-6 md:gap-10 md:-mt-16 mt-44 max-[360px]:mt-56"
        >
          <h1 className="text-white text-3xl md:text-5xl font-bold max-[360px]:text-2xl
        nosifer mt-4 z-10">OUR SERVICES</h1>
          <h1 className=" text-3xl md:text-5xl font-bold nosifer max-[360px]:text-2xl
          -mt-[50px] md:-mt-[80px] z-0 text-[#580B0B] ">OUR SERVICES</h1>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 z-0">
            <div className="bg-white/80 rounded-xl koulen flex flex-col justify-center
             items-center gap-6 w-10/12 md:w-[300px] ">
              <div className="flex size-14 bg-[#982222] rounded-full items-center justify-center -mt-3">
                <img className="h-6 w-6" src={data} alt="Data" />
              </div>
              <p className="font-light text-sm md:text-xs px-6">
                Provide users with interactive maps and dashboards showcasing crime trends and
                statistics. This feature helps users explore crime rates by region, type to better
                understand patterns and risk areas.
              </p>
              <p className="text-white bg-[#982222] py-3 w-full rounded-b-xl">
                Criminal Data Visualization
              </p>
            </div>

            <div className="bg-white/80 rounded-xl koulen flex flex-col justify-center items-center gap-6
             w-10/12 md:w-[300px]">
              <div className="flex size-14 bg-[#982222] rounded-full items-center justify-center -mt-3">
                <img className="h-6 w-6" src={list} alt="List" />
              </div>
              <p className="font-light text-sm md:text-xs px-6">
                A comprehensive hub providing crucial information about crimes, and safety
                measures. Stay informed and prepared with detailed insights into crime trends and
                preventive strategies.
              </p>
              <p className="text-white bg-[#982222] py-3 w-full rounded-b-xl">Crime Resources</p>
            </div>

            <div className="bg-white/80 rounded-xl koulen flex flex-col justify-center items-center gap-6 
            w-10/12 md:w-[300px]">
              <div className="flex size-14 bg-[#982222] rounded-full items-center justify-center -mt-3">
                <img className="h-6 w-6" src={msg} alt="Msg" />
              </div>
              <p className="font-light text-sm md:text-xs px-6">
                A dedicated space for victims and witnesses to share their stories or report
                incidents confidentially. Empower communities by raising awareness and encouraging
                collaboration to combat crime.
              </p>
              <p className="text-white bg-[#982222] py-3 w-full rounded-b-xl">Community Reporting</p>
            </div>
          </div>
        </div>

        {/* Section 3 - About */}
        <div
          ref={aboutRef} id='about'
          className="flex-shrink-0 w-full h-screen flex justify-center items-center flex-col text-center px-4 snap-start"
        >
          <h1 className="text-white text-3xl md:text-5xl font-bold z-10 nosifer md:-mt-36  -mt-40">
            ABOUT
          </h1>
          <h1 className="text-[#580B0B] text-3xl md:text-5xl  font-bold z-0 nosifer -mt-[28px]  md:-mt-[40px]  ">
            ABOUT
          </h1>
          <p className="koulen text-white/70 text-lg md:text-2xl mt-4 max-[370px]:text-xs max-[370px]:w-60
           md:mt-10 w-72 md:w-full">
            CrimEchos is a platform dedicated to enhancing safety and awareness.
            <br /> It provides crime insights, resources, and community tools <br /> to empower
            individuals to stay informed and take action. <br /> Together, we build a safer
            tomorrow.
          </p>
        </div>
      </div>

      {/* Fixed Navigation Buttons */}
      <div className="absolute left-4 md:left-10 top-1/2 transform -translate-y-1/2 z-20">
        <button
          onClick={() => {
            if (currentSection === 'home') {
              scrollToSection('homeToAbout');
            } else if (currentSection === 'services') {
              scrollToSection('servicesToHome');
            } else if (currentSection === 'about') {
              scrollToSection('aboutToServices');
            }
          }}
        >
          <img className="text-white rotate-180 w-8 md:w-12" src={iconNext} alt="Icon Prev" />
        </button>
      </div>
      <div className="absolute right-4 md:right-10 top-1/2 transform -translate-y-1/2 z-20">
        <button
          onClick={() => {
            if (currentSection === 'home') {
              scrollToSection('homeToServices');
            } else if (currentSection === 'services') {
              scrollToSection('servicesToAbout');
            } else if (currentSection === 'about') {
              scrollToSection('aboutToHome');
            }
          }}
        >
          <img className="text-white w-8 md:w-12" src={iconNext} alt="Icon Next" />
        </button>
      </div>
    </div>
  );
}

export default Home;
