import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import User from '../../models/User';
import Account from '../../models/Account';

export default async function signup(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { first_name, last_name, email, password, location } = req.body;

    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newAccount = await Account.create();

        const newUser = await User.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            location,
            account_id: newAccount.id
        });

        const token = jwt.sign(
            { userId: newUser.id, first_name: newUser.first_name, last_name: newUser.last_name, email: newUser.email, location: newUser.location, account_id: newUser.account_id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.setHeader('Set-Cookie', cookie.serialize('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60,
            path: '/',
            sameSite: 'strict'
        }));

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