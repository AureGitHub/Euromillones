module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
  	'JugadorXApuesta',
     {
      id_apuesta : {
        type: DataTypes.INTEGER  
      }
     },
     
     {
      id_jugador : {
        type: DataTypes.INTEGER  
      }
     }
  );
};