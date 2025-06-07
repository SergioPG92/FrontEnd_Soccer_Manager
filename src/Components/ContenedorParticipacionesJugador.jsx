import React, { useState, useEffect } from "react";
import {
  verParticipacionesEquipo,
  editarParticipacion,
} from "../funciones/participaciones";
import { perfilJugador } from "../funciones/jugadores";

function ContenedorSesionesJugador({ jugadorId, equipoId }) {
  // Estado para almacenar las sesiones con participaciones y el jugador
  const [sesionesConParticipaciones, setSesionesConParticipaciones] = useState(
    []
  );
  const [jugador, setJugador] = useState(null);

  /*Función para manejar la consulta de Participaciones totales de un equipo */
  const handleVerParticipaciones = async (equipo) => {
    const resultado = await verParticipacionesEquipo(equipo);
    if (resultado) {
      setSesionesConParticipaciones(resultado.data.sesionesConParticipaciones);
    } else {
      alert(
        `Error al obtener las participaciones en front: ${resultado.message}`
      );
    }
  };

  /*Función para manejar la consulta del perfil de un jugador a partir de su id */
  const handlePerfilJugador = async (jugadorId) => {
    const resultado = await perfilJugador(jugadorId);
    if (resultado) {
      setJugador(resultado.data.jug_nombre);
    }
  };

  /*Función para manejar el cambio de nota de una participación */
  const handleCambioNota = async (nota, participacionId) => {
    const resultado = await editarParticipacion(participacionId, nota);
    if (resultado) {
      handleVerParticipaciones(equipoId);
    } else {
      console.log(`Error al editar la nota: ${resultado.message}`);
    }
  };

  /* Efecto para cargar las participaciones y el perfil del jugador al montar el componente.
  Primero comprueba que exista el equipoId, y luego llama a las funciones correspondientes.
  Se ejecuta cada vez que cambia jugadorId o equipoId */
  useEffect(() => {
    if (equipoId) {
      handleVerParticipaciones(equipoId);
      handlePerfilJugador(jugadorId);
    }
  }, [jugadorId, equipoId]);

  return (
    <div className="bg-[url(/imagenes/fondo/fondo_participaciones-calendario.jpg)] bg-cover bg-center bg-no-repeat rounded-2xl ">
      <div className="bg-verde-opacity rounded-2xl shadow p-4 min-h-[86vh]">
        <h1 className="text-left text-xl md:text-3xl font-bold text-gray-800 mb-4 font-fuente3">
          {jugador ? `Participaciones de ${jugador}.` : "Cargando..."}
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-[400px] w-full table-fixed text-center text-gray-200 text-sm md:text-base font-fuente2">
            <thead>
              <tr className="bg-dark-verde text-white">
                <th className="w-1/3 px-2 py-2 md:px-4 md:py-3">Tipo</th>
                <th className="w-1/3 px-2 py-2 md:px-4 md:py-3">Fecha</th>
                <th className="w-1/3 px-2 py-2 md:px-4 md:py-3">Nota</th>
              </tr>
            </thead>
            <tbody>
              {sesionesConParticipaciones.map((sesion) =>
              //Filtramos las participaciones para que se muestre solo si el jugador es el jugador seleccionado (jugadorId)
                sesion.participaciones
                  .filter(
                    (participacion) => participacion.par_jugador == jugadorId
                  )
                  .map((participacion) => (
                    <tr
                      key={participacion.par_id}
                      className="odd:bg-dark-verde/50"
                    >
                      <td className="px-2 py-1 md:px-4 md:py-2 font-semibold">
                        {sesion.ses_tipo.charAt(0).toUpperCase() +
                          sesion.ses_tipo.slice(1)}
                      </td>
                      <td className="px-2 py-1 md:px-4 md:py-2 font-semibold">
                        {/* Formateamos la fecha para que se muestre dd/mm/aaaa */}
                        {new Date(sesion.ses_fecha).toLocaleDateString("es-ES")}
                      </td>
                      <td className="px-2 py-1 md:px-4 md:py-2 font-semibold">
                        <select
                          onChange={(e) =>
                            handleCambioNota(
                              e.target.value,
                              participacion.par_id
                            )
                          }
                          value={participacion.par_nota}
                          className="bg-dark-verdiazul-opacity text-white rounded-md px-1 py-0.5 md:px-2 md:py-1"
                        >
                          <option value="0.00">0.00</option>
                          <option value="0.50">0.50</option>
                          <option value="1.00">1.00</option>
                          <option value="1.50">1.50</option>
                          <option value="2.00">2.00</option>
                          <option value="2.50">2.50</option>
                          <option value="3.00">3.00</option>
                          <option value="3.50">3.50</option>
                          <option value="4.00">4.00</option>
                          <option value="4.50">4.50</option>
                          <option value="5.00">5.00</option>
                          <option value="5.50">5.50</option>
                          <option value="6.00">6.00</option>
                          <option value="6.50">6.50</option>
                          <option value="7.00">7.00</option>
                          <option value="7.50">7.50</option>
                          <option value="8.00">8.00</option>
                          <option value="8.50">8.50</option>
                          <option value="9.00">9.00</option>
                          <option value="9.50">9.50</option>
                          <option value="10.00">10.00</option>
                        </select>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ContenedorSesionesJugador;
