const { Category } = require('../models');

const categoryData = [
    {
        name: 'Food'
    },
    {
        name: 'Rent'
    },
    {
        name: 'Bills'
    },
    {
        name: 'Transporation'
    },
    {
        name: 'Necessities'
    },
    {
        name: 'Entertainment'
    },
    {
        name: 'Holiday/Gifts'
    },
    {
        name: 'Medical'
    }
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;