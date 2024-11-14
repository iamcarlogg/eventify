// middlewares/authMiddleware.js
const { verifyToken } = require('../utils/jwtUtils');

function authMiddleware(allowedRoles) {
  return (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      res.writeHead(403, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "No token provided" }));
    }

    const decoded = verifyToken(token);
    if (!decoded){
      res.writeHead(401, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Invalid token" }));
    } 

    console.log("DECODED ES ");
    console.log(decoded);

    

    // Verificar si el rol del usuario está permitido
    if (allowedRoles && !allowedRoles.includes(decoded.role.role)) {
      res.writeHead(403, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Insufficient permissions" }));
    }

    req.user = decoded;
    next();
  };
}

module.exports = authMiddleware;
