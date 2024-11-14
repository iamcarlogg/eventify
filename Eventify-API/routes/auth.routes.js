const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

module.exports = async (req, res) => {
    const auth = authController;

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

      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Route not found" }));
};