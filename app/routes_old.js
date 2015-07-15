var models = require('./models/models.js');

function getQuizes(res){
	
	
	models.Quiz.findAll().then(function(quizes) {
       if (quizes) {
         res.json(quizes); 
       }
     }
   ).catch(function(error){
     console.log(error);
     	res.send(error)
     });

};


function getJugadores(res){
	
	
	models.Jugadores.findAll({
		include :[
			{model:models.Saldos},
			{model:models.Perfiles}
		]
		
	})
		.then(function(jugadores) {
       if (jugadores) {
         res.json(jugadores); 
       }
     }
   ).catch(function(error){
     console.log(error);
     	res.send(error)
     });

};


function getApuestas(res){
	
	
	models.Apuestas.findAll({
		include :[
			{model:models.Tipo_Estado}
		]
		
	})
		.then(function(apuestas) {
       if (apuestas) {
         res.json(apuestas); 
       }
     }
   ).catch(function(error){
     console.log(error);
     	res.send(error)
     });

};


module.exports = function(app) {

	app.get('/api/apuestas', function(req, res) {
		
		getApuestas(res);
	});

	app.get('/api/jugadores', function(req, res) {
		
		getJugadores(res);
	});

	// api ---------------------------------------------------------------------
	// get all todos
	app.get('/api/quizes', function(req, res) {

		
		getQuizes(res);
	});

	// create todo and send back all todos after creation
	app.post('/api/quizes', function(req, res) {
	
	console.log('Aaaaaaaaaa ' + req.body);
	
	 var quiz = models.Quiz.build(
	 		
    		{pregunta: req.body.pregunta, respuesta:req.body.respuesta, tema : req.body.tema}
  		);
  		
  		quiz
		  .validate()
		  .then(
		    function(err){
		      if (err) {
		        	res.send(err);
		      } else {
		        quiz // save: guarda en DB campos pregunta y respuesta de quiz
		        .save({fields: ["pregunta", "respuesta", "tema"]})
		        .then( function(){ getQuizes(res);})
		      }      // res.redirect: Redirección HTTP a lista de preguntas
		    }
		  );
  	

	});

	// delete a todo
	app.delete('/api/quizes/:quiz_id', function(req, res) {
		
		
		models.Quiz.find(
			{
             where: {
                 id: Number(req.params.quiz_id)
             }}).then(function(quiz) {
  			quiz.destroy().then(function() {
  				getQuizes(res);
  				
  			}).catch(function(error){
     			console.log(error);
     			res.send(error)
     	})
		});
	});
	
	
		// delete a todo
	app.delete('/api/jugadores/:jugador_id', function(req, res) {
		
		
		models.Jugadores.find(
			{
             where: {
                 id: Number(req.params.jugador_id)
             }}).then(function(jugador) {
  			jugador.destroy().then(function() {
  				getJugadores(res);
  				
  			}).catch(function(error){
     			console.log(error);
     			res.send(error)
     	})
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};
