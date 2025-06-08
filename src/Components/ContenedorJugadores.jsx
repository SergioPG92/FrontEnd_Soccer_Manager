import React, { useState, useEffect } from "react";
import {
  crearJugador,
  eliminarJugador,
  verJugadores,
} from "../funciones/jugadores";
import { useParams, useNavigate } from "react-router-dom";

const ContenedorJugadores = ({ onSeleccionarJugador, jugadorSeleccionado }) => {
  /* Declaración de constantes y variables */
  // Se usa useParams para asignar valores pasados al componente por parámetros
  // UseNavigate permite redireccionar la página
  const { equipoId, equipoNombre } = useParams();
  const [jugadores, setJugadores] = useState([]);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [posicion, setPosicion] = useState("");
  const [edad, setEdad] = useState("");
  const navigate = useNavigate();

  /* Función para obtener los jugadores del equipo haciendo llamada a la api a través de la función verJugadores
   y pasándole el id del equipo seleccionado. */
  const handleVerJugadores = async () => {
    const resultado = await verJugadores(equipoId);
    if (resultado) {
      setJugadores(resultado.data.jugadores);
    } else {
      alert(`Error al obtener los jugadores: ${resultado.message}`);
    }
  };

  /*Al renderizarse el componente se llama a la función para ver los jugadores */
  useEffect(() => {
    handleVerJugadores(equipoId);
  }, []);

  /* Función para manejar la creación de jugadores
    Hace la llamada a la función que se encarga de llamar a la api, pasándole los datos
    del nuevo jugador. */ const handleCrearJugador = async (e) => {
    e.preventDefault();

    const resultado = await crearJugador(
      nombre,
      apellido,
      posicion,
      edad,
      equipoId
    );
    if (resultado) {
      navigate(0);
    } else {
      alert(`Error al crear el jugador: ${resultado.message}`);
    }
  };

  /* Función para eliminar un jugador. Primero requiere confirmación del usuario y, en caso afirmativo,
  ejecuta la función encargada de llamar a la api con el id del jugador*/
  const handleEliminarJugador = async (JugadorParaEliminar) => {
    let confirmarBorrarJugador = confirm(
      "¿Está seguro de eliminar el jugador seleccionado?"
    );

    if (confirmarBorrarJugador) {
      const resultado = await eliminarJugador(JugadorParaEliminar);
      if (resultado) {
        navigate(0);
      } else {
        alert(`Error al obtener los jugadores: ${resultado.message}`);
      }
    }
  };

  /* Función para manejar el click en una fila de la tabla para hacer la función asignada a onSeleccionarJugador
  en el componente padre (permite cambiar el componente del calendario para mostrar las participaciones del jugador).*/
  const handleClickJugador = (evento) => {
    if (jugadorSeleccionado == evento.target.parentNode.id) {
      onSeleccionarJugador(null);
    } else {
      onSeleccionarJugador(evento.target.parentNode.id);
    }

    let fila = evento.target.closest("tr");

    if (fila.classList.contains("filaSeleccionada")) {
      let filasSeleccionadas = document.querySelectorAll(".filaSeleccionada");
      for (let elem of filasSeleccionadas) {
        elem.classList.remove("filaSeleccionada");
      }
    } else {
      let filasSeleccionadas = document.querySelectorAll(".filaSeleccionada");
      for (let elem of filasSeleccionadas) {
        elem.classList.remove("filaSeleccionada");
      }
      fila.classList.add("filaSeleccionada");
    }
  };

  return (
    <div className="bg-[url(/imagenes/fondo/fondo_jugadores.jpg)] bg-cover bg-center bg-no-repeat rounded-2xl ">
      <div className=" bg-verde-opacity-2 rounded-2xl shadow p-4 sm:p-6 lg:p-8  min-h-[86vh]">
        <h1 className="text-left text-2xl sm:text-3xl font-bold text-gray-800 mb-4 mt-1 font-fuente3">
          Plantilla
        </h1>

        {/* Tabla responsive */}
        <div className="overflow-x-auto rounded-lg font-fuente2">
          <table className="table-auto w-full min-w-[600px] sm:min-w-full text-center text-gray-200">
            <thead>
              <tr className="bg-dark-verde text-white text-sm sm:text-base">
                <th className="px-2 sm:px-4 py-2 whitespace-nowrap">Nombre</th>
                <th className="px-2 sm:px-4 py-2 whitespace-nowrap">
                  Apellido
                </th>
                <th className="px-2 sm:px-4 py-2 whitespace-nowrap">
                  Posición
                </th>
                <th className="px-2 sm:px-4 py-2 whitespace-nowrap">Edad</th>
                <th className="px-2 sm:px-4 py-2 whitespace-nowrap">Estado</th>
                <th className="px-2 sm:px-4 py-2 whitespace-nowrap">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {jugadores.map((jugador) => (
                <tr
                  key={jugador.jug_id}
                  id={jugador.jug_id}
                  onClick={handleClickJugador}
                  className="even:bg-dark-verde/50 border-b hover:bg-light-verde cursor-pointer text-xs sm:text-sm "
                >
                  <td className="px-2 sm:px-1 py-2 font-semibold">
                    {jugador.jug_nombre}
                  </td>
                  <td className="px-2 sm:px-1 py-2 font-semibold">
                    {jugador.jug_apellido}
                  </td>
                  <td className="px-2 sm:px-1 py-2 font-semibold">
                    {jugador.jug_posicion}
                  </td>
                  <td className="px-2 sm:px-1 py-2 font-semibold">
                    {jugador.jug_edad}
                  </td>
                  <td className="px-2 sm:px-1 py-2 font-semibold">
                    <div className="flex justify-center items-center space-x-2">
                      {jugador.jug_estado === "Disponible" ? (
                        <img
                          src="/imagenes/jug_disponible.svg"
                          alt="Disponible"
                          className="w-4 h-4 sm:w-6 sm:h-6"
                        />
                      ) : jugador.jug_estado === "Sancionado" ? (
                        <img
                          src="/imagenes/jug_sancionado.svg"
                          alt="Sancionado"
                          className="w-4 h-4 sm:w-6 sm:h-6"
                        />
                      ) : (
                        <img
                          src="/imagenes/jug_lesionado.svg"
                          alt="Lesionado"
                          className="w-4 h-4 sm:w-6 sm:h-6"
                        />
                      )}
                      <span className="text-xs sm:text-sm">
                        {jugador.jug_estado}
                      </span>
                    </div>
                  </td>
                  <td className="px-2 sm:px-1 py-2  flex flex-col">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(
                          `/perfilJugador/${equipoNombre}/${jugador.jug_id}`
                        );
                      }}
                      className="my-1 bg-dark-verdiazul text-white px-2 sm:px-3 py-1 rounded mr-1 hover:bg-blue-600 text-xs sm:text-sm"
                    >
                      Ver Perfil
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEliminarJugador(jugador.jug_id);
                      }}
                      className="my-1  bg-red-900 text-white px-2 sm:px-3 py-1 rounded hover:bg-red-600 text-xs sm:text-sm"
                    >
                      Borrar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-7 text-gray-100 font-fuente2 text-sm pt-2 pl-2 bg-dark-verdiazul-opacity p-2 rounded mt-2">
            <span className="font-bold">• Ver participaciones:</span> Haz click
            en la fila del jugador correspondiente.
          </div>
        </div>
        <div className="mt-8 max-w-md mx-auto">
          <form
            onSubmit={handleCrearJugador}
            className="bg-dark-verde p-6 rounded-lg shadow-md"
          >
            <h3 className="text-2xl font-semibold mb-6 text-center text-dorado font-fuente3">
              Agregar Jugador
            </h3>

            <div className="space-y-4 font-fuente2">
              <div>
                <label className="block mb-1 text-sm font-medium text-dorado">
                  Nombre
                </label>
                <input
                  type="text"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 caret-dorado text-dorado focus:outline-none focus:ring-2 focus:ring-dorado"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-dorado">
                  Apellido
                </label>
                <input
                  type="text"
                  placeholder="Apellido"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 caret-dorado text-dorado focus:outline-none focus:ring-2 focus:ring-dorado"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-dorado">
                  Posición
                </label>
                <input
                  type="text"
                  placeholder="Posición"
                  value={posicion}
                  onChange={(e) => setPosicion(e.target.value)}
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 caret-dorado text-dorado focus:outline-none focus:ring-2 focus:ring-dorado"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-dorado">
                  Edad
                </label>
                <input
                  type="number"
                  placeholder="Edad"
                  value={edad}
                  onChange={(e) => setEdad(e.target.value)}
                  required
                  min={0}
                  className="w-full p-3 rounded-lg border border-gray-300 caret-dorado text-dorado focus:outline-none focus:ring-2 focus:ring-dorado"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 py-3 bg-verde text-dark-verdiazul rounded-lg font-semibold hover:bg-green-600 transition cursor-pointer"
            >
              Agregar Jugador
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContenedorJugadores;
