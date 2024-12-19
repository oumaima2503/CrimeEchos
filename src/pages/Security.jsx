import React, { useState, useEffect } from 'react';
import '../App.css';
import blood from '../assets/blood.svg';
import arriere from '../assets/arriere.png';
import Header from '../component/Header';

function Security() {
  const [securityStandards, setSecurityStandards] = useState([]);
  const [filteredStandards, setFilteredStandards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Remplace cette URL par l'URL de ton API
    fetch('http://localhost:3000/api/security')
      .then((response) => response.json())
      .then((data) => {
        setSecurityStandards(data);
        setFilteredStandards(data);
      });
  }, []);

  // Fonction de filtrage des catégories
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    const filtered = securityStandards.filter((category) =>
      category.category.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredStandards(filtered);
  };

  // Fonction pour ouvrir le modal
  const openModal = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  // Fonction pour fermer le modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  return (
    <div
      className="h-screen bg-cover bg-no-repeat flex flex-col relative"
      style={{ backgroundImage: `url(${arriere})`, backgroundPosition: '90% 0%' }}
    >
      <img className="absolute -z-10 opacity-80" src={blood} alt="Blood Icon" />
      <Header />
      <div className="flex justify-between pl-10 mr-10 z-0">
        <div>
          <h1 className="text-2xl font-bold text-[#580B0B] nosifer max-[700px]:text-lg max-[480px]:text-xs max-[700px]:mt-2 max-[480px]:mt-4">
            Security
          </h1>
          <h1 className="text-2xl font-bold text-white -mt-9 nosifer max-[700px]:text-lg max-[480px]:text-xs max-[480px]:-mt-6">
            Security
          </h1>
        </div>
        
      {/* Champ de recherche */}
      <div className="flex justify-center w-64">
        <input
          type="text"
          placeholder="Search by category..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 border border-gray-300 rounded-lg w-3/4 max-w-lg"
        />
      </div>
      </div>

      {/* Section avec contenu scrollable */}
      <div className="flex justify-center items-center mt-8 px-10 py-4">
        <div className="w-full max-w-4xl bg-white/90 p-4 rounded-lg shadow-lg max-h-[50vh] overflow-y-auto">
          {filteredStandards.length === 0 ? (
            <p className="text-center text-gray-600">No categories found.</p>
          ) : (
            filteredStandards.map((category, index) => (
              <div key={index} className="mb-6">
                <h2 className="text-xl font-bold text-[#580B0B]">{category.category}</h2>
                <div className="mt-4">
                  {/* Affichage des 2 premiers conseils par catégorie */}
                  <ul className="list-disc pl-5">
                    {category.standards.slice(0, 2).map((standard, idx) => (
                      <li key={idx} className="text-gray-800">{standard}</li>
                    ))}
                  </ul>
                </div>

                {/* Bouton "See More" pour ouvrir le modal */}
                <button
                  onClick={() => openModal(category)}
                  className="mt-4 bg-[#580B0B] text-white py-2 px-4 rounded-full hover:bg-[#4b0808]"
                >
                  See More
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-3/4 max-w-3xl">
            <h2 className="text-2xl font-bold text-[#580B0B] mb-4">{selectedCategory.category}</h2>
            <div className="overflow-x-auto">
              <ul className="list-disc pl-5">
                {selectedCategory.standards.map((standard, idx) => (
                  <li key={idx} className="text-gray-800">{standard}</li>
                ))}
              </ul>
            </div>
            <button
              onClick={closeModal}
              className="mt-4 bg-[#580B0B] text-white py-2 px-4 rounded-full hover:bg-[#4b0808]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Security;
