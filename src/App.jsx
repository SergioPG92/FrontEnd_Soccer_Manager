import React from 'react';
import './App.css';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './paginas/HomePage';
import LoginPage from './paginas/LoginPage';
import RegisterPage from './paginas/RegisterPage'; 
import ProfilePage from './paginas/PerfilEntrenadorPage'; 
import EquiposPage from './paginas/EquiposPage'; 
import EquipoSeleccionadoPage from './paginas/EquipoSeleccionadoPage';
import PerfilJugadorPage from './paginas/PerfilJugadorPage';
import JugadoresPage from './paginas/JugadoresPage';
import EntrenamientosPage from './paginas/EntrenamientosPage';

function App() {

  document.title= 'Soccer Manager';
  return (
    /* Declaración de las rutas y al componente que llaman con react-router */
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path="/equipos" element={<EquiposPage/>} />
        <Route path="/equipo/:equipoId/:equipoNombre" element={<EquipoSeleccionadoPage/>} />
        <Route path="/perfilJugador/:equipoNombre/:jugadorParaPerfil" element={<PerfilJugadorPage/>} />
        <Route path="/todosJugadores" element={<JugadoresPage/>} />
        <Route path="/entrenamientos" element={<EntrenamientosPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
