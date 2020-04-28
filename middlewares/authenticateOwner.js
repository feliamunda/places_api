module.exports = function (req,res,next) {
  if(req.mainObj && (req.mainObj._user == req.user.id)) return next();

  next(new Error('You have not permissions to be here'));
};
