import React from "react";
import BarraNavegacion from "../Components/BarraNavegacion";
import Footer from "../Components/Footer";
import ContenedorTodosJugadores from "../Components/ContenedorTodosJugadores";

function JugadoresPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[url(/imagenes/fondo/soccer_field.jpg)] bg-cover bg-center bg-no-repeat">
      <BarraNavegacion />
      <main className="flex-grow flex justify-center bg-dark-verdiazul-opacity px-4 py-6 md:px-8 ">
        <div className="w-full max-w-7xl">
          {/* Contenedor de todos los jugadores de los equipos del entrenador logeado */}
          <ContenedorTodosJugadores />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default JugadoresPage;
