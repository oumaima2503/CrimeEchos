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
    // Other categories...
  };
  
  export default function handler(req, res) {
    if (req.method === 'GET') {
      const result = Object.entries(categoriesWithStandards).map(([category, standards]) => ({
        category,
        standards
      }));
      res.status(200).json(result);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
  