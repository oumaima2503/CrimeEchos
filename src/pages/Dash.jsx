import React, { useState, useEffect } from 'react';
import blood from '../assets/blood.svg';
import arriere from '../assets/arriere.png';
import Header from '../component/Header';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Enregistrement des composants Chart.js nécessaires
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Dash = () => {
  const [data, setData] = useState({
    // Données des crimes
    crimes: [],
    totalCrimes: 0,
    cityWithMostCrimes: '',
    mostFrequentCategory: '',
    monthWithMostCrimes: '',
    crimeCategories: [],
    crimeCountByCategory: [],
    monthlyCrimes: [],
    crimesByCity: [],
  });

  useEffect(() => {
    // Fonction pour récupérer les données des crimes
    const fetchData = async () => {
      try {
        // Récupération des données des crimes
        const crimeResponse = await fetch('http://localhost:3000/api/crimes');
        const crimeData = await crimeResponse.json();

        // Traitement des données
        const totalCrimes = crimeData.length;
        const cityCrimeCounts = {};
        const categoryCounts = {};
        const monthlyCrimeCounts = {};
        let mostFrequentCategory = '';
        let monthWithMostCrimes = '';
        let cityWithMostCrimes = '';

        crimeData.forEach((crime) => {
          // Comptabiliser les crimes par ville
          cityCrimeCounts[crime.city] = (cityCrimeCounts[crime.city] || 0) + 1;

          // Comptabiliser les crimes par catégorie
          categoryCounts[crime.category] = (categoryCounts[crime.category] || 0) + 1;

          // Comptabiliser les crimes par mois
          const month = new Date(crime.crimeDate).toLocaleString('default', { month: 'short' });
          monthlyCrimeCounts[month] = (monthlyCrimeCounts[month] || 0) + 1;
        });

        // Trouver les valeurs maximales
        mostFrequentCategory = Object.keys(categoryCounts).reduce((a, b) => categoryCounts[a] > categoryCounts[b] ? a : b);
        monthWithMostCrimes = Object.keys(monthlyCrimeCounts).reduce((a, b) => monthlyCrimeCounts[a] > monthlyCrimeCounts[b] ? a : b);
        cityWithMostCrimes = Object.keys(cityCrimeCounts).reduce((a, b) => cityCrimeCounts[a] > cityCrimeCounts[b] ? a : b);

        // Mise à jour de l'état avec les données récupérées
        setData({
          crimes: crimeData,  // Liste des crimes
          totalCrimes,
          cityWithMostCrimes,
          mostFrequentCategory,
          monthWithMostCrimes,
          crimeCategories: [...new Set(crimeData.map(crime => crime.category))],  // Catégories uniques
          crimeCountByCategory: categoryCounts,
          monthlyCrimes: monthlyCrimeCounts,
          crimesByCity: cityCrimeCounts,
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchData();
  }, []);

  // Graphique 1: Crimes mensuels (filtré par ville)
  const lineChartDataCrimes = {
    labels: Object.keys(data.monthlyCrimes),
    datasets: [
      {
        label: 'Crimes Mensuels',
        data: Object.values(data.monthlyCrimes),
        borderColor: '#580B0B ',
        fill: false,
      },
    ],
  };

  // Graphique 2: Crimes par ville (filtré par mois)
  const barChartDataCities = {
    labels: Object.keys(data.crimesByCity),
    datasets: [
      {
        label: 'Crimes par Ville',
        data: Object.values(data.crimesByCity),
        backgroundColor: '#580B0B ',
      },
    ],
  };

  return (
    <div
      className="h-screen bg-cover bg-no-repeat flex flex-col relative"
      style={{ backgroundImage: `url(${arriere})`, backgroundPosition: '90% 0%' }}
    >
      <Header />
      
      <div className="container relative z-10 text-white">
        {/* Première ligne avec 4 éléments */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-1 mb-4 justify-items-center">
          <div className="card p-2 w-40 h-16 bg-white/90 rounded-xl">
            <div className="card-title nosifer text-black text-xs text-center font-semibold">Crimes Total</div>
            <div className="text-sm text-center text-[#580B0B] koulen">{data.totalCrimes}</div>
          </div>

          <div className="card p-2 w-40 h-16 bg-white/90 rounded-xl">
            <div className="card-title nosifer text-black text-xs text-center font-semibold">Mois avec le Plus de Crimes</div>
            <div className="text-sm text-center text-[#580B0B] koulen">{data.monthWithMostCrimes}</div>
          </div>

          <div className="card p-2 w-40 h-16 bg-white/90 rounded-xl">
            <div className="card-title nosifer text-black text-xs text-center font-semibold">Ville avec le Plus de Crimes</div>
            <div className="text-sm text-center text-[#580B0B] koulen">{data.cityWithMostCrimes}</div>
          </div>

          <div className="card p-2 w-40 h-16 bg-white/90 rounded-xl">
            <div className="card-title nosifer text-black text-xs text-center font-semibold">Frequent Category</div>
            <div className="text-sm text-center text-[#580B0B] koulen">{data.mostFrequentCategory}</div>
          </div>
        </div>

        {/* Graphiques */}
        <div className="flex justify-center items-center  mt-4">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="card p-4 bg-white/90 rounded-xl">
      <div className="card-title text-xl text-black nosifer mb-4 text-center">Mounthly Crimes</div>
      <Line data={lineChartDataCrimes} />
    </div>
    <div className="card p-4 bg-white/90 rounded-xl">
      <div className="card-title text-xl text-black nosifer mb-4 text-center">Crimes per city</div>
      <Bar data={barChartDataCities} />
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default Dash;
