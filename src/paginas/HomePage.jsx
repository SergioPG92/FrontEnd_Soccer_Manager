import React from "react";
import { isUserLoggedIn } from "../funciones/entrenador";
import { Link } from "react-router-dom";
import BarraNavegacion from "../Components/BarraNavegacion";
import BienvenidaSinCuenta from "../Components/BienvenidaSinCuenta";
import Footer from "../Components/Footer";

function HomePage() {
  return (
    <div className="bg-[url(/imagenes/fondo/soccer_field.jpg)] bg-cover bg-no-repeat bg-center min-h-screen w-full flex flex-col">
      {/* Barra de navegación */}
      <BarraNavegacion />

      {/* Contenido general */}
      {isUserLoggedIn() ? (
        <div className="bg-dark-verdiazul-opacity flex-1 flex justify-center items-center px-4 flex-grow min-h-[60vh] font-fuente3 ">
          <div className="grid grid-cols-12 gap-6 w-full max-w-5xl">
            <div className="pt-5 md:pt-0 col-span-12 md:col-span-6 flex justify-center items-center h-72">
              <Link to="/equipos" className="w-full max-w-sm h-full">
                <button className="bg-verde text-white w-full h-full rounded-3xl text-2xl font-bold transition transform hover:bg-green-700 hover:scale-105 focus:outline-none flex flex-col justify-center items-center cursor-pointer">
                  <img
                    className="h-24 mb-5 object-contain"
                    src="/imagenes/logo_equipos.svg"
                  />
                  <p>Equipos</p>
                </button>
              </Link>
            </div>

            <div className="col-span-12 md:col-span-6 flex justify-center items-center h-72">
              <Link to="/todosJugadores" className="w-full max-w-sm h-full">
                <button className="bg-verde text-white w-full h-full rounded-3xl text-2xl font-bold transition transform hover:bg-green-700 hover:scale-105 focus:outline-none flex flex-col justify-center items-center cursor-pointer">
                  <img
                    className="h-24 mb-5 object-contain"
                    src="/imagenes/logo_jugadores.svg"
                  />
                  <p>Jugadores</p>
                </button>
              </Link>
            </div>

            <div className="col-span-12 md:col-span-6 flex justify-center items-center h-72">
              <Link to="/profile" className="w-full max-w-sm h-full">
                <button className="bg-verde text-white w-full h-full rounded-3xl text-2xl font-bold transition transform hover:bg-green-700 hover:scale-105 focus:outline-none flex flex-col justify-center items-center cursor-pointer">
                  <img
                    className="h-24 mb-5 object-contain"
                    src="/imagenes/logo_perfil_entrenador.svg"
                  />
                  <p>Perfil de entrenador</p>
                </button>
              </Link>
            </div>

            <div className="pb-5 md:pb-0 col-span-12 md:col-span-6 flex justify-center items-center h-72">
              <Link to="/entrenamientos" className="w-full max-w-sm h-full">
                <button className="bg-verde text-white w-full h-full rounded-3xl text-2xl font-bold transition transform hover:bg-green-700 hover:scale-105 focus:outline-none flex flex-col justify-center items-center cursor-pointer">
                  <img
                    className="h-24 mb-5 object-contain"
                    src="/imagenes/logo_entrenamientos.svg"
                  />
                  <p>Entrenamientos</p>
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex justify-center items-center px-4 min-h-[60vh]">
          {/* Componente de bienvenida sin cuenta (login/register) en caso de que el entrenador no esté logeado */}
          <BienvenidaSinCuenta />
        </div>
      )}
      <Footer />
    </div>
  );
}

export default HomePage;
