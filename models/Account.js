const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Account extends Model { }

Account.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'account',
    }
);

module.exports = Account;