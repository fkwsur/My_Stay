const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const Router = require('./routes');


const db = require('./model')   // mysql 시퀄라이저 모델

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

app.use('/api/user', Router.userRouter)
app.use('/api/stayinfo', Router.stayInfoRouter)
app.use('/api/rooms', Router.RoomsRouter)
app.use('/api/reservation', Router.ReservationRouter)
app.use('/api/chatting', Router.chattingRouter)


const http_server = require('http').createServer(app).listen(8080, () => {
  console.log('server on');
});

const socket = require('./service/socket');

socket.io.attach(http_server,{
  cors : {
    origin : 'http://localhost:3000',
    methods : ["GET", "POST"]
  }
});

socket.Wow();
