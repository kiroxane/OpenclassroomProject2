
module.exports = (sequelize, DataTypes) => {
	const Categories = sequelize.define(
		"categories",
		{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			},
		},
		{timestamps: false}
	)
	return Categories
}
//Modèles pour les utilisateurs et catégories (non lus mais utilisés via index.js).