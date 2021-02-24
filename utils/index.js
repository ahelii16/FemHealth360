const axios = require('axios');
const { SPOONACULAR_KEY } = require('../config/secrets');

const AGE_CALORIE_MAP = {
	baby: {
		sedentary: 1000,
		moderate: 1200,
		active: 1400
	},
	child: {
		sedentary: 1400,
		moderate: 1600,
		active: 1900
	},
	youngTeen: {
		sedentary: 1600,
		moderate: 1850,
		active: 2100
	},
	oldTeen: {
		sedentary: 1800,
		moderate: 2000,
		active: 2300
	},
	youngAdult: {
		sedentary: 2000,
		moderate: 2100,
		active: 2400
	},
	middleAge: {
		sedentary: 1800,
		moderate: 2000,
		active: 2200
	},
	old: {
		sedentary: 1600,
		moderate: 1800,
		active: 2100
	}
};

// Return target calories based on age and activity level
function getTargetCalories(age, activeness) {
	if (age >= 1 && age <= 3) {
		return AGE_CALORIE_MAP['baby'][activeness];
	} else if (age >= 4 && age <= 8) {
		return AGE_CALORIE_MAP['child'][activeness];
	} else if (age >= 9 && age <= 13) {
		return AGE_CALORIE_MAP['youngTeen'][activeness];
	} else if (age >= 14 && age <= 18) {
		return AGE_CALORIE_MAP['oldTeen'][activeness];
	} else if (age >= 19 && age <= 30) {
		return AGE_CALORIE_MAP['youngAdult'][activeness];
	} else if (age >= 31 && age <= 50) {
		return AGE_CALORIE_MAP['middleAge'][activeness];
	} else {
		return AGE_CALORIE_MAP['old'][activeness];
	}
}

// Function to get meal plan from Spoonacular API
async function getMealPlan(age, activeness, diet) {
	try {
		const targetCalories = getTargetCalories(age, activeness);

		const res = await axios.get(
			`https://api.spoonacular.com/mealplanner/generate?timeFrame=day&diet=${diet}&targetCalories=${targetCalories}&apiKey=${SPOONACULAR_KEY}`
		);

		return res.data;
	} catch (err) {
		// Because the free tier of spoonacular has very less monthly requests allowed
		// We are returning a response here in case the API limit is reached in deployed website
		return {
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
	}
}

module.exports = {
	getMealPlan
};
