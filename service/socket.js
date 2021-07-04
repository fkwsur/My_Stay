const io = require('socket.io')();
const { chatting_room, roomlist } = require('../model');
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

    socket.on('chatroom', async (chat) => {
      try{
        console.log(chat);
      await io.emit('chatroom',chat);
      const rows = await roomlist.create({
        roomname : chat.roomname,
        users : chat.username
      })
      console.log(rows);
      const rows2 = await chatting_room.create({
        c_idx : chat.c_idx,
        user : chat.username
      })
      if(rows2){
      const rows3 = await chatting_room.create({
        c_idx : chat.c_idx,
        user : chat.manager_id
      })
      console.log(rows3);
    }
      }catch (err) {
        console.log(err);
      }
      });
  
      socket.on('roomName', async (roomName) => {
        try{
         socket.join(roomName);
        }catch (e) {
          console.log(e);
        }
      });

      socket.leave();
      socket.on('disconnect', () => {
        console.log('disconnecting');
        redis.flushall();
      });

  });
  }
};