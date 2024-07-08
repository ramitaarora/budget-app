import Budget from '../../models/Budget';
import { apiAuthenticate } from '../../middleware/auth';

export default async function budget(req, res) {
    apiAuthenticate(req, res, async () => {
        switch (req.method) {
            case 'GET':
                return getBudgets(req, res);
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

export async function getBudgets(req, res) {

    const { id } = req.query;
    const accountID = req.user.account_id;
    let query = { where: {} };

    if (accountID) query.where.account_id = accountID;
    if (id) query.where.id = id;

    try {
        const budget = await Budget.findAll(query);
        if (budget) {
            res.status(200).json(budget);
        } else {
            res.status(404).json({ message: 'Budget not found.' });
        }
    } catch (error) {
        console.error('Failed to fetch budget:', error);
        res.status(500).json({ message: 'Failed to retrieve budget.' });
    }
}