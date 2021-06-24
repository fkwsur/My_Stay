const router = require('express').Router();
const { ReservationController: controller } = require('../controller');

router.post('/reserveRoom', controller.reserveRoom);
router.post('/CheckIn', controller.CheckIn);
router.post('/checkOut', controller.CheckOut);
router.post('/ReservationList', controller.ReservationList);

module.exports = router;