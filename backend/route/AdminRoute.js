const express = require('express');
const router = express.Router();
const cont = require('../controller/AdminLoginController');


router.post('/signin',cont.adminsignin);
router.get('/authuser',cont.protect,(req,res)=>{
    res.status(200).json({
        status:'success',
        user:req.user
    });
});

router.post('/passwordupdate',cont.passwordUpdate);
router.post('/logout',cont.logout);


module.exports = router;