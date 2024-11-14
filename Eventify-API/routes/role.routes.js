const roleController = require("../controllers/role.controller");
const authMiddleware = require("../middlewares/auth.middleware");

module.exports = async (req, res) => {
  const role = roleController;

  // Aplicar middleware de autenticación con rol 'superAdmin' para todas las rutas
  const requireSuperAdmin = authMiddleware(["superAdmin"]);

  if (req.method === "POST") {
    let body = "";

    // Leer los datos entrantes (cuerpo de la solicitud)
    req.on("data", (chunk) => {
      body += chunk.toString(); // Convertir el buffer en string
    });

    // Cuando todos los datos han sido recibidos
    req.on("end", async () => {
      try {
        // Parsear el cuerpo a JSON
        const parsedBody = JSON.parse(body.trim());

        // Manejo de rutas para roles
        if (req.url === "/roles") {
          return requireSuperAdmin(req, res, () => role.create(req, res, parsedBody));
        }

        // Si ninguna ruta coincide, responder con 404
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
      } catch (error) {
        // Manejo de errores de parseo de JSON
        console.error("Error:", error); // Imprime el error en la consola
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Invalid JSON format" }));
      }
    });
    return;
  }

  // Rutas GET y otras (sin cuerpo en la solicitud)
  if (req.method === "GET") {
    if (req.url === "/roles") {
      return requireSuperAdmin(req, res, () => role.getAll(req, res));
    }
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Route not found" }));
};
