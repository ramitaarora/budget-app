import db from '../../../db/connection';
import bcrypt from 'bcryptjs';
import User from '../../../models/User';

export default async function signup(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { first_name, last_name, email, password, location } = req.body;

    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = await User.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hashedPassword,
            location: location
            // Need to create an Account model and link
        });

        res.status(201).json({ message: 'User created successfully', userId: newUser.id });
    } catch (error) {
        console.error('Signup error:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(409).json({ message: 'Email already exists' });
        } else {
            res.status(500).json({ message: 'Error registering new user', error: error.message });
        }
    }
}