const express = require('express');
const router  = express.Router();

const AuthController = require('../controller/AuthController');

router.post('/token', AuthController.create);

module.exports = router;