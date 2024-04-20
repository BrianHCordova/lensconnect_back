const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Specialties extends Model {}

Specialties.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        specialty: {
            type: DataTypes.STRING, // this will probably change from a string?
            allowNull: false,
            unique: true
        },
    },
    {
        sequelize,
    }
);

module.exports = Specialties;
