const fs = require("fs");
const path = require("path");
const { Sequelize,  DataTypes, Op, QueryTypes } = require("sequelize");
const basename = path.basename(__filename);


const dotenv = require('dotenv');
dotenv.config();
const { 
  MYSQL_DB, 
  MYSQL_DB_USER, 
  MYSQL_DB_PASSWORD, 
  MYSQL_DB_HOST 
} = process.env;

const sequelize = new Sequelize("mystay", "admin", "11111111",{
  host : "mystay.cxdfptuzappa.ap-northeast-2.rds.amazonaws.com",
  port : 3306,
  dialect : 'mysql',
  operatorsAliases : 0,
  pool : {
      max : 5,
      min : 0,
      idle : 10000,
  }
}); 

// 외래키 쓸때 key와value로 구분시켜줄 때, db.sequelize = sequelize; db.Op = Op; db.QueryTypes = QueryTypes; 사용할 때 필요하다. 이 안에 담아뒀다가 꺼내서 사용
let db = [];

fs
.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

//외래키 있으면 외래키끼리 연결시켜줌
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Op = Op;
db.QueryTypes = QueryTypes;

module.exports = db;