import React, { useEffect, useRef, useState } from "react";

/* Se reciben props a través del componente padre que sirve para el funcionamiento de la modal. */
const ModalSesionExistente = ({ visible, posicion, sesion, onClose }) => {
  /* Declaración de variables */
  const modalRef = useRef(null);
  const [posicionAjustada, setPosicionAjustada] = useState({ x: 0, y: 0 });

  /* Si visible y posicion son false, no se muestra la modal.*/
  useEffect(() => {
    if (!visible || !posicion) return;

    /* En caso de que sean true, se calcula el tamaño de la pantalla.  */
    const ajustarPosicion = () => {
      const anchoModal = modalRef.current?.offsetWidth;
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

  /* Si la modal no es visible, se retorna null para no renderizar nada */
  if (!visible || !sesion) return null;

  return (
    <div
      ref={modalRef}
      className="modalSesion bg-dark-verde p-6 font-semibold rounded-[10px] shadow-[0px_6px_16px_rgba(0,0,0,0.25)] z-[1000] min-w-[300px] font-fuente2"
      /* Se establece el estilo de la modal con position absolute y el top/left para que aparezca donde se calculó con posición previamente */
      style={{
        position: "absolute",
        top: posicionAjustada.y,
        left: posicionAjustada.x,
      }}
    >
      <div className="bg-dorado text-black px-4 py-3 rounded-tl-[8px] rounded-tr-[8px] -mt-6 -ml-6 -mr-6 mb-4 text-[1.2rem] font-bold">
        {sesion.title}
      </div>
      <div className="text-white py-3 rounded mb-4 text-[1.2rem] font-bold text-left">
        Equipo: {sesion.equipo}
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          className="text-black px-2 py-1 bg-gray-300 rounded"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ModalSesionExistente;
