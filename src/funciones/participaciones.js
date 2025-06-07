const API_URL = "http://api-proyecto.es/api";

// Función para crear una participación, recibiendo el id del jugador, el id de la sesión y la nota de la participación.
const crearParticipacion = async (jugador, sesion, nota) => {
  try {
    const response = await fetch(`${API_URL}/crearParticipacion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        par_jugador: jugador,
        par_sesion: sesion,
        par_nota: nota,
      }),
    });
    let data = await response.json();
    if (response.ok) {
      return { success: true, message: "Participación creado exitosamente", data };
    } else {
      return {
        success: false,
        message: data.message || "Error al crear la participación",	
      };
    }
  } catch (error) {
    console.error("Error en registro:", error);
    return { success: false, message: "Error en el servidor" };
  }
};

// Función para ver las participaciones de un equipo, recibiendo el id del equipo para filtrar los jugadores.
const verParticipacionesEquipo = async (equipo) => {
  try {
    const response = await fetch(`${API_URL}/verParticipacionesEquipo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        equipo_id: equipo,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: `Participaciones del equipo ${equipo} obtenidas exitosamente`,
        data,
      };
    } else {
      return {
        success: false,
        message: data.message || "Error al obtener las participaciones",
      };
    }
  } catch (error) {
    console.error("Error en verParticipacionesEquipo:", error);
    return { success: false, message: "Error en el servidor" };
  }
};

//Función para editar una participación, recibiendo el id de la participación y la nueva nota.
const editarParticipacion = async (id, nota) => {
  try {
    const response = await fetch(`${API_URL}/editarParticipacion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        par_id: id,
        par_nota: nota,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: `Participación ${id} editada exitosamente`,
        data,
      };
    } else {
      return {
        success: false,
        message: data.message || "Error al editar la participación",
      };
    }
  } catch (error) {
    console.error("Error en editarParticipacion:", error);
    return { success: false, message: "Error en el servidor" };
  }
};

export { crearParticipacion, verParticipacionesEquipo, editarParticipacion };