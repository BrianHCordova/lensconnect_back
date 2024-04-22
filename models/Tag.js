const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Tag extends Model {}

Tag.init(
    {
        tag: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize,
    }
);

module.exports = Tag;
