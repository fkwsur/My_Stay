const router = require('express').Router();
const { RoomsController: controller } = require('../controller');

router.post('/CreateRoom', controller.CreateRoom);
router.post('/UpdateRoom', controller.UpdateRoom);
router.post('/RoomList', controller.RoomList);

module.exports = router;