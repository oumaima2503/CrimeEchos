// api/crimes.js
import { crimes } from '../src/api/crimeData';

export default function handler(req, res) {
  res.status(200).json(crimes);
}
