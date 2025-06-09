import React, { useState } from "react";
import { register, login } from "../funciones/entrenador";
import { useNavigate } from "react-router-dom";
import BarraNavegacion from "../Components/BarraNavegacion";
import Footer from "../Components/Footer";

function RegisterPage() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();

  /*Función para manejar el registro.
   Comprueba que las contraseñas son iguales y tienen mínimo 6 caracteres hasta que hace llamada a la función (que a su vez llama a la api)
   con los valores introducidos.*/
  const handleRegister = async (e) => {
    e.preventDefault();

    if (nombre == "" || apellido == "" || email == "" || password == "") {
      alert("Debes completas todos los campos del formulario.");
      return;
    } else {
      if (password !== passwordConfirm) {
        alert("Las contraseñas no coinciden");
        return;
      } else if (password.length < 6 || passwordConfirm.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres");
        return;
      }
    }

    // Llamada a la función de registro
    const resultado = await register(
      email,
      password,
      passwordConfirm,
      nombre,
      apellido
    );

    if (resultado.success) {
      // Si el registro fue exitoso, hace login con las mismas credenciales
      const loginResult = await login(email, password);

      // Si el login es exitoso, redirigir a la página principal
      if (loginResult.success) {
        navigate("/");
      } else {
        alert("Error en el login después del registro");
      }
    } else {
      alert(`Error en el registro: ${resultado.message}`);
    }
  };

  /* Se muestra el contenido total de la página.
  Incluyendo el formulario con funciones para asignar valores de los input a las variables que se pasarán a la api y 
  el evento onSubmit que llama al manejador del registro.  */
  return (
    <div className="bg-[url(/imagenes/fondo/soccer_field.jpg)] bg-cover bg-no-repeat bg-center min-h-screen flex flex-col  font-fuente2">
      {/* Componente de la barra de navegación */}
      <BarraNavegacion />
      <div className=" flex justify-center flex-grow mb-8">
        <div className="bg-dark-verdiazul-opacity p-8 rounded-lg shadow-lg w-full max-w-md mt-20">
          <h2 className="text-2xl font-semibold text-center text-dorado mb-6">
            REGISTRO
          </h2>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="form-group">
              <label
                htmlFor="campo_nombre"
                className="block text-sm font-medium text-dorado"
              >
                Nombre
              </label>
              <input
                type="text"
                id="campo_nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg caret-dorado text-dorado focus:outline-none focus:ring-2 focus:ring-dorado"
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="campo_apellido"
                className="block text-sm font-medium text-dorado"
              >
                Apellido
              </label>
              <input
                type="text"
                id="campo_apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg caret-dorado text-dorado focus:outline-none focus:ring-2 focus:ring-dorado"
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="campo_email"
                className="block text-sm font-medium text-dorado"
              >
                Correo electrónico
              </label>
              <input
                type="email"
                id="campo_email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg caret-dorado text-dorado focus:outline-none focus:ring-2 focus:ring-dorado"
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="campo_contraseña"
                className="block text-sm font-medium text-dorado"
              >
                Contraseña (mín. 6 caracteres)
              </label>
              <input
                type="password"
                id="campo_contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg caret-dorado text-dorado focus:outline-none focus:ring-2 focus:ring-dorado"
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="campo_password_confirm"
                className="block text-sm font-medium text-dorado"
              >
                Confirmar Contraseña
              </label>
              <input
                type="password"
                id="campo_password_confirm"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg caret-dorado text-dorado focus:outline-none focus:ring-2 focus:ring-dorado"
              />
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="cursor-pointer caret-dorado text-dorado w-full bg-verde text-gray-100 py-3 rounded-full text-lg font-semibold transition hover:bg-dorado hover:scale-105 focus:outline-none shadow-md"
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RegisterPage;
