const { rooms, stayinfo } = require("../model");
const { jwt } = require('../utils');

module.exports = {

  CreateRoom: async (req, res) => {
    try{
      let {
        s_idx,
        token,
        content,
        room_name,
        room_price,
        room_count
      } = req.body
      console.log(req.body)
      console.log(req.file)
      let image = '/img/' + req.file.filename;
      let decoded = jwt.verifyToken(token);
      console.log(decoded);
      const rows = await stayinfo.findOne(
        {
          where : {s_idx :s_idx, manager_id : decoded.user_id}
        }
      )
      console.log(rows);
    if(!rows) throw res.status(200).json({result: '토큰이 잘못됐습니다.'});
    if(rows){
      const rows2 = await rooms.create({
        stay_code : rows.s_idx,
        content : content,
        room_name : room_name,
        room_image : image,
        room_price : room_price,
        room_count : room_count
      })
      if(rows2) return res.status(200).json({result : true});
    }
    }catch(error){
      return res.status(200).send('에러가 났습니다.');
    }
  },

  UpdateRoom: async (req, res) => {
    try{
      let {
        s_idx,
        token,
        idx,
        content,
        room_name,
        room_image,
        room_price,
        room_count
      } = req.body
      console.log('에러찾기')
      console.log(req.body)
      let decoded = jwt.verifyToken(token);
      console.log(decoded);
      const rows = await stayinfo.findOne(
        {
          where : { s_idx :s_idx, manager_id : decoded.user_id}
        }
      )
      console.log(rows);
    if(!rows) throw res.status(200).json({result: '토큰이 잘못됐습니다.'});
    if(rows){
      const rows2 = await rooms.update(
        {
        content : content,
        room_name : room_name,
        room_image : room_image,
        room_price : room_price,
        room_count : room_count
      },
      {
      where : {idx : idx}
      }
     )
      if(rows2) return res.status(200).json({result : true});
    }
    }catch(error){
      return res.status(200).send('에러가 났습니다.');
    }
  },

  RoomList: async (req, res) => {
    try{
      let {
        s_idx,
        token,
      } = req.body  
      console.log(req.body)
      let decoded = jwt.verifyToken(token);
      console.log(decoded);
      const rows = await stayinfo.findOne(
        {
          where : { s_idx :s_idx, manager_id : decoded.user_id}
        }
      )
      console.log(rows);
      if(!rows) throw res.status(200).json({result: '토큰이 잘못됐습니다.'});
      if(rows){
        const rows2 = await rooms.findAll(
        {
        where : {stay_code : rows.s_idx}
        }
       )
        if(rows2) return res.status(200).json({result : rows2});
        else throw '에러가 났습니다.';
      }
    }catch(error){
      console.log(error);
      return res.status(200).send('에러가 났습니다.');
    }
  },

  AllRoomList: async (req,res) => {
    try{
      let {s_idx} = req.body
      const rows = await rooms.findAll(
        {
        where : {stay_code : s_idx}
        }
      )
      if(rows) return res.status(200).json({result : rows});
      else throw '에러가 났습니다.';
      }catch(error){
        return res.status(200).send('에러가 났습니다.');
      }
  }

  

}