const router = require('express').Router();
const { stayInfoController: controller } = require('../controller');

router.post('/CreateStay', controller.CreateStay);

module.exports = router;