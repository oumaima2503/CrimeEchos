import React from 'react';
import arriere from './assets/arriere.png';  // Assurez-vous que l'image est dans ce dossier
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import SignUpPage from './pages/Signup';

function App() {
  return (
    <BrowserRouter>
    <Routes>
          <Route index element={<Home />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/Signup' element={<SignUpPage />} />

    </Routes>
    </BrowserRouter>
  );
}

export default App;
