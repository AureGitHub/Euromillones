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
var JugadorXApuesta = sequelize.import(path.join(__dirname, 'jugadorXapuesta'));

exports.Quiz = Quiz;

//REL JUGADORES x SALDOS
Saldos.belongsTo(Jugadores);
Jugadores.hasOne(Saldos);

//REL JUGADORES x PERFILES
Jugadores.belongsTo(Perfiles, { foreignKey: 'role' });
//Perfiles.hasMany(Jugadores);

//REL APUESTAS x ESTADO
Apuestas.belongsTo(Tipo_Estado, { foreignKey: 'IdEstado' });

//REL JugadorXApuesta x Jugador
JugadorXApuesta.belongsTo(Jugadores, { foreignKey: 'id_jugador' });
Jugadores.hasMany(JugadorXApuesta);

//REL JugadorXApuesta x Apuesta
JugadorXApuesta.belongsTo(Apuestas, { foreignKey: 'id_apuesta' });
Apuestas.hasMany(JugadorXApuesta);

exports.Jugadores = Jugadores;
exports.Saldos = Saldos;
exports.Perfiles = Perfiles;

exports.Tipo_Estado = Tipo_Estado;
exports.Tipo_Accion = Tipo_Accion;
exports.Tipo_Movimiento = Tipo_Movimiento;

