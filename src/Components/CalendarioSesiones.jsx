import React, { useRef, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import {
  verSesiones,
  crearSesion,
  eliminarSesion,
  editarSesion,
} from "../funciones/sesiones_entrenamiento";
import { useParams } from "react-router-dom";
import ModalNuevaSesion from "./ModalNuevaSesion";
import ModalSesionExistente from "./ModalSesionExistente";

const CalendarioSesiones = () => {
  /* Declaración de variables y constantes */
  const calendarRef = useRef(null);
  const modalFechaRef = useRef(null);
  const modalSesionRef = useRef(null);
  const { equipoId } = useParams();
  const [sesiones, setSesiones] = useState([]);

  // Estados modal nueva sesión
  const [modalFechaOpen, setModalFechaOpen] = useState(false);
  const [posicionModal, setPosicionModal] = useState({ x: 0, y: 0 });
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);

  // Estados modal sesión existente
  const [modalVerSesionOpen, setModalVerSesionOpen] = useState(false);
  const [sesionSeleccionada, setSesionSeleccionada] = useState(null);
  const [posicionSesion, setPosicionSesion] = useState({ x: 0, y: 0 });

  //Función que maneja la llamada a la api para conseguir las sesiones del equipo seleccionado.
  const handleVerSesiones = async () => {
    const resultado = await verSesiones(equipoId);
    if (resultado) {
      setSesiones(resultado.data.sesiones);
    }
  };
  //LLamada a la función handleVerSesiones al cargar el componente.
  useEffect(() => {
    handleVerSesiones();
  }, []);

  /* Función que maneja el click en un cuadro del calendario que no tenga sesión (fecha)
    Calcula la posición del click y se lo asigna a la variable PosicionModal
    Asigna el valor true a ModalFechaOpen */
  const handleDateClick = (e) => {
    setFechaSeleccionada(e.dateStr);
    setPosicionModal({ x: e.jsEvent.pageX, y: e.jsEvent.pageY });
    setModalFechaOpen(true);
  };

  /* Sesión para llamar a la api con los valores pertinentes (fecha, tipo y equipo de la sesión) para crear una sesión de entrenamiento */
  const handleCrearSesion = async (fecha, tipo) => {
    const resultado = await crearSesion(fecha, tipo, equipoId);
    if (resultado) {
      setModalFechaOpen(false);
      handleVerSesiones();
    }
  };

  /* Función para manejar el click en un recuadro de sesión.
    Se consiguen los datos de la celda para pasársela más adelante a la modal.
    Se calcula la posición del click.
    Se pone a true ModalVerSesionOpen para que la modal se muestre.*/
  const handleClickEnSesion = (e) => {
    setSesionSeleccionada({
      id: e.event.id,
      title: e.event.title,
    });
    setPosicionSesion({ x: e.jsEvent.pageX, y: e.jsEvent.pageY });
    setModalVerSesionOpen(true);
  };

  /* Función para manejar la eliminación de sesiones.
  Confirma el deseo del entrenador de borrar la sesión y en caso afirmativo llama a la api */
  const handleEliminarSesion = async (id) => {
    const confirmacionEliminar = window.confirm(
      "¿Estás seguro de que deseas eliminar esta sesión?"
    );
    if (confirmacionEliminar) {
      const resultado = await eliminarSesion(id);
      if (resultado) {
        setModalVerSesionOpen(false);
        handleVerSesiones();
      }
    }
  };

  /* Función para manejar el click fuera de la modal */
  const handleClickFuera = (e) => {
    e.stopPropagation();

    const clickEnFechaModal = e.target.closest(".modalFecha");
    if (!clickEnFechaModal) {
      setModalFechaOpen(false);
    }

    const clickEnModalSesion = e.target.closest(".modalSesion");
    const clickEnSesion = e.target.closest(".fc-event");
    if (!clickEnModalSesion && !clickEnSesion) {
      setModalVerSesionOpen(false);
    }
  };

  /* Función para manejar la actualización de una sesión. 
  Si la respuesta es ok cierra la modal (modalverSesionOpen a falso)
  y llama de nuevo a handleVerSesiones() para actualizar el contenido mostrado*/
  const handleActualizarSesion = async (sesionActualizada) => {
    const resultado = await editarSesion(
      sesionActualizada.id,
      sesionActualizada.fecha,
      sesionActualizada.tipo
    );
    if (resultado) {
      setModalVerSesionOpen(false);
      handleVerSesiones();
    }
  };

  /* Sesión para manejar cuando una sesión ha sido movida.
  Recoge los datos de la sesión que se movió y calcula la fecha de la celda donde se ha dejado la sesión
  Llama a actualizar sesión con los datos actualizados. */
  const handleMoverSesion = async (e) => {
    const nuevaFecha = e.event.startStr;
    const sesionMovida = {
      id: e.event.id,
      title: e.event.title,
      fecha: nuevaFecha,
    };
    await handleActualizarSesion(sesionMovida);
  };

  /* Se añade al documento el evento que comprueba si se ha hecho click fuera de las modales */
  useEffect(() => {
    document.addEventListener("click", handleClickFuera);
    return () => {
      /*Se limpia el evento al desmontarse el componente, para que no haya problemas. */
      document.removeEventListener("click", handleClickFuera);
    };
  }, []);

  return (
    <div className="bg-[url(/imagenes/fondo/fondo_participaciones-calendario.jpg)] bg-cover bg-center bg-no-repeat rounded-2xl">
      <div className=" bg-verde-opacity-2 rounded-2xl shadow p-4 sm:p-6 lg:p-8  min-h-[86vh]">
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
          events={sesiones.map((s) => ({
            id: s.id,
            title:
              s.title.charAt(0).toUpperCase() +
                s.title.slice(1).toLowerCase() || "Sesión",
            date: s.date,
          }))}
          editable={true}
          droppable={true}
          dateClick={handleDateClick}
          eventClick={handleClickEnSesion}
          eventDrop={handleMoverSesion}
          eventContent={(e) => {
            const { title } = e.event;
            return (
              <div className="fc-event-custom-title font-fuente2">
                <strong>{title}</strong>
              </div>
            );
          }}
        />
    <div className="text-gray-100 font-fuente2 text-sm pt-2 pl-2 bg-dark-verdiazul-opacity p-2 rounded mt-2 w-120">
          <span className="font-bold">•Crear sesión:</span> Haz click en un cuadro de fecha, selecciona el tipo de entrenamiento y presiona 'Crear'.
          <br/>
          <span className="font-bold">•Editar fecha de sesión:</span> Arrastra tu sesión a la casilla de la nueva fecha o haz click en la sesión, selecciona
          la nueva fecha y presiona 'Guardar'.<br/>
          <span className="font-bold">•Eliminar sesión:</span> Haz click en la sesión y presiona el botón 'Eliminar', confirma el mensaje de alerta.
        </div>
{/* Modal para crear una nueva sesión de entrenamiento. Se le pasan las props necesarias para que se muestre correctamente:
          Visible: La variable enviada se comprobará en el componente modal para que, si es true, se muestre, y si es false, no.
          Posicion: Se le pasa la posición del click para que en el componente se pueda calcular dónde mostrarse la modal (si hiciera falta)
          Fecha: Fecha que tendrá la nueva sesión.
          onClose: Función que debe ejecutarse al llamar onClose en el componente (la modal), en este caso se pondría a ModalVerSesionOpen a false para que no se muestre, es decir, se cierra la modal. 
          onCrearSesion: Función que se ejecuta cuando se llama onCrearSesion en el componente (modal) */}
        <ModalNuevaSesion
          visible={modalFechaOpen}
          ref={modalFechaRef}
          posicion={posicionModal}
          fecha={fechaSeleccionada}
          onClose={() => setModalFechaOpen(false)}
          onCrearSesion={handleCrearSesion}
        />

        {/* Modal para ver la sesión de entrenamiento. Se le pasan las props necesarias para que se muestre correctamente:
          Visible: La variable enviada se comprobará en el componente modal para que, si es true, se muestre, y si es false, no.
          Posicion: Se le pasa la posición del click para que en el componente se pueda calcular dónde mostrarse la modal (si hiciera falta)
          Sesion: Datos de la sesión para mostrarse en la modal (tipo, fecha, etc..)
          onClose: Función que debe ejecturarse al llamar onClose en el componente (la modal), en este caso se pondría a ModalVerSesionOpen a false para que no se muestre, es decir, se cierra la modal. */}

        <ModalSesionExistente
          visible={modalVerSesionOpen}
          ref={modalSesionRef}
          posicion={posicionSesion}
          sesion={sesionSeleccionada}
          onClose={() => setModalVerSesionOpen(false)}
          onEliminar={handleEliminarSesion}
          onActualizar={handleActualizarSesion}
        />
      </div>
    </div>
  );
};

export default CalendarioSesiones;
