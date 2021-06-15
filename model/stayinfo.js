module.exports = (sequelize, DataTypes) => {
  const stayinfo = sequelize.define(
    "stayinfo",
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
      stay_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stay_image: {
        type: DataTypes.STRING,
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
      room_reservation: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: sequelize.literal('false')
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
      comment: '숙박정보',
    }
    );
  return stayinfo;
};