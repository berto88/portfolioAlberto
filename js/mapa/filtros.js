window.MapaFiltros = (() => {

  let monumentos = [];
  let callbackFiltrado = null;
  let callbackSeleccion = null;

  function inicializar(datos, onFiltrado, onSeleccion) {
    monumentos = datos;
    callbackFiltrado = onFiltrado;
    callbackSeleccion = onSeleccion;

    cargarOpciones("mapProvince", "provincia");
    cargarOpciones("mapType", "tipo");

    document.getElementById("mapSearch").addEventListener("input", aplicarFiltros);
    document.getElementById("mapProvince").addEventListener("change", aplicarFiltros);
    document.getElementById("mapType").addEventListener("change", aplicarFiltros);

    aplicarFiltros();
  }

  function cargarOpciones(id, propiedad) {
    const select = document.getElementById(id);

    const valores = [...new Set(
      monumentos
        .map(monumento => monumento.properties[propiedad])
        .filter(Boolean)
    )].sort((a, b) => a.localeCompare(b, "es"));

    valores.forEach(valor => {
      const opcion = document.createElement("option");
      opcion.value = valor;
      opcion.textContent = valor;
      select.appendChild(opcion);
    });
  }

  function aplicarFiltros() {
    const busqueda = document.getElementById("mapSearch").value.trim().toLowerCase();
    const provincia = document.getElementById("mapProvince").value;
    const tipo = document.getElementById("mapType").value;

    // La lista solo se muestra cuando hay al menos un filtro activo.
    const hayFiltroActivo = Boolean(busqueda || provincia || tipo);

    const filtrados = monumentos.filter(monumento => {
      const datos = monumento.properties;

      const coincideBusqueda = [
        datos.nombre,
        datos.localidad,
        datos.direccion
      ].some(valor =>
        String(valor || "").toLowerCase().includes(busqueda)
      );

      return coincideBusqueda &&
        (!provincia || datos.provincia === provincia) &&
        (!tipo || datos.tipo === tipo);
    });

    actualizarContador(filtrados.length);
    actualizarListado(filtrados, hayFiltroActivo);

    if (callbackFiltrado) {
      callbackFiltrado(filtrados);
    }
  }

  function actualizarContador(total) {
    document.getElementById("mapCounter").textContent = total;
  }

  function actualizarListado(datos, hayFiltroActivo) {
    const contenedor = document.getElementById("mapResultsList");
    const seccionResultados = contenedor.closest(".map-results");

    contenedor.replaceChildren();
    seccionResultados.hidden = !hayFiltroActivo;

    if (!hayFiltroActivo) return;

    if (datos.length === 0) {
      const mensaje = document.createElement("p");
      mensaje.className = "map-empty";
      mensaje.textContent = "No se han encontrado monumentos.";
      contenedor.appendChild(mensaje);
      return;
    }

    datos.forEach(monumento => {
      const propiedades = monumento.properties;
      const tarjeta = document.createElement("button");

      tarjeta.type = "button";
      tarjeta.className = "map-result-item";

      const nombre = document.createElement("strong");
      nombre.textContent = propiedades.nombre;

      const localidad = document.createElement("span");
      localidad.textContent = `${propiedades.localidad} · ${propiedades.tipo}`;

      tarjeta.append(nombre, localidad);
      tarjeta.addEventListener("click", () => {
        if (callbackSeleccion) callbackSeleccion(monumento);
      });

      contenedor.appendChild(tarjeta);
    });
  }

  return { inicializar };

})();
