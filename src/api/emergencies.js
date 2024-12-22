// api/emergencies.js
let emergencies = [];

// Fonction qui gère les requêtes HTTP pour les urgences
export default function handler(req, res) {
  if (req.method === 'GET') {
    // Si c'est une requête GET, on renvoie les urgences
    return res.status(200).json(emergencies);
  }

  if (req.method === 'POST') {
    // Si c'est une requête POST, on ajoute de nouvelles urgences
    const { emergencies: newEmergencies } = req.body;
    if (newEmergencies && Array.isArray(newEmergencies)) {
      emergencies = emergencies.concat(newEmergencies);
      return res.status(201).json({ message: 'Emergencies added successfully!' });
    } else {
      return res.status(400).json({ message: 'Invalid data format.' });
    }
  }

  if (req.method === 'DELETE') {
    // Si c'est une requête DELETE, on supprime une urgence par son ID
    const { id } = req.query;
    emergencies = emergencies.filter(emergency => emergency.id !== parseInt(id, 10));
    return res.status(200).json({ message: 'Emergency deleted successfully!' });
  }

  // Si la méthode HTTP n'est pas reconnue, on renvoie un "Method Not Allowed"
  return res.status(405).json({ message: 'Method Not Allowed' });
}
