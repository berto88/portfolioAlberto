// Menú desplegable para dispositivos móviles
const menuButton = document.getElementById('menuButton');
const navLinks = document.getElementById('navLinks');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  // Cierra el menú al seleccionar una sección
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

/* =========================================
   CERRAR MODAL AL PULSAR FUERA
========================================= */

const experienceModal = document.getElementById("experienceModal");

if (experienceModal) {

  experienceModal.addEventListener("click", (event) => {

    // Comprobar si el clic se ha realizado fuera del contenido
    if (event.target === experienceModal) {
      experienceModal.close();
    }

  });

}

/* =========================================
   NAVEGACIÓN ENTRE PÁGINAS
========================================= */

// Mostrar la página correspondiente a un enlace
function mostrarPagina(hash, actualizarHistorial = false) {

    const id = hash.replace("#", "");
    const elemento = document.getElementById(id);
  
    if (!elemento) return;
  
    // Buscar el contenedor de página al que pertenece
    const pagina = elemento.closest(".page-view");
  
    if (!pagina) return;
  
    // Ocultar todas las páginas
    document.querySelectorAll(".page-view").forEach(p => {
      p.classList.remove("active");
    });
  
    // Mostrar la página seleccionada
    pagina.classList.add("active");
  
    // Actualizar la dirección del navegador
    if (actualizarHistorial && window.location.hash !== hash) {
      history.pushState(null, "", hash);
    }
  
    // Subir al principio
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
  
  // Interceptar los enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(enlace => {
  
    enlace.addEventListener("click", function(e) {
  
      const hash = this.getAttribute("href");
  
      if (!hash || hash === "#") return;
  
      const elemento = document.getElementById(hash.substring(1));
  
      if (!elemento || !elemento.closest(".page-view")) return;
  
      e.preventDefault();
  
      mostrarPagina(hash, true);
    });
  
  });
  
  // Gestionar los botones atrás y adelante del navegador
  window.addEventListener("popstate", () => {
  
    if (window.location.hash) {
      mostrarPagina(window.location.hash);
    } else {
      mostrarPagina("#sobre-mi");
    }
  
  });
  
  // Comprobar si se accede directamente a una sección mediante su URL
  if (window.location.hash) {
    mostrarPagina(window.location.hash);
  }


// Actualiza automáticamente el año del pie de página
const yearElement = document.getElementById('year');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// PopUp y acciones en este
const copyEmailButton = document.getElementById("copyEmail");
const contactAction = document.querySelector(".contact-action");

let popupTimeout;

if (contactAction) {

    // Mostrar popup al entrar con el ratón
    contactAction.addEventListener("mouseenter", () => {
        clearTimeout(popupTimeout);
        contactAction.classList.add("show-popup");
    });

    // Esperar 3 segundos al salir antes de ocultarlo
    contactAction.addEventListener("mouseleave", () => {
        popupTimeout = setTimeout(() => {
            contactAction.classList.remove("show-popup");
        }, 1500);
    });

    // Mantenerlo abierto si se navega con el teclado
    contactAction.addEventListener("focusin", () => {
        clearTimeout(popupTimeout);
        contactAction.classList.add("show-popup");
    });

    contactAction.addEventListener("focusout", () => {
        popupTimeout = setTimeout(() => {
            if (!contactAction.matches(":focus-within")) {
                contactAction.classList.remove("show-popup");
            }
        }, 1500);
    });
}

// ===================================
// COPIAR CORREO AL PORTAPAPELES
// ===================================

if (copyEmailButton) {

  copyEmailButton.addEventListener("click", async () => {

      const email = "bertotorre88@gmail.com";
      const feedback = document.getElementById("copyFeedback");

      try {
          await navigator.clipboard.writeText(email);

          if (feedback) {
              feedback.textContent = "✓ ¡Correo copiado correctamente!";
          }

          copyEmailButton.classList.add("copied");

      } catch (error) {

          console.error("Error al copiar:", error);

          if (feedback) {
              feedback.textContent = "No se pudo copiar el correo.";
          }
      }
  });
}