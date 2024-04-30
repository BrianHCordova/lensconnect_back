const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ServeLocation extends Model {}

ServeLocation.init(
    {
        location: {
            type: DataTypes.STRING, // this will probably change from a string?
            allowNull: false,
            // unique: true
        },
    },
    {
        sequelize,
    }
);

module.exports = ServeLocation;
