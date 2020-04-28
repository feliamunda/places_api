const paramsBuilder = require('./helpers').paramsBuilder;

const validParams = ['origins','name'];
const Application = require('../models/Application');

function index(req,res) {
  Application.find().then(applications=>{
    res.json(applications);
  }).catch(error=>{
    res.json({error})
  })
};
function find(req,res,next) {
  Application.findById(req.params.id).then(application=>{
    req.mainObj = application;
    req.app = application;
    next();
  }).catch(next);
};
function create(req,res) {
  let params = paramsBuilder(validParams,req.body);
  Application.create(params)
    .then(app=>{
      res.json(app);
    }).catch(err=>{
      console.log(err);
      res.status(422).json(err);
    })
};
function destroy(req,res) {
  req.app.remove().then(doc=>{
    res.json('Se elimino');
  }).catch(err=>{
    console.log(err);
    res.status(500).json(err);
  })
};

 module.exports = {find,create,destroy,index};
