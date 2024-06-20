const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const AdminLogin = new mongoose.Schema({
    username: {
        type:String
    },
    password: {
        type:String
    }
});

AdminLogin.methods.correctPassword = async function(dbpassword,enterpassword){
    return await bcrypt.compare(dbpassword,enterpassword);
};

module.exports = mongoose.model('Admin',AdminLogin);