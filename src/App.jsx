import React from 'react';
import arriere from './assets/arriere.png';  // Assurez-vous que l'image est dans ce dossier
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
<<<<<<< HEAD
import SignUpPage from './pages/Signup';
=======
import Dash from './pages/Dash';
import List from './pages/List';
import Witness from './pages/Witness';
import Map from './pages/Map';
>>>>>>> 15ac1dd1ab39f8e2987d478a62c5cd8b4a006e0d

function App() {
  return (
    <BrowserRouter>
    <Routes>
          <Route index element={<Home />} />
          <Route path='/Home' element={<Home />} />
<<<<<<< HEAD
          <Route path='/Signup' element={<SignUpPage />} />

=======
          <Route path='/DashBoard' element={<Dash />} />
          <Route path='/List_Crimes' element={<List />} />
          <Route path='/Witness' element={<Witness />} />
          <Route path='/Map' element={<Map/>} />
          
>>>>>>> 15ac1dd1ab39f8e2987d478a62c5cd8b4a006e0d
    </Routes>
    </BrowserRouter>
  );
}

export default App;
