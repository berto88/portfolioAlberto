window.MapaMarcadores = (() => {

    function escaparHTML(valor) {
      return String(valor ?? "").replace(/[&<>"']/g, caracter => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      })[caracter]);
    }
  
    function crear(feature) {
      const propiedades = feature.properties;
      const [longitud, latitud] = feature.geometry.coordinates;
  
      const tipo = normalizarTipo(propiedades.tipo);
  
      const icono = L.divIcon({
        className: "custom-map-icon",
        html: `<span class="map-marker marker-${tipo}"></span>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, -10]
      });
  
      return L.marker([latitud, longitud], {
        icon: icono,
        title: propiedades.nombre
      }).bindPopup(crearPopup(propiedades));
    }
  
    function normalizarTipo(tipo) {
      const texto = String(tipo || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
  
      if (texto.includes("formacion")) return "formacion";
      if (texto.includes("cultural")) return "cultural";
      if (texto.includes("espacio")) return "espacio";
  
      return "juvenil";
    }
  
    function crearPopup(datos) {
      return `
        <div class="map-popup">
          <h3>${escaparHTML(datos.nombre)}</h3>
  
          <span class="map-popup-type">
            ${escaparHTML(datos.tipo)}
          </span>
  
          <p>
            <strong>Localidad:</strong>
            ${escaparHTML(datos.localidad)}
          </p>
  
          <p>
            <strong>Provincia:</strong>
            ${escaparHTML(datos.provincia)}
          </p>
  
          <p>
            <strong>Dirección:</strong>
            ${escaparHTML(datos.direccion)}
          </p>
  
          <p class="map-popup-description">
            ${escaparHTML(datos.descripcion)}
          </p>
        </div>
      `;
    }
  
    return {
      crear
    };
  
  })();