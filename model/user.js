module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      idx: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement : true
      },
      user_id: {
        type:DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type:DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
      phone_number: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: true,
      },
      owner: {
        type:DataTypes.STRING,
        allowNull: false
      }
    },
    {
      freezeTableName: true,
      timestamps: true,
      comment: '회원정보',
    }
    );
  return user;
};