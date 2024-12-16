import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(cors());

// Use import for crimeData
import { crimes } from './src/api/crimeData.js';  // Ensure .js extension is used
import { force } from './src/api/forceData.js'; 

// Utilisation des données dans une route d'Express
app.get('/api/crimes', (req, res) => {
    res.json(crimes);
});

app.get('/api/force', (req, res) => {
  res.json(force);
});
// Define your PORT (if it's missing)
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
