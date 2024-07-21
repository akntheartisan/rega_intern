const express = require('express');
const router = express.Router();
const cont = require('../controller/BucketController');

router.post('/addnew',cont.addBucket);


module.exports = router;