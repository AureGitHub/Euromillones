module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
  	'Perfiles',
    {
      descripcion : {
        type: DataTypes.INTEGER  
      }
    }
  );
}