const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();
const { SALT } = process.env;

module.exports = {
  generateHash: (password) => {
    const salt = bcrypt.genSaltSync(Number(SALT));
    const hashpassword = bcrypt.hashSync(password, salt);
    return hashpassword;
  },
  compareHash: (password, dbpassword) => {
    return bcrypt.compareSync(password, dbpassword);
  },
};
