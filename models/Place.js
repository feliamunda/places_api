const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const uploader = require('./Uploader');
const slugify = require('../plugins/slugify');
const Visit = require('./Visit');
const placeSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  address:String,
  description:String,
  slug:{
    type:String,
    unique:true
  },
  acceptsCreditCard:{
    type:Boolean,
    default:false
  },
  coverImage: String,
  avatarImage: String,
  openHour:Number,
  closeHour:Number,
  _user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  }
});
placeSchema.methods.updateImage = function (path,imageType) {
  //Subir la imagen
  return uploader(path)
    .then(secure_url=>this.saveImageUrl(secure_url,imageType));
}
placeSchema.methods.saveImageUrl = function (secureUrl,imageType) {
  //Guardar el registro
  this[imageType+'Image'] = secureUrl;
  return this.save();
}
placeSchema.pre('save',function (next) {
  if(this.slug) return next();
  generateSlugAndContinue.call(this,0,next);
})
placeSchema.statics.validateSlugCount = function (slug){
  return Place.countDocuments({slug:slug}).then(count=>{
    if(count>0) return false;
    return true;
  });
}
placeSchema.virtual('visits').get(function(){
  return Visit.find({'_place':this._id}).sort('-id');
});
placeSchema.plugin(mongoosePaginate);
function generateSlugAndContinue(count,next){
  this.slug = slugify(this.title);
  if (count != 0)
    this.slug= this.slug + "-" + count;

  Place.validateSlugCount(this.slug).then(isValid=>{
    if(!isValid)
      return generateSlugAndContinue.call(this,count+1,next);
    next();
  })
}
let Place = mongoose.model('Place',placeSchema);
module.exports = Place;
