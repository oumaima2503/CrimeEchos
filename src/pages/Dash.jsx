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
        backgroundColor: '#580B0B',
        borderColor: '#580B0B',
        borderWidth: 1,
        borderRadius: 10, // Coins arrondis
      },
    ],
  };
  const lineChartDataCrimes = {
    labels: selectedCity
      ? Object.keys(data.monthlyCrimesByCity[selectedCity] || {})
      : [],
    datasets: [
      {
        label: `Crimes Mensuels à ${selectedCity}`,
        data: selectedCity
          ? Object.values(data.monthlyCrimesByCity[selectedCity] || {})
          : [],
        borderColor: '#580B0B',
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
  
          // Création du gradient dynamique
          const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
          gradient.addColorStop(0, 'rgba(239,113,63, 0.4)'); // Orange clair
          gradient.addColorStop(1, 'rgb(255, 72, 0)');   // Transparent
          return gradient;
        },
        tension: 0.4, // Courbes lissées
        pointBackgroundColor: '#580B0B',
        pointBorderColor: '#580B0B',
        pointHoverRadius: 8,
        pointRadius: 5, // Rayon constant des points
      },
    ],
  };
  
  

  return (
    <div className="h-screen bg-cover bg-no-repeat flex flex-col relative" style={{ backgroundImage: `url(${arriere})`, backgroundPosition: '90% 0%' }}>
      <Header />
      <div className="container relative z-10 text-white">
        <div className="flex flex-wrap justify-around items-center gap-4 mb-8">
          {[{ title: 'Crimes Total', value: data.totalCrimes },
            { title: 'Ville avec le Plus de Crimes', value: data.cityWithMostCrimes },
            { title: 'Frequent Category', value: data.mostFrequentCategory },
            { title: 'Frequent Category', value: data.mostFrequentCategory },
            { title: 'Frequent Category', value: data.mostFrequentCategory },
          ].map((item, index) => (
            <div key={index} className="card p-2 w-40 h-16 bg-white/90 rounded-xl flex flex-col justify-center">
              <div className="card-title nosifer text-black text-xs text-center font-semibold">{item.title}</div>
              <div className="text-sm text-center text-[#580B0B] koulen">{item.value}</div>
              
            </div>
            
          ))}
        </div>

        <div className="flex flex-wrap md:flex-nowrap gap-8 justify-between items-start">
          <div className="card p-4 bg-white/90 rounded-xl flex flex-col w-full md:w-1/2">
            <div className="card-title text-xl text-black nosifer mb-4 text-center">Monthly Crimes</div>
            <div className="mb-4 text-center">
              <label htmlFor="cityFilter" className="mr-2 koulen text-[#580B0B]">Select City:</label>
              <select
                id="cityFilter"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="p-2 border rounded text-white koulen bg-[#580B0B]"
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
  <label htmlFor="startDate" className="mr-2 koulen text-[#580B0B]">Start Date:</label>
  <input
    type="date"
    id="startDate"
    value={startDate}
    onChange={(e) => setStartDate(e.target.value)}
    className="p-2 border rounded mr-4 text-white koulen bg-[#580B0B]"
  />
  <label htmlFor="endDate" className="mr-2 koulen text-[#580B0B]">End Date:</label>
  <input
    type="date"
    id="endDate"
    value={endDate}
    onChange={(e) => setEndDate(e.target.value)}
    className="p-2 border rounded text-white koulen bg-[#580B0B]"
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
