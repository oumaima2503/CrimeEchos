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
        borderColor: 'rgba(255, 99, 132, 1)',
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
        backgroundColor: '#FF5733',
      },
    ],
  };

  return (
    <div
      className="h-screen bg-cover bg-no-repeat flex flex-col relative"
      style={{ backgroundImage: `url(${arriere})`, backgroundPosition: '90% 0%' }}
    >
      <Header />
      
      {/* Tableau de bord */}
      <div className="container mt-5 relative z-10 text-white">
        <h1 className="text-center mb-5">Tableau de bord</h1>

        {/* Première ligne avec 4 éléments */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card p-3 bg-gray-800">
              <div className="card-title text-xl">Total des Crimes</div>
              <div>{data.totalCrimes}</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card p-3 bg-gray-800">
              <div className="card-title text-xl">Mois avec le Plus de Crimes</div>
              <div>{data.monthWithMostCrimes}</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card p-3 bg-gray-800">
              <div className="card-title text-xl">Ville avec le Plus de Crimes</div>
              <div>{data.cityWithMostCrimes}</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card p-3 bg-gray-800">
              <div className="card-title text-xl">Catégorie la Plus Fréquente</div>
              <div>{data.mostFrequentCategory}</div>
            </div>
          </div>
        </div>

        {/* Graphiques */}
        <div className="row">
          <div className="col-md-6">
            <div className="card p-3 bg-gray-800">
              <div className="card-title text-xl">Crimes Mensuels</div>
              <Line data={lineChartDataCrimes} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="card p-3 bg-gray-800">
              <div className="card-title text-xl">Crimes par Ville</div>
              <Bar data={barChartDataCities} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dash;
