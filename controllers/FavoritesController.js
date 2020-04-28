const paramsBuilder = require('./helpers').paramsBuilder;

const validParams = ['_place'];
const FavoritePlace = require('../models/FavoritePlace');
const User = require('../models/User');

function index(req,res) {
  if(!req.fullUser) return res.json({});
  req.fullUser.favorites.then(places=>{
    res.json(places);
  }).catch(err=>{
    res.json(err);
  })
};
function find(req,res,next) {
  FavoritePlace.findById(req.params.id).then(fav=>{
    req.mainObj = fav;
    req.favorite = fav;
    next();
  }).catch(next);
};
function create(req,res) {
  let params = paramsBuilder(validParams,req.body);
  params['_user'] = req.user.id;

  FavoritePlace.create(params)
    .then(doc=>{
      res.json(doc);
    }).catch(err=>{
      console.log(err);
      res.status(422).json(err);
    })
};
function destroy(req,res) {
  req.favorite.remove().then(doc=>{
    res.json('Se elimino');
  }).catch(err=>{
    console.log(err);
    res.status(500).json(err);
  })
};

 module.exports = {find,create,destroy,index};
