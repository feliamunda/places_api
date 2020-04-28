const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/secrets').jwtSecret;
const User = require('../models/User');

function authenticate(req,res,next){
  User.findOne({email:req.body.email})
    .then(user=>{
      user.verifyPassword(req.body.password)
        .then(valid=>{
          if(valid){
            req.user = user;
            next();
          }else{
            next(new Error('Invalid Credentials'));
          }
        })
    }).catch(error=>next(error));
}
function generateToken(req,res,next) {
  if(!req.user) return next();
  req.token = jwt.sign({id:req.user._id},jwtSecret);
  next();
}
function sendToken(req,res) {
  if(req.user){
    res.json({
      user: req.user,
      jwt:req.token
    })
  }else{
    next(new Error('Could not create user'));
  }
}
module.exports = {generateToken,sendToken,authenticate};
