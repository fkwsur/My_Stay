const router = require('express').Router();
const { RoomsController: controller } = require('../controller');
const multer = require('multer');
const upload = multer({dest : './uploads'});

router.post('/CreateRoom', upload.single('image'), controller.CreateRoom);
router.post('/UpdateRoom', controller.UpdateRoom);
router.post('/RoomList', controller.RoomList);
router.post('/AllRoomList', controller.AllRoomList);
router.post('/FindRoom', controller.FindRoom);

module.exports = router;