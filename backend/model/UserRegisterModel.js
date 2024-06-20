const mongoose = require('mongoose');

const UserRegister = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    confirmpassword:{
        type:String,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model('userregister',UserRegister);