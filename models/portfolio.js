const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Portfolio extends Model {}

Portfolio.init(
    {
        image: {
            type: DataTypes.STRING, //this will be a URL
            allowNull: false
        },
    },
    {
        sequelize,
    }
);

module.exports = Portfolio;