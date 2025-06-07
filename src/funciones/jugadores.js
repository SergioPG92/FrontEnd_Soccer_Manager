const API_URL = import.meta.env.VITE_API_URL;

// Función para crear un jugador, recibiendo el id del equipo para asociarlo a él.
const crearJugador = async (nombre, apellido, posicion, edad, equipo) => {
  try {
    const response = await fetch(`${API_URL}/crearJugador`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jug_nombre: nombre,
        jug_apellido: apellido,
        jug_posicion: posicion,
        jug_edad: edad,
        jug_equipo: equipo,
      }),
    });
    let data = await response.json();
    if (response.ok) {
      return { success: true, message: "Jugador creado exitosamente", data };
    } else {
      return {
        success: false,
        message: data.message || "Error al crear el jugador",
      };
    }
  } catch (error) {
    console.error("Error en crearJugador:", error);
    return { success: false, message: "Error en el servidor" };
  }
};

// Función para ver los jugadores de un equipo, recibiendo el id del equipo para filtrar los jugadores.
const verJugadores = async (equipo_id) => {
  try {
    const response = await fetch(`${API_URL}/verJugadores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jug_equipo: equipo_id,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: "Jugadores obtenidos exitosamente",
        data,
      };
    } else {
      return {
        success: false,
        message: data.message || "Error al obtener los jugadores",
      };
    }
  } catch (error) {
    console.error("Error en verJugadores:", error);
    return { success: false, message: "Error en el servidor" };
  }
};

//Funcion para eliminar un jugador a partir del id del jugador
const eliminarJugador = async (jugador_id) => {
  try {
    const response = await fetch(`${API_URL}/eliminarJugador`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jug_id: jugador_id,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: "Jugador eliminado exitosamente", data };
    } else {
      return {
        success: false,
        message: data.message || "Error al eliminar el jugador",
      };
    }
  } catch (error) {
    console.error("Error en eliminarJugador:", error);
    return { success: false, message: "Error en el servidor" };
  }
};

//Función para conseguir el perfil de un jugador a partir de su id
const perfilJugador = async (jugador_id) => {
  try {
    const response = await fetch(`${API_URL}/perfilJugador`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jug_id: jugador_id,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: "Jugador encontrado", data };
    } else {
      return {
        success: false,
        message: data.message || "Error al buscar el jugador",
      };
    }
  } catch (error) {
    console.error("Error en perfilJugador:", error);
    return { success: false, message: "Error en el servidor" };
  }
};

//Función para actualizar un jugador a partir de su id y nuevos datos
const updateJugador = async (
  jugador_id,
  nombre,
  apellido,
  posicion,
  edad,
  estado
) => {
  try {
    const response = await fetch(`${API_URL}/actualizarJugador`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jug_id: jugador_id,
        jug_nombre: nombre,
        jug_apellido: apellido,
        jug_posicion: posicion,
        jug_edad: edad,
        jug_estado: estado,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: "Jugador actualizado", data };
    } else {
      return {
        success: false,
        message: data.message || "Error al actualizar el jugador",
      };
    }
  } catch (error) {
    console.error("Error en actualizarJugador:", error);
    return { success: false, message: "Error en el servidor" };
  }
};

//Función para ver todos los jugadores de un entrenador a partir del id del entrenador.
const verTodosJugadores = async ($idEntrenador) => {
  try {
    const response = await fetch(`${API_URL}/verTodosJugadores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        entrenador: $idEntrenador,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: "Jugadores obtenidos exitosamente",
        data,
      };
    } else {
      return {
        success: false,
        message: data.message || "Error al obtener todos los jugadores",
      };
    }
  } catch (error) {
    console.error("Error en verTodosJugadores:", error);
    return { success: false, message: "Error en el servidor" };
  }
};

export {
  crearJugador,
  verJugadores,
  eliminarJugador,
  perfilJugador,
  updateJugador,
  verTodosJugadores,
};
