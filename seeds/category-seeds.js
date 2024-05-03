const sequelize = require('../config/connection');
const { Category } = require('../models');

const categoryData = [
    {
        name: "Food",
        parent_category: null,
        color: "blue",
        flexible: true,
        budget: 1000
    },
    {
        name: "Groceries",
        parent_category: 1,
        color: "blue",
        flexible: true,
        budget: 600
    },
    {
        name: "Restaurants",
        parent_category: 1,
        color: "blue",
        flexible: true,
        budget: 400
    },
    {
        name: "Rent",
        parent_category: null,
        color: "red",
        flexible: false,
        budget: 2500
    },
    {
        name: "Bills",
        parent_category: null,
        color: "green",
        flexible: true,
        budget: 500
    },
    {
        name: "Phone",
        parent_category: 5,
        color: "green",
        flexible: true,
        budget: 100
    },
    {
        name: "Water/Electricity",
        parent_category: 5,
        color: "green",
        flexible: true,
        budget: 200
    },
    {
        name: "Gas",
        parent_category: 5,
        color: "green",
        flexible: true,
        budget: 30
    },
    {
        name: "Transportation",
        parent_category: null,
        color: "yellow",
        flexible: true,
        budget: 700
    },
    {
        name: "Gas",
        parent_category: 9,
        color: "yellow",
        flexible: true,
        budget: 300
    },
    {
        name: "Car Payment",
        parent_category: 9,
        color: "yellow",
        flexible: true,
        budget: 400
    },
    {
        name: "Necessities",
        parent_category: null,
        color: "pink",
        flexible: true,
        budget: 500
    },
    {
        name: "Entertainment",
        parent_category: null,
        color: "black",
        flexible: true,
        budget: 100
    },
    {
        name: "Holidays/Gifts",
        parent_category: null,
        color: "orange",
        flexible: true,
        budget: 300
    },
    {
        name: "Medical",
        parent_category: null,
        color: "pink",
        flexible: true,
        budget: 100
    },
    {
        name: "Misc",
        parent_category: null,
        color: "purple",
        flexible: true,
        budget: 100
    }
];

const seedCategories = async () => {
    await sequelize.sync({ force: true });
    return Category.bulkCreate(categoryData);
};

seedCategories().then(() => {
    console.log('Categories seeded!');
    sequelize.close();
}).catch(error => {
    console.error('Failed to seed categories:', error);
    sequelize.close();
});