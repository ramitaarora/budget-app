import { useState } from 'react';

export default function AddUser({ userModal, setUserModal }) {

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

        if (res.ok) {
            alert('New user created!')
            setFormState({ first_name: '', last_name: '', email: '', password: '', location: '' })
            closeModal();
        }
    };

    const closeModal = () => {
        setUserModal('hidden');
    }

    return (
        <div className={"modal-background " + userModal}>
            <div className="modal">
                <div className="modal-content">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" onClick={closeModal} className="exit">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                    </svg>
                    <form onSubmit={handleFormSubmit} className="flex flex-col">
                        <h2>Add Additional User</h2>
                        <div className="user-form + flex-col">
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
            </div>
        </div>
    )
}