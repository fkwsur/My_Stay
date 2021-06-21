const router = require('express').Router();
const { stayInfoController: controller } = require('../controller');

router.post('/CreateStay', controller.CreateStay);
router.post('/StayList', controller.StayList);
router.post('/UpdateStay', controller.UpdateStay);

module.exports = router;