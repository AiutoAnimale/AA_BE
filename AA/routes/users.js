// routes/users.js
const express = require('express');
const { getUser } = require('../controllers/userController'); 

const router = express.Router();

router.get('/info', getUser); 
module.exports = router;
