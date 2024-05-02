const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Budget extends Model { }

Budget.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        amount: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                isDecimal: true
            }
        },
        account_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'account',
                key: 'id',
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'budget',
    }
);

module.exports = Budget;