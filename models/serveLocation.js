const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ServeLocation extends Model {}

ServeLocation.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        location: {
            type: DataTypes.STRING, // this will probably change from a string?
            allowNull: false
        },
    },
    {
        sequelize,
    }
);

module.exports = ServeLocation;
