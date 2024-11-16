// routes/routes.js
const userRoutes = require('./user.routes');
const eventRoutes = require('./event.routes');
const authRoutes = require('./auth.routes');
const roleRoutes = require('./role.routes');
const historyRoutes = require('./history.routes');
const registrationRoutes = require('./registration.routes');
const statisticsRoutes = require('./stadistics.routes');
const userxplaceRoutes = require('./userxplace.routes');
const placeRoutes = require('./place.routes');

function createRoutes() {
  return async (req, res) => {
    if (req.url.startsWith('/user')) {
      return await userRoutes(req, res);
    }

    if (req.url.startsWith('/events')) {
      return await eventRoutes(req, res);
    }

    if (req.url.startsWith('/login')) {
      return await authRoutes(req, res);
    }

    if (req.url.startsWith('/register')) {
      return await authRoutes(req, res);
    }
    

    if (req.url.startsWith('/roles')) {
      return await roleRoutes(req, res);
    }

    if (req.url.startsWith('/histories')) {
      return await historyRoutes(req, res);
    }

    if (req.url.startsWith('/registrations')) {
      return await registrationRoutes(req, res);
    }

    if (req.url.startsWith('/statistics')) {
      return await statisticsRoutes(req, res);
    }

    if (req.url.startsWith('/userxplace')) {
      return await userxplaceRoutes(req, res);
    }

    if (req.url.startsWith('/places')) {
      return await placeRoutes(req, res);
    }

    // Si ninguna ruta coincide
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  };
}

module.exports = createRoutes;
