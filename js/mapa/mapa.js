window.MapaCentros = (() => {

    let mapa = null;
    let grupoMarcadores = null;
    let marcadores = new Map();
    let inicializado = false;
  
    const elementoId = "mapa-sevilla";
    const archivoKML = "./data/monumentos.kml";
  
    async function inicializar() {
      if (inicializado) {
        mapa.invalidateSize();
        return;
      }
  
      const elemento = document.getElementById(elementoId);
  
      if (!elemento || !window.L) {
        return;
      }
  
      inicializado = true;
  
      try {
        mapa = L.map(elementoId, {
          scrollWheelZoom: false
        }).setView([37.35, -5.95], 10);
  
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(mapa);
  
        grupoMarcadores = L.markerClusterGroup({
          showCoverageOnHover: false,
          maxClusterRadius: 45
        });
  
        mapa.addLayer(grupoMarcadores);
  
        const centros = await MapaKML.cargar(archivoKML);
  
        if (centros.length === 0) {
          throw new Error("El KML no contiene centros válidos.");
        }
  
        centros.forEach(centro => {
          const marcador = MapaMarcadores.crear(centro);
          marcadores.set(centro.properties.id, marcador);
        });
  
        MapaFiltros.inicializar(
          centros,
          actualizarMarcadores,
          seleccionarCentro
        );
  
        actualizarMarcadores(centros);
  
        const limites = L.featureGroup(
          Array.from(marcadores.values())
        ).getBounds();
  
        if (limites.isValid()) {
          mapa.fitBounds(limites, { padding: [35, 35] });
        }
  
        setTimeout(() => mapa.invalidateSize(), 150);
  
        } catch (error) {
            console.error("Error al inicializar el mapa:", error);
        
            elemento.innerHTML = `
            <div class="map-error">
                <strong>No se ha podido cargar el mapa.</strong>
                <p>${error.message}</p>
            </div>
            `;
        
            inicializado = false;
        }
    }
  
    function actualizarMarcadores(centrosFiltrados) {
      if (!grupoMarcadores) return;
  
      grupoMarcadores.clearLayers();
  
      centrosFiltrados.forEach(centro => {
        const marcador = marcadores.get(centro.properties.id);
  
        if (marcador) {
          grupoMarcadores.addLayer(marcador);
        }
      });
    }
  
    function seleccionarCentro(centro) {
      const marcador = marcadores.get(centro.properties.id);
  
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
  
      const observador = new MutationObserver(() => {
        comprobarVisibilidad();
      });
  
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