import React, { useState, useEffect } from 'react';
import blood from '../assets/blood.svg';
import iconNext from '../assets/iconNext.svg';
import arriere from '../assets/arriere.png';
import Header from '../component/Header';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Enregistrement des composants Chart.js nécessaires
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Dash = () => {
  const [data, setData] = useState({
    crimes: [],
    totalCrimes: 0,
    cityWithMostCrimes: '',
    mostFrequentCategory: '',
    monthlyCrimesByCity: {},
    crimesByCity: {},
  });

  const [selectedCity, setSelectedCity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const crimeResponse = await fetch('http://localhost:3000/api/crimes');
        const crimeData = await crimeResponse.json();

        const totalCrimes = crimeData.length;
        const cityCrimeCounts = {};
        const categoryCounts = {};
        const monthlyCrimeCountsByCity = {};

        crimeData.forEach((crime) => {
          const city = crime.crimeAddress?.city || 'Unknown';
          const month = new Date(crime.crimeDate).toLocaleString('default', { month: 'short' });

          // Crimes par ville
          cityCrimeCounts[city] = (cityCrimeCounts[city] || 0) + 1;

          // Crimes mensuels par ville
          if (!monthlyCrimeCountsByCity[city]) {
            monthlyCrimeCountsByCity[city] = {};
          }
          monthlyCrimeCountsByCity[city][month] = (monthlyCrimeCountsByCity[city][month] || 0) + 1;

          // Crimes par catégorie
          categoryCounts[crime.category] = (categoryCounts[crime.category] || 0) + 1;
        });

        const cityWithMostCrimes = Object.keys(cityCrimeCounts).reduce((a, b) =>
          cityCrimeCounts[a] > cityCrimeCounts[b] ? a : b
        );

        setData({
          crimes: crimeData,
          totalCrimes,
          cityWithMostCrimes,
          mostFrequentCategory: Object.keys(categoryCounts).reduce((a, b) =>
            categoryCounts[a] > categoryCounts[b] ? a : b
          ),
          monthlyCrimesByCity: monthlyCrimeCountsByCity,
          crimesByCity: cityCrimeCounts,
        });

        // Définir la première ville comme sélectionnée par défaut
        setSelectedCity(Object.keys(cityCrimeCounts)[0] || '');
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchData();
  }, []);

  // Filtrer les données de crimes par ville et par dates
  const filteredCrimesByCity = {};
  data.crimes
    .filter((crime) => {
      const crimeDate = new Date(crime.crimeDate);
      const isAfterStartDate = startDate ? crimeDate >= new Date(startDate) : true;
      const isBeforeEndDate = endDate ? crimeDate <= new Date(endDate) : true;
      return isAfterStartDate && isBeforeEndDate;
    })
    .forEach((crime) => {
      const city = crime.crimeAddress?.city || 'Unknown';
      filteredCrimesByCity[city] = (filteredCrimesByCity[city] || 0) + 1;
    });

  const barChartDataCities = {
    labels: Object.keys(filteredCrimesByCity),
    datasets: [
      {
        label: 'Crimes per City',
        data: Object.values(filteredCrimesByCity),
        backgroundColor: '#982222',
        borderColor: '#982222',
        borderWidth: 1,
        borderRadius: 10, // Coins arrondis
      },
    ],
  };
  const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Trier les mois et les données correspondantes
  const sortedMonths = selectedCity && data.monthlyCrimesByCity[selectedCity]
    ? Object.keys(data.monthlyCrimesByCity[selectedCity])
        .sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b))
    : [];
  
  const sortedData = sortedMonths.map((month) => 
    data.monthlyCrimesByCity[selectedCity]?.[month] || 0
  );
  
  const lineChartDataCrimes = {
    labels: sortedMonths, // Mois triés
    datasets: [
      {
        label: `Monthly crimes in ${selectedCity}`,
        data: sortedData, // Données triées selon les mois
        borderColor: '#982222',
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
  
          // Création du gradient dynamique
          const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
          gradient.addColorStop(0, 'rgba(239,113,63, 0.4)'); // Orange clair
          gradient.addColorStop(1, 'rgba(255, 72, 0, 0)');   // Transparent
          return gradient;
        },
        tension: 0.4, // Courbes lissées
        pointBackgroundColor: '#982222',
        pointBorderColor: '#982222',
        pointHoverRadius: 8, // Rayon des points au survol
        pointRadius: 5, // Rayon constant des points
      },
    ],
  };
  
  

  return (
    <div className="h-screen bg-cover bg-no-repeat flex flex-col relative" style={{ backgroundImage: `url(${arriere})`, backgroundPosition: '90% 0%' }}>
      <Header />
      
      <div className=" flex-grow overflow-auto no-scrollbar">
      <div className="relative ">
  {/* Flèche gauche */}
  <button
    className=" min-[1001px]:hidden  max-[400px]:left-6 max-[370px]:left-4
    absolute left-10 top-1/2 transform rotate-180 -translate-y-1/2 bg-[#580B0B]  p-1 rounded-full shadow-md z-20"
    onClick={() => {
      document.querySelector('.scroll-container').scrollBy({ left: -230, behavior: 'smooth' });
    }}
  >
     <img src={iconNext} alt="" className='size-6' />
  </button>

  <div
    className="scroll-container flex justify-between sm:justify-evenly items-center 
      gap-4 sm:gap-8 mb-8 z-10 flex-nowrap no-scrollbar min-[1000px]:pl-10 min-[1000px]:pr-10
       min-[1000px]:gap-2 max-[910px]:w-[650px] max-[800px]:w-[600px]
      max-[750px]:gap-2 overflow-x-auto snap-x snap-mandatory max-[750px]:w-[550px] mx-auto max-[1000px]:w-[750px]
      max-[700px]:w-[450px] max-[600px]:w-[400px] max-[550px]:w-[300px] max-[450px]:w-[260px] max-[400px]:w-[240px]"
  >
    {[
      { title: 'Total Crimes in Morocco', value: data.totalCrimes },
      { title: 'The City with Most Crimes', value: data.cityWithMostCrimes },
      { title: 'Most Frequent Category', value: data.mostFrequentCategory },
      {
        title: 'Month with Highest Crimes',
        value: sortedMonths.length > 0
          ? sortedMonths[sortedData.indexOf(Math.max(...sortedData))] : 'N/A',
      },
      {
        title: 'Crimes in Selected City',
        value: selectedCity
          ? Object.values(data.monthlyCrimesByCity[selectedCity] || {}).reduce((a, b) => a + b, 0)
          : 'Not Selected',
      },
    ].map((item, index) => (
      <div
        key={index}
        className="card py-2 bg-white/90 rounded-xl flex flex-col justify-start 
          space-y-2 shadow-md max-[750px]:min-w-[100px] max-[750px]:max-w-[150px] max-[750px]:text-xs 
          max-[750px]:truncate"
        style={{
          flex: "1 1 calc(50% - 16px)",
          maxWidth: "350px",
          minWidth: "220px",
        }}
      >
        <div className="card-title koulen text-black text-sm sm:text-base
         text-center font-semibold whitespace-pre">
          {item.title}
        </div>
        <div className="text-xs sm:text-sm text-center text-[#982222] nosifer">
          {item.value}
        </div>
      </div>
    ))}
  </div>

  {/* Flèche droite */}
  <button
    className="min-[1001px]:hidden max-[400px]:right-6 max-[370px]:right-4
    absolute right-10 top-1/2 transform  
     -translate-y-1/2 bg-[#580B0B] p-1 rounded-full shadow-md z-20"
    onClick={() => {
      document.querySelector('.scroll-container').scrollBy({ left: 230, behavior: 'smooth' });
    }}
  >
    <img src={iconNext} alt="" className='size-6' />
  </button>
</div>

        <div className="flex flex-wrap min-[900px]:flex-nowrap gap-8 justify-between
         items-start z-10 pl-10 pr-10">
        <div className="card p-4 bg-white/90 rounded-xl flex flex-col w-full min-[901px]:w-1/2 space-y-6">
  {/* Titre */}
  <p className="card-title text-base sm:text-lg text-black nosifer  text-center">
    Monthly Crimes
  </p>

  {/* Sélection de la ville */}
  <div className="mb-2 text-center flex flex-wrap justify-center gap-4 sm:gap-8 items-center ">
    <label htmlFor="cityFilter" className="text-xs sm:text-sm koulen text-[#982222]">
      Select City:
    </label>
    <select
      id="cityFilter"
      value={selectedCity}
      onChange={(e) => setSelectedCity(e.target.value)}
      className="px-2 py-1 border-0 rounded text-xs sm:text-sm text-[#580B0B] koulen bg-[#cab6b6]/30"
    >
      {Object.keys(data.crimesByCity).map((city) => (
        <option key={city} value={city}>
          {city}
        </option>
      ))}
    </select>
  </div>

  {/* Graphique */}
  <div className="flex-1 h-full  sm:h-[400px]">
    <Line data={lineChartDataCrimes} options={{ maintainAspectRatio: false }} />
  </div>
</div>


          <div className="card p-4 bg-white/90 rounded-xl flex flex-col w-full min-[901px]:w-1/2  space-y-4">
  {/* Titre */}
  <div className="card-title text-base sm:text-lg text-black nosifer mb-4 text-center">
    Crimes per City
  </div>

  {/* Formulaire de sélection des dates */}
  <div className="flex flex-wrap justify-center  gap-4 sm:gap-2 items-center w-full ">
    {/* Date de début */}
    <div className="flex  items-center sm:items-start ">
      <label htmlFor="startDate" className="text-xs sm:text-sm mr-2 koulen py-1 text-[#982222]">
        Start Date:
      </label>
      <input
        type="date"
        id="startDate"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="px-2 py-1 border rounded text-xs sm:text-sm text-[#580B0B] koulen bg-[#cab6b6]/30"
      />
    </div>

    {/* Date de fin */}
    <div className="flex items-center sm:items-start">
      <label htmlFor="endDate" className="text-xs sm:text-sm mr-2 py-1 koulen text-[#982222]">
        End Date:
      </label>
      <input
        type="date"
        id="endDate"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="px-2 py-1 border rounded text-xs sm:text-sm text-[#580B0B] koulen bg-[#cab6b6]/30"
      />
    </div>
  </div>

  {/* Graphique */}
  <div className="flex-1 h-full sm:h-[400px] w-full ">
    <Bar data={barChartDataCities} options={{ maintainAspectRatio: false }} />
  </div>
</div>

        </div>
      </div>
    </div>
  );
};

export default Dash;
