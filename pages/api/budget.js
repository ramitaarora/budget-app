import Budget from '../../models/Budget';
import { apiAuthenticate } from '../../middleware/auth';
const { Op } = require('sequelize');

// USE IN PRODUCTION TO PROTECT API ROUTES

export default async function budget(req, res) {
    apiAuthenticate(req, res, async () => {
        switch (req.method) {
            case 'GET':
                return getBudget(req, res);
            case 'POST':
                return createBudget(req, res);
            case 'PUT':
                return updateBudget(req, res);
            case 'DELETE':
                return deleteBudget(req, res);
            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    });
}

// export default async function expenses(req, res) {
//     switch (req.method) {
//         case 'GET':
//             return getExpenses(req, res);
//         case 'POST':
//             return createExpense(req, res);
//         case 'PUT':
//             return updateExpense(req, res);
//         case 'DELETE':
//             return deleteExpense(req, res);
//         default:
//             res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
//             res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }

export async function getBudget(req, res) {

    const { id, month, year, category_id } = req.query;
    // const accountID = req.user.account_id;
    let query = {
        where: {}
    };

    // if (accountID) query.where.account_id = accountID;
    if (id) query.where.id = id;
    if (month && year) {
        // const integerMonth = Number(month);
        // const integerYear = Number(year);
        // const startDate = new Date(integerYear, integerMonth, 1);
        // query.where.date = startDate;
        const formattedMonth = String(parseInt(month) + 1).padStart(2, '0');
        const formattedDate = `${formattedMonth}-01-${year}`;
        console.log(formattedDate);
        console.log(typeof formattedDate);
        query.where.date = formattedDate;
    }
    if (category_id) query.where.category_id = category_id;

    try {
        const budget = await Budget.findAll(query);
        if (budget) {
            res.status(200).json(budget);
        } else {
            res.status(404).json({ message: 'Budget not found.' })
        }
    } catch (error) {
        console.error('Failed to fetch budget:', error);
        res.status(500).json({ message: 'Failed to retrieve budget.' });
    }
}

export async function createBudget(req, res) {
    console.log(req.user.user_id);
    try {
        const newBudget = await Budget.create({
            date: req.body.date,
            amount: req.body.amount,
            savings_goal: req.body.savings_goal,
            account: req.user.account_id
        });
        res.status(201).json(newBudget);
    } catch (error) {
        console.error('Failed to create budget:', error);
        res.status(500).json({ message: 'Failed to create budget.' });
    }
}

export async function updateBudget(req, res) {
    try {
        const { id } = req.query;
        const updateData = req.body;
        const result = await Budget.update(updateData, {
            where: { id: id }
        });
        res.status(200).json(result);
    } catch (error) {
        console.error('Failed to update budget:', error);
        res.status(500).json({ message: 'Failed to update budget.' });
    }
}

export async function deleteBudget(req, res) {
    try {
        const { id } = req.query;
        const result = await Budget.destroy({
            where: { id: id }
        });
        if (result > 0) {
            res.status(204).json({ message: 'Successfully deleted budget.' });
        } else {
            res.status(404).json({ message: 'Budget not found.' });
        }
    } catch (error) {
        console.error('Failed to delete budget:', error);
        res.status(500).json({ message: 'Failed to delete budget.' });
    }
}