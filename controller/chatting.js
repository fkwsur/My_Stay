const {chatting,chatting_room,roomlist,sequelize } = require('../model');

module.exports = {

  RoomList : async (req, res) => {
    try{
      let {id} = req.body;

      let data = [id, id];
      let query = `select * from roomlist inner join chatting_room 
      on roomlist.idx = chatting_room.c_idx 
      where users = ?
      or user = ? `;
  
      const rows = await sequelize.query(query, { replacements: data })
      console.log(rows)
    if(rows) return res.status(200).json({result: rows});
    }catch(err){
      console.log(err);
    }
  }
}