import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export async function authenticate(req) {
    if (!req.headers.cookie) {
        return { redirect: { destination: '/login', permanent: false } };
    }

    const cookies = cookie.parse(req.headers.cookie);
    const token = cookies.auth_token;

    if (!token) {
        return { redirect: { destination: '/login', permanent: false } };
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return { props: { user: decoded } };
    } catch (err) {
        return { redirect: { destination: '/login', permanent: false } };
    }
}

export async function authCheck(req) {
    const cookieHeader = req.headers.cookie;

    if (cookieHeader) {
        const cookies = cookie.parse(cookieHeader);
        const token = cookies.auth_token;

        if (token) {
            try {
                jwt.verify(token, process.env.JWT_SECRET);
                return { redirect: { destination: '/dashboard', permanent: false } };
            } catch (err) {
                console.error('Token verification failed:', err);
            }
        }
    }

    return { props: {} };
}