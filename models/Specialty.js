const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Specialty extends Model {}

Specialty.init(
    {
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

module.exports = Specialty;
