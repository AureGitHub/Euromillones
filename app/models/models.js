var path = require('path');

var Sequelize = require('sequelize');

// Usar BBDD SQLite:
var sequelize = new Sequelize(null, null, null,
                       {dialect: "sqlite", storage: "quiz.sqlite"}
                    );

// Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));
var Jugadores = sequelize.import(path.join(__dirname,'jugadores'));

exports.Quiz = Quiz; // exportar definición de tabla Quiz
exports.Jugadores = Jugadores; // exportar definición de tabla Quiz

// sequelize.sync() inicializa tabla de preguntas en DB
sequelize.sync().then(function() {
  // then(..) ejecuta el manejador una vez creada la tabla
  Quiz.count().then(function (count){
    if(count === 0) {   // la tabla se inicializa solo si está vacía
      Quiz.bulkCreate(
        [ {pregunta: 'Capital de Italia',   respuesta: 'Roma', tema : 'ocio'},
          {pregunta: 'Capital de Portugal', respuesta: 'Lisboa', tema : 'ocio'},
            {pregunta: 'Capital de Francia', respuesta: 'Paris', tema : 'ocio'}
        ]
      ).then(function(){console.log('Base de datos Quiz inicializada')});
    };
  });
  
  
   Jugadores.count().then(function (count){
    if(count === 0) {   // la tabla se inicializa solo si está vacía
      Jugadores.bulkCreate(
        [ 
          {usu: 'jdesande',   Nombre: 'Jose Aurelio de Sande Villarroel', perfil : 0 , activo : true, CorreoExterno : ''},
          {usu: 'aalonso',   Nombre: 'Alberto Alonso Alonso', perfil : 1 , activo : true, CorreoExterno : ''},
          {usu: 'aaranzue',   Nombre: 'Alberto Aranzueque González', perfil : 1 , activo : false, CorreoExterno : ''},
          {usu: 'aencinas',   Nombre: 'Alberto Encinas Escobar', perfil : 1 , activo : true, CorreoExterno : 'carlosnavec@gmail.com'},
          
          
        ]
      ).then(function(){console.log('Base de datos Jugadores inicializada')});
    };
  });
  
  
});
