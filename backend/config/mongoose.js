const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://rahilshukla3:bgtq5TQiAgfyZJrY@cluster0.eomq8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to mongodb'));

db.once('open',function(){
    console.log('Connected to database :: MongoDB')
})


module.exports = db;
