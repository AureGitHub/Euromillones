module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
  	'Tipo_Accion',
    {
      descripcion : {
        type: DataTypes.INTEGER  
      }
    }
  );
}