import Expenses from '../../models/Expenses';
import { apiAuthenticate } from '../../middleware/auth';

// USE IN PRODUCTION TO PROTECT API ROUTES

export default async function expenses(req, res) {
    apiAuthenticate(req, res, async () => {
        switch (req.method) {
            case 'GET':
                return getExpenses(req, res);
            case 'POST':
                return createExpense(req, res);
            case 'PUT':
                return updateExpense(req, res);
            case 'DELETE':
                return deleteExpense(req, res);
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

export async function getExpenses(req, res) {

    const { id, date, category_id } = req.query;
    const userID = req.user.user_id;
    let query = { where: {} };

    if (userID) query.where.user_id = userID;
    if (id) query.where.id = id;
    if (date) query.where.date = date;
    if (category_id) query.where.category_id = category_id;

    try {
        const expenses = await Expenses.findAll(query);
        if (expenses) {
            res.status(200).json(expenses);
        } else {
            res.status(404).json({ message: 'Expense not found.' })
        }
    } catch (error) {
        console.error('Failed to fetch expenses:', error);
        res.status(500).json({ message: 'Failed to retrieve expenses.' });
    }
}

export async function createExpense(req, res) {
    try {
        const newExpense = await Expenses.create({
            description: req.body.description,
            category_id: req.body.category_id,
            date: req.body.date,
            amount: req.body.amount,
            user_id: req.user.user_id
        });
        res.status(201).json(newExpense);
    } catch (error) {
        console.error('Failed to create expense:', error);
        res.status(500).json({ message: 'Failed to create expense.' });
    }
}

export async function updateExpense(req, res) {
    try {
        const { id } = req.query;
        const updateData = req.body;
        const result = await Expenses.update(updateData, {
            where: { id: id }
        });
        res.status(200).json(result);
    } catch (error) {
        console.error('Failed to update expense:', error);
        res.status(500).json({ message: 'Failed to update expense.' });
    }
}

export async function deleteExpense(req, res) {
    try {
        const { id } = req.query;
        const result = await Expenses.destroy({
            where: { id: id }
        });
        if (result > 0) {
            res.status(204).json({ message: 'Successfully deleted expense.' });
        } else {
            res.status(404).json({ message: 'Expense not found.' });
        }
    } catch (error) {
        console.error('Failed to delete expense:', error);
        res.status(500).json({ message: 'Failed to delete expense.' });
    }
}