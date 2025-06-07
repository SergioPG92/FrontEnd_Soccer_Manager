import CalendarioSesiones from "./CalendarioSesiones";
import CalendarioEntrenador from "./CalendarioEntrenador";
import ContenedorTodasSesiones from "./ContenedorTodasSesiones";

function ContenedorEntrenamientos() {
  return (
    <div className="w-full  mx-auto p-4 grid grid-cols-12 gap-6">
      {/* Contenedor de sesiones */}
      <div className="bg-[url(/imagenes/fondo/fondo_jugadores.jpg)] bg-cover bg-center bg-no-repeat rounded-2xl bg-white
                      col-span-12 xl:col-span-6 grid grid-cols-1 gap-6">
        <div className="bg-verde-opacity-2 rounded-2xl shadow">
          <ContenedorTodasSesiones />
        </div>
      </div>

      {/* Calendario entrenador */}
      <div className="col-span-12 xl:col-span-6 shadow rounded-2xl">
        <CalendarioEntrenador />
      </div>
    </div>
  );
}

export default ContenedorEntrenamientos;
