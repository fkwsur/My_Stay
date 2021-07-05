const io = require('socket.io')();
const { chatting,chatting_room, roomlist } = require('../model');
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
      const rows = await roomlist.findAll({
        where : {
          roomname : chat.roomname,
          users : chat.username
         }
      })
      if(rows[0] == null){
        await io.emit('chatroom',chat);
        const rows2 = await roomlist.create({
          roomname : chat.roomname,
          users : chat.username
        })
        if(rows2){
        const rows3 = await chatting_room.create({
          c_idx : rows2.idx,
          user : chat.manager_id
        })
       }
       
      }else{
        let listerr = '이미 있는 방입니다.'
        await io.emit('listerr', listerr);
      }
      
      }catch (err) {
        console.log(err);
      }
      });

      socket.on('msg', async (msg) => {
        try{
        await io.to(msg.roomName).emit('msg',msg);
        const rows = await chatting.create({user_id : msg.name, chatting : msg.message, chatRoomName : msg.roomName})
        console.log(rows);
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