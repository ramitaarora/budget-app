import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import bcrypt from 'bcryptjs';
import User from '../../models/User';

export default async function addUser(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { first_name, last_name, email, password, location } = req.body;

    try {
        const { auth_token } = cookie.parse(req.headers.cookie || '');
        if (!auth_token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(auth_token, process.env.JWT_SECRET);
        const accountID = decoded.account_id;

        try {
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);

            const newUser = await User.create({
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: hashedPassword,
                location: location,
                account_id: accountID
            });

            res.status(201).json({ message: 'User created successfully', userId: newUser.id });
        } catch (error) {
            console.error('Error creating user:', error);
            if (error.name === 'SequelizeUniqueConstraintError') {
                res.status(409).json({ message: 'Email already exists' });
            } else {
                res.status(500).json({ message: 'Error registering new user', error: error.message });
            }
        }

    } catch (error) {
        console.error('Error decoding token:', error);
        return res.status(500).json({ message: 'Failed to decode token', error: error.message });
    }
}
