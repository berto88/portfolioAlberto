
window.MapaCentros = (() => {

    let mapa = null;
    let grupoMarcadores = null;
    let marcadores = new Map();
    let inicializado = false;
    let inicializando = false;
  
    const elementoId = "mapa-sevilla";
    const archivoKML = "./data/monumentos.kml";
  
    async function inicializar() {
  
      if (inicializado) {
        mapa.invalidateSize();
        return;
      }
  
      if (inicializando) return;
  
      const elemento = document.getElementById(elementoId);
  
      if (!elemento || !window.L) return;
  
      inicializando = true;
  
      try {
  
        // Evitar que quede una instancia anterior de Leaflet.
        if (mapa) {
          mapa.remove();
          mapa = null;
        }
  
        marcadores.clear();
  
        mapa = L.map(elementoId, {
          scrollWheelZoom: false
        }).setView([37.3, -4.8], 7);
  
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(mapa);
  
        grupoMarcadores = L.markerClusterGroup({
          showCoverageOnHover: false,
          maxClusterRadius: 45
        });
  
        mapa.addLayer(grupoMarcadores);
  
        // Cargar monumentos desde el KML.
        const monumentos = await MapaKML.cargar(archivoKML);
  
        if (monumentos.length === 0) {
          throw new Error("El KML no contiene monumentos válidos.");
        }
  
        // Crear los marcadores.
        monumentos.forEach(monumento => {
          const marcador = MapaMarcadores.crear(monumento);
          marcadores.set(monumento.properties.id, marcador);
        });
  
        // Inicializar filtros y listado.
        MapaFiltros.inicializar(
          monumentos,
          actualizarMarcadores,
          seleccionarMonumento
        );
  
        actualizarMarcadores(monumentos);
  
        // Ajustar el mapa a todos los monumentos.
        const limites = L.featureGroup(
          Array.from(marcadores.values())
        ).getBounds();
  
        if (limites.isValid()) {
          mapa.fitBounds(limites, { padding: [35, 35] });
        }
  
        inicializado = true;
  
        setTimeout(() => {
          if (mapa) mapa.invalidateSize();
        }, 150);
  
      } catch (error) {
  
        console.error("Error al inicializar el mapa:", error);
  
        // Destruir la instancia si la inicialización ha fallado.
        if (mapa) {
          mapa.remove();
          mapa = null;
        }
  
        grupoMarcadores = null;
        marcadores.clear();
        inicializado = false;
  
        elemento.innerHTML = `
          <div class="map-error">
            <strong>No se ha podido cargar el mapa.</strong>
            <p>${error.message}</p>
          </div>
        `;
  
      } finally {
        inicializando = false;
      }
    }
  
    function actualizarMarcadores(monumentosFiltrados) {
  
      if (!grupoMarcadores) return;
  
      grupoMarcadores.clearLayers();
  
      monumentosFiltrados.forEach(monumento => {
  
        const marcador = marcadores.get(monumento.properties.id);
  
        if (marcador) {
          grupoMarcadores.addLayer(marcador);
        }
  
      });
    }
  
    function seleccionarMonumento(monumento) {
  
      const marcador = marcadores.get(monumento.properties.id);
  
      if (!marcador || !mapa) return;
  
      mapa.setView(marcador.getLatLng(), 15);
  
      grupoMarcadores.zoomToShowLayer(marcador, () => {
        marcador.openPopup();
      });
    }
  
    function comprobarVisibilidad() {
  
      const pagina = document.getElementById("pagina-proyectos");
  
      if (pagina && pagina.classList.contains("active")) {
        inicializar();
      }
    }
  
    function observarNavegacion() {
  
      const pagina = document.getElementById("pagina-proyectos");
  
      if (!pagina) return;
  
      const observador = new MutationObserver(comprobarVisibilidad);
  
      observador.observe(pagina, {
        attributes: true,
        attributeFilter: ["class"]
      });
  
      comprobarVisibilidad();
    }
  
    document.addEventListener("DOMContentLoaded", observarNavegacion);
  
    return {
      inicializar
    };
  
  })();
  