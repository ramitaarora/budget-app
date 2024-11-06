import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import User from '../../models/User';

export default async function getUsersByAccountID(req, res) {
    const { accountID } = req.query;
    let currentUserID;
    const query = { where: {} };

    if (accountID) {
        query.where.account_id = accountID;
    } else {
        const { auth_token } = cookie.parse(req.headers.cookie || '');

        if (!auth_token) {
            return res.status(401).json({ message: 'Authentication token missing' });
        }

        try {
            const decodedToken = jwt.verify(auth_token, process.env.JWT_SECRET);
            query.where.account_id = decodedToken.account_id;
            currentUserID = decodedToken.user_id;
        } catch (error) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
    }

    try {
        const users = await User.findAll(query);

        if (users && users.length > 0) {
            const filteredUsers = users
                .filter(user => user.id != currentUserID)
                .map(user => ({
                    first_name: user.first_name,
                    last_name: user.last_name
                }));

            res.status(200).json({
                accountInfo: filteredUsers
            });
        } else {
            res.status(404).json({ message: 'No users found for the given accountID.' });
        }
    } catch (error) {
        console.error('Failed to fetch users:', error);
        res.status(500).json({ message: 'Failed to retrieve users.' });
    }
}
