const Application = require('../models/Application');

module.exports = function (req,res,next) {
  if(req.application) return next();
  const applicationId = req.headers.application;
  if(!applicationId) return next();
  Application.findOne({applicationId})
    .then(app=>{
      if(!app) return next(new Error('Invalid application'));
      req.application = app;

      req.validRequest = req.application.origins.split(",").find(origin=>{
        origin = origin.replace(/\s/g,'');
        console.log(req.get('origin'));
        return origin == req.hostname
      })
      next();
    }).catch(error=>{
      next(error);
    })
};
