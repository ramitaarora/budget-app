import Expenses from '../../models/Expenses';
import { apiAuthenticate } from '../../middleware/auth';
import { Op, literal } from 'sequelize';

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

    const { id, date, month, year, category_id, limit } = req.query;
    const accountID = req.user.account_id;
    let query = {
        where: {},
        order: [['date', 'DESC']]
    };

    if (limit) query.limit = parseInt(limit);

    if (accountID) query.where.account_id = accountID;
    if (id) query.where.id = id;
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
    console.log(req.user.user_id);
    try {
        const newExpense = await Expenses.create({
            description: req.body.description,
            category_id: Number(req.body.category_id),
            date: req.body.date,
            amount: Number(req.body.amount),
            user_id: req.user.user_id,
            account_id: req.user.account_id
        });
        res.status(201).json(newExpense);
    } catch (error) {
        console.error('Failed to create expense:', error);
        res.status(500).json({ message: 'Failed to create expense.' });
    }
}

// export async function updateExpense(req, res) {
//     try {
//         const { id } = req.query;
//         const updateData = req.body;
//         const result = await Expenses.update(updateData, {
//             where: { id: id }
//         });
//         res.status(200).json(result);
//     } catch (error) {
//         console.error('Failed to update expense:', error);
//         res.status(500).json({ message: 'Failed to update expense.' });
//     }
// }

export async function updateExpense(req, res) {
    const updates = Array.isArray(req.body) ? req.body : [req.body];

    try {
        const results = await Promise.all(updates.map(update => {
            const { id, ...updateData } = update;
            if (!id) {
                throw new Error("Missing ID in update data");
            }
            return Expenses.update(updateData, {
                where: { id }
            }).then(result => ({ id, updated: result[0] > 0 }));
        }));
        
        res.status(200).json(results);
    } catch (error) {
        console.error('Failed to update expenses:', error);
        res.status(500).json({ message: 'Failed to update expenses.', error: error.message });
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