exports.Apuestas = Apuestas;
exports.JugadorXApuesta = JugadorXApuesta;


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

                { id: 0, usu: 'jdesande', Nombre: 'Jose Aurelio de Sande Villarroel', activo: 1, CorreoExterno: 'aure.desande@gmail.com', role: 2 },
                { id: 1, usu: 'aalonso', Nombre: 'Alberto Alonso Alonso', activo: 1, CorreoExterno: '', role: 2 },
                { id: 2, usu: 'aaranzue', Nombre: 'Alberto Aranzueque González', activo: 0, CorreoExterno: '', role: 2 },
                { id: 3, usu: 'aencinas', Nombre: 'Alberto Encinas Escobar', activo: 1, CorreoExterno: '', role: 2 },
                { id: 4, usu: 'azani', Nombre: 'Alberto Zani Fernández', activo: 1, CorreoExterno: '', role: 2 },
                { id: 5, usu: 'aolazaba', Nombre: 'Alejandro Olazabal Bourdet', activo: 0, CorreoExterno: '', role: 2 },
                { id: 6, usu: 'aernest', Nombre: 'Alfred Ernest Rinaldi', activo: 1, CorreoExterno: '', role: 2 },
                { id: 7, usu: 'arobles', Nombre: 'Alvaro Robles Fernández', activo: 1, CorreoExterno: '', role: 2 },
                { id: 8, usu: 'ajimene1', Nombre: 'Ana Belén Jiménez González', activo: 0, CorreoExterno: '', role: 2 },
                { id: 9, usu: 'aarevalo', Nombre: 'Ana Mª Arevalo De La Cruz', activo: 0, CorreoExterno: '', role: 2 },
                { id: 10, usu: 'ccermeno', Nombre: 'Cayetana Cermeño Barona', activo: 0, CorreoExterno: '', role: 2 },
                { id: 11, usu: 'Cnavarre', Nombre: 'Carlos Navarrete', activo: 0, CorreoExterno: 'carlosnavec@gmail.com', role: 2 },
                { id: 12, usu: 'cretuert', Nombre: 'Cristina Retuerta León', activo: 1, CorreoExterno: '', role: 2 },
                { id: 13, usu: 'crodrig1', Nombre: 'Cristina Rodrigo Serrano', activo: 1, CorreoExterno: '', role: 2 },
                { id: 14, usu: 'dcepedal', Nombre: 'David Cepedal Fernández', activo: 0, CorreoExterno: '', role: 2 },
                { id: 15, usu: 'dsainz', Nombre: 'David Sainz Mera', activo: 1, CorreoExterno: '', role: 2 },
                { id: 16, usu: 'DiegoMorano', Nombre: 'Diego Morano Lobo', activo: 0, CorreoExterno: 'diegomorano@auna.com', role: 2 },
                { id: 17, usu: 'epacheco', Nombre: 'Elena Pacheco González', activo: 1, CorreoExterno: '', role: 2 },
                { id: 18, usu: 'esanche2', Nombre: 'Elena Sánchez Arribas', activo: 1, CorreoExterno: '', role: 2 },
                { id: 19, usu: 'ecruz', Nombre: 'Eusebio Cruz García', activo: 1, CorreoExterno: '', role: 2 },
                { id: 20, usu: 'fblanco1', Nombre: 'Fernando Blanco Oroz', activo: 0, CorreoExterno: 'byterider2006@gmail.com', role: 2 },
                { id: 21, usu: 'fmerelo', Nombre: 'Fernando Javier Merelo Rueda', activo: 1, CorreoExterno: '', role: 2 },
                { id: 22, usu: 'fsanche1', Nombre: 'Francisco José Sánchez Amador', activo: 1, CorreoExterno: 'horconboy@gmail.com', role: 2 },
                { id: 23, usu: 'gperez3', Nombre: 'Gabriel Pérez Sánchez', activo: 1, CorreoExterno: '', role: 2 },
                { id: 24, usu: 'gdeluis', Nombre: 'Gonzalo de Luis Martínez', activo: 1, CorreoExterno: '', role: 2 },
                { id: 25, usu: 'gcenjor', Nombre: 'Guillermo Cenjor Rodríguez', activo: 0, CorreoExterno: '', role: 2 },
                { id: 26, usu: 'IsmaelHern', Nombre: 'Ismael Hernandez', activo: 1, CorreoExterno: 'ismael.hernandez.fernandez@madrid.org', role: 2 },
                { id: 27, usu: 'jcastril', Nombre: 'Javier Castrillón Bodas', activo: 1, CorreoExterno: '', role: 2 },
                { id: 28, usu: 'jmonter2', Nombre: 'Jesús Manuel Montero Gullón', activo: 1, CorreoExterno: '', role: 2 },
                { id: 29, usu: 'jros', Nombre: 'Jesus Ros Selgas', activo: 0, CorreoExterno: '', role: 2 },
                { id: 30, usu: 'JesusGonzalez', Nombre: 'Jesus Gonzalez', activo: 1, CorreoExterno: 'JeGonzalez@magrama.es', role: 2 },
                { id: 31, usu: 'jjuara', Nombre: 'Jose Carlos Juara Palomino', activo: 1, CorreoExterno: '', role: 2 },
                { id: 32, usu: 'jgomez4', Nombre: 'José Francisco Gómez Martín', activo: 1, CorreoExterno: '', role: 2 },
                { id: 33, usu: 'jpanos', Nombre: 'José Ignacio Paños Fernandez', activo: 1, CorreoExterno: '', role: 2 },
                { id: 34, usu: 'jromero4', Nombre: 'José Manuel Romero Ibañez', activo: 0, CorreoExterno: '', role: 2 },
                { id: 35, usu: 'jgarrid1', Nombre: 'José Miguel Garrido Ballesteros', activo: 1, CorreoExterno: '', role: 2 },
                { id: 36, usu: 'jblanco3', Nombre: 'Juan Mª Blanco Llorente', activo: 1, CorreoExterno: '', role: 2 },
                { id: 37, usu: 'jfajardo', Nombre: 'Julio Fajardo Lazo', activo: 0, CorreoExterno: 'fajardoju@hotmail.com', role: 2 },
                { id: 38, usu: 'kzetel', Nombre: 'Karina Zetel', activo: 1, CorreoExterno: '', role: 2 },
                { id: 39, usu: 'Laura Vega', Nombre: 'Laura Vega', activo: 0, CorreoExterno: 'voyasalirenagrosfera@hotmail.com', role: 2 },
                { id: 40, usu: 'lsolis', Nombre: 'Lidia Solís Conde', activo: 1, CorreoExterno: '', role: 2 },
                { id: 41, usu: 'lretuert', Nombre: 'Lorenzo Retuerta León', activo: 1, CorreoExterno: '', role: 2 },
                { id: 42, usu: 'lmartin4', Nombre: 'Luis Martín Romero', activo: 0, CorreoExterno: '', role: 2 },
                { id: 43, usu: 'mgarci10', Nombre: 'Mª  Victoria García Martín', activo: 1, CorreoExterno: '', role: 2 },
                { id: 44, usu: 'mgonza17', Nombre: 'Mª Jesús González de la Rosa', activo: 1, CorreoExterno: '', role: 2 },
                { id: 45, usu: 'mzamarre', Nombre: 'Mª José Zamarreño Bueno', activo: 1, CorreoExterno: '', role: 2 },
                { id: 46, usu: 'mperez2', Nombre: 'Mª Luisa Pérez Ayuso', activo: 0, CorreoExterno: 'mperezayuso@gmail.com', role: 2 },
                { id: 47, usu: 'mmarti14', Nombre: 'Mª Soledad Martínez Cerezo', activo: 1, CorreoExterno: '', role: 2 },
                { id: 48, usu: 'mcuadra', Nombre: 'Manuel Francisco Cuadra García', activo: 1, CorreoExterno: '', role: 2 },
                { id: 49, usu: 'mmarti13', Nombre: 'Manuel Martínez Miralles', activo: 0, CorreoExterno: 'manumm11@hotmail.com', role: 2 },
                { id: 50, usu: 'mfrancia', Nombre: 'María Francia Hernández', activo: 1, CorreoExterno: '', role: 2 },
                { id: 51, usu: 'mvacas', Nombre: 'Mercedes Vacas Merino', activo: 1, CorreoExterno: 'mercedesvacas@gmail.com', role: 2 },
                { id: 52, usu: 'mpoveda', Nombre: 'Miguel Angel Poveda Mañosa', activo: 0, CorreoExterno: '', role: 2 },
                { id: 53, usu: 'mmorale1', Nombre: 'Miguel Morales García', activo: 0, CorreoExterno: '', role: 2 },
                { id: 54, usu: 'nzabalet', Nombre: 'Nekane Zabaleta Erostarbe', activo: 1, CorreoExterno: 'nekane.zabaleta@gmail.com', role: 2 },
                { id: 55, usu: 'nserra', Nombre: 'Nuria Serra Ramiro', activo: 1, CorreoExterno: '', role: 2 },
                { id: 56, usu: 'oserna', Nombre: 'Oscar Serna Serna', activo: 0, CorreoExterno: '', role: 2 },
                { id: 57, usu: 'prey', Nombre: 'Pelayo Rey Rodríguez', activo: 1, CorreoExterno: '', role: 2 },
                { id: 58, usu: 'ppato', Nombre: 'Pilar Pato Garrudo', activo: 1, CorreoExterno: '', role: 2 },
                { id: 59, usu: 'rcolomo', Nombre: 'Roberto Colomo Romero', activo: 0, CorreoExterno: '', role: 2 },
                { id: 60, usu: 'rmolina', Nombre: 'Rocío Molina Utrera', activo: 1, CorreoExterno: '', role: 2 },
                { id: 61, usu: 'racero', Nombre: 'Ruben Acero Herreros', activo: 0, CorreoExterno: '', role: 2 },
                { id: 62, usu: 'srecio', Nombre: 'Sara Recio García', activo: 0, CorreoExterno: '', role: 2 },
                { id: 63, usu: 'srodrig1', Nombre: 'Silvia Rodríguez Solano', activo: 1, CorreoExterno: '', role: 2 },
                { id: 64, usu: 'Susana Fernandez', Nombre: 'Susana Fernandez', activo: 0, CorreoExterno: 'sufers.es@gmail.com', role: 2 },
                { id: 65, usu: 'vormeno', Nombre: 'Vanesa Ormeño Elvar', activo: 0, CorreoExterno: '', role: 2 },
                { id: 66, usu: 'vrodrig3', Nombre: 'Vanessa Rodríguez de la Rosa', activo: 1, CorreoExterno: '', role: 2 },
                { id: 67, usu: 'vgomez1', Nombre: 'Víctor Gómez Gálvez', activo: 1, CorreoExterno: '', role: 2 },
                { id: 68, usu: 'Vanessa Baeza', Nombre: 'Vanessa Baeza', activo: 1, CorreoExterno: 'ismael.hernandez.fernandez@madrid.org', role: 2 },
                { id: 69, usu: 'bmunoz1', Nombre: 'Belen Muñoz', activo: 0, CorreoExterno: '', role: 2 },
                { id: 70, usu: 'eserrano', Nombre: 'Eva Serrano', activo: 1, CorreoExterno: '', role: 2 },
                { id: 71, usu: 'jmartin6', Nombre: 'Jose Javier Martín Carnes', activo: 0, CorreoExterno: '', role: 2 },
                { id: 72, usu: 'mgomez3', Nombre: 'Mª Angeles Gómez Leira', activo: 0, CorreoExterno: '', role: 2 },
                { id: 73, usu: 'calvare5', Nombre: 'Carlos Alvarez Beringola', activo: 0, CorreoExterno: '', role: 2 },
                { id: 74, usu: 'mmarti11', Nombre: 'Mª Carmen Martín Soria', activo: 1, CorreoExterno: '', role: 2 },
                { id: 75, usu: 'jgonza34', Nombre: 'Juan Pablo González Mier', activo: 0, CorreoExterno: '', role: 2 },
                { id: 76, usu: 'jmoreno4', Nombre: 'Jose Luis Moreno Barriga', activo: 1, CorreoExterno: '', role: 2 },
                { id: 77, usu: 'mferna27', Nombre: 'Miguel Ángel Fernández López', activo: 0, CorreoExterno: 'miguelangel.mfernandez@gmail.com', role: 2 },
                { id: 78, usu: 'sronda', Nombre: 'Salvador Manuel Ronda Gomez', activo: 1, CorreoExterno: '', role: 2 },
                { id: 79, usu: 'fcarmona', Nombre: 'Francisco Borja Carmona Castaño', activo: 0, CorreoExterno: '', role: 2 },
                { id: 80, usu: 'rmarti17', Nombre: 'Rubén Martínez García', activo: 0, CorreoExterno: '', role: 2 },
                { id: 81, usu: 'blopez5', Nombre: 'Beatriz López López', activo: 0, CorreoExterno: 'beitaninfa@hotmail.com', role: 2 },
                { id: 82, usu: 'jmarti39', Nombre: 'Javier Martín Roncero', activo: 0, CorreoExterno: 'jmarti135@gmail.com', role: 2 },
                { id: 83, usu: 'slaso', Nombre: 'Susana Laso', activo: 1, CorreoExterno: '', role: 2 },
                { id: 84, usu: 'mferna10', Nombre: 'Mª José Fernández Sanjuán', activo: 1, CorreoExterno: '', role: 2 },
                { id: 85, usu: 'agarci42', Nombre: 'Alejandro García Perez', activo: 0, CorreoExterno: '', role: 2 },
                { id: 86, usu: 'ivaldivi.ext', Nombre: 'Ignacio Valdivia Herrero', activo: 1, CorreoExterno: '', role: 2 },
                { id: 87, usu: 'rrubio4', Nombre: 'Ruben Rubio Iniesta', activo: 1, CorreoExterno: '', role: 2 },
                { id: 88, usu: 'mperez39', Nombre: 'Mª Soledad Pérez Pérez', activo: 0, CorreoExterno: '', role: 2 },
                { id: 89, usu: 'vastorga.ext', Nombre: 'Victor Astorga Acevedo', activo: 0, CorreoExterno: 'victorastace@hotmail.com', role: 2 },
                { id: 90, usu: 'aalvare9', Nombre: 'Angel Alvarez Cabrera', activo: 1, CorreoExterno: 'angealv@gmail.com', role: 2 },
                { id: 91, usu: 'asobrin1.ext', Nombre: 'Alvaro Sobrino Molina', activo: 0, CorreoExterno: 'alvaro.sobrinom@gmail.com', role: 2 },
                { id: 92, usu: 'rdefruto', Nombre: 'Raul De Frutos', activo: 0, CorreoExterno: '', role: 2 },
                { id: 93, usu: 'srebollo', Nombre: 'Sonia Rebollo Andrés', activo: 0, CorreoExterno: '', role: 2 },
                { id: 94, usu: 'rvillalb', Nombre: 'Rosa María Villalba Conde', activo: 0, CorreoExterno: '', role: 2 },
                { id: 95, usu: 'mredondo', Nombre: 'Mª Milagros Redondo González', activo: 1, CorreoExterno: '', role: 2 },
                { id: 96, usu: 'aiglesia', Nombre: 'Abraham de la Iglesia Cotillo', activo: 1, CorreoExterno: '', role: 2 },
                { id: 97, usu: 'cgarcia2', Nombre: 'Carlos García Rodríguez', activo: 1, CorreoExterno: '', role: 2 },
                { id: 98, usu: 'agarci37', Nombre: 'Alfredo García Calero', activo: 1, CorreoExterno: '', role: 2 },
                { id: 99, usu: 'mvizcain', Nombre: 'Manuel Vizcaíno Serrano', activo: 0, CorreoExterno: '', role: 2 },
                { id: 100, usu: 'rgomez6', Nombre: 'Rafael Gómez Del Prado', activo: 1, CorreoExterno: '', role: 2 },
                { id: 101, usu: 'pvillaca', Nombre: 'Pedro Villacañas Landrove', activo: 0, CorreoExterno: '', role: 2 },
                { id: 102, usu: 'rgomez8', Nombre: 'Raul Gomez Gonzalez', activo: 0, CorreoExterno: 'rguacamayo@yahoo.es', role: 2 },
                { id: 103, usu: 'scrg', Nombre: 'Sergio Crespo Granjo', activo: 0, CorreoExterno: '', role: 2 },
                { id: 104, usu: 'aperez11', Nombre: 'Agustín Pérez Vicente', activo: 0, CorreoExterno: 'agus_perez2002@yahoo.es', role: 2 },
                { id: 105, usu: 'mlopez16', Nombre: 'Marta Lopez De Zuazo Sanchez', activo: 1, CorreoExterno: '', role: 2 },
                { id: 106, usu: 'eescude1', Nombre: 'Esther Escudero Bayle', activo: 1, CorreoExterno: '', role: 2 },
                { id: 107, usu: 'gcastane', Nombre: 'Gerardo Castañer Villaluenga', activo: 1, CorreoExterno: '', role: 2 },
                { id: 108, usu: 'ialmansa', Nombre: 'Isabela Almansa De Lara', activo: 1, CorreoExterno: '', role: 2 },
                { id: 109, usu: 'yfs', Nombre: 'Yolanda Fernandez Sanmames', activo: 1, CorreoExterno: '', role: 2 },


              ]
              )
              .then(function () {
              console.log('Base de datos Jugadores inicializada');
              Saldos.count().then(function (count) {
                if (count === 0) {   // la tabla se inicializa solo si está vacía
                  Saldos.bulkCreate(
                    [
                      { JugadoreId: 0, saldo: 10.68 },
                      { JugadoreId: 1, saldo: 20.73 },
                      { JugadoreId: 2, saldo: 0 },
                      { JugadoreId: 3, saldo: 9.54 },
                      { JugadoreId: 4, saldo: 9.58 },
                      { JugadoreId: 5, saldo: 0.49 },
                      { JugadoreId: 6, saldo: 9.54 },
                      { JugadoreId: 7, saldo: 9.8 },
                      { JugadoreId: 8, saldo: 0.42 },
                      { JugadoreId: 9, saldo: -0.01 },
                      { JugadoreId: 10, saldo: -0.01 },
                      { JugadoreId: 11, saldo: -0.01 },
                      { JugadoreId: 12, saldo: 7.23 },
                      { JugadoreId: 13, saldo: 10.17 },
                      { JugadoreId: 14, saldo: 0.9 },
                      { JugadoreId: 15, saldo: 2.97 },
                      { JugadoreId: 16, saldo: 0 },
                      { JugadoreId: 17, saldo: 6.93 },
                      { JugadoreId: 18, saldo: 15.79 },
                      { JugadoreId: 19, saldo: 1.28 },
                      { JugadoreId: 20, saldo: 0.55 },
                      { JugadoreId: 21, saldo: 8.84 },
                      { JugadoreId: 22, saldo: 13.43 },
                      { JugadoreId: 23, saldo: 4.15 },
                      { JugadoreId: 24, saldo: 20.88 },
                      { JugadoreId: 25, saldo: 0.73 },
                      { JugadoreId: 26, saldo: 10.19 },
                      { JugadoreId: 27, saldo: 4.23 },
                      { JugadoreId: 28, saldo: 12.78 },
                      { JugadoreId: 29, saldo: -0.01 },
                      { JugadoreId: 30, saldo: 14.23 },
                      { JugadoreId: 31, saldo: 10.04 },
                      { JugadoreId: 32, saldo: 11.23 },
                      { JugadoreId: 33, saldo: 9.6 },
                      { JugadoreId: 34, saldo: -0.01 },
                      { JugadoreId: 35, saldo: 14.23 },
                      { JugadoreId: 36, saldo: 9.93 },
                      { JugadoreId: 37, saldo: 0 },
                      { JugadoreId: 38, saldo: 2.23 },
                      { JugadoreId: 39, saldo: -0.01 },
                      { JugadoreId: 40, saldo: 11.76 },
                      { JugadoreId: 41, saldo: 7.23 },
                      { JugadoreId: 42, saldo: -0.01 },
                      { JugadoreId: 43, saldo: 6.79 },
                      { JugadoreId: 44, saldo: 8.9 },
                      { JugadoreId: 45, saldo: 8.42 },
                      { JugadoreId: 46, saldo: 0 },
                      { JugadoreId: 47, saldo: 55.54 },
                      { JugadoreId: 48, saldo: 3.47 },
                      { JugadoreId: 49, saldo: 0.74 },
                      { JugadoreId: 50, saldo: 7.6 },
                      { JugadoreId: 51, saldo: 7.58 },
                      { JugadoreId: 52, saldo: 0.48 },
                      { JugadoreId: 53, saldo: 0.39 },
                      { JugadoreId: 54, saldo: 2.23 },
                      { JugadoreId: 55, saldo: 7.78 },
                      { JugadoreId: 56, saldo: 0 },
                      { JugadoreId: 57, saldo: 7.23 },
                      { JugadoreId: 58, saldo: 8.4 },
                      { JugadoreId: 59, saldo: -0.01 },
                      { JugadoreId: 60, saldo: 4.23 },
                      { JugadoreId: 61, saldo: -0.01 },
                      { JugadoreId: 62, saldo: 0.61 },
                      { JugadoreId: 63, saldo: 5.23 },
                      { JugadoreId: 64, saldo: 0.15 },
                      { JugadoreId: 65, saldo: 0.27 },
                      { JugadoreId: 66, saldo: 6.98 },
                      { JugadoreId: 67, saldo: 10.61 },
                      { JugadoreId: 68, saldo: 10.26 },
                      { JugadoreId: 69, saldo: -0.01 },
                      { JugadoreId: 70, saldo: 3.25 },
                      { JugadoreId: 71, saldo: 0 },
                      { JugadoreId: 72, saldo: 0 },
                      { JugadoreId: 73, saldo: 0.68 },
                      { JugadoreId: 74, saldo: 3.29 },
                      { JugadoreId: 75, saldo: 0.21 },
                      { JugadoreId: 76, saldo: 6.69 },
                      { JugadoreId: 77, saldo: 0.44 },
                      { JugadoreId: 78, saldo: 1.96 },
                      { JugadoreId: 79, saldo: 0.74 },
                      { JugadoreId: 80, saldo: 0 },
                      { JugadoreId: 81, saldo: 0.92 },
                      { JugadoreId: 82, saldo: 0.08 },
                      { JugadoreId: 83, saldo: 46.89 },
                      { JugadoreId: 84, saldo: 14.58 },
                      { JugadoreId: 85, saldo: 0 },
                      { JugadoreId: 86, saldo: 1.16 },
                      { JugadoreId: 87, saldo: 1.16 },
                      { JugadoreId: 88, saldo: 0.51 },
                      { JugadoreId: 89, saldo: 0.61 },
                      { JugadoreId: 90, saldo: 35.49 },
                      { JugadoreId: 91, saldo: 0.41 },
                      { JugadoreId: 92, saldo: 0.18 },
                      { JugadoreId: 93, saldo: 0.26 },
                      { JugadoreId: 94, saldo: 0.85 },
                      { JugadoreId: 95, saldo: 13.93 },
                      { JugadoreId: 96, saldo: 4.98 },
                      { JugadoreId: 97, saldo: 8.31 },
                      { JugadoreId: 98, saldo: 6.98 },
                      { JugadoreId: 99, saldo: 0.73 },
                      { JugadoreId: 100, saldo: 4.32 },
                      { JugadoreId: 101, saldo: 0 },
                      { JugadoreId: 102, saldo: 0.48 },
                      { JugadoreId: 103, saldo: 0.67 },
                      { JugadoreId: 104, saldo: 0.31 },
                      { JugadoreId: 105, saldo: 11.34 },
                      { JugadoreId: 106, saldo: 11.34 },
                      { JugadoreId: 107, saldo: 27.23 },
                      { JugadoreId: 108, saldo: 12.23 },
                      { JugadoreId: 109, saldo: 14.98 },

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
