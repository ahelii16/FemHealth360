const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const mongoose = require('mongoose');
const flash = require('connect-flash');
require('dotenv').config();

const router = require('./routes');
const { MONGODB, SESSION_SECRET } = require('./config/secrets');

const app = express();

// Connect to MongoDB database
mongoose.connect(MONGODB, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// Setup sessions
app.use(
	session({
		secret: SESSION_SECRET,
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
		resave: false,
		saveUninitialized: false
	})
);

// Setup EJS as view engine.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());

// Passport setup
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
