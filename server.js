// set up ======================================================================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var port  	 = process.env.PORT || 8080; 				// set the port
var morgan   = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var passport  = require('passport');

var cookieParser   = require('cookie-parser');
var cookieSession   = require('cookie-session');
var session   = require('express-session');
var csrf = require('csurf');
var jugadores_controller = require('./app/controllers/jugadores_controller.js');




app.set('views', __dirname + '/public/views');
app.set('view engine', 'jade');
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(methodOverride()); // 
app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
app.use(cookieParser());
app.use(session(
    {
        secret: process.env.COOKIE_SECRET || "Superdupersecret"
    }));


var env = process.env.NODE_ENV || 'development';
if ('development' === env || 'production' === env) {
    app.use(csrf());
    app.use(function(req, res, next) {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        next();
    });
}


app.use(passport.initialize());
app.use(passport.session());

passport.use(jugadores_controller.localStrategy);

passport.serializeUser(jugadores_controller.serializeUser);
passport.deserializeUser(jugadores_controller.deserializeUser);


// routes ======================================================================
require('./app/routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App escuchando por el puerto  " + port);
