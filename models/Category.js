const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/connection');

class Category extends Model { }

Category.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
        recurring: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        budget: {
            type: DataTypes.DECIMAL,
            allowNull: true,
            validate: {
                isDecimal: true
            }
        },
        parent_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'category',
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
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
        modelName: 'category',
    }
);

module.exports = Category;