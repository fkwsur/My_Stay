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
  return Reservation;
};