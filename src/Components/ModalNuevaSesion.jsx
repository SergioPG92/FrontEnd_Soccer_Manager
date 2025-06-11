import React, { useRef, useEffect, useState } from "react";

/* Se reciben props a través del componente padre que sirve para el funcionamiento de la modal. */
const ModalNuevaSesion = ({
  visible,
  posicion,
  fecha,
  onClose,
  onCrearSesion,
}) => {
  /* Declaración de variables */
  const modalRef = useRef(null);
  const [tipo, setTipo] = useState("");
  const [mensajeTipo, setMensajeTipo] = useState("");
  const [posicionAjustada, setPosicionAjustada] = useState({ x: 0, y: 0 });

  /* Si visible y posicion son false, no se muestra la modal.*/
  useEffect(() => {
    if (!visible || !posicion) return;

    /* En caso de que sean true, se calcula el tamaño de la pantalla.  */
    const ajustarPosicion = () => {
      const anchoModal = modalRef.current?.offsetWidth || 300;
      const anchoPantalla = window.innerWidth;

      let nuevaX = posicion.x;
      /*Si la posición x del click para abrir la modal más el ancho total de la modal es mayor que el ancho de la pantalla, se ajusta la 
      posición x de la modal para que no se salga de la pantalla, es decir, se mostrará más a la izquierda */
      if (posicion.x + anchoModal > anchoPantalla) {
        nuevaX = posicion.x - anchoModal;
      }
      /* Si la posición x del click es menor que 10, se ajusta a 10 para que no se salga de la pantalla por la izquierda */
      if (nuevaX < 10) nuevaX = 10;

      /*Se actualiza el valor de la posición */
      setPosicionAjustada({ x: nuevaX, y: posicion.y });
    };

    /*Cada vez que cambia visible o posicion se ejecuta el código (se ajusta la posición de la modal) */
    ajustarPosicion();
  }, [visible, posicion]);

  /* Función para manejar la creación de sesiones.
  Comprueba que se ha introducido un tipo (A través del select)
  y, en caso afirmativo, se llama a la función que se definió en el componente padre para onCrearSesion, con los parámetros fecha y tipo. 
  Se restablece el valor de Tipo y MensajeTipo para mostrarse sin valor en nuevas modales */
  const handleCrear = () => {
    if (tipo.trim() === "") {
      setMensajeTipo("No has seleccionado un tipo.");
      return;
    }

    onCrearSesion(fecha, tipo);
    setTipo("");
    setMensajeTipo("");
  };

  /* Si la modal no es visible, se retorna null para no renderizar nada */
  if (!visible) return null;

  return (
    <div
      ref={modalRef}
      className="modalFecha bg-dorado p-6 text-black font-semibold rounded-[10px] shadow-[0px_6px_16px_rgba(0,0,0,0.25)] z-[1000] min-w-[300px] font-fuente2 "
      /* Se establece el estilo de la modal con position absolute y el top/left para que aparezca donde se calculó con posición previamente */
      style={{
        position: "absolute",
        top: posicionAjustada.y,
        left: posicionAjustada.x,
      }}
    >
      <div className="bg-dark-verde text-white px-4 py-3 rounded-tl-[8px] rounded-tr-[8px] -mt-6 -ml-6 -mr-6 mb-4 text-[1.2rem] font-bold">
        Nueva Sesión
      </div>

      <h3 className="font-bold mb-2 text-sm">Nueva sesión</h3>
      <p className="mb-2">
        {/* Fecha en formato dd/mm/aaaa */}
        Fecha: {new Date(fecha).toLocaleDateString("es-ES")}
      </p>

      <div className="mb-2">
        <label className="block mb-1">Tipo de sesión</label>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="border px-2 py-1 w-full bg-dorado"
        >
          <option value="">Selecciona un tipo</option>
          <option value="tactica">Táctica</option>
          <option value="tecnica">Técnica</option>
          <option value="resistencia">Resistencia</option>
          <option value="fuerza">Fuerza</option>
          <option value="velocidad">Velocidad</option>
          <option value="agilidad">Agilidad</option>
          <option value="finalizacion">Finalización</option>
          <option value="coordinacion">Coordinación</option>
          <option value="recuperacion">Recuperación</option>
          <option value="control">Control</option>
          <option value="pase">Pase</option>
          <option value="posicional">Posicional</option>
          <option value="transiciones">Transiciones</option>
        </select>
        {/* Mensaje de error. Aparecerá solo si no se ha seleccinado el tipo al hacer submit del formulario. */}
        {mensajeTipo && <p className="text-red-500 mt-1">{mensajeTipo}</p>}
      </div>

      <div className="flex justify-end space-x-2">
        <button
          onClick={handleCrear}
          className="px-2 py-1 bg-blue-600 text-white rounded cursor-pointer"
        >
          Crear
        </button>
        <button onClick={onClose} className="px-2 py-1 bg-gray-300 rounded cursor-pointer">
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ModalNuevaSesion;
