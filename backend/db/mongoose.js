const mongoose = require('mongoose');

//customizing the default promise api
mongoose.Promise = global.Promise;
//connect to mongodb server
mongoose.connect('mongodb://localhost:27017/VibeHearApp',{ useNewUrlParser: true, useCreateIndex: true });

//export the mongoose object 
module.exports = {
    mongoose
}