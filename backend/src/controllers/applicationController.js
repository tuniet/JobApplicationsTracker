const applicationService = require('../services/applicationService');

exports.getAll = async (req, res) => {
  try {
    const apps = await applicationService.getAll(req.user.id, req.query);
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const app = await applicationService.getOne(req.params.id, req.user.id);
    res.json(app);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const app = await applicationService.create(req.user.id, req.body);
    res.status(201).json(app);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const app = await applicationService.update(req.params.id, req.user.id, req.body);
    res.json(app);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await applicationService.remove(req.params.id, req.user.id);
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
