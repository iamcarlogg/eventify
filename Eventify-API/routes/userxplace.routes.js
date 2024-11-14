const userxplaceController = require("../controllers/userxplace.controller");
const authMiddleware = require("../middlewares/auth.middleware");

module.exports = async (req, res) => {
  const userxplace = userxplaceController;

  // Rutas GET
  if (req.method === "GET") {
    // Obtener todas las asignaciones
    if (req.url === "/userxplace") {
      return authMiddleware(null)(req, res, () => 
        userxplace.getAllUserxPlace(req, res)
      );
    }

    // Obtener una asignación por ID
    if (req.url.startsWith("/userxplace/")) {
      const id = req.url.split("/")[2]; // Extraer el ID desde la URL
      if (!id) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ message: "UserxPlace ID is missing in the URL" })
        );
      }
      return authMiddleware(null)(req, res, () => 
        userxplace.getUserxPlaceById(req, res, id)
      );
    }
  }

  // Rutas POST
  if (req.method === "POST" && req.url === "/userxplace") {
    let body = "";

    // Leer el cuerpo de la solicitud
    req.on("data", (chunk) => {
      body += chunk.toString(); // Convertir el buffer en string
    });

    // Cuando todos los datos han sido recibidos
    req.on("end", async () => {
      try {
        const parsedBody = JSON.parse(body.trim());
        return authMiddleware(null)(req, res, () =>
          userxplace.createUserxPlace(req, res, parsedBody)
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
