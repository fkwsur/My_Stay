const { rooms, reservation, QueryTypes, sequelize, stayinfo } = require("../model");
const { jwt } = require('../utils');

module.exports = {

  reserveRoom: async (req,res) => {
    try{
      let { token, r_idx, reserved, reserved_day } = req.body;
      console.log(req.body)
      
      let decoded = jwt.verifyToken(token);
      const rows = await rooms.findOne({where : {r_idx : r_idx}});
      const count = rows.room_count -1;
      if(!rows) throw res.status(200).json({result: '방을 찾을 수 없습니다.'});
      if(rows.room_count === 0) throw res.status(200).json({result: '예약이 꽉 찼습니다.'});
      const rows2 = await reservation.create({
        r_idx : rows.r_idx,
        RemainingRooms : rows.room_count,
        user_id : decoded.user_id,
        reserved : reserved,
        reserved_day : reserved_day
      })
      if(!rows2) throw res.status(200).json({result: '예약 불가능'});
      const rows3 = await rooms.update(
        {room_count : count},
        {
          where : {r_idx : r_idx}
        }
        );
      if(rows3) return res.status(200).json({result : '숙박 예약 성공!'})

    }catch(error){
      console.log(error);

    }
  },

  CheckIn : async (req, res) => {
    try{
      let {token, idx, CheckInTime} = req.body;
      console.log(req.body);
      let decoded = jwt.verifyToken(token);
      const rows = await stayinfo.findOne({where : {manager_id : decoded.user_id}});
      if(!rows) throw res.status(200).json({result: '계정이 일치하지 않습니다.'});
      const rows2 = await reservation.update(
        {checkin : CheckInTime},
        {where : {idx : idx}});
      if(rows2) return res.status(200).json({result : '체크인 완료.'})
    }catch(error){
      return res.status(200).send('에러가 났습니다.');
    }
  },

  CheckOut : async (req, res) => {
    try{
      let {token, r_idx, idx, CheckOutTime} = req.body;
      let decoded = jwt.verifyToken(token);
      const rows = await stayinfo.findOne({where : {manager_id : decoded.user_id}});
      if(!rows) throw res.status(200).json({result: '계정이 일치하지 않습니다.'});
      const rows2 = await reservation.findOne({where : {idx : idx}});
      if(rows2.checkin === null || rows2.checkout !== null) throw res.status(200).json({result: '체크인을 하지 않았거나 이미 체크아웃한 방입니다.'});
      const rows3 = await reservation.update(
        {checkout : CheckOutTime},
        {where : {idx : idx}});
        if(!rows3) throw res.status(200).json({result: '체크아웃을 할 수 없습니다.'});
      const rows4 = await rooms.findOne({where : {r_idx : r_idx}});
      if(!rows4) throw res.status(200).json({result: '방을 찾을 수 없습니다.'});
      const count = rows4.room_count + 1;
      const rows5 = await rooms.update(
        {room_count : count},
        {
          where : {r_idx : r_idx}
        }
        );
      if(rows5) return res.status(200).json({result : '체크아웃 완료.'})
      console.log(rows2);
    }catch(error){
      return res.status(200).send('에러가 났습니다.');
    }
  },

  ReservationList: async (req, res) => {
    try{
      let {token, r_idx} = req.body;
      let decoded = jwt.verifyToken(token);
      console.log(decoded);
      let data = [r_idx];
      let query = `select * from stayinfo left join rooms 
      on stayinfo.s_idx = rooms.stay_code 
      left join reservation
      on rooms.r_idx = reservation.r_idx 
      where manager_id = :manager_id and reservation.r_idx = :r_idx`;
      let values = {
        manager_id : decoded.user_id,
        r_idx: data,
      }
      const rows = await sequelize.query(query, { replacements: values })
      if(rows) return res.status(200).json({result : rows[0]});
    } catch(error){
      console.log(error);
      return res.status(200).send('에러가 났습니다.');
    }
  }
}