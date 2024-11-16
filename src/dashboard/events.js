//Aqui empieza el paginartor
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

// Obtener el token de la cookie
const token = getCookie("token");
async function getAllEvents() {
    try {
        const response = await fetch("http://localhost:3000/events", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        });
        if (!response.ok) {
        throw new Error("Error fetching events");
        }
        const data = await response.json();
        return data.events;
    } catch (error) {
        console.error("Error fetching events:", error);
        return [];
    }
}
const eventListDOM = document.querySelector("#event-container");
const backDOM = document.querySelector("#back");
const pageDOM = document.querySelector("#page");
const nextDOM = document.querySelector("#next");
const plantillaEvent =
  document.querySelector("#event-template").content.firstElementChild;
const elementosPorPagina = 3;
let paginaActual = 1;
let data = [];
async function render() {
  data = await getAllEvents();
  eventListDOM.innerHTML = "";
  const dataSlice = obtainData(paginaActual);
  gestButton();
  pageDOM.textContent = `${paginaActual} / ${obtenerPaginasTotales()}`;
  dataSlice.forEach(function (data) {
    const myEvent = plantillaEvent.cloneNode(true);
    const myTitle = myEvent.querySelector("#event_title");
    myTitle.textContent = data.name;
    const myDesc = myEvent.querySelector("#event_desc");
    myDesc.textContent = data.description;
    const myDate = myEvent.querySelector("#fecha");
    eventListDOM.appendChild(myEvent);
  });
}
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
  return data.slice(inicio, final);
}
function obtenerPaginasTotales() {
  return Math.ceil(data.length / elementosPorPagina);
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
backDOM.addEventListener("click", prevPage);
nextDOM.addEventListener("click", nextPage);
render();
//aqui termina el paginator
