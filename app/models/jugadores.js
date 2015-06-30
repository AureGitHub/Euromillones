module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
  	'Jugadores',
    { usu: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta login"}}
      },
      Nombre: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Nombre"}} 
      },
       activo : {
        type: DataTypes.BOOLEAN
      },
       CorreoExterno : {
        type: DataTypes.STRING
      }
      
    }
  );
}