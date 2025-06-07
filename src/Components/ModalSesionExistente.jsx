import React, { useState, useEffect, useRef } from "react";

/* Se reciben props a través del componente padre que sirve para el funcionamiento de la modal. */
const ModalSesionExistente = ({
  visible,
  posicion,
  sesion,
  onClose,
  onEliminar,
  onActualizar,
}) => {
  /* Declaración de variables */
  const modalRef = useRef(null);
  const [fecha, setFecha] = useState(sesion?.fecha || "");
  const [posicionAjustada, setPosicionAjustada] = useState({ x: 0, y: 0 });

  /*Cada vez que visible y posicion cambian, se ajusta la posición de la modal para que no se salga de la pantalla. */
  useEffect(() => {
    /* En caso de que visible y posicion sean true, se calcula el tamaño de la pantalla.  */
    if (visible && posicion) {
      const anchoModal = modalRef.current?.offsetWidth || 300;
      const anchoPantalla = window.innerWidth;

      let nuevaX = posicion.x;
      /*Si la posición x del click para abrir la modal más el ancho total de la modal es mayor que el ancho de la pantalla, se ajusta la 
      posición x de la modal para que no se salga de la pantalla, es decir, se mostrará más a la izquierda */
      if (posicion.x + anchoModal > anchoPantalla) {
        nuevaX = anchoPantalla - anchoModal - 10;
      }
      /* Si la posición x del click es menor que 10, se ajusta a 10 para que no se salga de la pantalla por la izquierda */
      if (nuevaX < 10) {
        nuevaX = 10;
      }

      /*Se actualiza el valor de la posición */
      setPosicionAjustada({ x: nuevaX, y: posicion.y });
    }
  }, [visible, posicion]);

  /* Función para manejar el submit del formulario */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onActualizar) {
      //Le pasa a onActualizar (definido por el componente padre) los valores de sesion añadiendo la fecha.
      onActualizar({ ...sesion, fecha });
    }
    onClose();
  };

  /* Si visible o sesion son false, no se muestra la modal */
  if (!visible || !sesion) return null;

  return (
    <div
      ref={modalRef}
      className="modalSesion bg-dark-verde p-6 font-semibold rounded-[10px] shadow-[0px_6px_16px_rgba(0,0,0,0.25)] z-[1000] min-w-[300px] font-fuente2"
      //Estilo de la modal con la posición absolute y top/left con la posición calculada previamente
      style={{
        position: "absolute",
        top: posicionAjustada.y,
        left: posicionAjustada.x,
      }}
    >
      <div className="bg-dorado text-black px-4 py-3 rounded-tl-[8px] rounded-tr-[8px] -mt-6 -ml-6 -mr-6 mb-4 text-[1.2rem] font-bold">
        {sesion.title}
      </div>

      <form onSubmit={handleSubmit} className="text-white">
        <div className="mb-4">
          <label htmlFor="fecha">
            <strong>Fecha de la sesión:</strong>
          </label>
          <br />
          <input
            className="border-white border-1"
            type="date"
            id="fecha"
            name="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </div>
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}
        >
          <button
            type="submit"
            className="px-2 py-1 bg-blue-600 text-white rounded"
          >
            Guardar
          </button>
          <button
            type="button"
            className="text-black px-2 py-1 bg-gray-300 rounded"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="px-2 py-1 bg-red-600 text-white rounded"
            /* Al hacer click en el botón de eliminar, se llama a la función onEliminar (definida por el componente padre) y se le pasa el id de la sesión */
            onClick={() => onEliminar(sesion.id)}
          >
            Eliminar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalSesionExistente;
