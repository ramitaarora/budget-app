const Budget = require('./Budget');
const Category = require('./Category');
const Expenses = require('./Expenses');
const Income = require('./Income');
const User = require('./User');

Category.hasMany(Category, {
    as: 'children',
    foreignKey: 'parent_category'
});

Category.belongsTo(Category, {
    as: 'parent',
    foreignKey: 'parent_category'
});

Category.hasMany(Budget, {
    foreignKey: 'category_id',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
});

Budget.belongsTo(Category, {
    foreignKey: 'category_id'
});

Category.hasMany(Expenses, {
    foreignKey: 'category_id',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
});

Expenses.belongsTo(Category, {
    foreignKey: 'category_id'
});

module.exports = {
    Budget,
    Category,
    Expenses,
    Income,
    User,
};