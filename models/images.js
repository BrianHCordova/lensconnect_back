const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Images extends Model {}

Images.init(
    {
        Id: {
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
        image: {
            type: DataTypes.STRING, //this will be a URL
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: 'images'
    }
);

module.exports = Images;