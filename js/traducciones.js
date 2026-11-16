/* ==========================================================
   Sistema de traducción ES / EN

   Atributos soportados en el HTML:
   - data-i18n="clave"              → cambia textContent
   - data-i18n-html="clave"         → cambia innerHTML (textos con <strong>, <span>...)
   - data-i18n-placeholder="clave"  → cambia el placeholder
   - data-i18n-tooltip="clave"      → cambia data-tooltip
   - data-i18n-aria="clave"         → cambia aria-label

   El español NO hace falta duplicarlo: se captura automáticamente
   del propio HTML al cargar la página (solo se definen aquí los
   textos que no están en el DOM: título y meta description).
   ========================================================== */

   const traducciones = {
    es: {
        pageTitle: "Alberto | Desarrollador Web Java",
        metaDescription: "Portfolio personal de Alberto, desarrollador web especializado en Java y tecnologías web."
    },

    en: {
        pageTitle: "Alberto | Java Web Developer",
        metaDescription: "Personal portfolio of Alberto, a web developer specialized in Java and web technologies.",

        /* ---------- NAVEGACIÓN ---------- */
        sobreMi: "About me",
        tecnologias: "Technologies",
        experiencia: "Experience",
        proyectos: "My projects",
        objetivos: "Goals",
        contacto: "Contact",
        navAria: "Main navigation",
        menuButton: "☰ Menu",

        /* ---------- HERO ---------- */
        heroEyebrow: "Web development · Java",
        heroTitle: "Hi, I'm <span>Alberto.</span>",
        heroCopy: "Web developer specialized in Java, interested in building useful solutions, maintaining robust applications and continuing to grow in the world of software development.",
        heroBtnTech: "View technologies <span aria-hidden=\"true\">→</span>",
        heroBtnContact: "Get in touch",
        profileAria: "Profile summary",
        profileRole: "Java Web Developer",
        profileStatus: "<span class=\"dot\"></span> Always learning",

        /* ---------- SOBRE MÍ ---------- */
        aboutEyebrow: "Get to know me",
        aboutTitle: "About me",
        aboutIntro: "My background, the way I work and what drives me to keep growing as a developer.",
        aboutP1: "I'm a web developer specialized in <strong>Java</strong>, with experience in the development, maintenance and evolution of enterprise web applications.",
        aboutP2: "Throughout my career I have taken part in implementing new features, analysing requirements, resolving incidents and continuously improving existing applications.",
        aboutP3: "I consider myself <strong>consistent, committed and proactive</strong>. I enjoy understanding how systems work, analysing problems and looking for efficient, maintainable solutions.",
        aboutP4: "My goal is to keep growing professionally, broaden my technical knowledge and take on new challenges that allow me to get increasingly involved in the <strong>analysis and design of software solutions</strong>.",

        principleInitiative: "Initiative",
        principleInitiativeText: "I like taking on new challenges and finding solutions.",
        principleTeam: "Teamwork",
        principleTeamText: "Sharing knowledge and learning from others.",
        principleImprovement: "Continuous improvement",
        principleImprovementText: "Consistency and effort as part of the learning process.",

        philosophyTag: "PHILOSOPHY",
        philosophyEyebrow: "My approach to development",
        philosophyTitle: "Effort builds, too.",
        philosophyText: "I believe that effort, consistency and a desire to learn are essential to grow professionally. Every problem is an opportunity to gain new knowledge and every project is one more step towards my goals.",
        philosophySignature: "<span></span>Learn, improve and keep moving forward.",

        /* ---------- TECNOLOGÍAS ---------- */
        techEyebrow: "Tech stack",
        techTitle: "Technologies and skills",
        techIntro: "Tools and technologies I have worked with.",
        techBackend: "Backend",
        techFrontend: "Frontend",
        techDatabases: "Databases",
        techTools: "Tools",
        techCms: "CMS",
        techLearning: "Currently learning",
        techMicroservices: "Microservices",

        /* ---------- EXPERIENCIA ---------- */
        expEyebrow: "Career",
        expTitle: "Professional experience",
        expDate1: "Web development",
        expTitle1: "Java Web Developer",
        expText1: "Development and maintenance of enterprise web applications. Implementation of features, analysis of requested changes, incident resolution and collaboration with the development team.",
        expDate2: "Collaboration",
        expTitle2: "Technical support and teamwork",
        expText2: "Helping new team members get started, answering technical questions and sharing knowledge to make the team's work easier.",
        expViewFull: "View my full experience ↗",

        modalEyebrow: "PROFESSIONAL CAREER",
        modalTitle: "My work experience",
        modalSubtitle: "My journey in web application development.",
        modalCloseAria: "Close window",
        jobResponsibilities: "Responsibilities",
        jobTechnologies: "Technologies used",

        job2Date: "OCT 2025 — PRESENT",
        job2Title: "Senior Programmer",
        job2Company: "Soltel · Seville",
        job2Desc: "Development and maintenance of web applications and portals, implementing new features, resolving incidents and adapting solutions to client requirements.",
        job2R1: "Development and evolutionary maintenance of web applications.",
        job2R2: "Incident resolution and performance optimisation.",
        job2R3: "Requirements analysis and implementation of technical improvements.",
        job2R4: "Database management and functional testing.",

        job1Date: "MAR 2021 — OCT 2025",
        job1Title: "Full Stack Developer",
        job1Company: "Ayesa · Seville",
        job1Desc: "End-to-end development and maintenance of web applications and websites, working on front-end, back-end and databases. I also took part in client requirements management and in onboarding new developers.",
        job1R1: "Design, development and implementation of new features and architecture for web applications.",
        job1R2: "Application maintenance, incident resolution and handling of client requests.",
        job1R3: "Code and interface optimisation to improve performance, usability and visual appearance.",
        job1R4: "Requirements gathering, analysis of technical specifications and proposing improvements to the client.",
        job1R5: "Change impact analysis and development cycle planning.",
        job1R6: "Onboarding and mentoring of new team members.",
        job1R7: "Usability and compatibility testing across different devices and browsers.",
        job1R8: "Writing technical and functional documentation.",

        eduEyebrow: "EDUCATION",
        eduTitle: "Web Application Development",
        eduCenter: "Higher Vocational Degree · Colegio Altair (Seville)",
        eduGrade: "Average grade: 9",

        modalFooter: "Professional experience · Web development",
        modalClose: "Close",

        /* ---------- PROYECTOS ---------- */
        projEyebrow: "PROJECTS AND DEVELOPMENT",
        projTitle: "My projects",
        projIntro: "Throughout my career I have taken part in the development and maintenance of several web applications and solutions.",
        noticeTitle: "Confidentiality and privacy",
        noticeP1: "Due to the security, privacy and confidentiality policies of the companies and clients I have worked with, I am not able to publicly show the real projects I have been involved in.",
        noticeP2: "However, I have prepared some demo examples inspired by solutions and features similar to the ones I developed during my professional experience. These examples do not contain any information or code from the original projects.",

        mapEyebrow: "INTERACTIVE DEMO",
        mapTitle: "Monuments Map",
        mapIntro: "Sample application to display geographic monuments, view their information and filter the results using different criteria.",
        mapSearchTitle: "Search monuments",
        mapSearchLabel: "Name or town",
        mapSearchPlaceholder: "Search monument...",
        mapProvinceLabel: "Province",
        mapAllProvinces: "All provinces",
        mapTypeLabel: "Monument type",
        mapAllTypes: "All types",
        mapFound: "Monuments found",
        mapResults: "Results",
        mapLoading: "Loading monuments...",
        mapAttribution: "Geographic data of monuments in Andalusia for demonstration purposes.",
        mapTechUsed: "Technologies used:",

        ttHtml5: "Structure and organisation of the map interface content.",
        ttCss3: "Visual design, styles, animations and adaptation to different devices.",
        ttJs: "Development of the map logic, filters, markers and interactions.",
        ttDom: "Dynamic manipulation of HTML elements to update the results.",
        ttFetch: "Asynchronous loading of the KML file from the project.",
        ttXml: "XML-based format used to store geographic information.",
        ttKml: "File containing the coordinates and data of the monuments.",
        ttDomParser: "Processing and reading of the KML file's XML content.",
        ttGeoJson: "Geographic data structure used to represent the monuments on the map.",
        ttLeaflet: "JavaScript library used to create and manage the interactive map.",
        ttCluster: "Plugin that groups nearby markers to improve visualisation.",
        ttOsm: "Cartography used as the base map to represent Andalusia.",
        ttResponsive: "Interface adaptation for computers, tablets and mobile phones.",
        ttGrid: "Layout system based on grids.",

        /* ---------- OBJETIVOS ---------- */
        goalsEyebrow: "Looking ahead",
        goalsTitle: "My next goals",
        goalsIntro: "Keep evolving professionally, broaden my knowledge and take on new technical challenges.",
        goal1Number: "01 / GROWTH",
        goal1Title: "Become an Analyst",
        goal1Text: "Go deeper into requirements analysis, solution design and application architecture.",
        goal2Number: "02 / ARCHITECTURE",
        goal2Title: "Microservices",
        goal2Text: "Learn to design and develop distributed systems, understanding how they communicate and their advantages.",
        goal3Number: "03 / DEVOPS",
        goal3Title: "Docker and Kubernetes",
        goal3Text: "Gain experience in containerisation, deployment, management and orchestration of applications.",

        /* ---------- CONTACTO ---------- */
        contactTitle: "Shall we talk?",
        contactText: "I'm open to sharing ideas, learning and getting to know new projects.",
        contactBtn: "Write to me <span aria-hidden=\"true\">↗</span>",
        contactAlso: "You can also email me at:",
        contactCopy: "Copy <span aria-hidden=\"true\">⧉</span>",

        /* ---------- FOOTER ---------- */
        footerPortfolio: "Personal portfolio",
        footerCredits: "Designed and developed by me."
    }
};

