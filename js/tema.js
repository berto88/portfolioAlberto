/* ==========================================================
   Cambio de tema claro / oscuro
   - Oscuro = diseño original (por defecto)
   - Claro  = <html data-theme="light"> (ver css/tema-claro.css)
   - Se guarda la elección en localStorage
   Debe cargarse DESPUÉS de traducciones.js (usa t()).
   ========================================================== */

(function () {
    const CLAVE = "tema";
    const raiz = document.documentElement;
    const COLOR_META = { dark: "#0b1020", light: "#f6efe3" };

    function leerGuardado() {
        try {
            return localStorage.getItem(CLAVE);
        } catch (e) {
            return null;
        }
    }

    function guardar(tema) {
        try {
            localStorage.setItem(CLAVE, tema);
        } catch (e) { /* almacenamiento no disponible */ }
    }

    function temaActual() {
        return raiz.dataset.theme === "light" ? "light" : "dark";
    }

    function actualizarBoton() {
        const boton = document.getElementById("themeButton");
        if (!boton) return;

        const esClaro = temaActual() === "light";
        const texto = typeof t === "function"
            ? t(esClaro ? "themeToDark" : "themeToLight")
            : (esClaro ? "Cambiar a tema oscuro" : "Cambiar a tema claro");

        // Muestra el icono del tema al que se va a cambiar
        boton.textContent = esClaro ? "☾" : "☀";
        boton.setAttribute("aria-label", texto);
        boton.setAttribute("title", texto);
    }

    function aplicarTema(tema) {
        if (tema === "light") {
            raiz.dataset.theme = "light";
        } else {
            delete raiz.dataset.theme;
        }

        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute("content", COLOR_META[tema === "light" ? "light" : "dark"]);

        guardar(tema === "light" ? "light" : "dark");
        actualizarBoton();
    }

    function alternarTema() {
        aplicarTema(temaActual() === "light" ? "dark" : "light");
    }

    document.addEventListener("DOMContentLoaded", () => {
        const boton = document.getElementById("themeButton");
        if (boton) boton.addEventListener("click", alternarTema);

        // Sincroniza meta theme-color con el tema ya aplicado en <head>
        aplicarTema(temaActual());
    });

    // Si cambia el idioma, se actualiza el texto accesible del botón
    document.addEventListener("idiomaCambiado", actualizarBoton);
})();
