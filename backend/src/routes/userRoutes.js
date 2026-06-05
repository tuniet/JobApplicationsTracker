const router = require('express').Router();
const ctrl   = require('../controllers/userController');
const auth   = require('../middleware/auth');
const {
  validateRegister,
  validateLogin,
  handleValidation,
} = require('../middleware/validate');

router.post('/register', validateRegister, handleValidation, ctrl.register);
router.post('/login',    validateLogin,    handleValidation, ctrl.login);
router.get('/me',        auth, ctrl.getProfile);
router.patch('/me',      auth, ctrl.updateProfile);

module.exports = router;
