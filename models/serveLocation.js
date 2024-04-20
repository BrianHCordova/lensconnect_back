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
