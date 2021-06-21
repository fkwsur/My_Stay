module.exports = (sequelize, DataTypes) => {
  const rooms = sequelize.define(
    "rooms",
    {
      r_idx: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement : true
      },
      stay_code: {
        type:DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      room_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      room_image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      room_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      room_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      freezeTableName: true,
      timestamps: true,
      comment: '방정보',
    }
    );
  return rooms;
};