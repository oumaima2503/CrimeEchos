import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Tableau en mémoire pour stocker les données
let emergencies = [];

// Endpoint pour récupérer les urgences
app.get('/api/emergencies', (req, res) => {
  res.json(emergencies);
});

// Endpoint pour ajouter une urgence
app.post('/api/emergencies', (req, res) => {
  const { emergencies: newEmergencies } = req.body;
  if (newEmergencies && Array.isArray(newEmergencies)) {
    emergencies = emergencies.concat(newEmergencies);
    res.status(201).json({ message: 'Emergencies added successfully!' });
  } else {
    res.status(400).json({ message: 'Invalid data format.' });
  }
});

// Endpoint pour supprimer une urgence par ID
app.delete('/api/emergencies/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  emergencies = emergencies.filter(emergency => emergency.id !== id);
  res.json({ message: 'Emergency deleted successfully!' });
});






// Utilisation des données dans une route d'Express
import { crimes } from './src/api/crimeData.js'; // Assurez-vous que les données sont bien importées
import { force } from './src/api/forceData.js';

app.get('/api/crimes', (req, res) => {
  res.json(crimes);
});

app.get('/api/force', (req, res) => {
  res.json(force);
});

export default app;



const categoriesWithStandards = {
  Theft: [
    "Ensure that all doors and windows in your home are secured with high-quality locks and reinforced frames. Consider installing a home security system with cameras and motion sensors to monitor your property.",
    "Keep your valuables, such as jewelry, electronics, and cash, stored in a secure safe or hidden location within your home. Avoid leaving them visible from windows or in easily accessible areas.",
    "When in public, be mindful of your belongings by keeping bags closed and close to your body. Never leave personal items unattended, even for a moment.",
    "If you park your vehicle, ensure it is in a well-lit and monitored area. Remove all visible items from the car, including bags, electronic devices, and documents.",
    "Form or join a neighborhood watch group to collectively monitor and report suspicious activities. A united community can deter potential thieves."
  ],
  Murder: [
    "Avoid walking alone in isolated or poorly lit areas, especially late at night. If you must, stay alert and carry a personal alarm or other self-defense tools.",
    "Inform a trusted friend or family member of your plans, including your destination and estimated return time, whenever you go out.",
    "Enroll in a self-defense class to learn techniques for protecting yourself in dangerous situations. Practice regularly to ensure you are prepared if needed.",
    "Use ride-sharing apps or public transportation options that allow you to share your location with someone you trust in real-time.",
    "If you encounter a potentially violent situation, prioritize de-escalating the conflict or leaving the area safely rather than engaging further."
  ],
  Fraud: [
    "Never share sensitive information, such as passwords, banking details, or social security numbers, with anyone unless you are absolutely certain of their identity and intentions.",
    "Double-check the legitimacy of websites before entering your personal or financial information. Look for 'https://' in the URL and verify the site's credentials.",
    "Be cautious of emails or messages claiming urgent action is required, especially if they involve requests for money or personal details. These are often phishing attempts.",
    "Regularly monitor your bank statements and credit reports for unauthorized transactions or suspicious activities. Report any discrepancies immediately.",
    "Educate yourself and others about common scams and fraudulent practices to recognize red flags and protect yourself effectively."
  ],
  Assault: [
    "Stay aware of your surroundings at all times, especially when walking in unfamiliar or isolated areas. Avoid distractions like texting or using headphones.",
    "Travel in groups whenever possible, particularly at night. Attackers are less likely to target individuals who are not alone.",
    "Carry self-defense tools such as pepper spray, a personal alarm, or a whistle. Ensure you are familiar with how to use them effectively.",
    "If you feel unsafe, trust your instincts and leave the area. Do not hesitate to seek help from nearby people or call emergency services.",
    "Take self-defense training to learn how to react effectively in threatening situations. These skills can increase your confidence and ability to respond quickly."
  ],
  Cybercrime: [
    "Use strong, unique passwords for each of your accounts and update them regularly. Consider using a password manager to keep track of them securely.",
    "Enable two-factor authentication (2FA) for all online accounts. This adds an additional layer of protection, even if your password is compromised.",
    "Be skeptical of unsolicited emails or messages asking for personal or financial information. Avoid clicking on links or downloading attachments unless you are sure of their legitimacy.",
    "Install and regularly update antivirus and firewall software on your devices to protect against malware and unauthorized access.",
    "Educate yourself on common online threats, such as phishing, ransomware, and identity theft, to better recognize and avoid potential risks."
  ],
  Vandalism: [
    "Install motion-activated security lights and cameras around your property to deter potential vandals and capture evidence if an incident occurs.",
    "Join or create a community watch program to monitor your neighborhood and report suspicious activities to local authorities promptly.",
    "Keep the exterior of your property well-maintained and visible by trimming bushes and trees that could provide cover for vandals.",
    "Engage with local law enforcement and request regular patrols in areas prone to vandalism. Their presence can act as a deterrent.",
    "Consider using materials that are resistant to vandalism, such as graffiti-resistant paint or shatterproof glass, for vulnerable surfaces."
  ],
  "Drug trafficking": [
    "Report any suspicious activities, such as frequent visits to a property at odd hours, to local authorities anonymously if necessary.",
    "Educate young people and community members about the dangers of drug abuse and the impact of drug trafficking on society.",
    "Participate in local initiatives aimed at reducing drug-related activities, such as anti-drug campaigns and neighborhood programs.",
    "Avoid associating with individuals known to be involved in drug-related activities, even casually. Their actions can have unintended consequences.",
    "Support rehabilitation programs for those recovering from drug addiction to reduce demand and prevent relapse into criminal activities."
  ],
  Arson: [
    "Install smoke detectors in every room of your home and test them regularly to ensure they are functional. Replace batteries as needed.",
    "Store flammable materials such as gasoline, cleaning supplies, and paper away from heat sources and in proper containers.",
    "Do not leave candles or cooking appliances unattended. Always extinguish them when leaving the room or going to sleep.",
    "Educate family members and neighbors about fire safety practices, including emergency evacuation plans and safe handling of open flames.",
    "Work with your community to identify and report suspicious behaviors that could indicate an arson threat."
  ],
  Kidnapping: [
    "Teach children to never accept rides or gifts from strangers and to always inform you of their whereabouts.",
    "Use GPS tracking devices for children or vulnerable individuals, allowing you to monitor their location in real time.",
    "Establish a family code word that can be used to verify the identity of trusted individuals in emergencies.",
    "Be vigilant in crowded places, such as malls or parks, where kidnappers might target distracted individuals.",
    "Report any unusual behavior, such as someone loitering near schools or parks, to local authorities immediately."
  ],
  "Human trafficking": [
    "Learn to recognize the signs of human trafficking, such as individuals with unexplained injuries, restricted movements, or fear of authority figures.",
    "Avoid sharing personal details or travel plans with strangers, especially online, where traffickers often prey on unsuspecting individuals.",
    "Travel with a trusted companion in unfamiliar areas, particularly where human trafficking is known to occur.",
    "If you suspect someone may be a victim of trafficking, report it to the appropriate hotline or local authorities for immediate action.",
    "Support organizations that work to combat human trafficking by volunteering, donating, or spreading awareness in your community."
  ]
};

// Route API
app.get('/api/security', (req, res) => {
  const result = Object.entries(categoriesWithStandards).map(([category, standards]) => ({
    category,
    standards
  }));

  res.json(result);
});








// Define your PORT (if it's missing)
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
