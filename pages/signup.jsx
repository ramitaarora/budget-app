import { useState } from 'react';

export default function Signup() {

    const [formState, setFormState] = useState({ firstName: '', lastName: '', email: '', password: '', location: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log('Signing up');
    
        const { firstName, lastName, email, password, location } = formState;
    
        if (firstName && lastName && email && password && location) {
            try {
                const response = await fetch('/api/user/signup', {
                    method: 'POST',
                    body: JSON.stringify({ firstName, lastName, email, password, location }),
                    headers: { 'Content-Type': 'application/json' },
                });
    
                if (response.ok) {
                    const data = await response.json();
                    console.log('Signup successful:', data);
                    document.location.replace('/');
                    setFormState({
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        location: '',
                    });
                } else {
                    const errorData = await response.json();
                    alert(errorData.message || "Signup failed");
                }
            } catch (error) {
                console.error('Signup failed:', error);
                alert('Network error or no server response');
            }
        } else {
            alert('All fields are required');
        }
    };

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <p>Create New Account</p>
                <div>
                    <input
                        placeholder="First Name"
                        name="firstName"
                        type="text"
                        value={formState.firstName}
                        onChange={handleChange}
                    />
                    <input
                        placeholder="Last Name"
                        name="lastName"
                        type="text"
                        value={formState.lastName}
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