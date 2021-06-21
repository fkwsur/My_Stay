const router = require('express').Router();
const { ReservationController: controller } = require('../controller');

router.post('/reserveRoom', controller.reserveRoom);

module.exports = router;