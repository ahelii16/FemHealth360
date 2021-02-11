const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const flash = require('connect-flash');
require('dotenv').config();

const router = require('./routes');
const { MONGODB, SESSION_SECRET } = require('./config/secrets');

const app = express();

mongoose.connect(MONGODB, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// authentication
const expressSession = require('express-session')({
	secret: SESSION_SECRET,
	resave: false,
	saveUninitialized: false
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession);
app.use(flash());

// Passport
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

// Setup local variables for templates
app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});

// Setup routes
app.use('/', router);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log('App listening on port ' + port));