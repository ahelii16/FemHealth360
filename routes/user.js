const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();

router.get('/login', (req, res, next) => {
	return res.render('login');
});

router.get('/signup', (req, res, next) => {
	return res.render('signup');
});

router.post(
	'/login',
	passport.authenticate('local', { failureRedirect: '/user/login', failureFlash: true }),
	function (req, res) {
		res.redirect('/dashboard');
	}
);

router.post('/signup', async (req, res, next) => {
	try {
		const { email, name, password, dob, activeness, diet } = req.body;
		console.log(req.body);
		const userExists = await User.findOne({ email });

		if (userExists) {
			req.flash('error', 'User with this email already exists');

			return res.redirect('/user/signup');
		}

		const user = new User({
			email,
			name,
			password,
			dob,
			diet,
			activeness
		});

		await user.save();

		req.logIn(user, (err) => {
			if (err) {
				return next(err);
			}

			return res.redirect('/dashboard');
		});
	} catch (err) {
		console.log(err);
		req.flash('error', 'Some error occurred');
		return res.redirect('/user/signup');
	}
});

router.get('/logout', (req, res, next) => {
	req.logout();
	return res.redirect('/');
});

module.exports = router;
