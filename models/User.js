const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const bcrypt = require('bcrypt');

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

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
            }
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        account_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'account',
                key: 'id'
            },
            allowNull: true
        },
        profile_picture: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;