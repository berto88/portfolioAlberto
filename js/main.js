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
const copyText = document.getElementById("copyText");

if (copyEmailButton) {
    copyEmailButton.addEventListener("click", async () => {
        const email = "bertotorre88@gmail.com";

        try {
            await navigator.clipboard.writeText(email);

            copyText.textContent = "¡Copiado!";

            setTimeout(() => {
                copyText.textContent = "Copiar";
            }, 2000);

        } catch (error) {
            copyText.textContent = "No disponible";

            setTimeout(() => {
                copyText.textContent = "Copiar";
            }, 2000);
        }
    });
}
