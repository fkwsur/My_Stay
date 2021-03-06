module.exports = (sequelize, DataTypes) => {
  const stayinfo = sequelize.define(
    "stayinfo",
    {
      s_idx: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement : true
      },
      manager_id: {
        type:DataTypes.STRING,
        allowNull: false,
      },
      stay_manager:{
        type:DataTypes.STRING,
        allowNull: false,
      },
      stay_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stay_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      stay_image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      freezeTableName: true,
      timestamps: true,
      comment: '숙박정보',
    }
    );
  return stayinfo;
};