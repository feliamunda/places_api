const User = require('../models/User');
const paramsBuilder = require('./helpers').paramsBuilder;
const validParams = ['email','name','password'];

function create(req,res,next) {
  let params = paramsBuilder(validParams,req.body);
  User.create(params)
    .then(user=>{
      req.user=user;
      next();
    }).catch(err=>{
      console.log(err);
      res.json(err);
    })
};
function myPlaces(req,res) {
  User.findOne({'_id':req.user.id}).then(user=>{
    user.places.then(places=>{
      res.json(places);
    }).catch(err=>{
      res.json(err);
    })
  })
}
module.exports = {create,myPlaces};
