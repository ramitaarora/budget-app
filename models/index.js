const Budget = require('./Budget');
const Category = require('./Category');
const Expenses = require('./Expenses');
const Income = require('./Income');
const User = require('./User');
const Account = require('./Account');

Account.hasMany(User, {
    foreignKey: 'users',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
});

User.belongsTo(Account, {
    foreignKey: 'users'
});

Category.hasMany(Category, {
    as: 'children',
    foreignKey: 'parent_category'
});

Category.belongsTo(Category, {
    as: 'parent',
    foreignKey: 'parent_category'
});

// Category.hasMany(Budget, {
//     foreignKey: 'category_id',
//     onDelete: 'SET NULL',
//     onUpdate: 'CASCADE'
// });

// Budget.belongsTo(Category, {
//     foreignKey: 'category_id'
// });

Category.hasMany(Expenses, {
    foreignKey: 'category_id',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
});

Expenses.belongsTo(Category, {
    foreignKey: 'category_id'
});

Category.belongsTo(Account, {
    foreignKey: 'account_id'
});

Budget.belongsTo(Account, {
    foreignKey: 'account_id'
});

Expenses.belongsTo(User, {
    foreignKey: 'user_id'
});

Income.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = {
    Budget,
    Category,
    Expenses,
    Income,
    User,
    Account,
};