const Application = require('../models/Application');

exports.getAll = (userId, filters = {}) => {
  const query = { user: userId };
  if (filters.status) query.status = filters.status;
  return Application.find(query).sort({ createdAt: -1 });
};

exports.getOne = async (id, userId) => {
  const app = await Application.findOne({ _id: id, user: userId });
  if (!app) throw new Error('Application not found');
  return app;
};

exports.create = (userId, data) =>
  Application.create({ ...data, user: userId });

exports.update = async (id, userId, data) => {
  const app = await Application.findOneAndUpdate(
    { _id: id, user: userId },
    data,
    { new: true, runValidators: true }
  );
  if (!app) throw new Error('Application not found');
  return app;
};

exports.remove = async (id, userId) => {
  const app = await Application.findOneAndDelete({ _id: id, user: userId });
  if (!app) throw new Error('Application not found');
};
