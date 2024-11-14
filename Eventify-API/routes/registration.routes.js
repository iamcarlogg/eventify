const registrationController = require("../controllers/registration.controller");
const authMiddleware = require("../middlewares/auth.middleware");

module.exports = async (req, res) => {
  const registrations = registrationController;

  // Rutas GET (solo validación de token)
  if (req.method === "GET") {
    // Obtener todas las inscripciones
    if (req.url === "/registrations") {
      return authMiddleware()(req, res, () => 
        registrations.getAllRegistrations(req, res)
      );
    }

    // Obtener una inscripción por ID
    if (req.url.startsWith("/registrations/")) {
      const id = req.url.split("/")[2]; // Extraer el ID desde la URL
      if (!id) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ message: "Registration ID is missing in the URL" })
        );
      }
      return authMiddleware()(req, res, () => 
        registrations.getRegistrationById(req, res, id)
      );
    }
  }

  // Rutas POST (solo validación de token)
  if (req.method === "POST" && req.url === "/registrations") {
    let body = "";

    // Leer el cuerpo de la solicitud
    req.on("data", (chunk) => {
      body += chunk.toString(); // Convertir el buffer en string
    });

    // Cuando todos los datos han sido recibidos
    req.on("end", async () => {
      try {
        const parsedBody = JSON.parse(body.trim());
        return authMiddleware()(req, res, () =>
          registrations.createRegistration(req, res, parsedBody)
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
