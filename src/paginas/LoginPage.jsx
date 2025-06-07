import React, { useState } from "react";
import { login } from "../funciones/entrenador";
import { useNavigate } from "react-router-dom";
import BarraNavegacion from "../Components/BarraNavegacion";
import Footer from "../Components/Footer";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //Función para controlar el formulario, evitando que su funcionamiento por defecto y llamando a la función de login.
  //En caso de que la llamada sea exitosa se redirecciona a la página principal.
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(email, password);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="bg-[url(/imagenes/fondo/soccer_field.jpg)] bg-cover bg-no-repeat bg-center min-h-screen flex flex-col  font-fuente2">
      <BarraNavegacion />
      <div className="flex justify-center items-center px-4  mt-20 flex-grow">
        <div className="bg-dark-verdiazul-opacity p-8 rounded-lg shadow-lg w-full max-w-md mt-6">
          <h1 className="text-2xl font-semibold text-center text-dorado  mb-6">
            Iniciar sesión
          </h1>

          {/* En caso de que al hacer submit hubiese un error, se visaliza el mensaje en rojo. */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {/* Formulario de login con evento onSubmit que llama a handleSubmit y
          funciones que cada vez que se introduce un caracter en un input
          se le asigna el valor de ese campo a la variable pertinente. */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-group">
              <label
                htmlFor="email"
                className="caret-dorado text-dorado block text-sm font-medium "
              >
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg caret-dorado text-dorado focus:outline-none focus:ring-2 focus:ring-dorado"
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="password"
                className="text-dorado block text-sm font-medium "
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg caret-dorado text-dorado focus:outline-none focus:ring-2 focus:ring-dorado"
              />
            </div>

            <button
              className="cursor-pointer w-full bg-verde text-white py-3 rounded-full text-lg font-semibold transition hover:bg-dorado hover:scale-105 focus:outline-none shadow-md"
              type="submit"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LoginPage;
