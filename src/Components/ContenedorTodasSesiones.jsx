import React, { useState, useEffect } from "react";
import { verTodasSesiones } from "../funciones/sesiones_entrenamiento";
import { useNavigate } from "react-router-dom";


function ContenedorTodosJugadores() {
  /* Declaración de variables*/
  const [sesiones, setSesiones] = useState(null);
  const [entrenadorId, setEntrenadorId] = useState(null);
  const navigate = useNavigate();

  /* Función para manejar la consulta de todas las sesiones del entrenador a partir del id del entrenador y asignarlo a la variable sesiones*/
  const handleTodasSesiones = async () => {
    const resultado = await verTodasSesiones(entrenadorId);
    if (resultado.success) {
      setSesiones(resultado.data.sesiones);
      console.log(resultado.data.sesiones);
    }
  };

  /* Efecto para cargar las sesiones del entrenador cuando cambia el entrenadorId*/
  useEffect(() => {
    if (entrenadorId) {
      handleTodasSesiones();
    }
  }, [entrenadorId]);

  /* Efecto para obtener el id del entrenador desde el localStorage al montar el componente */
  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("userData"));
    setEntrenadorId(userData?.ent_id || null);
  }, []);

  return (
    <div className="rounded-2xl my-5">
      <div className="rounded-2xl p-4 h-full min-h-[60vh]">
        {!sesiones ? (
          <h1 className="text-center text-3xl font-bold text-dark-verdiazul mb-6 mt-1 font-fuente3">
            Cargando sesiones...
          </h1>
        ) : (
          <h1 className="text-center text-3xl font-bold text-dark-verdiazul mb-6 mt-1 font-fuente3">
            Sesiones del entrenador
          </h1>
        )}

        <div className="overflow-x-auto font-fuente2">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-dark-verde text-white">
                <th className="px-2 sm:px-4 py-2 text-sm sm:text-base">Tipo</th>
                <th className="px-2 sm:px-4 py-2 text-sm sm:text-base">
                  Fecha
                </th>
                <th className="px-2 sm:px-4 py-2 text-sm sm:text-base">
                  Equipo
                </th>
              </tr>
            </thead>
            <tbody className="text-center text-gray-200">
              {sesiones &&
                sesiones.map((sesion) => (
                  <tr
                    key={sesion.ses_id}
                    className="border-b bg-dark-verde-2 hover:bg-light-verde even:bg-dark-verde/50"
                    
                  >
                    <td className="px-2 sm:px-4 py-2 font-semibold text-sm sm:text-base">
                      {sesion.ses_tipo
                        ? sesion.ses_tipo.charAt(0).toUpperCase() +
                          sesion.ses_tipo.slice(1).toLowerCase()
                        : "Tipo"}
                    </td>
                    <td className="px-2 sm:px-4 py-2 font-semibold text-sm sm:text-base">
                      {/* Formato de la fecha de la sesión a dd/mm/aaaa */}
                      {new Date(sesion.ses_fecha).toLocaleDateString("es-ES")}
                    </td>
                    <td
                      className="px-2 sm:px-4 py-2 font-semibold cursor-pointer hover:text-dark-verdiazul transition text-sm sm:text-base"
                      onClick={() =>
                        navigate(
                          `/equipo/${sesion.equipo.equ_id}/${sesion.equipo.equ_nombre}`
                        )
                      }
                    >
                      {sesion.equipo.equ_nombre}
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
