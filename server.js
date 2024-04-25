require("dotenv").config();
const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection')
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const multer = require('multer')
const cors = require('cors')

// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3000;

const sess = {
	secret: process.env.SESSION_SECRET,
	cookie: {},
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize,
	}),
};
app.use(session(sess));

const storage = multer.memoryStorage()
const upload = multer({storage: storage})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(routes);
// sync sequelize models to the database, then turn on the server

//set to false to prevent server from restarting
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}! ===================================`));
});