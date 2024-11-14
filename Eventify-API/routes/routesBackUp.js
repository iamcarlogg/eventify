const authController = require("../controllers/auth.controller");
const eventController = require("../controllers/event.controller");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

function createRoutes() {
  const auth = authController;
  const events = eventController;
  const users = userController;

  return async (req, res) => {
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
          console.log("EL BODY SE VE DE LA SIGUIENTE FORMA ");
          console.log(body);
          const parsedBody = JSON.parse(body.trim());
          console.log("EL BODY parseado ");
          console.log(parsedBody);

          // Manejo de rutas para autenticación
          if (req.url === "/login") {
            return await auth.login(req, res, parsedBody);
          }
          if (req.url === "/register") {
            return await auth.register(req, res, parsedBody);
          }

          // Rutas para eventos (requiere autenticación y rol de Admin o SuperAdmin)
          if (req.url === "/events") {
            return authMiddleware(["admin", "superAdmin"])(req, res, () =>
              events.create(req, res, parsedBody)
            );
          }

          //ruta para ususarios

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
      if (req.url.startsWith("/events/id/")) {
        const eventId = req.url.split("/")[3]; 
        if (!eventId) {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({ message: "Event ID is missing in the URL" })
          );
        }
        return authMiddleware(["admin", "superAdmin"])(req, res, () =>
          events.getEventById(req, res, eventId)
        );
      }

      if (req.url === "/events") {
        return authMiddleware(["admin", "superAdmin"]) (req, res, () =>
          events.getAll(req, res)
      );
      }

      if (req.url.startsWith("/user/email/")) {
        console.log("ENTRO AQUI");
        const email = req.url.split("/")[3]; // Extraer el email desde la URL
        if (!email) {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({ message: "Email is missing in the URL" })
          );
        }
        return authMiddleware(null)(req, res, () =>
          users.getUserByEmail(req, res, email)
        );
      }

      if (req.url.startsWith("/user")) {
        console.log("ENTRO AQUI en el getALL");
        return authMiddleware(["admin", "superAdmin"])(req, res, () =>
          users.getAllUsers(req, res)
        );
      }
    }

    if (req.method === "DELETE" && req.url.startsWith("/events/")) {
      const eventId = req.url.split("/")[2];
      if (!eventId) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ message: "Event ID is missing in the URL" })
        );
      }
      return authMiddleware(["admin", "superAdmin"])(req, res, () =>
        events.deleteEvent(req, res, eventId)
      );
    }

    if (req.method === "DELETE" && req.url.startsWith("/user/")) {
      const email = req.url.split("/")[2]; // Extraer el email desde la URL
      if (!email) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ message: "Email is missing in the URL" })
        );
      }

      return authMiddleware(null)(req, res, () =>
        users.deleteUser(req, res, email)
      );
    }

    // Manejo de solicitudes PUT (similar a POST)
    if (req.method === "PUT") {
      let body = "";

      // Leer el cuerpo de la solicitud
      req.on("data", (chunk) => {
        body += chunk.toString(); // Convertir el buffer en string
      });

      // Cuando todos los datos han sido recibidos
      req.on("end", async () => {
        try {
          const parsedBody = JSON.parse(body.trim());

          // Rutas PUT para actualizar eventos
          if (req.url.startsWith("/events/")) {
            const eventId = req.url.split("/")[2];
            return authMiddleware(["admin", "superAdmin"])(req, res, () =>
              events.update(req, res, parsedBody, eventId)
            );
          }

          // Rutas PUT para actualizar usuarios por email
          if (req.url.startsWith("/user/")) {
            const email = req.url.split("/")[2]; // Extraer el email desde la URL
            if (!email) {
              res.writeHead(400, { "Content-Type": "application/json" });
              return res.end(
                JSON.stringify({ message: "Email is missing in the URL" })
              );
            }

            return authMiddleware(null)(req, res, () =>
              users.updateUser(req, res, parsedBody, email)
            );
          }

          //PUT para actualizar un evento
          if (req.url.startsWith("/events/")) {
            const eventId = req.url.split("/")[2];
            if (!eventId) {
              res.writeHead(400, { "Content-Type": "application/json" });
              return res.end(
                JSON.stringify({ message: "Event ID is missing in the URL" })
              );
            }
            return authMiddleware(["admin", "superAdmin"])(req, res, () =>
              events.update(req, res, parsedBody, eventId)
            );
          }

          // Si ninguna ruta coincide, responder con 404
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Route not found" }));
        } catch (error) {
          console.error("Error:", error);
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Invalid JSON format" }));
        }
      });
      return;
    }

    //PATCH
    if (req.method === "PATCH") {
      let body = "";

      // Leer el cuerpo de la solicitud
      req.on("data", (chunk) => {
        body += chunk.toString(); // Convertir el buffer en string
      });

      // Cuando todos los datos han sido recibidos
      req.on("end", async () => {
        try {
          const parsedBody = JSON.parse(body.trim());

          // Rutas PUT para actualizar usuarios por email
          if (req.url.startsWith("/user/")) {
            const email = req.url.split("/")[2]; // Extraer el email desde la URL
            if (!email) {
              res.writeHead(400, { "Content-Type": "application/json" });
              return res.end(
                JSON.stringify({ message: "Email is missing in the URL" })
              );
            }

            return authMiddleware(null)(req, res, () =>
              users.changePassword(req, res, parsedBody, email)
            );
          }

          // Si ninguna ruta coincide, responder con 404
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Route not found" }));
        } catch (error) {
          console.error("Error:", error);
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Invalid JSON format" }));
        }
      });
      return;
    }

    // Si no se encuentra ninguna ruta
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  };
}

module.exports = createRoutes;
