const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    User_name:String,
    Password:String
});

const mymodel = mongoose.model('Users',UserSchema);

module.exports = mymodel;