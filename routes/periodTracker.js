const express = require('express');
const isAuthenticated = require('../middleware/isAuthenticated');
const router = express.Router();

router.get('/', isAuthenticated, (req, res, next) => {
	return res.render('periodTracker');
});

module.exports = router;
