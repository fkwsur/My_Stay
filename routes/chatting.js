const router = require('express').Router();
const { chattingController: controller } = require('../controller');

 router.post('/RoomList', controller.RoomList);

module.exports = router;