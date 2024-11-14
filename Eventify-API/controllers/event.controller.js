// controllers/eventController.js
const Event = require('../models/event.model');

async function create(req, res, body) {
  try {
    const event = new Event(body);
    await event.save();
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Event created successfully", event }));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Error creating event", error }));
  }
}

async function getAll(req, res) {
  try {
    const events = await Event.find();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
        JSON.stringify({
          events
        })
      );
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Error fetching events", error }));
  }
}

async function update(req, res, body, id) {
  try {
    const event = await Event.findByIdAndUpdate(id, body, { new: true });
    if (!event){
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Event not found" }));
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Event updated successfully", event }));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Error updating event" }));
  }
}

async function deleteEvent(req, res, id) {
  try {
    const event = await Event.findByIdAndDelete(id);
    if (!event){
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Event not found" }));
    } 
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "Event deleted successfully" }));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "Error deleting event", error }));
  }
}

// Obtener un evento específico por su ID
async function getEventById(req, res, id) {

  try {
    // Buscar el evento por su ID
    const event = await Event.findById(id);

    // Si no se encuentra el evento, devolver un error 404
    if (!event) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Event not found" }));
    }

    // Si el evento se encuentra, devolverlo en la respuesta
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(event));
  } catch (error) {
    // Si ocurre un error, devolver un error 500
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Error fetching event", error }));
  }
}

module.exports = { create, getAll, update, deleteEvent, getEventById };
