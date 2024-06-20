const mongoose = require('mongoose');

const UserProfile = new mongoose.Schema({
    name:{
        type:String
    },
    username:{
        type:String
    },
    mobile:{
        type:String
    },
    address1:{
        type:String
    },
    address2:{
        type:String
    },
    landmark:{
        type:String
    },
    district:{
        type:String
    },
    state:{
        type:String
    },
    pincode:{
        type:String
    }
},{timestamps:true});

module.exports = mongoose.model('userprofile',UserProfile);