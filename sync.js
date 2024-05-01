const sequelize = require('./config/connection');
const User = require('./models/User');
const Income = require('./models/Income');
const Expenses = require('./models/Expenses');
const Category = require('./models/Category');
const Budget = require('./models/Budget');
const Account = require('./models/Account');

const createTables = async () => {
    await sequelize.sync({ force: true });
    console.log('All models were synchronized successfully.');
}

createTables();