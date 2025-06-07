const API_URL = "http://api-proyecto.es/api";

// Función para crear un nuevo equipo, recibiendo el id del entrenador para asociarlo a él.
const crearEquipo = async (nombre, entrenador) => {
  try {
    const response = await fetch(`${API_URL}/crearEquipo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        equ_nombre: nombre,
        equ_entrenador: entrenador,
      }),
    });
    let data = await response.json();
    if (response.ok) {
      return { success: true, message: "Equipo creado exitosamente", data };
    } else {
      return {
        success: false,
        message: data.message || "Error al crear el equipo",
      };
    }
  } catch (error) {
    console.error("Error en la creación del equipo:", error);
    return { success: false, message: "Error en el servidor" };
  }
};

// Función para ver los equipos del entrenador, recibiendo el id del entrenador para filtrar los equipos.
const verEquipos = async () => {
  try {
    const response = await fetch(`${API_URL}/verEquipos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        equ_entrenador: JSON.parse(localStorage.getItem("userData")).ent_id,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: "Equipos obtenidos exitosamente", data };
    } else {
      return {
        success: false,
        message: data.message || "Error al obtener los equipos",
      };
    }
  } catch (error) {
    console.error("Error en verEquipos:", error);
    return { success: false, message: "Error en el servidor" };
  }
};

// Función para eliminar un equipo, recibiendo el id del equipo a eliminar.
// Se le pregunta al usuario si está seguro de que desea eliminar el equipo, solo si acepta se elimina.
const eliminarEquipo = async (equipoId) => {
  let confirmacion = window.confirm(
    "¿Estás seguro de que deseas eliminar este equipo? Esta acción no se puede deshacer."
  );

  if (confirmacion) {
    try {
      const response = await fetch(`${API_URL}/eliminarEquipo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          equ_id: equipoId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          message: "Equipo eliminado exitosamente",
          data,
        };
      } else {
        return {
          success: false,
          message: data.message || "Error al eliminar el equipo",
        };
      }
    } catch (error) {
      console.error("Error en eliminarEquipo:", error);
      return { success: false, message: "Error en el servidor" };
    }
  }
};



export { crearEquipo, verEquipos, eliminarEquipo};
