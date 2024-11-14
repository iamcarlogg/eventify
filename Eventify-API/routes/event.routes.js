// routes/event.routes.js
const eventController = require('../controllers/event.controller');
const authMiddleware = require('../middlewares/auth.middleware');

module.exports = async (req, res) => {
    const events = eventController;

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

                // Rutas para eventos (requiere autenticación y rol de Admin o SuperAdmin)
                if (req.url === "/events") {
                    return authMiddleware(["admin", "superAdmin"])(req, res, () =>
                        events.create(req, res, parsedBody)
                    );
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

    // Rutas GET (solo validación de token)
    if (req.method === "GET") {
        if (req.url.startsWith("/events/id/")) {
            const eventId = req.url.split("/")[3];
            if (!eventId) {
                res.writeHead(400, { "Content-Type": "application/json" });
                return res.end(
                    JSON.stringify({ message: "Event ID is missing in the URL" })
                );
            }
            return authMiddleware()(req, res, () =>
                events.getEventById(req, res, eventId)
            );
        }

        if (req.url === "/events") {
            return authMiddleware()(req, res, () =>
                events.getAll(req, res)
            );
        }
    }

    // DELETE (requiere autenticación y roles)
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

    // PUT (requiere autenticación y roles)
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

                // PUT para actualizar un evento
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

    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
};
