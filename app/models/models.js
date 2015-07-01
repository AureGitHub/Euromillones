var path = require('path');

var Sequelize = require('sequelize');

// Usar BBDD SQLite:
var sequelize = new Sequelize(null, null, null,
  { dialect: "sqlite", storage: "quiz.sqlite" }
  );

// Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
var Jugadores = sequelize.import(path.join(__dirname, 'jugadores'));
var Saldos = sequelize.import(path.join(__dirname, 'saldo'));
var Perfiles = sequelize.import(path.join(__dirname, 'perfiles'));
var Tipo_Estado = sequelize.import(path.join(__dirname, 'tipo_estado'));
var Tipo_Accion = sequelize.import(path.join(__dirname, 'tipo_accion'));
var Tipo_Movimiento = sequelize.import(path.join(__dirname, 'tipo_movimiento'));
var Apuestas = sequelize.import(path.join(__dirname, 'apuestas'));

//REL JUGADORES x SALDOS
Saldos.belongsTo(Jugadores);
Jugadores.hasOne(Saldos);

//REL JUGADORES x PERFILES
Jugadores.belongsTo(Perfiles);
Perfiles.hasMany(Jugadores);

//REL APUESTAS x ESTADO
Apuestas.belongsTo(Tipo_Estado, { foreignKey: 'IdEstado' });

exports.Quiz = Quiz;
exports.Jugadores = Jugadores;
exports.Saldos = Saldos;
exports.Perfiles = Perfiles;

exports.Tipo_Estado = Tipo_Estado;
exports.Tipo_Accion = Tipo_Accion;
exports.Tipo_Movimiento = Tipo_Movimiento;

exports.Apuestas = Apuestas;


// sequelize.sync() inicializa tabla de preguntas en DB
sequelize.sync().then(function () {
  // then(..) ejecuta el manejador una vez creada la tabla
  
  
  Tipo_Accion.count().then(function (count) {
    if (count === 0) {   // la tabla se inicializa solo si está vacía
      Tipo_Accion.bulkCreate(
        [
          { id: 0, descripcion: 'Visita' },
          { id: 1, descripcion: 'Consulta Movimientos' },
          { id: 2, descripcion: 'Consulta Apuestas' },
          { id: 3, descripcion: 'Consulta Jugadores-Apuesta' },
          { id: 4, descripcion: 'Ver Boleto' },
          { id: 5, descripcion: 'Hacer Quiniela' },
          { id: 6, descripcion: 'Entra Hacer Pronostico Quiniela' },
          { id: 7, descripcion: 'Graba Pronostico Quiniela' },
          { id: 8, descripcion: 'Genera Resultado aleatorio Quiniela' },
          { id: 9, descripcion: 'Grabar Quiniela' },
          { id: 10, descripcion: 'Entrar Ingreso' },
          { id: 11, descripcion: 'Grabar Ingreso' },
          { id: 12, descripcion: 'Crear Apuesta' },
          { id: 13, descripcion: 'Ver Quiniela Final' },
          { id: 14, descripcion: 'Cerrar Apuesta' },
          { id: 15, descripcion: 'Finalizar Apuesta' },
          { id: 16, descripcion: 'Crear Usuario' },
          { id: 17, descripcion: 'Ver Resultados quin' },
          { id: 18, descripcion: 'Entra a Master Of Quin' },
          { id: 50, descripcion: 'rss' },
          { id: 999, descripcion: 'Entra PORRA' }
        ]
        ).then(function () {
        console.log('Base de datos Tipo_Accion inicializada');

        Tipo_Estado.count().then(function (count) {
          if (count === 0) {   // la tabla se inicializa solo si está vacía
            Tipo_Estado.bulkCreate(
              [
                { id: 0, descripcion: 'Abierta' },
                { id: 1, descripcion: 'Cerrada' },
                { id: 2, descripcion: 'Finalizada' },
              ]
              )
              .then(function () {
              console.log('Base de datos Tipo_Estado inicializada');
              Tipo_Movimiento.count().then(function (count) {
                if (count === 0) {   // la tabla se inicializa solo si está vacía
                  Tipo_Movimiento.bulkCreate(
                    [
                      { id: 0, descripcion: 'Ingreso' },
                      { id: 1, descripcion: 'Apuesta' },
                      { id: 2, descripcion: 'Ingreso Inicial' },
                      { id: 3, descripcion: 'Ingreso Manual' },
                      { id: 4, descripcion: 'Retirada. Manual' },
                      { id: 5, descripcion: 'Retirada Man. Baja' },
                      { id: 6, descripcion: 'Correccion Apu_13_02_2009' },
                      { id: 7, descripcion: 'Entra Ver Resultados Quiniela' },


                    ]
                    )
                    .then(function () { console.log('Base de datos Tipo_Movimiento inicializada') });
                };
              });
            })
          }
        });
      });

    }
  });





  Perfiles.count().then(function (count) {
    if (count === 0) {   // la tabla se inicializa solo si está vacía
      Perfiles.bulkCreate(
        [
          { id: 1, descripcion: 'publico' },
          { id: 2, descripcion: 'privado' },
          { id: 4, descripcion: 'admin' },

        ]
        ).then(function () {
        console.log('Base de datos Perfiles inicializada');
        Jugadores.count().then(function (count) {
          if (count === 0) {   // la tabla se inicializa solo si está vacía
            Jugadores.bulkCreate(
              [
                { id: 0, usu: 'jdesande', Nombre: 'Jose Aurelio de Sande Villarroel', activo: true, CorreoExterno: '', PerfileId: 4 },
                { id: 1, usu: 'aalonso', Nombre: 'Alberto Alonso Alonso', activo: true, CorreoExterno: '', PerfileId: 2 },
                { id: 2, usu: 'aaranzue', Nombre: 'Alberto Aranzueque González', activo: false, CorreoExterno: '', PerfileId: 2 },
                { id: 3, usu: 'aencinas', Nombre: 'Alberto Encinas Escobar', activo: true, CorreoExterno: 'carlosnavec@gmail.com', PerfileId: 2 },


              ]
              )
              .then(function () {
              console.log('Base de datos Jugadores inicializada');
              Saldos.count().then(function (count) {
                if (count === 0) {   // la tabla se inicializa solo si está vacía
                  Saldos.bulkCreate(
                    [
                      { JugadoreId: 0, saldo: 100 },
                      { JugadoreId: 1, saldo: 200 },
                      { JugadoreId: 2, saldo: 300 },
                      { JugadoreId: 3, saldo: 400 },

                    ]
                    )
                    .then(function () { console.log('Base de datos Saldos inicializada') });
                }
              });
            });
          }
        });

      });
    }
  });


  Apuestas.count().then(function (count) {
    if (count === 0) {   // la tabla se inicializa solo si está vacía
      Apuestas.bulkCreate(
        [
          { nombre: 'Apuesta1', apostado: 100, ganado: 200, IdEstado: 1 },


        ]
        )
        .then(function () { console.log('Base de datos Apuestas inicializada') });
    }
  });

});
