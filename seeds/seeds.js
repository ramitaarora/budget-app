const sequelize = require('../config/connection');
const { Category, Expenses, Account, User, Budget } = require('../models');
const parentCategoryData = require('./parentCategoryData.json');
const childCategoryData = require('./childCategoryData.json');
const expensesData = require('./expensesData.json');
const accountData = require('./accountData.json');
const userData = require('./userData.json');
const budgetData = require('./budgetData.json');

const seedCategories = async () => {
    await sequelize.sync({ force: true });

    try {
        const account = await Account.bulkCreate(accountData, {
            individualHooks: true,
            returning: true,
        })

        const user = await User.bulkCreate(userData, {
            individualHooks: true,
            returning: true,
        })

        // const newBudgetData = budgetData.map((budget) => ({
        //     ...budget,
        //     date: new Date(budget.date)
        // }))

        // const budget = await Budget.bulkCreate(newBudgetData, {
        //     individualHooks: true,
        //     returning: true,
        // })

        // const parentCategories = await Category.bulkCreate(parentCategoryData, {
        //     individualHooks: true,
        //     returning: true,
        // })
        
        // const childCategories = await Category.bulkCreate(childCategoryData, {
        //     individualHooks: true,
        //     returning: true,
        // })

        // const newExpensesData = expensesData.map((expense) => ({
        //     ...expense,
        //     date: new Date(expense.date)
        // }));

        // const expenses = await Expenses.bulkCreate(newExpensesData, {
        //     individualHooks: true,
        //     returning: true,
        // });

    } catch(error) {
        console.log(error);
    }

};

seedCategories().then(() => {
    console.log('Categories seeded!');
    sequelize.close();
}).catch(error => {
    console.error('Failed to seed categories:', error);
    sequelize.close();
});