import React, { useState, useEffect } from 'react';
import blood from '../assets/blood.svg';
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
        borderColor: '#580B0B',
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
        label: `Mounthly crimes in ${selectedCity}`,
        data: sortedData, // Données triées selon les mois
        borderColor: '#982222',
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
  
          // Création du gradient dynamique
          const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
          gradient.addColorStop(0,'rgb(152, 34, 34) '); // Orange clair
          gradient.addColorStop(1, 'rgba(255, 72, 0, 0)');   // Transparent
          return gradient;
        },
        tension: 0.4, // Courbes lissées
        pointBackgroundColor: '#982222',
        pointBorderColor: '#580B0B',
        pointHoverRadius: 8, // Rayon des points au survol
        pointRadius: 5, // Rayon constant des points
      },
    ],
  };
  return (
    <div className="h-screen bg-cover bg-no-repeat flex flex-col relative" style={{ backgroundImage: `url(${arriere})`, backgroundPosition: '90% 0%' }}>
      <Header />
      <div className=" flex-grow overflow-auto no-scrollbar ">
      <div className="flex flex-wrap justify-center items-center gap-4 mb-4 z-10 px-4">
  {[
    { title: (<span>Total<br />Crimes</span>), value: data.totalCrimes },
    { title: 'City with Most Crimes', value: data.cityWithMostCrimes },
    { title: 'Most Frequent Category', value: data.mostFrequentCategory },
    {
      title: 'Month with Highest Crimes',
      value: sortedMonths.length > 0
        ? sortedMonths[sortedData.indexOf(Math.max(...sortedData))]
        : 'N/A', // If no month is available
    },
    {
      title: 'Crimes in Selected City',
      value: selectedCity
        ? Object.values(data.monthlyCrimesByCity[selectedCity] || {}).reduce((a, b) => a + b, 0)
        : 'Not Selected', // If no city is selected
    },
  ].map((item, index) => (
    <div
      key={index}
      className="card p-2 bg-white/90 rounded-xl flex flex-col justify-start shadow-md"
      style={{
        flex: "1 1 calc(20% - 16px)", // Take 20% of the row minus gap
        minWidth: "80px", // Minimum size for very small screens
        maxWidth: "225px", // Maximum size to avoid oversized boxes
      }}
    >
      <div className="card-title nosifer text-black text-xs sm:text-sm md:text-base text-center font-semibold">
        {item.title}
      </div>
      <div className="text-lg sm:text-md text-center text-[#982222] koulen">{item.value}</div>
    </div>
  ))}
</div>


        <div className="flex flex-wrap md:flex-nowrap gap-8 justify-between items-start z-10 pl-10 pr-10  ">
          <div className="card p-4 bg-white/90 rounded-xl flex flex-col w-full md:w-1/2">
            <div className="card-title text-xl text-black nosifer mb-4 text-center">Monthly Crimes</div>
            <div className="mb-4 text-center">
              <label htmlFor="cityFilter" className="mr-2 koulen text-[#982222] ">Select City:</label>
              <select
                id="cityFilter"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="p-2 border rounded text-white koulen bg-[#982222] "
              >
                {Object.keys(data.crimesByCity).map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <Line data={lineChartDataCrimes} options={{ maintainAspectRatio: false }} />
            </div>
          </div>

          <div className="card p-4 bg-white/90 rounded-xl flex flex-col w-full md:w-1/2">
            <div className="card-title text-xl text-black nosifer mb-4 text-center">Crimes per City</div>
            <div className="mb-4 flex justify-center items-center">
  <label htmlFor="startDate" className="mr-2 koulen text-[#982222] ">Start Date:</label>
  <input
    type="date"
    id="startDate"
    value={startDate}
    onChange={(e) => setStartDate(e.target.value)}
    className="p-2 border rounded mr-4 text-white koulen bg-[#982222] "
  />
  <label htmlFor="endDate" className="mr-2 koulen text-[#982222] ">End Date:</label>
  <input
    type="date"
    id="endDate"
    value={endDate}
    onChange={(e) => setEndDate(e.target.value)}
    className="p-2 border rounded text-white koulen bg-[#982222] "
  />
</div>

            <div className="flex-1">
              <Bar data={barChartDataCities} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dash;
