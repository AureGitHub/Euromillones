var path = require('path');

var Sequelize = require('sequelize');

// Usar BBDD SQLite:
var sequelize = new Sequelize(null, null, null,
                       {dialect: "sqlite", storage: "quiz.sqlite"}
                    );

// Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));
var Jugadores = sequelize.import(path.join(__dirname,'jugadores'));
var Saldos = sequelize.import(path.join(__dirname,'saldo'));
var Perfiles = sequelize.import(path.join(__dirname,'perfiles'));

Saldos.belongsTo(Jugadores);
Jugadores.hasOne(Saldos);

Jugadores.belongsTo(Perfiles);
Perfiles.hasMany(Jugadores);

exports.Quiz = Quiz; 
exports.Jugadores = Jugadores; 
exports.Saldos = Saldos; 
exports.Perfiles = Perfiles; 


// sequelize.sync() inicializa tabla de preguntas en DB
sequelize.sync().then(function() {
  // then(..) ejecuta el manejador una vez creada la tabla
  
  
   Perfiles.count().then(function (count){
    if(count === 0) {   // la tabla se inicializa solo si está vacía
      Perfiles.bulkCreate(
        [ 
          {id: 1,   descripcion: 'publico'},
          {id: 2,   descripcion: 'privado'},
          {id: 4,   descripcion: 'admin'},
          
        ]
      ).then(function()
      {
        console.log('Base de datos Perfiles inicializada');
        Jugadores.count().then(function (count){
      if(count === 0) {   // la tabla se inicializa solo si está vacía
        Jugadores.bulkCreate(
          [ 
            { id : 0, usu: 'jdesande',   Nombre: 'Jose Aurelio de Sande Villarroel',  activo : true, CorreoExterno : '' ,PerfileId : 4},
            { id : 1, usu: 'aalonso',   Nombre: 'Alberto Alonso Alonso' , activo : true, CorreoExterno : '', PerfileId : 2},
            { id : 2, usu: 'aaranzue',   Nombre: 'Alberto Aranzueque González' , activo : false, CorreoExterno : '', PerfileId : 2 },
            { id : 3, usu: 'aencinas',   Nombre: 'Alberto Encinas Escobar' , activo : true, CorreoExterno : 'carlosnavec@gmail.com',PerfileId : 2},
            
            
          ]
        ).then(function(){
          console.log('Base de datos Jugadores inicializada');
           Saldos.count().then(function (count){
    if(count === 0) {   // la tabla se inicializa solo si está vacía
      Saldos.bulkCreate(
        [ 
          {JugadoreId: 0,   saldo: 100},
          {JugadoreId: 1,   saldo: 200},
          {JugadoreId: 2,   saldo: 300},
          {JugadoreId: 3,   saldo: 400},
          
        ]
      ).then(function(){console.log('Base de datos Saldos inicializada')});
    };
  });
        });
    };
  });
        
      });
    };
  });
  
   
  
 
  
 
  
  
});
