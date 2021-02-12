// Middleware to check if user is authenticated or not, else redirect to login page.
module.exports = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}

	return res.redirect('/user/login');
};
