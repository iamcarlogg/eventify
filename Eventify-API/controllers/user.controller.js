const User = require("../models/user.model");
const bcrypt = require("bcrypt");

// Actualizar datos del usuario por correo electrónico
async function updateUser(req, res, body, email) {
  const { fullName, password, role } = body; // Solo actualizamos estos campos

  try {
    // Buscar al usuario por correo
    const user = await User.findOne({ email });

    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "User not found" }));
    }

    // Actualizar los campos si fueron proporcionados
    if (password) user.password = password; // Se re-encriptará en el middleware pre('save')
    if (role) user.role = role;
    if (fullName) user.fullName = fullName;

    await user.save();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "User updated successfully", user }));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "error updating user" }));
  }
}

// Eliminar un usuario
async function deleteUser(req, res, email) {

  try {
    // Buscar al usuario por ID y eliminarlo
    const user = await User.findOneAndDelete({ email });

    if (!user) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "User not found" }));
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "User deleted successfully" }));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "Error deleting user", error }));
  }
}

// Obtener todos los usuarios
async function getAllUsers(req, res) {
  try {
    const users = await User.find(); 

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
        JSON.stringify({
          users
        })
      );
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Error fetching users", error }));
  }
}

// Obtener un usuario por su correo electrónico
async function getUserByEmail(req, res, email) {

  try {
    const user = await User.findOne({ email }); // Buscar el usuario por correo

    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "User not found" }));
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(user)); // Devolver la información del usuario como JSON
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Error fetching user", error }));
  }
}

async function changePassword(req, res, body, email) {
    const {password, newPassword} = body;
  try {
    // Verificar si se proporcionó una nueva contraseña
    if (!password || !newPassword) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Both passwords are required" }));
    }

    // Buscar al usuario por correo
    const user = await User.findOne({ email });

    if (!user) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "User not found" }));
    }

    // Verificar si la contraseña actual proporcionada es correcta
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.writeHead(401, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Incorrect current password" }));
    }

    // Actualizar el password y guardar el usuario (se ejecutará el middleware 'pre' para encriptar)
    user.password = newPassword;
    await user.save();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Password updated successfully" }));
    }
    catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Error updating password", error }));
    }
}

module.exports = { updateUser, deleteUser, getAllUsers, getUserByEmail, changePassword };
