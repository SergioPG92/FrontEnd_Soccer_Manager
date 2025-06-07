import React, { useState } from "react";
import { updateEntrenador } from "../funciones/entrenador";
import BarraNavegacion from "../Components/BarraNavegacion";
import Footer from "../Components/Footer";

function ProfilePage() {
  /* Declaración de variables y constantes que se usarán para el funcionamiento del componente.*/

  /* Conseguimos la información del usuario guardada en localstorage */
  let userData = localStorage.getItem("userData");
  let parsedUserData = JSON.parse(userData);

  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoApellido, setNuevoApellido] = useState("");
  const [nuevaPassword, setNuevaPassword] = useState("");
  const [confPassword, setconfPassword] = useState("");

  /* Email, nombre y apellido tendrán el valor guardado en localstorage */
  const [nombre, setNombre] = useState(parsedUserData.ent_nombre);
  const [apellido, setApellido] = useState(parsedUserData.ent_apellido);
  const email = parsedUserData.ent_email;

  /* Función para manejar la actualización de los datos del Entrenador. */
  const handleUpdateEntrenador = async (e) => {
    e.preventDefault();

    /* Comprobación que los campos de contraseña se han introducido, son iguales y tienen un mínimo de 6 caracteres */
    if (
      nuevaPassword !== confPassword ||
      nuevaPassword === "" ||
      confPassword === ""
    ) {
      alert("Las contraseñas no coinciden");
      return;
    } else if (nuevaPassword.length < 6 || confPassword.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    /* Llamada a la función (que llama a la api) de updateEntrenador con los nuevos valores.
       En caso de no introducir nuevos valores adquieren los anteriores.  */
    const result = await updateEntrenador(
      nuevoNombre || parsedUserData.ent_nombre,
      nuevoApellido || parsedUserData.ent_apellido,
      nuevaPassword,
      email
    );

    /* Se actualiza la información de localStorage con los nuevos datos del entrenador.
    Se da el nuevo valor a las variables Nombre y Apellido para que aparezcan como placeholder del formulario tras el update */
    userData = result.datos.user;
    localStorage.setItem("userData", JSON.stringify(userData));
    setNombre(userData.ent_nombre);
    setApellido(userData.ent_apellido);
    window.location.reload();
  };

  return (
    <div>
      <BarraNavegacion />
      <div className="bg-[url(/imagenes/fondo/soccer_field.jpg)] rounded-2xl">
        <div className="profile-page bg-dark-verdiazul-opacity justify-center items-center px-4 flex flex-col min-h-screen">
          <div
            className="bg-dark-verde p-8 rounded-lg shadow-lg w-full max-w-md mt-6 mb-4
                          sm:p-6 sm:mx-4 sm:mt-4
                          xs:p-4 xs:mx-2 xs:mt-2"
          >
            <h1
              className="text-2xl font-semibold text-center text-dorado mb-6
                           sm:text-xl
                           xs:text-lg font-fuente3"
            >
              Perfil de Entrenador
            </h1>
            <div className="flex justify-center mb-6">
              <img
                className="w-50 my-4 max-w-full h-auto"
                src="/imagenes/logo_perfil_entrenador.svg"
                alt="Perfil del jugador"
              />
            </div>

            {/* Si existe información del entrenador en localstorage (logeado) se mostrará el formulario
            con los valores del entrenador. */}
            {parsedUserData ? (
              <form onSubmit={handleUpdateEntrenador} className="space-y-6 font-fuente2">
                <div>
                  <p className="text-sm font-medium text-dorado mb-1">
                    <strong>Correo electrónico (login):</strong> {email}
                  </p>
                </div>

                <div className="form-group">
                  <label
                    htmlFor="nuevoNombre"
                    className="text-sm font-medium text-dorado mb-1"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nuevoNombre"
                    placeholder={nombre}
                    value={nuevoNombre}
                    onChange={(e) => setNuevoNombre(e.target.value)}
                    className="w-full px-4 py-2 mt-2 border rounded-lg caret-dorado text-dorado focus:outline-none focus:ring-2 focus:ring-dorado"
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor="nuevoApellido"
                    className="text-sm font-medium text-dorado mb-1"
                  >
                    Apellido
                  </label>
                  <input
                    type="text"
                    id="nuevoApellido"
                    placeholder={apellido}
                    value={nuevoApellido}
                    onChange={(e) => setNuevoApellido(e.target.value)}
                    className="w-full px-4 py-2 mt-2 border rounded-lg caret-dorado text-dorado focus:outline-none focus:ring-2 focus:ring-dorado"
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor="nuevaPassword"
                    className="text-sm font-medium text-dorado mb-1"
                  >
                    Nueva Contraseña (mín 6 caracteres)
                  </label>
                  <input
                    type="password"
                    id="nuevaPassword"
                    value={nuevaPassword}
                    onChange={(e) => setNuevaPassword(e.target.value)}
                    className="w-full px-4 py-2 mt-2 border rounded-lg caret-dorado text-dorado focus:outline-none focus:ring-2 focus:ring-dorado"
                    autoComplete="new-password"
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor="confPassword"
                    className="text-sm font-medium text-dorado mb-1"
                  >
                    Confirmar Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    id="confPassword"
                    value={confPassword}
                    onChange={(e) => setconfPassword(e.target.value)}
                    className="w-full px-4 py-2 mt-2 border rounded-lg caret-dorado text-dorado focus:outline-none focus:ring-2 focus:ring-dorado"
                    autoComplete="new-password"
                  />
                </div>

                <div className="form-group">
                  <button
                    type="submit"
                    className="font-semibold bg-verde text-white px-6 py-3 rounded-lg w-full mt-6 hover:bg-green-600 transition"
                  >
                    Actualizar datos
                  </button>
                </div>
              </form>
            ) : (
              /* Si no hay entrenador logeado (userData en localstorage) no se muestra el formulario */
              <p className="text-center text-gray-600 font-fuente2">
                No hay datos de usuario disponibles.
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
