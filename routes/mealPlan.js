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

		// const mealPlan = await getMealPlan(age, activeness, diet);

		const mealPlan = {
			meals: [
				{
					id: 746307,
					imageType: 'jpeg',
					title: 'Oatmeal Chocolate-Chip Peanut-Butter Banana Breakfast Cookies',
					readyInMinutes: 20,
					servings: 12,
					sourceUrl:
						'http://www.foodnetwork.com/recipes/oatmeal-chocolate-chip-peanut-butter-banana-breakfast-cookies.html'
				},
				{
					id: 1119090,
					imageType: 'jpg',
					title: 'Chicken Ramen Stir Fry',
					readyInMinutes: 25,
					servings: 4,
					sourceUrl: 'https://www.jocooks.com/recipes/chicken-ramen-stir-fry/'
				},
				{
					id: 1063181,
					imageType: 'jpeg',
					title: 'Easy Party Tartlets',
					readyInMinutes: 30,
					servings: 12,
					sourceUrl: 'https://hedihearts.com/easy-party-tartlets-recipe/'
				}
			],
			nutrients: {
				calories: 1200.02,
				protein: 58.4,
				fat: 65.43,
				carbohydrates: 106.13
			}
		};

		return res.render('mealPlan', { mealPlan });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
