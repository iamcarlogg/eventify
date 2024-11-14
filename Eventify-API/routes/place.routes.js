const placeController = require("../controllers/place.controller");
const authMiddleware = require("../middlewares/auth.middleware");

module.exports = async (req, res) => {
  const places = placeController;

  // Rutas GET (solo validación de token)
  if (req.method === "GET") {
    // Obtener todos los lugares
    if (req.url === "/places") {
      return authMiddleware()(req, res, () => 
        places.getAllPlaces(req, res)
      );
    }

    // Obtener lugar por ID
    if (req.url.startsWith("/places/")) {
      const id = req.url.split("/")[2]; // Extraer el ID desde la URL
      if (!id) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ message: "Place ID is missing in the URL" })
        );
      }
      return authMiddleware()(req, res, () => 
        places.getPlaceById(req, res, id)
      );
    }
  }

  // Rutas POST (requiere autenticación y roles)
  if (req.method === "POST" && req.url === "/places") {
    let body = "";

    // Leer el cuerpo de la solicitud
    req.on("data", (chunk) => {
      body += chunk.toString(); // Convertir el buffer en string
    });

    // Cuando todos los datos han sido recibidos
    req.on("end", async () => {
      try {
        const parsedBody = JSON.parse(body.trim());
        return authMiddleware(["admin", "superAdmin"])(req, res, () =>
          places.createPlace(req, res, parsedBody)
        );
      } catch (error) {
        console.error("Error:", error);
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Invalid JSON format" }));
      }
    });
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Route not found" }));
};
