const Statistics = require("../models/statistics.model");

// Obtener todas las estadísticas
async function getAllStatistics(req, res) {
  try {
    const statistics = await Statistics.find()
      .populate('user', 'fullName email')
      .populate('event', 'name date location');
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ statistics }));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Error fetching statistics", error }));
  }
}

// Obtener estadísticas por ID
async function getStatisticsById(req, res, id) {
  try {
    const statistics = await Statistics.findById(id)
      .populate('user', 'fullName email')
      .populate('event', 'name date location');

    if (!statistics) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Statistics not found" }));
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ statistics }));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Error fetching statistics", error }));
  }
}

// Crear un nuevo registro de estadísticas
async function createStatistics(req, res, body) {
  try {
    const statistics = new Statistics(body);
    await statistics.save();
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Statistics created successfully", statistics }));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Error creating statistics", error }));
  }
}

module.exports = { getAllStatistics, getStatisticsById, createStatistics };
