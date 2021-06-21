const { rooms, reservation, QueryTypes, sequelize } = require("../model");
const { jwt, hash } = require('../utils');

module.exports = {

  reserveRoom: async (req,res) => {
    try{
      let { token, r_idx, reserved } = req.body;
      console.log(req.body)
      
      let today = new Date();   
      let year = today.getFullYear(); // 년도
      let month = today.getMonth() + 1;  // 월
      let date = today.getDate();  // 날짜
      let hours = today.getHours(); // 시
      let minutes = today.getMinutes();  // 분
      
      let now = year + '년' + month + '월' + date + '일' + hours + '시' + minutes + '분'
      console.log(now);
      
      let decoded = jwt.verifyToken(token);
      console.log(decoded);
      const rows = await rooms.findOne({where : {r_idx : r_idx}});
      if(!rows) throw res.status(200).json({result: '토큰이 잘못됐습니다.'});
      if(rows){
        const rows2 = await rooms.findOne({where : {r_idx : r_idx}});
        console.log(rows2.room_count)
        const rows3 = await sequelize.query(`SELECT COUNT(r_idx) as cnt FROM reservation`);
        console.log(rows3[0].cnt[0]);
        if(rows3.cnt < rows2.room_count){
          const rows4 = await reservation.create({
            r_idx : rows.r_idx,
            user_id : decoded.user_id,
            reserved : reserved,
            reserved_day : now
          })
          if(rows4) return res.status(200).json({result : '숙박 예약 성공!'})
        } else{
          return res.status(200).send('예약 가능한 방이 없습니다.');
        }

    }
    }catch(error){
      console.log(error);
      return res.status(200).send('에러가 났습니다.');
    }
  }

}