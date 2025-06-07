import React, { useState, useEffect } from "react";
import { verTodosJugadores } from "../funciones/jugadores";
import { useNavigate } from "react-router-dom";

function ContenedorTodosJugadores() {
  // Declaración de variables
  const [jugadores, setJugadores] = useState(null);
  const navigate = useNavigate();
  const [entrenadorId, setEntrenadorId] = useState(null);

  // Función para manejar la consulta de todos los jugadores del entrenador
  const handleTodosJugadores = async () => {
    const resultado = await verTodosJugadores(entrenadorId);
    if (resultado.success) {
      setJugadores(resultado.data.jugadores);
    }
  };

  // Llamada al handle de todos los jugadores del entrenador una vez se consiga el id del entrenador.
  useEffect(() => {
    if (entrenadorId) {
      handleTodosJugadores();
    }
  }, [entrenadorId]);

  // Efecto para obtener el id del entrenador desde el localStorage al montar el componente
  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("userData"));
    setEntrenadorId(userData.ent_id);
  }, []);

  return (
    <div className="bg-[url(/imagenes/fondo/fondo_jugadores.jpg)] bg-cover bg-center bg-no-repeat rounded-2xl my-5">
      <div className="bg-verde-opacity-2 rounded-2xl shadow p-4  min-h-[86vh]">
        {!jugadores ? (
          <h1 className="text-center text-3xl font-bold text-dark-verdiazul mb-6 mt-1 font-fuente3">
            Cargando jugadores...
          </h1>
        ) : (
          <h1 className="text-center text-3xl font-bold text-dark-verdiazul mb-6 mt-1 font-fuente3">
            Jugadores de todos los equipos
          </h1>
        )}

        <div className="overflow-x-auto font-fuente2">
          <table className="table-auto w-full min-w-[600px] text-sm md:text-base">
            <thead>
              <tr className="bg-dark-verde text-white">
                <th className="px-2 py-1 md:px-4 md:py-2">Nombre</th>
                <th className="px-2 py-1 md:px-4 md:py-2">Apellido</th>
                <th className="px-2 py-1 md:px-4 md:py-2">Posición</th>
                <th className="px-2 py-1 md:px-4 md:py-2">Edad</th>
                <th className="px-2 py-1 md:px-4 md:py-2">Estado</th>
                {jugadores && (
                  <>
                    <th className="hidden md:table-cell px-2 py-1 md:px-4 md:py-2">
                      Equipo
                    </th>
                    <th className="hidden md:table-cell px-2 py-1 md:px-4 md:py-2">
                      Nota Media
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="text-center text-gray-200">
              {jugadores &&
                jugadores.map((jugador) => (
                  <tr
                    key={jugador.jug_id}
                    className="border-b bg-dark-verde-2 hover:bg-light-verde even:bg-dark-verde/50"
                  >
                    <td
                      className="px-2 py-1 md:px-4 md:py-2 font-semibold cursor-pointer hover:text-dark-verdiazul transition"
                      onClick={() =>
                        navigate(
                          `/perfilJugador/${jugador.equipo.equ_nombre}/${jugador.jug_id}`
                        )
                      }
                    >
                      {jugador.jug_nombre}
                    </td>
                    <td className="px-2 py-1 md:px-4 md:py-2 font-semibold">
                      {jugador.jug_apellido}
                    </td>
                    <td className="px-2 py-1 md:px-4 md:py-2 font-semibold">
                      {jugador.jug_posicion}
                    </td>
                    <td className="px-2 py-1 md:px-4 md:py-2 font-semibold">
                      {jugador.jug_edad}
                    </td>
                    <td className="px-2 py-1 md:px-4 md:py-2 font-semibold">
                      <div className="flex justify-between items-center w-full px-2">
                        {jugador.jug_estado === "Disponible" ? (
                          <img
                            src="/imagenes/jug_disponible.svg"
                            alt="Disponible"
                            className="w-6 h-6"
                          />
                        ) : jugador.jug_estado === "Sancionado" ? (
                          <img
                            src="/imagenes/jug_sancionado.svg"
                            alt="Sancionado"
                            className="w-6 h-6"
                          />
                        ) : (
                          <img
                            src="/imagenes/jug_lesionado.svg"
                            alt="Lesionado"
                            className="w-6 h-6"
                          />
                        )}
                        <span>{jugador.jug_estado}</span>
                      </div>
                    </td>

                    <td
                      className="hidden md:table-cell px-2 py-1 md:px-4 md:py-2 font-semibold cursor-pointer hover:text-dark-verdiazul transition"
                      onClick={() =>
                        navigate(
                          `/equipo/${jugador.equipo.equ_id}/${jugador.equipo.equ_nombre}`
                        )
                      }
                    >
                      {jugador.equipo.equ_nombre}
                    </td>
                    <td className="hidden md:table-cell px-2 py-1 md:px-4 md:py-2 font-semibold">
                      {jugador.participaciones.length > 0
                        ? (
                          /*  Si existe participaciones para el jugador:
                              Se calcula la suma de las notas con reduce(suma, participacion)
                              Se divide entre el total de participaciones del jugador para conseguir la nota media
                              Se formatea a 2 decimales con .toFixed(2)
                              
                              Si no existen participaciones se muestra el mensaje 'Sin notas' */
                            jugador.participaciones.reduce(
                              (suma, participacion) =>
                                suma + Number(participacion.par_nota),
                              0
                            ) / jugador.participaciones.length
                          ).toFixed(2)
                        : "Sin notas"}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ContenedorTodosJugadores;
