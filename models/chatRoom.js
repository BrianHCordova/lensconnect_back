const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ChatRoom extends Model {}

ChatRoom.init(
    {
        room_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // user_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: 'Users',
        //         key: 'id'
        //     }
        // },
        // username: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     references: {
        //         model: 'Users',
        //         key: 'username'
        //     }
        // }
    },
    {
        sequelize,
    }
);

module.exports = ChatRoom;