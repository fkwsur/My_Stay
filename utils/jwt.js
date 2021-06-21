const jwt = require('jsonwebtoken');
const { ACCESS_KEY } = process.env;
const { user } = require('../model');

module.exports = {
  createToken: (payload) => {
    const token = jwt.sign({ user_id: payload.toString() }, ACCESS_KEY, {
      algorithm: 'HS256',
      expiresIn: '1y',
    });
    return token;
  },
  verifyToken: (token) => {
    let decoded = jwt.verify(token, ACCESS_KEY);
    return decoded;
  },
  checkToken: async (data) => {
    try {
      let check = await dao.findById(user, data);
      return check;
    } catch (e) {}
  },
};
