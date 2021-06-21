module.exports = (sequelize, DataTypes) => {
  const reservation = sequelize.define(
    "reservation",
    {
      idx: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement : true
      },
      r_idx: {
        type:DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type:DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      reserved: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reserved_day: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      freezeTableName: true,
      timestamps: true,
      comment: '예약여부확인',
    }
    );
  return reservation;
};