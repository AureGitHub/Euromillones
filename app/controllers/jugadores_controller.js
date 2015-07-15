var models = require('../models/models.js');
var LocalStrategy =   require('passport-local').Strategy;

module.exports = {
    
      findById: function(id) {
        
        models.Jugadores.find({
             where: {
                id: Number(id)
             }
        })
        .then(function(jugador) {
            if (jugador) {
                return jugador;
            } 
            else{return null;}
        }
        ).catch(function(error){return null});
        
    },
    
    
    findByUsername: function(username) {
        
        models.Jugadores.find({
             where: {
                 usu: username
             }
        })
        .then(function(jugador) {
            if (jugador) {
                return jugador;
            } 
            else{return null;}
        }
        ).catch(function(error){return null});
        
    },
    
    localStrategy: new LocalStrategy(
        function(username, password, done) {
            
            
             models.Jugadores.find({ where: {usu: username }})
              .then(function (user) {
                if (user !== null) {
                  console.log('[AUTH] Success with username: ' + user.username + ' and password (md5-hash): ' + user.password);
                  return done(null, user);
                }
                else {
                  console.log('[AUTH] Error with username: ' + username + ' and password:' + password);
                  return done(null, false);
                }
              })
            
/*
            var jugador = module.exports.findByUsername(username);

            if(!jugador) {
                done(null, false, { message: 'Incorrect username.' });
            }
            else if(jugador.password != username) { //PASSWORD!!!!!!!
                done(null, false, { message: 'Incorrect username.' });
            }
            else {
                return done(null, jugador);
            }*/

        }
    ),
    
    serializeUser: function(jugador, done) {
        done(null, jugador.id);
    },

    deserializeUser: function(id, done) {
        
        
          models.Jugadores.find({
             where: {
                id: Number(id)
             }
        })
        .then(function(jugador) {
            if (jugador) {
               done(null, jugador);
            } 
            else{done(null, false);}
        }
        ).catch(function(error){done(null, false)});
        
       /* 
        var jugador = module.exports.findById(id);

        if(jugador)    { done(null, jugador); }
        else        { done(null, false); }*/
    }
    

}