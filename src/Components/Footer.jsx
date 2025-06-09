import React from "react";

function Footer() {
  return (
    <footer className="bg-dark-verde text-white py-2  font-fuente2">
      <div className="mx-auto px-4 flex justify-between items-center text-center gap-4 flex-col md:flex-row">
        {/* Parte izquierda del footer */}
        <div className="flex flex-col items-center justify-center order-3 md:order-1">
          <p className="text-m">© 2025 Soccer Manager </p>Este trabajo está bajo
          una licencia
          <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.es">
            Creative Commons Atribución-CompartirIgual 4.0 Internacional (CC
            BY-SA 4.0)
          </a>
          <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.es">
            <img src="/imagenes/CC_BY-SA_logo.svg" alt="imagen derechos" />
          </a>
          <p className="text-m">Desarrollado por Sergio Paco Gómez</p>
        </div>
        <hr class="solid block md:hidden order-2"></hr>
        {/* Parte derecha del footer */}
        <div className="flex flex-col justify-center text-left order-1 md:order-3">
          <div>
            <p className="text-m">
              <strong>Contacto</strong>
            </p>
          </div>
          <div className="flex mb-2 items-center items-center gap-2">
            <img className="w-7" src="/imagenes/iconos/icono_whatsapp.svg" />
            <p className="text-m"> +34 655644688</p>
          </div>
          <div className="flex mb-2 items-center items-center gap-2">
            <img className="w-7" src="/imagenes/iconos/icono_gmail.svg" />
            <p className="text-m"> contacto@soccerManager.com</p>
          </div>
          <div className="flex mb-2 items-center items-center gap-2">
            <img className="w-7" src="/imagenes/iconos/icono_instagram.svg" />
            <p className="text-m">
              <a href="https://instagram.com/soccer-manager">@Soccer Manager</a>
            </p>
          </div>
          <div className="flex mb-2 items-center items-center gap-2">
            <img className="w-7" src="/imagenes/iconos/icono_facebook.svg" />
            <p className="text-m">
              <a href="https://facebook.com/soccer-manager">Soccer Manager</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
