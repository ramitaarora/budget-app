import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export default async function Logout(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        res.setHeader('Set-Cookie', cookie.serialize('auth_token', '', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            expires: new Date(0),
            path: '/',
        }));
    
        res.json({ message: 'Logout successful' });
    } catch(err) {
        console.error(err);
    }

}