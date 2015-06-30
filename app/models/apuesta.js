module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
  	'Apuestas',
    {
      nombre : {
        type: DataTypes.INTEGER  
      }
    }
  );
}