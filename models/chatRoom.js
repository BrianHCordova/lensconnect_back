const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ChatRoom extends Model {}

ChatRoom.init(
    {
        room_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_sender: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        user_receiver: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        }
    },
    {
        sequelize,
    }
);

module.exports = ChatRoom;