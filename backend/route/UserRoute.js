const express = require('express');
const router = express.Router();
const cont = require('../controller/UserAuthController');

router.post('/usersignup',cont.userSignUp);

module.exports = router;