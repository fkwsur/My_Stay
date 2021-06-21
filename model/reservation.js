module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define(
    "Reservation",
    {
      idx: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement : true
      },
      s_idx: {
        type:DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type:DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      reserved: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reserved_day: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      freezeTableName: true,
      timestamps: true,
      comment: '예약여부확인',
    }
    );
  return Reservation;
};