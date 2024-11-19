import { useState } from 'react';
import { useRouter } from 'next/router';
import { authCheck } from '../middleware/auth';
import Footer from '../components/footer';
import AddUser from '../components/add-user';
import HomepageHeader from '../components/homepage-header';

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

    return (
        <>
        <HomepageHeader />
        <main className="h-screen flex flex-col items-center justify-center fade-in max-sm:justify-start">
            <form id="login-form" onSubmit={handleFormSubmit} className="w-1/2 border border-zinc-500 rounded-md p-5 flex flex-col items-center justify-center shadow-md max-sm:w-full max-sm:border-none max-sm:shadow-none">
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
        </main>
        <Footer />
        </>
    )
}