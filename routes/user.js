const router = require('express').Router();
const { userController: controller } = require('../controller');

router.post('/signup', controller.SignUp);
router.post('/CheckId', controller.CheckId);
router.post('/signin', controller.SignIn);

module.exports = router;