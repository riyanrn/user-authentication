const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.router');

// Use routes
router.use('/', authRoutes);

module.exports = router;