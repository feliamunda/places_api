const mongoose = require('mongoose');
const dbName = 'places_api'
module.exports = {
  connect: ()=>mongoose.connect('mongodb://localhost/'+dbName),
  dbName:dbName,
  connection: ()=>{
    if(mongoose.connection)
      return connection;
    return mongoose.connect();
  }
};
