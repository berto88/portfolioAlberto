const traducciones = {
    es: {
        sobreMi: "Sobre mí",
        tecnologias: "Tecnologías",
        experiencia: "Experiencia",
        proyectos: "Mis proyectos",
        objetivos: "Objetivos",
        contacto: "Contacto"
    },

    en: {
        sobreMi: "About me",
        tecnologias: "Technologies",
        experiencia: "Experience",
        proyectos: "My projects",
        objetivos: "Goals",
        contacto: "Contact"
    }
};

let idiomaActual = "es";

function cambiarIdioma() {
    idiomaActual = idiomaActual === "es" ? "en" : "es";

    document.querySelectorAll("[data-i18n]").forEach(elemento => {
        const clave = elemento.dataset.i18n;

        if (traducciones[idiomaActual][clave]) {
            elemento.textContent = traducciones[idiomaActual][clave];
        }
    });

    document.getElementById("languageButton").textContent =
        idiomaActual === "es" ? "EN" : "ES";

    document.documentElement.lang = idiomaActual;
}

document.getElementById("languageButton")
    .addEventListener("click", cambiarIdioma);