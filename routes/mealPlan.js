const express = require('express');
const isAuthenticated = require('../middleware/isAuthenticated');
const User = require('../models/User');
const { getMealPlan } = require('../utils');
const router = express.Router();

router.get('/', isAuthenticated, async (req, res, next) => {
	try {
		const user = await User.findById(req.user.id);
		const { activeness, diet } = user;
		const age = user.calculateAge();

		const mealPlan = await getMealPlan(age, activeness, diet);

		return res.render('mealPlan', { mealPlan });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
