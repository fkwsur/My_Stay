const {stayinfo} = require('../model');

module.exports = {

  CreateStay: async (req, res) => {
    try{
      let {
        user_id,
        username,
        stay_name,
        stay_number,
        stay_image,
        address,
        content
      } = req.body
      const rows = await stayinfo.create({
        manager_id : user_id,
        stay_manager: username,
        stay_name: stay_name,
        stay_number: stay_number,
        stay_image: stay_image,
        address: address,
        content: content
      })
      if(rows) return res.status(200).json({result : rows})
    }catch(error){
      console.log(error);
    }
  }

  
}