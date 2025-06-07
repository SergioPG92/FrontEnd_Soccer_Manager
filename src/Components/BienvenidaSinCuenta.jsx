import React from "react";
import { Link } from "react-router-dom";

/* Componente con dos botones para elegir si se quiere mostrar (llevar a la dirección) la ventana de login o la de registro. */
function BienvenidaSinCuenta() {
  return (
    <div className="bg-dark-verdiazul-opacity w-80 bg-opacity-25 mx-auto my-50  rounded-lg shadow-lg p-8 flex flex-col items-center gap-14  font-fuente2" >
      <Link to="/login">
        <button className="cursor-pointer bg-light-verde text-white py-3 px-6 mt-6 rounded-full text-lg font-semibold transition transform hover:bg-dorado  hover:scale-105 focus:outline-none shadow-md">
          Iniciar sesión
        </button>
      </Link>
      <div >
        <p className="text-gray-100 font-medium">¿No tienes cuenta?</p>
        <Link to="/register">
          <button className="cursor-pointer bg-dark-verde text-white py-3 px-6 my-2 rounded-full text-lg font-semibold transition transform hover:bg-dorado hover:scale-105 focus:outline-none shadow-md">
            Registrarse
          </button>
        </Link>
      </div>
    </div>
  );
}

export default BienvenidaSinCuenta;
