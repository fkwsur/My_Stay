const io = require('socket.io')();
//const { chatting, roomlist } = require('../models');
const dotenv = require("dotenv");
dotenv.config();

const redis = require('redis').createClient('6379','127.0.0.1');

redis.on('error', (err) => {
	console.log(err);
});


module.exports = { 
  io : io,
  Wow : async() =>{
  io.on('connection', (socket) => { 

  });
  }
};