const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/userController');

// Define a route
router.get('/', getUsers);

module.exports = router;
