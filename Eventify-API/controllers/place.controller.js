const Place = require("../models/place.model");

// Obtener todos los lugares
async function getAllPlaces(req, res) {
  try {
    const places = await Place.find();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ places }));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Error fetching places", error }));
  }
}

// Obtener un lugar por ID
async function getPlaceById(req, res, id) {
  try {
    const place = await Place.findById(id);

    if (!place) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Place not found" }));
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ place }));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Error fetching place", error }));
  }
}

// Crear un nuevo lugar
async function createPlace(req, res, body) {
  try {
    const place = new Place(body);
    await place.save();
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Place created successfully", place }));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Error creating place", error }));
  }
}

module.exports = { getAllPlaces, getPlaceById, createPlace };
