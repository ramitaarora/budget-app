import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function Signup() {

    const [formState, setFormState] = useState({ first_name: '', last_name: '', email: '', password: '', location: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const { first_name, last_name, email, password, location } = formState;

        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ first_name, last_name, email, password, location })
        });

        if (res.ok) {
            signIn('credentials', { email, password });
        }
    };

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <p>Create New Account</p>
                <div>
                    <input
                        placeholder="First Name"
                        name="first_name"
                        type="text"
                        value={formState.first_name}
                        onChange={handleChange}
                    />
                    <input
                        placeholder="Last Name"
                        name="last_name"
                        type="text"
                        value={formState.last_name}
                        onChange={handleChange}
                    />
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
                    <input
                        placeholder="Location"
                        name="location"
                        type="text"
                        value={formState.location}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Sign Me Up!</button>
            </form>
        </div>
    )
}