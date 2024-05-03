require("dotenv").config();
const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection')
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const multer = require('multer')
const http = require('http');
const cors = require('cors');
const { log } = require("console");

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

socketIO.on('connection', (socket) => {

  socket.on('joinRoom', (room, userId, id) => {

    console.log(`🚪: ${userId} joined room ${room} with ${id}`);
    //TODO: create logic to check if user and receiver exist
    //check to see if room exists
    fetch(`http://localhost:3000/api/chatroom/room/${room}`)
      .then(response => response.json())
      .then(data => {
        //if exists, join room
        if (data) {
          socket.join(room);
          //else, create room and join
        } else {
          fetch('http://localhost:3000/api/chatroom', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              room_name: room,
              user_sender: userId,
              user_receiver: id
            }),
          })
          .then(response => response.json())
          .then(data => {
            socket.join(data.room);
          });
        }
      });
    socket.join(room);
  });

  socket.on('message', (data) => {
    {
      
      console.log(`📩: ${JSON.stringify(data.user)} says ${JSON.stringify(data.message)}`);
          //   // make a post request here to save the message to the database
      fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: data.ID,
        username: data.user,
        message: data.message,
        ChatRoomId: data.ChatRoomId
      }),
      });
      socket.emit('messageResponse', data);
      // socket.to(roomValue.room).emit('messageResponse', data);
    }
  });


    socket.on('disconnect', () => {
      console.log(`👋: ${socket.id} user just disconnected!`);
    });
})

// sync sequelize models to the database, then turn on the server

//set to false to prevent server from restarting
sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log(`Now listening on port ${PORT}! ===================================`));
});