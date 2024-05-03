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

export async function apiAuth(handler) {
    return async (req, res) => {
        try {
            const { auth_token } = cookie.parse(req.headers.cookie || '');

            if (!auth_token) {
                return res.status(401).json({ message: "Not authenticated." });
            }

            const decoded = jwt.verify(auth_token, process.env.JWT_SECRET);
            req.user = decoded;

            return handler(req, res);
        } catch (err) {
            console.error(err);
            return res.status(401).json({ message: "Authentication failed." });
        }
    };
}