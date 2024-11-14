const UserxPlace = require("../models/userxplace.model");

// Obtener todas las asignaciones de usuario a lugar
async function getAllUserxPlace(req, res) {
  try {
    const userxplaceRecords = await UserxPlace.find()
      .populate('user', 'fullName email')
      .populate('event', 'name date location');
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ userxplaceRecords }));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Error fetching user-place records", error }));
  }
}

// Obtener una asignación por ID
async function getUserxPlaceById(req, res, id) {
  try {
    const userxplaceRecord = await UserxPlace.findById(id)
      .populate('user', 'fullName email')
      .populate('event', 'name date location');

    if (!userxplaceRecord) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "User-place record not found" }));
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ userxplaceRecord }));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Error fetching user-place record", error }));
  }
}

// Crear una nueva asignación de usuario a lugar
async function createUserxPlace(req, res, body) {
  try {
    const userxplaceRecord = new UserxPlace(body);
    await userxplaceRecord.save();
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "User-place record created successfully", userxplaceRecord }));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Error creating user-place record", error }));
  }
}

module.exports = { getAllUserxPlace, getUserxPlaceById, createUserxPlace };
