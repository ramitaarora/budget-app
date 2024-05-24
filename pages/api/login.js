import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import User from '../../models/User';

export default async function login(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Email was not found, please try again.' });
        };

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ message: "Error checking password." });
            }

            if (!isMatch) {
                return res.status(400).json({ message: 'Incorrect password, please try again.' });
            }

            const token = jwt.sign(
                { user_id: user.id, first_name: user.first_name, last_name: user.last_name, email: user.email, location: user.location, account_id: user.account_id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.setHeader('Set-Cookie', cookie.serialize('auth_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600,
                path: '/',
                sameSite: 'strict'
            }));

            res.status(200).json({ message: 'Login successful', userId: user.id });
        });

    } catch (err) {
        res.status(500).json(err);
    }
}