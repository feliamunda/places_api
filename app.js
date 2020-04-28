var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const jwtMiddleware= require('express-jwt');
const jwtSecret = require('./config/secrets').jwtSecret;

const placesRoutes = require('./routes/places');
const usersRoutes = require('./routes/users');
const sessionsRoutes = require('./routes/sessions');
const favoritesRoutes = require('./routes/favorites');
const visitsRoutes = require('./routes/visits');
const visitPlacesRoutes = require('./routes/visitPlaces');
const applicationsRoutes = require('./routes/applications');

const findAppBySecret = require('./middlewares/findAppBySecret');
const findAppByApplicationId = require('./middlewares/findAppByApplicationId');
const authApp = require('./middlewares/authApp')();
const allowCORs = require('./middlewares/allowCORs')();

const db = require('./config/database');
var app = express();
db.connect();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(findAppBySecret);
app.use(findAppByApplicationId);
app.use(authApp.unless({method:'OPTIONS'}));
app.use(allowCORs.unless({path:'/public'}));

app.use(jwtMiddleware({secret:jwtSecret})
  .unless({
    path:['/sessions','/users'],
    method:['GET','OPTIONS']
  }));

app.use('/places', placesRoutes);
app.use('/places',visitPlacesRoutes);
app.use('/users', usersRoutes);
app.use('/sessions', sessionsRoutes);
app.use('/favorites', favoritesRoutes);
app.use('/visits', visitsRoutes);
app.use('/apps', applicationsRoutes);



// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.json('error');
// });

module.exports = app;
