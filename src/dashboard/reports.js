
      //Aqui empieza el paginartor
      const eventListDOM = document.querySelector("#reports_container");
      const backDOM = document.querySelector("#back");
      const pageDOM = document.querySelector("#page");
      const nextDOM = document.querySelector("#next");
      const plantillaEvent =
        document.querySelector("#reports_template").content.firstElementChild;
      const elementosPorPagina = 3;
      let paginaActual = 1;
      const baseDeDatos = [
  {
    "numero_reporte": 1,
    "descripcion_reporte": "Contenido inapropiado detectado en la publicación.",
    "numero_publicacion": 101
  },
  {
    "numero_reporte": 2,
    "descripcion_reporte": "Publicación contiene spam o enlaces sospechosos.",
    "numero_publicacion": 102
  },
  {
    "numero_reporte": 3,
    "descripcion_reporte": "Lenguaje ofensivo detectado en los comentarios.",
    "numero_publicacion": 103
  },
  {
    "numero_reporte": 4,
    "descripcion_reporte": "Información falsa o engañosa en la publicación.",
    "numero_publicacion": 104
  },
  {
    "numero_reporte": 5,
    "descripcion_reporte": "Violación de derechos de autor en el contenido publicado.",
    "numero_publicacion": 105
  },
  {
    "numero_reporte": 6,
    "descripcion_reporte": "Incitación al odio o contenido discriminatorio.",
    "numero_publicacion": 106
  }
];
      function nextPage() {
        paginaActual++;
        render();
      }
      function prevPage() {
        paginaActual--;
        render();
      }
      function obtainData(page = 1) {
        const inicio = (paginaActual - 1) * elementosPorPagina;
        const final = inicio + elementosPorPagina;
        return baseDeDatos.slice(inicio, final);
      }
      function obtenerPaginasTotales() {
        return Math.ceil(baseDeDatos.length / elementosPorPagina);
      }
      function gestButton() {
        if (paginaActual === 1) {
          backDOM.setAttribute("disabled", true);
        } else {
          backDOM.removeAttribute("disabled");
        }
        if (paginaActual == obtenerPaginasTotales()) {
          nextDOM.setAttribute("disabled", true);
        } else {
          nextDOM.removeAttribute("disabled");
        }
      }
      function render() {
        eventListDOM.innerHTML = "";
        const dataSlice = obtainData(paginaActual);
        gestButton();
        pageDOM.textContent = `${paginaActual} / ${obtenerPaginasTotales()}`;
        dataSlice.forEach(function (data) {
          const myEvent = plantillaEvent.cloneNode(true);
          const myTitle = myEvent.querySelector("#numero_reporte");
          myTitle.textContent = data.numero_reporte;
          const myDesc = myEvent.querySelector("#descripcion_reporte");
          myDesc.textContent = data.descripcion_reporte;
          const myPub = myEvent.querySelector("#numero_publicacion");
          myPub.textContent = data.numero_publicacion;
          eventListDOM.appendChild(myEvent);
        });
      }
      backDOM.addEventListener("click", prevPage);
      nextDOM.addEventListener("click", nextPage);
      render();
      //aqui termina el paginator

