const { rooms, reservation, QueryTypes, sequelize } = require("../model");
const { jwt } = require('../utils');

module.exports = {

  reserveRoom: async (req,res) => {
    try{
      let { token, r_idx, reserved, reserved_day } = req.body;
      console.log(req.body)
      
      let decoded = jwt.verifyToken(token);
      const rows = await rooms.findOne({where : {r_idx : r_idx}});
      const count = rows.room_count -1;
      console.log(count);
      if(!rows) throw res.status(200).json({result: '토큰이 잘못됐습니다.'});
      if(rows){
        
        console.log('왜?')
        const rows2 = await reservation.create({
          r_idx : rows.room_count,
          user_id : decoded.user_id,
          reserved : reserved,
          reserved_day : reserved_day
        })
        if(rows2){
          const rows3 = await rooms.update(
            {room_count : count},
            {
              where : {r_idx : r_idx}
            }
            );
            if(rows3) return res.status(200).json({result : '숙박 예약 성공!'})
        }
 
    }
    }catch(error){
      console.log(error);
      return res.status(200).send('에러가 났습니다.');
    }
  }

}