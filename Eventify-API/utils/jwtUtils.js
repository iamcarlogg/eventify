// utils/jwtUtils.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

function generateToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn: '1h' });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

module.exports = { generateToken, verifyToken };
