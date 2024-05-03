const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Chat extends Model {}

//chat will most likely use socket.io to send messages, so we will need to add a socket.io connection to the server.js file and then use that connection to send messages to the chat table

Chat.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'username'
            }
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize,
    }
);

module.exports = Chat;
