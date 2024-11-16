const http = require('http');
const connectDB = require('./config/db'); // Asegúrate de que apunte a la ruta correcta
const createRoutesBackUp = require('./routes/routesBackUp'); // Asegúrate de que apunte a la ruta correcta
const createRoutes = require('./routes/routes'); // Asegúrate de que apunte a la ruta correcta

// Conectar a la base de datos
connectDB();

// Crear el servidor HTTP
const server = http.createServer((req, res) => {
  // Configurar los encabezados CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Manejar solicitudes OPTIONS
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Llamar a las rutas
  createRoutes()(req, res);
});

// Definir el puerto
const PORT = process.env.PORT || 3000;

// Escuchar el servidor
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
