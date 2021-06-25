const router = require('express').Router();
const { stayInfoController: controller } = require('../controller');
const multer = require('multer');
const upload = multer({dest : './uploads'});

router.post('/CreateStay', upload.single('image'),controller.CreateStay);
router.post('/StayList', controller.StayList);
router.post('/UpdateStay', controller.UpdateStay);

module.exports = router;