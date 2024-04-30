const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class TransactionReport extends Model { }

TransactionReport.init(
    {
        paid: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        voluntary: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        comment: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
    }
);

module.exports = TransactionReport;
