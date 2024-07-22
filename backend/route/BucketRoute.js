const express = require('express');
const router = express.Router();
const cont = require('../controller/BucketController');

router.post('/addnew',cont.addBucket);
router.get('/getBucket',cont.getBucket);


module.exports = router;