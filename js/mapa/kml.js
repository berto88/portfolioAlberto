
window.MapaKML = (() => {

  async function cargar(url) {
    try {
      const respuesta = await fetch(url, {
        cache: "no-store"
      });

      if (!respuesta.ok) {
        throw new Error(
          `Error HTTP ${respuesta.status}: no se ha podido cargar el KML (${url}).`
        );
      }

      const contenido = await respuesta.text();

      // Comprobamos que realmente estamos recibiendo un KML/XML.
      if (
        !contenido.trim().startsWith("<?xml") &&
        !contenido.trim().startsWith("<kml") &&
        !contenido.trim().startsWith("<")
      ) {
        throw new Error(
          "El contenido descargado no parece ser un archivo XML válido."
        );
      }

      const parser = new DOMParser();
      const documento = parser.parseFromString(contenido, "application/xml");

      const errorXML = documento.querySelector("parsererror");

      if (errorXML) {
        console.error("Detalle del error XML:", errorXML.textContent);

        throw new Error(
          "El KML contiene un error XML: " + errorXML.textContent
        );
      }

      const placemarks = Array.from(
        documento.getElementsByTagNameNS("*", "Placemark")
      );

      if (placemarks.length === 0) {
        throw new Error(
          "El archivo KML se ha leído, pero no contiene ningún Placemark."
        );
      }

      const monumentos = placemarks
        .map((placemark, index) => convertirPlacemark(placemark, index))
        .filter(Boolean);

      console.info(
        `KML cargado correctamente: ${monumentos.length} monumentos encontrados.`
      );

      return monumentos;

    } catch (error) {
      console.error("Error al cargar el KML:", error);
      throw error;
    }
  }

  function convertirPlacemark(placemark, index) {
    const nombre = obtenerTexto(placemark, "name");
    const descripcion = obtenerTexto(placemark, "description");

    const coordenadas = obtenerTexto(placemark, "coordinates")
      .trim()
      .split(",")
      .map(valor => Number(valor.trim()));

    const longitud = coordenadas[0];
    const latitud = coordenadas[1];

    if (
      !nombre ||
      !Number.isFinite(latitud) ||
      !Number.isFinite(longitud) ||
      Math.abs(latitud) > 90 ||
      Math.abs(longitud) > 180
    ) {
      console.warn(`Monumento descartado por datos incorrectos: ${nombre || index}`);
      return null;
    }

    const propiedades = {
      id: index,
      nombre,
      descripcion,
      localidad: obtenerDato(placemark, "localidad"),
      provincia: obtenerDato(placemark, "provincia"),
      tipo: obtenerDato(placemark, "tipo"),
      direccion: obtenerDato(placemark, "direccion")
    };

    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [longitud, latitud]
      },
      properties: propiedades
    };
  }

  function obtenerTexto(elemento, etiqueta) {
    const nodo = elemento.getElementsByTagNameNS("*", etiqueta)[0];
    return nodo ? nodo.textContent.trim() : "";
  }

  function obtenerDato(placemark, nombre) {
    const datos = Array.from(
      placemark.getElementsByTagNameNS("*", "Data")
    );

    const dato = datos.find(
      elemento => elemento.getAttribute("name") === nombre
    );

    return dato
      ? obtenerTexto(dato, "value")
      : "";
  }

  return {
    cargar
  };

})();
