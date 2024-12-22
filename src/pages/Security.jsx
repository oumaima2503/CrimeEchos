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
  const [currentPage, setCurrentPage] = useState(1);
  const [standardsPerPage] = useState(5); // Number of items per page

  useEffect(() => {
    fetch('http://localhost:3000/api/security')
      .then((response) => response.json())
      .then((data) => {
        setSecurityStandards(data);
        setFilteredStandards(data);
      });
  }, []);

  const handleSearchChange = (event) => {
    const searchQuery = event.target.value;
    const filtered = securityStandards.filter((category) =>
      category.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredStandards(filtered);
    setCurrentPage(1); // Reset to the first page when the search changes
  };

  const openModal = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  // Logic for paginating
  const indexOfLastStandard = currentPage * standardsPerPage;
  const indexOfFirstStandard = indexOfLastStandard - standardsPerPage;
  const currentStandards = filteredStandards.slice(indexOfFirstStandard, indexOfLastStandard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredStandards.length / standardsPerPage);

  return (
    <div
      className="h-screen bg-cover bg-no-repeat flex flex-col relative"
      style={{ backgroundImage: `url(${arriere})`, backgroundPosition: '90% 0%' }}
    >
      <img className="absolute -z-10 opacity-80" src={blood} alt="Blood Icon" />
      <Header />
      <div className="flex justify-between pl-10 mr-10 z-0 ">
        <div>
          <h1 className="text-2xl font-bold text-[#580B0B] nosifer max-[700px]:text-lg max-[480px]:text-xs max-[700px]:mt-2 max-[480px]:mt-4">
            Security
          </h1>
          <h1 className="text-2xl font-bold text-white -mt-9 nosifer max-[700px]:text-lg max-[480px]:text-xs max-[480px]:-mt-6">
            Security
          </h1>
        </div>

        <div className="flex justify-center w-64 max-[600px]:w-40  ">
          <input
            type="text"
            placeholder="Search by category..."
            onChange={handleSearchChange}
            className="px-4 py-2 border max-[600px]:text-xs
             border-gray-300 bg-white/90  rounded-lg w-3/4 max-w-lg"
          />
        </div>
      </div>

      <div className="flex justify-center items-center px-10 py-4 h-full overflow-y-scroll
         no-scrollbar flex-grow ">
        <div className="w-full p-4 rounded-lg shadow-lg h-full overflow-y-scroll
         no-scrollbar flex-grow  ">
          {currentStandards.length === 0 ? (
            <p className="text-center text-gray-600">No categories found.</p>
          ) : (
            currentStandards.map((category, index) => (
              <div key={index} className="mb-6 flex justify-center  items-center">
                <div className=" p-4 bg-black/40 rounded-lg shadow-lg w-11/12 max-[700px]:w-full  items-center  ">
                  <h2 className="text-xl font-bold text-white koulen neon">{category.category}</h2>
                  <div className="mt-4">
                    <ul className="list-disc pl-5">
                      {category.standards.slice(0, 2).map((standard, idx) => (
                        <li key={idx} className="text-white font-semibold text-lg max-[700px]:text-sm">{standard}</li>
                      ))}
                    </ul>
                  </div>
                      <div className='flex justify-end'>
                  <button
                    onClick={() => openModal(category)} // Pass category to modal
                    className="mt-4 text-yellow-500/80 py-2 px-4 rounded-full font-bold koulen"
                  >
                    ...  See More
                  </button></div>
                </div>
              </div>
            ))
          )}
          {/* Pagination controls */}
      <div className="flex justify-center gap-4  ">
      
        
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          

          className="bg-[#982222]  min-[720px]:text-lg * min-[720px]:w-24 h-10  text-white koulen px-4 py-1 rounded disabled:opacity-50 max-[500px]:px-2 max-[500px]:w-16   text-xs max-[500px]:h-8 max-[750px]:w-20  max-[750px]:h-8 mt-2 "
        >
          Previous
        </button>
        <span className="text-sm font-medium text-white koulen py-2 max-[750px]: mt-2   min-[720px]:text-lg  ">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-[#982222] text-white koulen min-[720px]:text-lg min-[720px]:w-24 h-10  px-8 py-1 rounded disabled:opacity-50 max-[500px]:px-4 text-xs max-[500px]:h-8 max-[750px]:px-8  max-[750px]:h-8 mt-2 "

        >
          Next
        </button>
      </div>
        </div>
        
      </div>

      

      {isModalOpen && selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50
         ">
          <div
            className="w-1/2 max-[1000px]:w-full  relative p-6 rounded-lg bg-black bg-opacity-50  text-white shadow-lg max-[900px]:text-[15px] max-[600px]:text-[10px]"
            style={{
              backgroundImage: `url(${arriere})`,
              backgroundPosition: '90% 30%',
              backgroundBlendMode: 'overlay',
              opacity: 0.9,
            }}
          >
            <div className="text-white text-2xl flex items-end justify-end -mt-2 mb-4 cursor-pointer hover:text-[#982222] " onClick={closeModal}>
              X{/* Close Icon */}
            </div>
            <h2 className="text-2xl font-bold text-white mb-4 nosifer neon max-[700px]:">{selectedCategory.category}</h2>
            <div className="overflow-x-auto no-scrollbar">
              <ul className="list-disc pl-5 text-white font-[Koulen] py-2">
                {selectedCategory.standards.map((standard, idx) => (
                  <li key={idx} className='py-2'>{standard}</li>
                ))}
              </ul>
            </div>
            <div className="flex justify-end">
            <button
              onClick={closeModal}
             className="bg-[#982222] text-white px-6 py-2 koulen mt-4 max-[600px]:text-[10px] max-[600px]:px-3 max-[600px]:py-1 text-sm rounded transition-transform transform hover:scale-105 hover:bg-[#c12c2c] shadow-lg"
            >
              Close
            </button>  </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Security;
