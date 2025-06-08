import { Navigate } from "react-router-dom";

//Base URL de la API
const API_URL = import.meta.env.VITE_API_URL+'/api';

// Función para hacer login
const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ent_email: email,
        ent_password: password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("authToken", data.access_token);
      localStorage.setItem("userData", JSON.stringify(data.user));
      return { success: true, token: data.access_token, user: data.user };
    } else {
      return {
        success: false,
        message: data.message || "Error al iniciar sesión",
      };
    }
  } catch (error) {
    console.error("Error en login:", error);
    return { success: false, message: "Error en el servidor" };
  }
};

// Función para hacer logout
const logout = () => {
  localStorage.clear();
};

// Función para registrar un nuevo usuario.
const register = async (
  email,
  password,
  password_confirm,
  nombre,
  apellido
) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ent_email: email,
        ent_password: password,
        ent_password_confirmation: password_confirm,
        ent_nombre: nombre,
        ent_apellido: apellido,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Si el registro es exitoso, intenta iniciar sesión automáticamente.
      const loginResponse = await login(email, password);

      if (loginResponse.success) {
        return { success: true, message: "Registro exitoso y sesión iniciada" };
      } else {
        return {
          success: false,
          message:
            loginResponse.message ||
            "Error al iniciar sesión después del registro",
        };
      }
    } else {
      return {
        success: false,
        message: data.message || "Error en el registro",
      };
    }
  } catch (error) {
    console.error("Error en registro:", error);
    return { success: false, message: "E-Mail ya registrado." };
  }
};

// Función para obtener el perfil del usuario a través del token.
const getProfile = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("No estás logueado");
  }

  try {
    const response = await fetch(`${API_URL}/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error("No se pudo obtener el perfil");
    }
  } catch (error) {
    console.error("Error obteniendo el perfil del entrenador:", error);
    throw error;
  }
};

// Función para verificar si el usuario está logueado
const isUserLoggedIn = () => {
  const token = localStorage.getItem("authToken");
  return token !== null;
};

// Función para actualizar el perfil del entrenador
const updateEntrenador = async (
  nuevoNombre,
  nuevoApellido,
  nuevaPassword,
  email
) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("No estás logueado");
    }
    const response = await fetch(`${API_URL}/updateEnt`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ent_email: email,
        ent_password: nuevaPassword,
        ent_password_confirmation: nuevaPassword,
        ent_nombre: nuevoNombre,
        ent_apellido: nuevoApellido,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: "Éxito", datos: data };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error("Error al actualizar entrenador:", error);
    return { success: false, message: "Error en el servidor" };
  }
};

export {
  login,
  logout,
  register,
  getProfile,
  isUserLoggedIn,
  updateEntrenador,
};
