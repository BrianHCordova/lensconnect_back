const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        },
        isPhotographer: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        lastOnline: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        onlineStatus: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        biography: {
            type: DataTypes.STRING,
            allowNull: true
        },
        //this is a string for now, but could change to a nested table
        specialties: {
            type: DataTypes.STRING,
            allowNull: true
        },
        areaOfService: {
            type: DataTypes.STRING,
            allowNull: true
        },
    },
    {
        sequelize
    }
);

module.exports = User;