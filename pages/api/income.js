import Income from '../../models/Income';
import { apiAuthenticate } from '../../middleware/auth';
import { Op, literal } from 'sequelize';

// USE IN PRODUCTION TO PROTECT API ROUTES

export default async function income(req, res) {
    apiAuthenticate(req, res, async () => {
        switch (req.method) {
            case 'GET':
                return getIncome(req, res);
            case 'POST':
                return createIncome(req, res);
            case 'PUT':
                return updateIncome(req, res);
            case 'DELETE':
                return deleteIncome(req, res);
            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    });
}

// export default async function income(req, res) {
//     switch (req.method) {
//         case 'GET':
//             return getIncome(req, res);
//         case 'POST':
//             return createIncome(req, res);
//         case 'PUT':
//             return updateIncome(req, res);
//         case 'DELETE':
//             return deleteIncome(req, res);
//         default:
//             res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
//             res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }

export async function getIncome(req, res) {

    const { id, month, year} = req.query;
    const userID = req.user.user_id;
    let query = {
        where: {},
        order: [['date', 'DESC']]
    };

    if (userID) query.where.user_id = userID;
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
    };

    try {
        const expenses = await Income.findAll(query);
        if (expenses) {
            res.status(200).json(expenses);
        } else {
            res.status(404).json({ message: 'Income not found.' })
        }
    } catch (error) {
        console.error('Failed to fetch income data:', error);
        res.status(500).json({ message: 'Failed to retrieve income data.' });
    }
}

export async function createIncome(req, res) {
    try {
        const newIncome = await Income.create({
            description: req.body.description,
            date: req.body.date,
            amount: req.body.amount,
            user_id: req.user.user_id,
            account_id: req.user.account_id,
        });
        res.status(201).json(newIncome);
    } catch (error) {
        console.error('Failed to create income:', error);
        res.status(500).json({ message: 'Failed to create income.' });
    }
}

export async function updateIncome(req, res) {
    try {
        const { id } = req.query;
        const updateData = req.body;
        const result = await Income.update(updateData, {
            where: { id: id }
        });
        res.status(200).json(result);
    } catch (error) {
        console.error('Failed to update income:', error);
        res.status(500).json({ message: 'Failed to update income.' });
    }
}

export async function deleteIncome(req, res) {
    try {
        const { id } = req.query;
        const result = await Income.destroy({
            where: { id: id }
        });
        if (result > 0) {
            res.status(204).json({ message: 'Successfully deleted income.' });
        } else {
            res.status(404).json({ message: 'Income not found.' });
        }
    } catch (error) {
        console.error('Failed to delete income:', error);
        res.status(500).json({ message: 'Failed to delete income.' });
    }
}