const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.register = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error('Email already in use');
  const user = await User.create({ name, email, password });
  return { user, token: generateToken(user._id) };
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password)))
    throw new Error('Invalid credentials');
  return { user, token: generateToken(user._id) };
};

exports.getProfile = async (id) => User.findById(id);

exports.updateProfile = async (id, data) => {
  const forbidden = ['password', 'email'];
  forbidden.forEach((f) => delete data[f]);
  return User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};
