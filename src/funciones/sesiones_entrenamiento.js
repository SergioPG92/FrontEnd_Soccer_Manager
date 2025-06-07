const API_URL = import.meta.env.VITE_API_URL;

// Función para crear una sesión de entrenamiento, recibiendo el id del equipo para asociarlo a él, la fecha y el tipo de sesión.
const crearSesion = async (fecha, tipo, equipo) => {
  try {
    const response = await fetch(`${API_URL}/crearSesion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ses_fecha: fecha,
        ses_tipo: tipo,
        ses_equipo: equipo,
      }),
    });
    let data = await response.json();
    if (response.ok) {
      return { success: true, message: "Sesión creado exitosamente", data };
    } else {
      return {
        success: false,
        message: data.message || "Error al crear la sesión",
      };
    }
  } catch (error) {
    console.error("Error en crearSesion:", error);
    return { success: false, message: "Error en el servidor" };
  }
};

// Función para ver las sesiones de entrenamiento de un equipo a partir de su id.
const verSesiones = async (equipo_id) => {
  try {
    const response = await fetch(`${API_URL}/verSesiones`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ses_equipo: equipo_id,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: "Sesiones obtenidas exitosamente",
        data,
      };
    } else {
      return {
        success: false,
        message: data.message || "Error al obtener las sesiones",
      };
    }
  } catch (error) {
    console.error("Error en verSesiones:", error);
    return { success: false, message: "Error en el servidor" };
  }
};

//Función para eliminar una sesión a partir de su id
const eliminarSesion = async (sesion_id) => {
  try {
    const response = await fetch(`${API_URL}/eliminarSesion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ses_id: sesion_id,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: "Sesión eliminada exitosamente", data };
    } else {
      return {
        success: false,
        message: data.message || "Error al eliminar la sesión",
      };
    }
  } catch (error) {
    console.error("Error en eliminarSesion:", error);
    return { success: false, message: "Error en el servidor" };
  }
};

//Función para editar una sesión de entrenamiento a partir de su id, la nueva fecha y el nuevo tipo.
const editarSesion = async (sesion_id,fecha,tipo ) => {
  try {
    const response = await fetch(`${API_URL}/editarSesion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ses_id: sesion_id,
        ses_fecha: fecha,
        ses_tipo: tipo
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: "Sesión editada", data };
    } else {
      return {
        success: false,
        message: data.message || "Error al editar la sesión",
      };
    }
  } catch (error) {
    console.error("Error en editarSesion:", error);
    return { success: false, message: "Error en el servidor" };
  }
};

//Función para ver todas las sesiones de un entrenador (de sus equipos) a partir de su id.
const verTodasSesiones = async (entrenadorId) => {
  try {
    const response = await fetch(`${API_URL}/verTodasSesiones`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        entrenador: entrenadorId
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: "Sesiones del entrenador encontradas", data };
    } else {
      return {
        success: false,
        message: data.message || "Error al buscar todas las sesiones del entrenador",
      };
    }
  } catch (error) {
    console.error("Error en verTodasSesiones:", error);
    return { success: false, message: "Error en el servidor" };
  }
};

export { crearSesion, verSesiones, editarSesion, eliminarSesion, verTodasSesiones };
