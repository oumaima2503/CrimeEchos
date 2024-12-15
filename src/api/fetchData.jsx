const fetchCrimes = async (latitude, longitude) => {
  const response = await fetch(`https://your-api-endpoint?lat=${latitude}&lng=${longitude}`);
  if (!response.ok) {
    throw new Error('Failed to fetch crimes');
  }
  const data = await response.json();
  return data; // Assume the data is an array of crimes
};
export default fetchCrimes;
