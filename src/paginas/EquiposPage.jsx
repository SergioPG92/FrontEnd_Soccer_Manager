import React from "react";
import BarraNavegacion from "../Components/BarraNavegacion";
import ContenedorEquipos from "../Components/ContenedorEquipos";
import Footer from "../Components/Footer";

function EquiposPage() {
  return (
    <div className="bg-[url(/imagenes/fondo/soccer_field.jpg)] bg-cover bg-center min-h-screen w-full flex flex-col ">
      <div className="equipos-page bg-dark-verdiazul-opacity flex-grow flex flex-col">
        <BarraNavegacion />
        <main className="flex-grow px-4 sm:px-6 lg:px-8 py-8">
          {/* Contenedor de todos los equipos del entrenador */}
          <ContenedorEquipos />
        </main>
      </div>

      <Footer/>
    </div>
  );
}

export default EquiposPage;
