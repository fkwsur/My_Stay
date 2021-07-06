const router = require('express').Router();
const { chattingController: controller } = require('../controller');

 router.post('/RoomList', controller.RoomList);
 router.post('/ChattingList', controller.ChattingList);

module.exports = router;