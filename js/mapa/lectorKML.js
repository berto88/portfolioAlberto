
window.MapaKML = (() => {

    async function cargar(url) {
      const respuesta = await fetch(url);
  
      if (!respuesta.ok) {
        throw new Error("No se ha podido cargar el archivo KML.");
      }
  
      const contenido = await respuesta.text();
      const parser = new DOMParser();
      const documento = parser.parseFromString(contenido, "text/xml");
  
      if (documento.querySelector("parsererror")) {
        throw new Error("El archivo KML no tiene un formato válido.");
      }
  
      const placemarks = Array.from(
        documento.getElementsByTagNameNS("*", "Placemark")
      );
  
      return placemarks
        .map((placemark, index) => convertirPlacemark(placemark, index))
        .filter(Boolean);
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
  