const IDIOMA_POR_DEFECTO = "es";
let idiomaActual = IDIOMA_POR_DEFECTO;

/* Cada tipo de atributo: cómo leer el valor original y cómo aplicar la traducción */
const i18nAtributos = [
    {
        selector: "[data-i18n]",
        dataset: "i18n",
        leer: el => el.textContent.trim(),
        aplicar: (el, valor) => { el.textContent = valor; }
    },
    {
        selector: "[data-i18n-html]",
        dataset: "i18nHtml",
        leer: el => el.innerHTML.trim(),
        aplicar: (el, valor) => { el.innerHTML = valor; }
    },
    {
        selector: "[data-i18n-placeholder]",
        dataset: "i18nPlaceholder",
        leer: el => el.getAttribute("placeholder"),
        aplicar: (el, valor) => { el.setAttribute("placeholder", valor); }
    },
    {
        selector: "[data-i18n-tooltip]",
        dataset: "i18nTooltip",
        leer: el => el.getAttribute("data-tooltip"),
        aplicar: (el, valor) => { el.setAttribute("data-tooltip", valor); }
    },
    {
        selector: "[data-i18n-aria]",
        dataset: "i18nAria",
        leer: el => el.getAttribute("aria-label"),
        aplicar: (el, valor) => { el.setAttribute("aria-label", valor); }
    }
];

