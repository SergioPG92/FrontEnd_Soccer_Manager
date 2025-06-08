import { useState, useRef, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { isUserLoggedIn, logout } from "../funciones/entrenador";

function BarraNavegacion() {
  //Estado para manejar los desplegables
  const [desplegableAbierto, setDesplegableAbierto] = useState(false);
  const [desplegableAbiertoPantallaPeq, setDesplegableAbiertoPantallaPeq] = useState(false);
  const [desplegableResponsiveAbierto, setDesplegableResponsiveAbierto] =
    useState(false);

  //Estado para manejar el usuario, por defecto 'Sin usuario'
  const [user, setUser] = useState("Sin usuario");

  //Referencia para el dropdown. Se utiliza para cerrar el dropdown al hacer click fuera de él.
  const referenciaDesplegable = useRef();
  const referenciaDesplegablePantallaPeq = useRef();
  const referenciaDesplegableResponsive = useRef();

  //Si el usuario está logueado (en localStorage), se le asigna su valor a user.
  const userData = localStorage.getItem("userData");
  useEffect(() => {
    if (isUserLoggedIn() && userData) {
      const parsedUserData = JSON.parse(userData);
      setUser(parsedUserData);
    }
  }, []);

  //Función para cerrar el desplegable al hacer click fuera de él.  Evento en el documento que llama a handleClickFuera, que verifica si el click fue fuera del dropdown.
  // Si es así, pone ddesplegableAbierto en false.
  useEffect(() => {
    const handleClickFuera = (event) => {
      /* Comprueba si la referencia tiene asignado un componente, es decir, el desplegable. Si es así, comprueba que no contenga en el dom a aquello que hayamos clickado. 
            De ser así cierra el desplegable pues no hemos clickado en él */
      if (
        referenciaDesplegable.current &&
        !referenciaDesplegable.current.contains(event.target)
      ) {
        setDesplegableAbierto(false);
      }
    };
    /* Se añade a todo el documento un evento que al hacer click con el ratón se llame a la comprobación de si el click es fuera del desplegable. */
    document.addEventListener("mousedown", handleClickFuera);
    /* Se limpia el evento para que no haya problemas al renderizarse varias veces el componente. */
    return () => document.removeEventListener("mousedown", handleClickFuera);
  }, []);

  return (
    <header>
      {isUserLoggedIn() ? (
        /* Barra de navegacíon en pantallas más grandes a md */
        <div>
          <nav className="hidden md:flex bg-verde border-gray-200  flex justify-between items-center p-2 h-18 ">
            <div className="ml-2">
              <Link to="/" className="flex items-center">
                <button className="p-0  bg-transprent border-none w-15 ">
                  <img
                    src="/imagenes/logo_web_2.svg"
                    alt="Logo Web"
                    className="w-24 h-auto"
                  />
                </button>
                <div className="text-white font-bold text-2xl  font-fuente1">
                  SOCCER MANAGER
                </div>
              </Link>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <ul className="flex  gap-4 font-semibold  justify-center font-fuente2">
                <li>
                  <Link to="/" className="text-white hover:text-gray-300">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    to="/equipos"
                    className="text-white hover:text-gray-300"
                  >
                    Equipos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/todosJugadores"
                    className="text-white hover:text-gray-300"
                  >
                    Jugadores
                  </Link>
                </li>
                <li>
                  <Link
                    to="/entrenamientos"
                    className="text-white hover:text-gray-300"
                  >
                    Entrenamientos
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mr-5 font-fuente2">
              {/* Evento para invertir el estado de desplegableabierto al hacer click */}
              <button
                className="flex items-center text-white hover:text-gray-300 cursor-pointer"
                onClick={() => setDesplegableAbierto(!desplegableAbierto)}
              >
                <img
                  src="/imagenes/logo_usuario_temporal.svg"
                  alt="Icono usuario"
                  className="w-10 h-auto mr-2"
                />
                <span>{user.ent_nombre}</span>
              </button>
              {/* Solamente si el desplegable es true se renderiza el menú desplegable */}
              {desplegableAbierto && (
                <div
                  ref={referenciaDesplegable}
                  className="absolute right-0 mt-2 w-48 bg-verde rounded-md shadow-lg z-11"
                >
                  <ul className="py-2 ">
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-white hover:bg-dark-verde"
                      >
                        Perfil
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => {
                          logout();
                          window.location.href = "/";
                        }}
                        className="block px-4 py-2 text-white hover:bg-dark-verde"
                      >
                        Cerrar sesión
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </nav>
          {/* Barra de navegación en pantallas más pequeñas a md */}
          <nav className="md:hidden  bg-verde border-gray-200  flex justify-between items-center p-2 h-18 ">
            <div className="ml-2">
              <button
                className="p-0  bg-transprent border-none w-15 "
                onClick={() =>
                  setDesplegableResponsiveAbierto(!desplegableResponsiveAbierto)
                }
              >
                <img
                  src="/imagenes/logo_web_2.svg"
                  alt="Logo web"
                  className="w-15 h-auto mt-2"
                />
              </button>
            </div>
            <div className="mr-5 font-fuente2">
              {/* Evento para invertir el estado de desplegableAbiertoPantallaPeq al hacer click */}
              <button
                className="flex items-center text-white hover:text-gray-300 cursor-pointer "
                onClick={() => setDesplegableAbiertoPantallaPeq(!desplegableAbiertoPantallaPeq)}
              >
                <img
                  src="/imagenes/logo_usuario_temporal.svg"
                  alt="Icono usuario"
                  className="w-10 h-auto mr-2"
                />
                <span>{user.ent_nombre}</span>
              </button>
              {desplegableResponsiveAbierto && (
                <div
                  ref={referenciaDesplegableResponsive}
                  className="absolute left-0 mt-2 w-38 bg-verde rounded-md shadow-lg z-11"
                >
                  <ul className="py-2 px-4  font-fuente2">
                    <li>
                      <Link to="/" className="text-white hover:text-gray-300">
                        Inicio
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/equipos"
                        className="text-white hover:text-gray-300"
                      >
                        Equipos
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/todosJugadores"
                        className="text-white hover:text-gray-300"
                      >
                        Jugadores
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/entrenamientos"
                        className="text-white hover:text-gray-300"
                      >
                        Entrenamientos
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
              {/* Solamente si desplegableAbierto es true se renderiza el menú desplegable */}
              {desplegableAbiertoPantallaPeq && (
                <div
                  ref={referenciaDesplegablePantallaPeq}
                  className="absolute right-0 mt-2 w-48 bg-verde rounded-md shadow-lg z-11  font-fuente2"
                >
                  <ul className="py-2">
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-white hover:bg-dark-verde"
                      >
                        Perfil
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => {
                          logout();
                          window.location.href = "/";
                        }}
                        className="block px-4 py-2 text-white hover:bg-dark-verde"
                      >
                        Cerrar sesión
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </nav>
        </div>
      ) : (
        <nav className="bg-verde border-gray-200  flex justify-center items-center flex-col p-2 h-18">
          <div>
            <Link to="/" className="flex justify-center items-center">
              <div className="text-white font-bold text-5xl text-center  font-fuente1">
                SOCCER MANAGER
              </div>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

export default BarraNavegacion;
