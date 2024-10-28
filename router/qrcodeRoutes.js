const express = require('express');
const { generateQRCode, groupIdcreate, register, getAllGroupIds } = require('../controller/whassapp.Controller');
const router = express.Router();

router.get('/generate', generateQRCode);
router.put('/groupIdcreate', groupIdcreate );
router.post('/register', register );
router.get('/getAllGroupIds', getAllGroupIds );




module.exports = router;
