const User = require("../models/user.model");
const Role = require("../models/role.model");
const { generateToken } = require("../utils/jwtUtils");

async function register(req, res, body) {
  const { fullName, email, password, role } = body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "User already exists" }));
    }

    //Buscar el rol en la base de datos
    const existingRole = await Role.findOne({ role });
    if (!existingRole) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Role not found" }));
    }

    const newUser = new User({ fullName, email, password, role: existingRole._id });
    await newUser.save();

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "User created" }));
  } catch (error) {
    console.error("Error during registration:", error);

    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Error creating user" }));
  }
}

async function login(req, res, body) {
  const { email, password } = body;

  try {
    const user = await User.findOne({ email }).populate("role");

    console.log("EL USUARIO ES ");
    console.log(user);

    if (!user || !(await user.comparePassword(password))) {
      res.writeHead(401, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Invalid credentials" }));
    }
    const token = generateToken(user);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        token,
        role: user.role.role,
      })
    );
  } catch (error) {
    console.error("Error during login:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Error logging in" }));
  }
}

module.exports = { register, login };
