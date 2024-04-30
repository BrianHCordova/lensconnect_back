require("dotenv").config();
const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection')
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const multer = require('multer')
const http = require('http');
const cors = require('cors');

// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3000;
// const clientPORT = process.env.CLIENT_PORT || 3001;
const server = http.createServer(app);
app.use(cors());
const socketIO = require('socket.io')(server, {
	  cors: {
	origin: `*`,
  }
});

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

app.use(routes);

//we can move these to a separate file later
socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`)

  // socket.on('message', (data) => {
  //   console.log(`📩: ${JSON.stringify(data.ID)}: ${JSON.stringify(data.user)} says ${JSON.stringify(data.message)} at ${JSON.stringify(data.date)}`);
    
  //   //make a post request here to save the message to the database
  //   fetch('http://localhost:3000/api/chat', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     user_id: data.ID,
  //     username: data.user,
  //     message: data.message,
  //   }),
  //   });

  //   socketIO.emit('messageResponse', data);
  // });

  socket.on('disconnect', () => {
    console.log(`👋: ${socket.id} user just disconnected!`);
  });
});

socketIO.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('createRoom', (roomName) => {
    // Create a new room
    socket.join(roomName);
    console.log(`Room created: ${roomName} ==============================================`);
  });

  socket.on('message', (data) => {
    const { roomName, message } = data;
    socket.to(roomName).emit('messageResponse', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// sync sequelize models to the database, then turn on the server

//set to false to prevent server from restarting
sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log(`Now listening on port ${PORT}! ===================================`));
});