import React, { useState } from "react";
import BarraNavegacion from "../Components/BarraNavegacion";
import { useParams } from "react-router-dom";
import ContenedorJugadores from "../Components/ContenedorJugadores";
import CalendarioSesiones from "../Components/CalendarioSesiones";
import ContenedorSesionesJugador from "../Components/ContenedorParticipacionesJugador";
import Footer from "../Components/Footer";

function EquiposPage() {
  const { equipoId, equipoNombre } = useParams();
  const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null);

  return (
    <div className="bg-[url(/imagenes/fondo/soccer_field.jpg)] bg-cover bg-center min-h-screen flex flex-col">
      <div className="equipos-page bg-dark-verdiazul-opacity flex-grow flex flex-col">
        <BarraNavegacion />
        <h1
          className="text-white text-center font-bold mb-6
                       text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                       max-w-full truncate px-4 py-6 sm:px-8 md:px-12 lg:px-20 font-fuente1"
        >
          {equipoNombre}
        </h1>
        <main className="flex-grow px-4 sm:px-8 md:px-12 lg:px-20 pb-8">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

            {/* Tabla de los jugadores del equipo
            Se le pasa como props la variable jugadorSeleccionado y se le asigna a la función del componente
            'jugadorSeleccionado' para que tenga el valor según se calcule en el componente y poder cambiar el siguiente section*/}
            <section className="col-span-12 xl:col-span-6">
              <ContenedorJugadores
                equipoId={equipoId}
                equipoNombre={equipoNombre}
                onSeleccionarJugador={setJugadorSeleccionado}
                jugadorSeleccionado={jugadorSeleccionado}
              />
            </section>

            {/* Seccíon cambiante calendario de sesiones del equipo / participaciones del jugador seleccionado.*/}
            <section className="col-span-12 xl:col-span-6">
              {!jugadorSeleccionado ? (
                <CalendarioSesiones
                  equipoId={equipoId}
                  equipoNombre={equipoNombre}
                />
              ) : (
                <ContenedorSesionesJugador
                  equipoId={equipoId}
                  jugadorId={jugadorSeleccionado}
                />
              )}
            </section>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default EquiposPage;
