import { force } from './src/api/forceData.js';

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(force);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
