import React, { useState, useEffect } from "react";
import { crearEquipo, verEquipos, eliminarEquipo } from "../funciones/equipos";
import { useNavigate } from "react-router-dom";

const ContenedorEquipos = () => {
  /* Declaración de constantes y variables */
  const [equipos, setEquipos] = useState([]);
  const [nombreEquipo, setNombreEquipo] = useState("");
  const navigate = useNavigate();

  /* Función para obtener equipos del entrenador (el entrenador se obtiene del localStorage en la función)
     Se asigna a Equipos el resultado de la llamada a la api */
  const handleVerEquipos = async () => {
    const resultado = await verEquipos();
    if (resultado && resultado.data && resultado.data.equipos) {
      setEquipos(resultado.data.equipos);
    } else {
      alert(
        `Error al obtener los equipos: ${resultado?.message || "Desconocido"}`
      );
    }
  };

  /* Al renderizarse el componente se llama a la función para ver los equipos */
  useEffect(() => {
    handleVerEquipos();
  }, []);

  /* Función para manejar la creación de equipos.
  Se recoge el id del entrenador a través de localStorage 
  y se llama a la función crearEquipo (que a su vez llama a la api con nombre del equipo y el entrenador)*/
  const handleCreateEquipo = async (e) => {
    e.preventDefault();
    const entrenador = JSON.parse(localStorage.getItem("userData"))?.ent_id;

    if (!entrenador) {
      alert("Error: No se encontró el entrenador en localStorage.");
      return;
    }
    /*Se comprueba que el nombre del equipo esté introducido */
    if (nombreEquipo.trim() === "") {
      alert("El nombre del equipo no puede estar vacío.");
      return;
    }

    const resultado = await crearEquipo(nombreEquipo, entrenador);
    if (resultado) {
      await handleVerEquipos();
      setNombreEquipo("");
    } else {
      alert(`Error al crear el equipo: ${resultado?.message || "Desconocido"}`);
    }
  };

  return (
    <div className="contenedorEquipos p-6">
      {/* Tarjetas de los equipos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {equipos.map((equipo) => (
          <div
            key={equipo.equ_id}
            className="relative bg-[url('/imagenes/fondo/fondo_equipos.jpg')] bg-cover bg-center bg-no-repeat rounded-2xl shadow-md p-4 h-64 flex flex-col justify-center items-center hover:scale-105 transition "
          >
            {/* Capa clicable */}
            <div
              className="absolute inset-0 bg-verde-opacity rounded-2xl cursor-pointer z-0 "
              onClick={() =>
                navigate(`/equipo/${equipo.equ_id}/${equipo.equ_nombre}`)
              }
            ></div>

            {/* Nombre del equipo */}
            <h2
              className="text-3xl font-semibold text-white text-center z-10  cursor-pointer  font-fuente3"
              onClick={() =>
                navigate(`/equipo/${equipo.equ_id}/${equipo.equ_nombre}`)
              }
            >
              {equipo.equ_nombre}
            </h2>

            {/* Botón eliminar */}
            <div className="absolute top-3 right-3 z-10">
              <button
                onClick={async () => {
                  await eliminarEquipo(equipo.equ_id);
                  await handleVerEquipos();
                }}
                className="bg-red-800 text-white p-2 rounded-lg hover:bg-red-600 transition cursor-pointer"
              >
                <img
                  src="/imagenes/icono-eliminar.svg"
                  alt="Eliminar"
                  className="w-6"
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Crear nuevo equipo */}
      <div className="bg-dark-verde rounded-2xl shadow p-6 max-w-md mx-auto">
        <h3 className="text-lg font-semibold mb-4 text-dorado text-center">
          Crear Equipo
        </h3>
        <form className="flex flex-col gap-3" onSubmit={handleCreateEquipo}>
          <input
            type="text"
            placeholder="Nombre del equipo"
            value={nombreEquipo}
            onChange={(e) => setNombreEquipo(e.target.value)}
            className="border rounded p-3 rounded-lg caret-dorado text-dorado focus:outline-none focus:ring-2 focus:ring-dorado"
          />
          <button
            type="submit"
            className="bg-verde font-semibold text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Crear
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContenedorEquipos;
