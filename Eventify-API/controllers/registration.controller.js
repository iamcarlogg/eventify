const Registration = require("../models/registration.model");

// Obtener todas las inscripciones
async function getAllRegistrations(req, res) {
  try {
    const registrations = await Registration.find()
      .populate('user', 'fullName email')
      .populate('event', 'name date location');
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ registrations }));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Error fetching registrations", error }));
  }
}

// Obtener una inscripción por ID
async function getRegistrationById(req, res, id) {
  try {
    const registration = await Registration.findById(id)
      .populate('user', 'fullName email')
      .populate('event', 'name date location');

    if (!registration) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Registration not found" }));
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ registration }));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Error fetching registration", error }));
  }
}

// Crear una nueva inscripción
async function createRegistration(req, res, body) {
  try {
    const registration = new Registration(body);
    await registration.save();
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Registration created successfully", registration }));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Error creating registration", error }));
  }
}

module.exports = { getAllRegistrations, getRegistrationById, createRegistration };
