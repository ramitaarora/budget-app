import { useState } from 'react';
import { useRouter } from 'next/router';

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
        <div>
            <form onSubmit={handleFormSubmit}>
                <p>Log In</p>
                <div>
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
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}