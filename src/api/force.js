// api/force.js
import { force } from '../src/api/forceData';

export default function handler(req, res) {
  res.status(200).json(force);
}
