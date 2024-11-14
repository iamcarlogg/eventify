// config/db.js
const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado a MongoDB con Mongoose");
  } catch (error) {
    console.error("Error conectando a MongoDB", error);
    process.exit(1);
  }
}

module.exports = connectDB;
