import axios from 'axios';

const fetchCrimes = async (lat, lng) => {
  try {
    const response = await axios.get(
      `https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${lng}`
    );
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    return [];
  }
};

export default fetchCrimes;
