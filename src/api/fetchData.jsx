import axios from 'axios';

const fetchForces = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/force');
    return response.data; // Retourne les données des forces
  } catch (error) {
    console.error('Erreur lors de la récupération des données des forces:', error);
    return [];
  }
};

export default fetchForces;
