const statisticsController = require("../controllers/statistics.controller");
const authMiddleware = require("../middlewares/auth.middleware");

module.exports = async (req, res) => {
  const statistics = statisticsController;

  // Middleware de autenticación para roles 'admin' y 'superAdmin'
  const requireAdminOrSuperAdmin = authMiddleware(["admin", "superAdmin"]);

  // Rutas GET
  if (req.method === "GET") {
    // Obtener todas las estadísticas
    if (req.url === "/statistics") {
      return requireAdminOrSuperAdmin(req, res, () => 
        statistics.getAllStatistics(req, res)
      );
    }

    // Obtener estadísticas por ID
    if (req.url.startsWith("/statistics/")) {
      const id = req.url.split("/")[2]; // Extraer el ID desde la URL
      if (!id) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ message: "Statistics ID is missing in the URL" })
        );
      }
      return requireAdminOrSuperAdmin(req, res, () => 
        statistics.getStatisticsById(req, res, id)
      );
    }
  }

  // Rutas POST
  if (req.method === "POST" && req.url === "/statistics") {
    let body = "";

    // Leer el cuerpo de la solicitud
    req.on("data", (chunk) => {
      body += chunk.toString(); // Convertir el buffer en string
    });

    // Cuando todos los datos han sido recibidos
    req.on("end", async () => {
      try {
        const parsedBody = JSON.parse(body.trim());
        return requireAdminOrSuperAdmin(req, res, () =>
          statistics.createStatistics(req, res, parsedBody)
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
