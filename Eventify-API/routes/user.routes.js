const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

module.exports = async (req, res) => {
  const users = userController;

  //Metodos GET
  if (req.method === "GET") {
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

  //Metodos DELETE
  if (req.method === "DELETE" && req.url.startsWith("/user/")) {
    const email = req.url.split("/")[2]; // Extraer el email desde la URL
    if (!email) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({ message: "Email is missing in the URL" })
      );
    }

    // Protege la ruta con el rol de superAdmin
    return authMiddleware(["superAdmin"])(req, res, () =>
      users.deleteUser(req, res, email)
    );
  }


  //Metodos PUT
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

  // PATCH
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

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Route not found" }));
};
