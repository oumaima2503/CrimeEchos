import { json } from '@vercel/node';

let emergencies = [];

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(emergencies);
  } else if (req.method === 'POST') {
    const { emergencies: newEmergencies } = req.body;
    if (newEmergencies && Array.isArray(newEmergencies)) {
      emergencies = emergencies.concat(newEmergencies);
      res.status(201).json({ message: 'Emergencies added successfully!' });
    } else {
      res.status(400).json({ message: 'Invalid data format.' });
    }
  } else if (req.method === 'DELETE') {
    const id = parseInt(req.query.id, 10);
    emergencies = emergencies.filter(emergency => emergency.id !== id);
    res.status(200).json({ message: 'Emergency deleted successfully!' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
