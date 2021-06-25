const {user} = require('../model');
const { jwt, hash } = require('../utils');

module.exports = {

  SignUp: async (req, res) => {
    try{
      let { 
        user_id, 
        nickname, 
        password, 
        email, 
        phone_number, 
        owner 
      } = req.body
      console.log(req.body);
      let hashing = hash.generateHash(password);
      console.log(hashing);
      const rows = await user.create({
        user_id : user_id, 
        username : nickname, 
        password : hashing, 
        email : email, 
        phone_number : phone_number, 
        owner : owner 
      });
      if(rows) return res.status(200).json({result : true});
      if(!rows) return res.status(200).json({result : '데이터가 올바르지 않습니다.'});
    }catch(error){
      return res.status(200).send('에러가 났습니다.');
    }
  },

  CheckId: async (req, res) => {
    try{
      let {id} =req.body
      const rows = await user.findOne({
        where : { user_id :id }
      });
      if(rows === null) return res.status(200).json({result : '사용가능한 아이디입니다.'});
    }catch(error){
      return res.status(200).send('에러가 났습니다.');
    }
  },

  SignIn: async (req, res) => {
    try{
      let {user_id, password} = req.body
      console.log(password);
      const rows = await user.findOne({
        where : { user_id :user_id }
      });
      console.log(rows.password);
      if(!rows) throw res.status(200).json({result: '아이디 없음'});
      const checking = hash.compareHash(password, rows.password);
      if(checking) {
        let token = jwt.createToken(user_id);
        return res.status(200).json({token: token});
      }else{
        throw res.status(200).json({result: '비밀번호 일치없음'});
      }
    }catch(error){
      console.log(error);
      return res.status(200).send('에러가 났습니다.');
    }
  }


}