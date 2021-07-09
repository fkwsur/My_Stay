const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const Router = require('./routes');
const compression = require('compression')
const helmet = require('helmet');
const rateLimit = require("express-rate-limit"); 
const multer = require('multer');
const { PORT  } = process.env;
const limiter = rateLimit({ 
  windowMs: 1*60*1000, 
  max: 100 
  })
  const multerS3 = require('multer-s3');

  const aws = require('aws-sdk');
  aws.config.loadFromPath(__dirname + '/s3.json');

const db = require('./model')   // mysql 시퀄라이저 모델
const logger = require("morgan");
const s3 = new aws.S3();
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'hyunjibucket',
        acl: 'public-read',
        key: function(req, file, cb){
                cb(null, Date.now() + '.' + file.originalname.split('.').pop()); // 이름 설정
        }
    })
},'NONE');
module.exports = upload;

dotenv.config();
db.sequelize
.authenticate()
.then(async () => {
  try{
    console.log('db connect ok');
    await db.sequelize.sync({force : false});
  }catch(err){
    console.log('err');
  }  
})
.catch(err => {
    console.log('db' + err);
});

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use('/img', express.static('./uploads'));
app.use(compression()); //메모리 최적화
app.use(helmet()); //기본적인 보안세팅
app.use(logger('dev'));

app.use('/api/user', Router.userRouter)
app.use('/api/stayinfo', Router.stayInfoRouter)
app.use('/api/rooms', Router.RoomsRouter)
app.use('/api/reservation', Router.ReservationRouter)
app.use('/api/chatting', Router.chattingRouter)
app.use(limiter);


const http_server = require('http')
.createServer(app)
.listen(PORT || 8080, () => {
  console.log('server on');
});

const socket = require('./service/socket');

/*
socket.io.attach(http_server,{
  cors : {
    origin : 'http://localhost:3000',
    methods : ["GET", "POST"]
  }
});

socket.Wow();
*/