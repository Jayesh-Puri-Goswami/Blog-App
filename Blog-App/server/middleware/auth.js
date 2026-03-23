const jwt = require('jsonwebtoken');
const User = require('../models/User');

const getUser = async (token) => {
  if (!token) return null;

  try {
    const cleanToken = token.startsWith('Bearer ') ? token.slice(7) : token;
    const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    return user;
  } catch {
    return null;
  }
};

module.exports = { getUser };
