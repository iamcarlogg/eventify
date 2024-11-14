const historyController = require("../controllers/history.controller");
const authMiddleware = require("../middlewares/auth.middleware");

module.exports = async (req, res) => {
  const histories = historyController;

  // Rutas GET
  if (req.method === "GET") {
    // Obtener todos los historiales de asistencia
    if (req.url === "/histories") {
      return authMiddleware(["admin", "superAdmin"])(req, res, () =>
        histories.getAllHistories(req, res)
      );
    }

    // Obtener historial de asistencia por ID
    if (req.url.startsWith("/histories/")) {
      const id = req.url.split("/")[2]; // Extraer el ID desde la URL
      if (!id) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ message: "History ID is missing in the URL" })
        );
      }
      return authMiddleware(["admin", "superAdmin"])(req, res, () =>
        histories.getHistoryById(req, res, id)
      );
    }
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Route not found" }));
};
