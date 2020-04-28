const Application = require('../models/Application');

module.exports = function (options) {
  let AuthApp = function (req,res,next) {
    Application.count({}).then(appCount=>{
      if(appCount > 0 && !req.application) return next(new Error('An application is required to consume this API'))
      req.validApp=true;

      if(appCount > 0 && !req.validRequest) return next(new Error('Origin Invalid'))
      next();
    }).catch(next);
  };

  AuthApp.unless = require('express-unless');

  return AuthApp;
}
