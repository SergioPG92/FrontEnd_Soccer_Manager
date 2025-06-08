import React, { useRef, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { verTodasSesiones } from "../funciones/sesiones_entrenamiento";
import ModalSesionEntrenamientos from "./ModalSesionEntrenamientos";

const CalendarioEntrenador = () => {
  /* Declaración de variables y constantes */
  const calendarRef = useRef(null);
  const [todasSesiones, setTodasSesiones] = useState([]);
  const [entrenadorId, setEntrenadorId] = useState(null);

  /* Constantes de de las modales */
  const modalSesionRef = useRef(null);
  const [modalVerSesionOpen, setModalVerSesionOpen] = useState(false);
  const [sesionSeleccionada, setSesionSeleccionada] = useState(null);
  const [posicionSesion, setPosicionSesion] = useState({ x: 0, y: 0 });

  /* Función que maneja la consulta a la api de todas las sesiones de los equipos del entrenador logeado. */
  const handleVerTodasSesiones = async () => {
    if (!entrenadorId) return;
    const resultado = await verTodasSesiones(entrenadorId);
    if (resultado && resultado.success) {
      setTodasSesiones(resultado.data.sesiones);
    }
  };


  /* Al renderizarse el componente por primera vez se consigue el userData del localstorage. Si existe, se le asigna a EntrenadorId el ent_id del entrenador. */
  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.ent_id) {
      setEntrenadorId(userData.ent_id);
    }
  }, []);

  /* Cuando se haya conseguido el id del entrenador, es decir, entrenadorId tiene valor, se llama al manejador para conseguir todas las sesiones. */
  useEffect(() => {
    handleVerTodasSesiones();
  }, [entrenadorId]);

  /* Función para manejar el click en un recuadro de sesión.
    Se consiguen los datos de la celda para pasársela más adelante a la modal.
    Se calcula la posición del click.
    Se pone a true ModalVerSesionOpen para que la modal se muestre.*/
  const handleClickEnSesion = (e) => {
    setSesionSeleccionada({
      id: e.event.id,
      title: e.event.title,
      equipo: e.event.extendedProps.equipo,
    });
    setPosicionSesion({ x: e.jsEvent.pageX, y: e.jsEvent.pageY });
    setModalVerSesionOpen(true);
  };

  /* Función para manejar el click fuera de la modal */
  const handleClickFuera = (e) => {
    e.stopPropagation();
    const clickEnModalSesion = e.target.closest(".modalSesion");
    const clickEnSesion = e.target.closest(".fc-event");
    if (!clickEnModalSesion && !clickEnSesion) {
      setModalVerSesionOpen(false);
    }
  };

  /* Añade al documento el evento click que comprueba si se ha hecho click fuera de la modal sesion */
  useEffect(() => {
    document.addEventListener("click", handleClickFuera);
    /*Limpia el evento al desmontar el componente para evitar problemas */
    return () => document.removeEventListener("click", handleClickFuera);
  }, []);

  return (
    <div className="bg-[url(/imagenes/fondo/fondo_participaciones-calendario.jpg)] bg-cover bg-center bg-no-repeat rounded-2xl">
      <div className="bg-verde-opacity-2 rounded-2xl shadow p-4 sm:p-6 lg:p-8 min-h-[86vh] overflow-x-auto">
        {/* Componente del calendario con los props pertinentes
        locale: Para que el nombre del mes sea en español.
        ref: Referencia del componente
        plugins: Plugins que habilitan mostrarse en grid las fechas y que pueda interactuar con ellas.
        initialView: Gracias al plugin dayGridPlugin, podemos indicar aquí la vista inicial, que será el grid del mes.
        events: Los eventos, se pasan en array y se mapean para indicarle la información a mostrar. En nuestro caso el id, el título (que será el tipo formateado para verse mejor)
                la fecha y el nombre del equipo.
        editable y droppable: Evitamos poder editar y arrastrar eventos.
        eventClick: Indicamos La función que se ejecuta al clickar un evento.
        eventContent: Se especifica el div que se mostrará en el evento/sesion. En este caso el título (tipo de sesión) y luego el equipo de dicha sesión.*/}
        <FullCalendar
          locale={esLocale}
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          eventBackgroundColor="#DDB771"
          eventTextColor="#073B3A"
          events={todasSesiones.map((sesion) => ({
            id: sesion.ses_id,
            title:
              sesion.ses_tipo.charAt(0).toUpperCase() +
                sesion.ses_tipo.slice(1).toLowerCase() || "Sesión",
            date: sesion.ses_fecha,
            equipo: sesion.equipo.equ_nombre,
          }))}
          editable={false}
          droppable={false}
          eventClick={handleClickEnSesion}
          height="auto" 
          eventContent={(e) => {
            const { title, extendedProps } = e.event;

            return (
              <div>
                <div className="fc-event-custom-title">
                  <strong>{title}</strong>
                </div>
                <div className="fc-event-custom-title">{extendedProps.equipo}</div>
              </div>
            );
          }}
        />

        {/* Modal para ver la sesión de entrenamiento. Se le pasan las props necesarias para que se muestre correctamente:
          Visible: La variable enviada se comprobará en el componente modal para que, si es true, se muestre, y si es false, no.
          Posicion: Se le pasa la posición del click para que en el componente se pueda calcular dónde mostrarse la modal (si hiciera falta)
          Sesion: Datos de la sesión para mostrarse en la modal (tipo, fecha, etc..)
          onClose: Función que debe ejecturarse al llamar onClose en el componente (la modal), en este caso se pondría a ModalVerSesionOpen a false para que no se muestre, es decir, se cierra la modal. */}
        <ModalSesionEntrenamientos
          visible={modalVerSesionOpen}
          ref={modalSesionRef}
          posicion={posicionSesion}
          sesion={sesionSeleccionada}
          onClose={() => setModalVerSesionOpen(false)}
        />
      </div>
    </div>
  );
};

export default CalendarioEntrenador;
