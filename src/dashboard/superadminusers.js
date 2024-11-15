//Aqui empieza el paginartor
const eventListDOM = document.querySelector("#users_container");
const backDOM = document.querySelector("#back");
const pageDOM = document.querySelector("#page");
const nextDOM = document.querySelector("#next");
const plantillaEvent =
  document.querySelector("#users_template").content.firstElementChild;
const elementosPorPagina = 3;
let paginaActual = 1;
const datos = getAllUsers();
print(datos);
const baseDeDatos = [{
"users": [
{
"_id": "6737c701db931b1686d8a179",
"fullName": "carlo",
"email": "carlo@example.com",
"password": "$2b$10$X9exevR68H.zlfsmC8IYEOiVXhckJJkIK2S4.rmnu6ycX4uEa0d0a",
"role": "6737c6d6af4d219d4fd99fa4",
"__v": 0
},
{
"_id": "6737c701db931b1686d8a180",
"fullName": "maria",
"email": "maria@example.com",
"password": "$2b$10$yE7rJ5wK2hX0gds2WysA1WxaFf2mbHf8gk5ftZBw5M7lDxlFhVpdC",
"role": "6737c6d6af4d219d4fd99fa5",
"__v": 0
},
{
"_id": "6737c701db931b1686d8a181",
"fullName": "juan",
"email": "juan@example.com",
"password": "$2b$10$XzQlqGiIUvUB91HZaRLU9d8AGLlRYOo.e21vJzTgYYiFCj5JpJtNK",
"role": "6737c6d6af4d219d4fd99fa6",
"__v": 0
},
{
"_id": "6737c701db931b1686d8a182",
"fullName": "luisa",
"email": "luisa@example.com",
"password": "$2b$10$3E1UpaKiV.sLfz6zFScu5LHEFgHa0XjTysl7WVbFHXg0gw9IN6SCy",
"role": "6737c6d6af4d219d4fd99fa7",
"__v": 0
},
{
"_id": "6737c701db931b1686d8a183",
"fullName": "pedro",
"email": "pedro@example.com",
"password": "$2b$10$Fw0FwLMJZXykrqGe91pXsSoV9sY2TLgIXMt7VXN9XPTG2bmc/qbxe",
"role": "6737c6d6af4d219d4fd99fa8",
"__v": 0
}
]
}
];
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
  return baseDeDatos[0].users.slice(inicio, final);
}
function obtenerPaginasTotales() {
  return Math.ceil(baseDeDatos[0].users.length / elementosPorPagina);
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
    const myTitle = myEvent.querySelector("#user_name");
    myTitle.textContent = data.fullName;
    const myDesc = myEvent.querySelector("#user_desc");
    myDesc.textContent = data.email;
    eventListDOM.appendChild(myEvent);
  });
}
backDOM.addEventListener("click", prevPage);
nextDOM.addEventListener("click", nextPage);
render();
//aqui termina el paginator
