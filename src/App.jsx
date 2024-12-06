import React from 'react';
import arriere from './assets/arriere.png';  // Assurez-vous que l'image est dans ce dossier
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';

import SignUpPage from './pages/Signup';
import SigninPage from './pages/Login';

import Dash from './pages/Dash';
import List from './pages/List';
import Witness from './pages/Witness';
import Map from './pages/Map';


function App() {
  return (
    <BrowserRouter>
    <Routes>
          <Route index element={<Home />} />
          <Route path='/Home' element={<Home />} />

          <Route path='/Signup' element={<SignUpPage />} />
          <Route path='/Login' element={<SigninPage />} />
          <Route path='/DashBoard' element={<Dash />} />
          <Route path='/List_Crimes' element={<List />} />
          <Route path='/Witness' element={<Witness />} />
          <Route path='/Map' element={<Map/>} />
          
    </Routes>
    </BrowserRouter>
  );
}

export default App;
