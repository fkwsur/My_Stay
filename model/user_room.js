module.exports = (sequelize, DataTypes) => {
  const user_room = sequelize.define(
    "user_room",
    {
      idx: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement : true
      },
      user_id: {
        type:DataTypes.STRING(200),
        unique: true,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
      comment: '예약목록',
    }
    );
  return user_room;
};