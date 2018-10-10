const mongoose = require('mongoose');

// what is this?
mongoose.promise = global.promise;

// const uris = 'mongodb://localhost:27017/TodoApp';

mongoose.connect(process.env.MONGODB_URI , { useNewUrlParser: true } );

module.exports = {mongoose};