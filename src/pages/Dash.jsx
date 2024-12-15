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
    // Données des forces
    totalForces: 0,
    activeForces: 0,
    inactiveForces: 0,
    lastUpdate: '',
    months: [],
    activeForcesMonthly: [],
    activeForcesCount: 0,
    inactiveForcesCount: 0,

    // Données des crimes
    totalCrimes: 0,
    reportedCrimes: 0,
    crimeCategories: [],
    crimeCountByCategory: [],
    monthlyCrimes: [],
  });

  useEffect(() => {
    // Fonction pour récupérer les données de l'API locale
    const fetchData = async () => {
      try {
        const response = await fetch('../api/crimeData');  // Remplace par l'URL de ton API locale
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchData();
  }, []);

  // Graphique 1: Nombre de forces actives par mois
  const lineChartDataForces = {
    labels: data.months,
    datasets: [
      {
        label: 'Forces Actives',
        data: data.activeForcesMonthly,
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
    ],
  };

  // Graphique 2: Forces actives vs inactives
  const barChartDataForces = {
    labels: ['Actives', 'Inactives'],
    datasets: [
      {
        label: 'Forces',
        data: [data.activeForcesCount, data.inactiveForcesCount],
        backgroundColor: ['#4bc0c0', '#f44336'],
      },
    ],
  };

  // Graphique 3: Nombre de crimes par catégorie
  const barChartDataCrimes = {
    labels: data.crimeCategories,
    datasets: [
      {
        label: 'Crimes par Catégorie',
        data: data.crimeCountByCategory,
        backgroundColor: '#FF5733',
      },
    ],
  };

  // Graphique 4: Crimes mensuels
  const lineChartDataCrimes = {
    labels: data.months,
    datasets: [
      {
        label: 'Crimes Mensuels',
        data: data.monthlyCrimes,
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
      },
    ],
  };

  return (
    <div
      className="h-screen bg-cover bg-no-repeat flex flex-col relative"
      style={{ backgroundImage: `url(${arriere})`, backgroundPosition: '90% 0%' }}
    >
      <img className="absolute z-0 opacity-80" src={blood} alt="Blood Icon" />
      <Header />
      
      {/* Tableau de bord */}
      <div className="container mt-5 relative z-10 text-white">
        <h1 className="text-center mb-5">Tableau de bord</h1>

        {/* Première ligne avec 4 éléments */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card p-3 bg-gray-800">
              <div className="card-title text-xl">Total des Forces</div>
              <div>{data.totalForces}</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card p-3 bg-gray-800">
              <div className="card-title text-xl">Forces Actives</div>
              <div>{data.activeForces}</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card p-3 bg-gray-800">
              <div className="card-title text-xl">Forces Inactives</div>
              <div>{data.inactiveForces}</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card p-3 bg-gray-800">
              <div className="card-title text-xl">Dernière Mise à Jour</div>
              <div>{data.lastUpdate}</div>
            </div>
          </div>
        </div>

        {/* Graphiques */}
        <div className="row">
          <div className="col-md-6">
            <div className="card p-3 bg-gray-800">
              <div className="card-title text-xl">Forces Actives par Mois</div>
              <Line data={lineChartDataForces} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="card p-3 bg-gray-800">
              <div className="card-title text-xl">Forces Actives vs Inactives</div>
              <Bar data={barChartDataForces} />
            </div>
          </div>
        </div>

        {/* Deuxième ligne avec 2 graphiques */}
        <div className="row mt-4">
          <div className="col-md-6">
            <div className="card p-3 bg-gray-800">
              <div className="card-title text-xl">Crimes par Catégorie</div>
              <Bar data={barChartDataCrimes} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="card p-3 bg-gray-800">
              <div className="card-title text-xl">Crimes Mensuels</div>
              <Line data={lineChartDataCrimes} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dash;
