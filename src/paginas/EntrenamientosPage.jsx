import React from "react";
import BarraNavegacion from "../Components/BarraNavegacion";
import Footer from "../Components/Footer";
import ContenedorEntrenamientos from "../Components/ContenedorEntrenamientos";

function EntrenamientosPage() {
  return (
    <div className="bg-[url(/imagenes/fondo/soccer_field.jpg)] bg-cover bg-no-repeat bg-center min-h-screen flex flex-col">
      <div className="flex-grow flex flex-col bg-dark-verdiazul-opacity">
        <BarraNavegacion />
        <main className="flex-grow flex flex-col items-center px-4 py-8 ">
          <h1
            className="text-white text-center font-bold mb-6
                       text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                       max-w-full font-fuente1"
          >
            Entrenamientos
          </h1>

          <div className="w-full">
            {/* Contenedor de entrenamientos (tabla + calendario) */}
            <ContenedorEntrenamientos />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default EntrenamientosPage;
