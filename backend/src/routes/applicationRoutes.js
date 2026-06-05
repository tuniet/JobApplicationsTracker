const router = require('express').Router();
const ctrl   = require('../controllers/applicationController');
const auth   = require('../middleware/auth');
const { validateApplication, handleValidation } = require('../middleware/validate');

router.use(auth);

router.get('/',       ctrl.getAll);
router.get('/:id',    ctrl.getOne);
router.post('/',      validateApplication, handleValidation, ctrl.create);
router.patch('/:id',  validateApplication, handleValidation, ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
