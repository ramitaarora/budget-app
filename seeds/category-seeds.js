const sequelize = require('../config/connection');
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