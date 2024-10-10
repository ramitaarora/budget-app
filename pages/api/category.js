import Category from '../../models/Category';
import { apiAuthenticate } from '../../middleware/auth';
import { Op, literal } from 'sequelize';

// USE IN PRODUCTION TO PROTECT API ROUTES

export default async function category(req, res) {
    apiAuthenticate(req, res, async () => {
        switch (req.method) {
            case 'GET':
                return getCategories(req, res);
            case 'POST':
                return createCategory(req, res);
            case 'PUT':
                return updateCategory(req, res);
            case 'DELETE':
                return deleteCategory(req, res);
            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    });
}

// export default async function category(req, res) {
//     switch (req.method) {
//         case 'GET':
//             return getCategories(req, res);
//         case 'POST':
//             return createCategory(req, res);
//         case 'PUT':
//             return updateCategory(req, res);
//         case 'DELETE':
//             return deleteCategory(req, res);
//         default:
//             res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
//             res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }

export async function getCategories(req, res) {
    const { id, month, year, recurring } = req.query;
    const accountID = req.user.account_id;
    let query = { where: {} };

    if (accountID) query.where.account_id = accountID;
    if (id) query.where.id = id;
    if (recurring) query.where.recurring = Boolean(recurring).valueOf();
    if (month && year) {
        query.where = {
            ...query.where,
            date: {
                [Op.and]: [
                    literal(`YEAR(date) = ${year}`),
                    literal(`MONTH(date) = ${month}`)
                ]
            }
        };
    }

    try {
        const category = await Category.findAll(query);
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ message: 'Category not found.' });
        }
    } catch (error) {
        console.error('Failed to fetch category:', error);
        res.status(500).json({ message: 'Failed to retrieve category.' });
    }
}

export async function createCategory(req, res) {
    try {
        const newCategory = await Category.create({
            name: req.body.name,
            parent_id: req.body.parent_id,
            recurring: req.body.recurring,
            budget: req.body.budget,
            account_id: req.user.account_id,
            date: req.body.date,
        });
        res.status(201).json(newCategory);
    } catch (error) {
        console.error('Failed to create category:', error);
        res.status(500).json({ message: 'Failed to create category.' });
    }
}

export async function updateCategory(req, res) {
    try {
        const { account, id } = req.query;
        const updateData = req.body;
        const result = await Category.update(updateData, {
            where: { 
                id: id,
                account_id: account,
            }
        });
        res.status(200).json(result);
    } catch (error) {
        console.error('Failed to update category:', error);
        res.status(500).json({ message: 'Failed to update category.' });
    }
}

export async function generateCategory(req, res) {
    const accountID = req.user.account_id;
    let query = { where: {} };
    if (accountID) query.where.account_id = accountID;
    query.where.recurring = true;

    try {
        const allCategories = await Category.findAll(query);
        if (allCategories) console.log(allCategories)

    } catch(error) {
        console.error('Failed to generate categories:', error);
        res.status(500).json({ message: 'Failed to generate categories.' })
    }
}

export async function deleteCategory(req, res) {
    try {
        const { id } = req.query;
        const result = await Category.destroy({
            where: { id: id }
        });
        if (result > 0) {
            res.status(200).json({ message: 'Successfully deleted.' });
        } else {
            res.status(404).json({ message: 'Category not found.' });
        }
    } catch (error) {
        console.error('Failed to delete category:', error);
        res.status(500).json({ message: 'Failed to delete category.' });
    }
}