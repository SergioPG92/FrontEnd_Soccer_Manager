import React, { useEffect, useState } from "react";
import BarraNavegacion from "../Components/BarraNavegacion";
import { useNavigate, useParams } from "react-router-dom";
import { perfilJugador, updateJugador } from "../funciones/jugadores";
import Footer from "../Components/Footer";

function PerfilJugadorPage() {
  /* Declaración de constantes y variables.
  Se usa useParams para asignar valores pasados al componente por parámetros
  UseNavigate permite redireccionar la página */
  const { jugadorParaPerfil, equipoNombre } = useParams();
  const [jugador, setJugador] = useState(null);
  const navigate = useNavigate();
  const [idEquipo, setIdEquipo] = useState("");
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoApellido, setNuevoApellido] = useState("");
  const [nuevaPosicion, setNuevaPosicion] = useState("");
  const [nuevaEdad, setNuevaEdad] = useState("");
  const [nuevoEstado, setNuevoEstado] = useState("");

  /* Cada vez que jugadorParaPerfil cambie se realizará el fetchJugador, llamando a las funciones necesarias y a la api
  para conseguir el perfil del jugador que se requiere respecto al jugadorParaPerfil (id).
  Si es correcto se guarda la información recibida en Jugador */
  useEffect(() => {
    const fetchJugador = async () => {
      const resultado = await perfilJugador(jugadorParaPerfil);
      if (resultado) {
        setJugador(resultado.data);
      } else {
        alert(`Error al obtener los jugadores: ${resultado.message}`);
      }
    };
    fetchJugador();
  }, [jugadorParaPerfil]);

  /* Cada vez que jugador cambie se asignan los valores de su perfil a las variables declaradas previamente. */
  useEffect(() => {
    if (jugador) {
      setNuevoNombre(jugador.jug_nombre);
      setNuevoApellido(jugador.jug_apellido);
      setNuevaPosicion(jugador.jug_posicion);
      setNuevaEdad(jugador.jug_edad);
      setNuevoEstado(jugador.jug_estado);
      setIdEquipo(jugador.jug_equipo);
    }
  }, [jugador]);

  /* Función para manejar la actualización de los datos del jugador.
  Si la actualización es exitosa se recarga la página. */
  const handleUpdateJugador = async (e) => {
    e.preventDefault();
    const resultado = await updateJugador(
      jugadorParaPerfil,
      nuevoNombre,
      nuevoApellido,
      nuevaPosicion,
      nuevaEdad,
      nuevoEstado
    );
    if (resultado) {
      navigate(0);
    }
  };

  /* Mientras no exista jugador (perfil desde la api) Se muestra contenido provisional */
  if (!jugador) {
    return (
      <div className="bg-[url(/imagenes/fondo/soccer_field.jpg)] bg-cover bg-center rounded-2xl min-h-screen flex flex-col">
        <header>
          <BarraNavegacion />
        </header>
        <main className="flex-grow flex items-center justify-center bg-dark-verdiazul-opacity text-white font-bold text-center px-4">
          Cargando perfil del jugador...
        </main>
        <Footer />
      </div>
    );
  }

  /* Si existe el perfil del jugador se muestra el contenido total de la página.
  Incluyendo el formulario con funciones para asignar valores de los input a las variables que se pasarán a la api y 
  el evento onSubmit que llama al manejador del update.  */
  return (
    <div className="bg-[url(/imagenes/fondo/soccer_field.jpg)] bg-cover bg-center rounded-2xl min-h-screen flex flex-col">
      <BarraNavegacion />
      <main className="bg-dark-verdiazul-opacity flex-grow flex flex-col min-h items-center px-4 py-6 sm:py-8">
        <button
          onClick={() => navigate(`/equipo/${idEquipo}/${equipoNombre}`)}
          className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded mb-6 self-start max-w-max font-fuente2"
        >
          Volver a Equipo
        </button>

        <div
          className="bg-[url(/imagenes/fondo/fondo_perfil_jugador.jpg)] bg-cover bg-center rounded-2xl max-w-3xl w-full shadow-lg bg-dark-verde-opacity-minima"
          style={{ backdropFilter: "brightness(0.5)" }}
        >
          <div className="bg-dark-verde-opacity-minima shadow-lg rounded-lg w-full max-w-3xl p-8">
            <h2 className="text-2xl font-bold text-center mb-6 text-dorado font-fuente3">
              Perfil de Jugador
            </h2>

            <div className="flex justify-center mb-6">
              <img
                className="w-40"
                src="/imagenes/logo_usuario_perfil_temporal-white.svg"
                alt="Perfil del jugador"
              />
            </div>

            <form onSubmit={handleUpdateJugador} className="space-y-6 font-fuente2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="jug_nombre"
                    className="block mb-1 text-sm font-medium text-dorado"
                  >
                    Nombre
                  </label>
                  <input
                    id="jug_nombre"
                    type="text"
                    name="jug_nombre"
                    value={nuevoNombre}
                    onChange={(e) => setNuevoNombre(e.target.value)}
                    className="w-full rounded-lg border border-dorado bg-dark-verde p-3 text-dorado caret-dorado focus:outline-none focus:ring-2 focus:ring-dorado"
                  />
                </div>

                <div>
                  <label
                    htmlFor="jug_apellido"
                    className="block mb-1 text-sm font-medium text-dorado"
                  >
                    Apellido
                  </label>
                  <input
                    id="jug_apellido"
                    type="text"
                    name="jug_apellido"
                    value={nuevoApellido}
                    onChange={(e) => setNuevoApellido(e.target.value)}
                    className="w-full rounded-lg border border-dorado bg-dark-verde p-3 text-dorado caret-dorado focus:outline-none focus:ring-2 focus:ring-dorado"
                  />
                </div>

                <div>
                  <label
                    htmlFor="jug_posicion"
                    className="block mb-1 text-sm font-medium text-dorado"
                  >
                    Posición
                  </label>
                  <input
                    id="jug_posicion"
                    type="text"
                    name="jug_posicion"
                    value={nuevaPosicion}
                    onChange={(e) => setNuevaPosicion(e.target.value)}
                    className="w-full rounded-lg border border-dorado bg-dark-verde p-3 text-dorado caret-dorado focus:outline-none focus:ring-2 focus:ring-dorado"
                  />
                </div>

                <div>
                  <label
                    htmlFor="jug_edad"
                    className="block mb-1 text-sm font-medium text-dorado"
                  >
                    Edad
                  </label>
                  <input
                    id="jug_edad"
                    type="number"
                    name="jug_edad"
                    value={nuevaEdad}
                    onChange={(e) => setNuevaEdad(e.target.value)}
                    className="w-full rounded-lg border border-dorado bg-dark-verde p-3 text-dorado caret-dorado focus:outline-none focus:ring-2 focus:ring-dorado"
                  />
                </div>

                <div>
                  <label
                    htmlFor="jug_equipo"
                    className="block mb-1 text-sm font-medium text-dorado"
                  >
                    Equipo
                  </label>
                  <input
                    id="jug_equipo"
                    type="text"
                    name="jug_equipo"
                    value={equipoNombre || ""}
                    readOnly
                    className="w-full rounded-lg border border-dorado bg-dark-verde p-3 text-dorado caret-dorado cursor-not-allowed"
                  />
                </div>

                <div>
                  <label
                    htmlFor="jug_estado"
                    className="block mb-1 text-sm font-medium text-dorado"
                  >
                    Estado
                  </label>
                  <select
                    id="jug_estado"
                    name="jug_estado"
                    value={nuevoEstado}
                    onChange={(e) => setNuevoEstado(e.target.value)}
                    className="w-full rounded-lg border border-dorado bg-dark-verde p-3 text-dorado focus:outline-none focus:ring-2 focus:ring-dorado"
                  >
                    <option value="Disponible">Disponible</option>
                    <option value="Sancionado">Sancionado</option>
                    <option value="Lesionado">Lesionado</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-verde hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition"
              >
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default PerfilJugadorPage;
