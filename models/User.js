const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class User extends Model { }

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isLongEnough: function (val) {
                    if (val.length < 8) {
                        throw new Error("Password must be at least 8 characters long")
                    }
                },
                hasNumber: function (val) {
                    if (!/\d/.test(val)) {
                        throw new Error("Password must contain at least one number");
                    }
                },
                hasSpecialCharacter: function (val) {
                    if (!/[!@#$%^&*(),.?":{}|<>]/.test(val)) {
                        throw new Error("Password must contain at least one special character");
                    }
                }
            },
            location: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;