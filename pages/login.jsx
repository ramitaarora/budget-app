import { useState } from 'react';
import { useRouter } from 'next/router';
import { authCheck } from '../middleware/auth';
import AddUser from '../components/add-user';

export async function getServerSideProps(context) {
    return authCheck(context.req)
}

export default function Login() {

    const router = useRouter();

    const [formState, setFormState] = useState({ email: '', password: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const { email, password } = formState;

        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        if (res.ok) {
            setFormState({
                email: '',
                password: ''
            });
            router.push('/dashboard');
        } else if (!res.ok) {
            setFormState({
                ...formState,
                password: ''
            });
            alert('Failed to login. Please try again.');
        };
    };

    const demoLogin = async () => {
        try {
            const response = await fetch('/api/login-demo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response.ok) {
                router.push('/dashboard');
            } else if (!response.ok) {
                setFormState({
                    ...formState,
                    password: ''
                });
                alert('Failed to login to demo. Please try again later.');
            };
        } catch(err) {
            console.error(err)
        }
    }

    return (
        <main className="h-screen flex flex-col items-center justify-center">
            <form id="login-form" onSubmit={handleFormSubmit} className="w-1/2 border border-zinc-500 rounded-md p-5 flex flex-col items-center justify-center shadow-md">
                <p className="text-center text-xl">Log In</p>
                <div className="user-form">
                    <input
                        placeholder="Email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                    />
                    <input
                        placeholder="Password"
                        name="password"
                        type="password"
                        value={formState.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="user-submit">Submit</button>
            </form>
            <button onClick={demoLogin}>Login to Demo Dashboard</button>
        </main>
    )
}