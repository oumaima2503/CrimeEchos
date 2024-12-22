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
import { crimes } from './src/api/crimeData.js'; 
import { force } from './src/api/forceData.js';

app.get('/api/crimes', (req, res) => {
  res.json(crimes);
});

app.get('/api/force', (req, res) => {
  res.json(force);
});

const categoriesWithStandards = {
  Theft: [
    "Ensure that all doors and windows in your home are secured...",
    "Keep your valuables, such as jewelry, electronics...",
    // (other standards)
  ],
  // Add other categories as needed
};

app.get('/api/security', (req, res) => {
  const result = Object.entries(categoriesWithStandards).map(([category, standards]) => ({
    category,
    standards
  }));

  res.json(result);
});

// Export default as a handler for Vercel
export default app;
