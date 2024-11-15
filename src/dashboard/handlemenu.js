// Función para manejar el menú

  document.getElementById("menu-button").addEventListener("click", function () {
    var menu = document.getElementById("menu");
    if (menu.classList.contains("hidden")) {
      menu.classList.remove("hidden");
    } else {
      menu.classList.add("hidden");
    }
  });

  window.addEventListener("click", function (event) {
    var menu = document.getElementById("menu");
    var menuButton = document.getElementById("menu-button");
    if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
      menu.classList.add("hidden");
    }
  });