/* Guarda el español original leyéndolo del HTML */
function capturarEspanol() {
    i18nAtributos.forEach(attr => {
        document.querySelectorAll(attr.selector).forEach(el => {
            const clave = el.dataset[attr.dataset];
            if (!(clave in traducciones.es)) {
                traducciones.es[clave] = attr.leer(el);
            }
        });
    });
}

function aplicarIdioma(idioma) {
    const diccionario = traducciones[idioma];

    i18nAtributos.forEach(attr => {
        document.querySelectorAll(attr.selector).forEach(el => {
            const clave = el.dataset[attr.dataset];
            const valor = diccionario[clave] ?? traducciones.es[clave];
            if (valor !== undefined && valor !== null) {
                attr.aplicar(el, valor);
            }
        });
    });

    document.title = diccionario.pageTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute("content", diccionario.metaDescription);

    const boton = document.getElementById("languageButton");
    if (boton) boton.textContent = idioma === "es" ? "EN" : "ES";

    document.documentElement.lang = idioma;
    idiomaActual = idioma;

    try {
        localStorage.setItem("idioma", idioma);
    } catch (e) { /* almacenamiento no disponible */ }

    /* Aviso para que otros scripts (mapa, etc.) puedan reaccionar */
    document.dispatchEvent(new CustomEvent("idiomaCambiado", { detail: { idioma } }));
}

function cambiarIdioma() {
    aplicarIdioma(idiomaActual === "es" ? "en" : "es");
}

/* Helper para textos generados desde JavaScript: t("mapLoading") */
function t(clave) {
    return traducciones[idiomaActual][clave] ?? traducciones.es[clave] ?? clave;
}

document.addEventListener("DOMContentLoaded", () => {
    capturarEspanol();

    const boton = document.getElementById("languageButton");
    if (boton) boton.addEventListener("click", cambiarIdioma);

    let guardado = null;
    try {
        guardado = localStorage.getItem("idioma");
    } catch (e) { /* ignorar */ }

    if (guardado === "en") aplicarIdioma("en");
});
