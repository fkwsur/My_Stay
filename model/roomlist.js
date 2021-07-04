module.exports = (sequelize, DataTypes) => {
	const roomlist = sequelize.define(
		'roomlist',
		{
			idx : {
				type: DataTypes.INTEGER,
				primaryKey : true,
				autoIncrement : true,
				allowNull : false
			},
			roomname : {
				type : DataTypes.STRING,
				allowNull : false
			},
			users : {
				type : DataTypes.STRING,
				allowNull : false
			}
		},
		{
			freezeTableName : true,
			timestamps : false,
			comment : '룸리스트 테이블'
		}
	);
	return roomlist;
}