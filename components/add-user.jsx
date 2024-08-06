import { useState } from 'react';

export default function AddUser() {

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

        const res = await fetch('/api/adduser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ first_name, last_name, email, password, location })
        });
    };

    return (
        <div className="m-3 flex flex-col items-center justify-center">
            <form onSubmit={handleFormSubmit} className="w-1/2 border border-zinc-500 rounded-md p-5 flex flex-col items-center justify-center shadow-md">
                <p className="text-center text-xl">Add Additional User</p>
                <div className="user-form">
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
                <button type="submit" className="user-submit">Save</button>
            </form>
        </div>
    )
}