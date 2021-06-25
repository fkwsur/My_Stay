const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const Router = require('./routes');


const db = require('./model')   // mysql 시퀄라이저 모델
const http = require('http');
http.createServer(app).listen(8080, () => {
  console.log('server on');
});
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