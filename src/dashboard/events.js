//Aqui empieza el paginartor
      const eventListDOM = document.querySelector("#event-container");
      const backDOM = document.querySelector("#back");
      const pageDOM = document.querySelector("#page");
      const nextDOM = document.querySelector("#next");
      const plantillaEvent =
        document.querySelector("#event-template").content.firstElementChild;
      const elementosPorPagina = 3;
      let paginaActual = 1;
      const baseDeDatos = [
  {
    "name": "FIESTA",
    "description": "Un evento de música en vivo con bandas locales.",
    "date": "2024-11-15",
    "hour": "18:00",
    "location": "Auditorio Principal",
    "maxCapacity": 500,
    "createdBy": "prueba"
  },
  {
    "name": "CONFERENCIA TECNOLÓGICA",
    "description": "Charla sobre las últimas tendencias en desarrollo de software.",
    "date": "2024-12-01",
    "hour": "09:00",
    "location": "Sala de Conferencias A",
    "maxCapacity": 200,
    "createdBy": "admin"
  },
  {
    "name": "FERIA DE EMPRENDEDORES",
    "description": "Exposición de proyectos innovadores y startups locales.",
    "date": "2024-11-20",
    "hour": "10:00",
    "location": "Plaza Central",
    "maxCapacity": 1000,
    "createdBy": "marketing_team"
  },
  {
    "name": "TALLER DE FOTOGRAFÍA",
    "description": "Aprende técnicas de fotografía con un experto.",
    "date": "2024-11-18",
    "hour": "14:00",
    "location": "Sala de Talleres B",
    "maxCapacity": 50,
    "createdBy": "user123"
  },
  {
    "name": "FESTIVAL DE CINE",
    "description": "Proyección de cortometrajes de directores independientes.",
    "date": "2024-11-25",
    "hour": "19:00",
    "location": "Teatro Municipal",
    "maxCapacity": 300,
    "createdBy": "film_club"
  },
  {
    "name": "GALA BENÉFICA",
    "description": "Cena de recaudación de fondos para organizaciones sin fines de lucro.",
    "date": "2024-12-05",
    "hour": "20:00",
    "location": "Salón de Eventos",
    "maxCapacity": 150,
    "createdBy": "charity_org"
  },
  {
    "name": "MARATÓN DE PROGRAMACIÓN",
    "description": "Competencia de programación para resolver desafíos en equipo.",
    "date": "2024-11-30",
    "hour": "08:00",
    "location": "Laboratorio de Computo",
    "maxCapacity": 100,
    "createdBy": "dev_team"
  }
]
;
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
          const myTitle = myEvent.querySelector("#event_title");
          myTitle.textContent = data.name;
          const myDesc = myEvent.querySelector("#event_desc");
          const myDate = myEvent.querySelector("#fecha");
          myDate.textContent = data.date;
          myDesc.textContent = data.description;
          eventListDOM.appendChild(myEvent);
        });
      }
      backDOM.addEventListener("click", prevPage);
      nextDOM.addEventListener("click", nextPage);
      render();
      //aqui termina el paginator
