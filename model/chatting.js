module.exports = (sequelize, DataTypes) => {
  const chatting = sequelize.define(
    "chatting",
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
      chatRoomName: {
        type:DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      chatting: {
        type:DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
      comment: '채팅로그',
    }
    );
  return chatting;
};