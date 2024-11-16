// Aquí empieza el paginador
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// Obtener el token de la cookie
const token = getCookie("token");

// Función para obtener todos los usuarios
async function getAllUsers() {
  try {
      const response = await fetch("http://localhost:3000/user", {
          method: "GET",
          headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
          }
      });
      if (!response.ok) {
          throw new Error("Error fetching users");
      }
      const data = await response.json();
      return data.users; // Asegúrate de devolver solo la lista de usuarios
  } catch (error) {
      console.error("Error fetching users:", error);
      return [];
  }
}

const eventListDOM = document.querySelector("#users_container");
const backDOM = document.querySelector("#back");
const pageDOM = document.querySelector("#page");
const nextDOM = document.querySelector("#next");
const plantillaEvent = document.querySelector("#users_template").content.firstElementChild;
const elementosPorPagina = 3;
let paginaActual = 1;
let datos = []; // Declarar datos como let para permitir la reasignación

async function render() {
  datos = await getAllUsers(); // Actualizar datos con los usuarios obtenidos
  eventListDOM.innerHTML = "";
  const dataSlice = userSlice(paginaActual);
  gestButton();
  pageDOM.textContent = `${paginaActual} / ${obtenerPaginasTotales()}`;
  dataSlice.forEach(function (data) {
      const myEvent = plantillaEvent.cloneNode(true);
      const myTitle = myEvent.querySelector("#user_name");
      myTitle.textContent = data.fullName;
      const myDesc = myEvent.querySelector("#user_desc");
      myDesc.textContent = data.email;
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

function userSlice(page = 1) {
  const inicio = (paginaActual - 1) * elementosPorPagina;
  const final = inicio + elementosPorPagina;
  return datos.slice(inicio, final);
}

function obtenerPaginasTotales() {
  return Math.ceil(datos.length / elementosPorPagina);
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