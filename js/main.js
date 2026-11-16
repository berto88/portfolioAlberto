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
        }, 2000);
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
        }, 2000);
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