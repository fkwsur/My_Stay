const {stayinfo, user} = require('../model');
const { jwt } = require('../utils');

module.exports = {

  CreateStay: async (req, res) => {
    try{
      let {
        token,
        stay_name,
        stay_number,
        address,
        content
      } = req.body
      console.log(req.body)
      console.log(req.file)
      let image = '/img/' + req.file.filename;

      console.log(token);
      let decoded = jwt.verifyToken(token);
      console.log(decoded);
      const rows = await user.findOne({where : {user_id : decoded.user_id}});
      console.log(rows);
      if(!rows) throw res.status(200).json({result: '토큰이 잘못됐습니다.'});
      if(rows){
      const rows2 = await stayinfo.create({
        manager_id : decoded.user_id,
        stay_manager: rows.username,
        stay_name: stay_name,
        stay_number: stay_number,
        stay_image: image,
        address: address,
        content: content
      })
      if(rows2) return res.status(200).json({result : true})
      if(!rows2) return res.status(200).json({result : '주소가 이미 있는주소입니다.'})
      } 
    }catch(error){
      console.log(error);
      return res.status(200).send('에러가 났습니다.');
    }
  },

  StayList: async (req, res) => {
    try{
      let {
        token
      } = req.body
      let decoded = jwt.verifyToken(token);
      const rows = await stayinfo.findAll({where : {manager_id : decoded.user_id}});
      if(rows) return res.status(200).json({result : rows})
      else throw console.log('error')
    }catch(error){
      console.log(error);
    }
  },

  UpdateStay: async (req, res) => {
    try{
      let {
        s_idx,
        token,
        stay_name,
        stay_number,
        stay_image,
        address,
        content
      } = req.body
      let decoded = jwt.verifyToken(token);
      const rows = await stayinfo.update({
        stay_name : stay_name,
        stay_number : stay_number,
        stay_image : stay_image,
        address : address,
        content : content
      },
      {
        where : {s_idx :s_idx, manager_id : decoded.user_id
        }
      });
      if(rows) return res.status(200).json({result : '숙박 수정 성공!'})
    }catch(error){
      console.log(error);
      return res.status(200).send('에러가 났습니다.');
    }
  }


}