module.exports = (sequelize, DataTypes) => {
	const chatting_room = sequelize.define(
		'chatting_room',
		{
			idx : {
				type: DataTypes.INTEGER,
				primaryKey : true,
				autoIncrement : true,
				allowNull : false
			},
			c_idx : {
				type : DataTypes.INTEGER,
				allowNull : false
			},
			user : {
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
	return chatting_room;
}