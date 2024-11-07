import User from '../../models/User';
import { apiAuthenticate } from '../../middleware/auth';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import bcrypt from 'bcryptjs';

// USE IN PRODUCTION TO PROTECT API ROUTES

export default async function users(req, res) {
    apiAuthenticate(req, res, async () => {
        switch (req.method) {
            case 'GET':
                return getUser(req, res);
            case 'PUT':
                return updateUser(req, res);
            case 'DELETE':
                return User(req, res);
            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    });
}

export async function getUser(req, res) {
    const { id } = req.query;
    const query = { where: {} };

    if (id) {
        query.where.id = id;
    } else {
        const { auth_token } = cookie.parse(req.headers.cookie || '');

        if (!auth_token) {
            return res.status(401).json({ message: 'Authentication token missing' });
        }

        try {
            const decodedToken = jwt.verify(auth_token, process.env.JWT_SECRET);
            query.where.id = decodedToken.user_id;
        } catch (error) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
    }

    try {
        const user = await User.findAll(query);

        if (user && user.length > 0) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found.' });
        }
    } catch (error) {
        console.error('Failed to fetch user:', error);
        res.status(500).json({ message: 'Failed to retrieve user.' });
    }
}

export async function updateUser(req, res) {
    const { id } = req.query;
    const query = { where: {} };

    if (id) {
        query.where.id = id;
    } else {
        const { auth_token } = cookie.parse(req.headers.cookie || '');

        if (!auth_token) {
            return res.status(401).json({ message: 'Authentication token missing' });
        }

        try {
            const decodedToken = jwt.verify(auth_token, process.env.JWT_SECRET);
            query.where.id = decodedToken.user_id;
        } catch (error) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
    }

    try {
        const updateData = req.body;

        const [updatedRows] = await User.update(updateData, query);

        if (updatedRows === 0) {
            return res.status(404).json({ message: 'User not found or no changes made.' });
        }

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Failed to update user:', error);
        res.status(500).json({ message: 'Failed to update user.' });
    }
}

export async function deleteUser(req, res) {
    try {
        const { id } = req.query;
        const result = await User.destroy({
            where: { id: id }
        });
        if (result > 0) {
            res.status(204).json({ message: 'Successfully deleted user.' });
        } else {
            res.status(404).json({ message: 'User not found.' });
        }
    } catch (error) {
        console.error('Failed to delete user:', error);
        res.status(500).json({ message: 'Failed to delete user.' });
    }
}