module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
  	'Tipo_Movimiento',
    {
      descripcion : {
        type: DataTypes.INTEGER  
      }
    }
  );
}