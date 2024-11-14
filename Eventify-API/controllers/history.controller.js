const AttendanceHistory = require('../models/attendance_history.model');


// Obtener todos los historiales de asistencia
async function getAllHistories(req, res) {
  try {
    const histories = await AttendanceHistory.find()
      .populate('user', 'fullName email') // Puedes personalizar los campos a mostrar
      .populate('event', 'name date location'); // Personalizar campos de evento
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ histories }));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Error fetching attendance histories", error }));
  }
}

// Obtener historial de asistencia por ID
async function getHistoryById(req, res, id) {
  try {
    const history = await AttendanceHistory.findById(id)
      .populate('user', 'fullName email')
      .populate('event', 'name date location');

    if (!history) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Attendance history not found" }));
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ history }));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Error fetching attendance history", error }));
  }
}

module.exports = { getAllHistories, getHistoryById };
