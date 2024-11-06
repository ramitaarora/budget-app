import { useState, useEffect } from 'react';

export default function User() {
    const [userData, setUserData] = useState(null);
    const [formState, setFormState] = useState({
        first_name: '',
        last_name: '',
        email: '',
        location: ''
    });
    const [showNewUserForm, setShowNewUserForm] = useState(false);
    const [newUserFormState, setNewUserFormState] = useState({
        first_name: '',
        last_name: '',
        email: '',
        location: '',
        password: ''
    });

    const fetchUser = async () => {
        try {
            const res = await fetch(`/api/user`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (!res.ok) {
                throw new Error('Failed to fetch user data');
            }

            const fetchedUserData = await res.json();
            setUserData(fetchedUserData[0]);
        } catch (err) {
            console.error('Error fetching user data:', err);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        if (userData) {
            setFormState({
                first_name: userData.first_name || '',
                last_name: userData.last_name || '',
                email: userData.email || '',
                location: userData.location || ''
            });
        }
    }, [userData]);

    const toggleNewUserForm = () => {
        setShowNewUserForm((prev) => {
            if (!prev) {
                setNewUserFormState({
                    first_name: '',
                    last_name: '',
                    email: '',
                    location: '',
                    password: ''
                });
            }
            return !prev;
        });
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleNewUserFormChange = (event) => {
        const { name, value } = event.target;
        setNewUserFormState({
            ...newUserFormState,
            [name]: value
        });
    };

    const submitForm = async (event) => {
        event.preventDefault();

        try {
            const res = await fetch(`/api/user`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formState),
            });

            if (!res.ok) {
                throw new Error('Failed to update user data');
            }

            const updatedUser = await res.json();
            console.log('User updated successfully:', updatedUser);
            window.location.reload();
        } catch (err) {
            console.error('Error updating user data:', err);
        }
    };

    const submitNewUserForm = async (event) => {
        event.preventDefault();

        try {
            const res = await fetch(`/api/adduser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(newUserFormState),
            });

            if (!res.ok) {
                throw new Error('Failed to add new user');
            }

            const addedUser = await res.json();
            console.log('New user added successfully:', addedUser);
            setShowNewUserForm(false);
            setNewUserFormState({ first_name: '', last_name: '', email: '', location: '', password: '' });
            window.location.reload();
        } catch (err) {
            console.error('Error adding new user:', err);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen w-full bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md mb-4">
                <h2 className="text-2xl font-semibold mb-6 text-center">Account Info</h2>
                <form onSubmit={submitForm}>
                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <label className="mb-1 text-gray-700">First Name: </label>
                            <input
                                name="first_name"
                                type="text"
                                value={formState.first_name}
                                onChange={handleFormChange}
                                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 text-gray-700">Last Name: </label>
                            <input
                                name="last_name"
                                type="text"
                                value={formState.last_name}
                                onChange={handleFormChange}
                                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 text-gray-700">Email: </label>
                            <input
                                name="email"
                                type="email"
                                value={formState.email}
                                onChange={handleFormChange}
                                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 text-gray-700">Location: </label>
                            <input
                                name="location"
                                type="text"
                                value={formState.location}
                                onChange={handleFormChange}
                                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>

                        <button type="submit" className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                            Save
                        </button>
                    </div>
                </form>
            </div>

            <button
                onClick={toggleNewUserForm}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
                {showNewUserForm ? "Cancel" : "Add User to Account"}
            </button>

            {showNewUserForm && (
                <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md mt-4">
                    <h2 className="text-xl font-semibold mb-4 text-center">Add New User</h2>
                    <form onSubmit={submitNewUserForm}>
                        <div className="space-y-4">
                            <div className="flex flex-col">
                                <label className="mb-1 text-gray-700">First Name: </label>
                                <input
                                    name="first_name"
                                    type="text"
                                    value={newUserFormState.first_name}
                                    onChange={handleNewUserFormChange}
                                    className="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="mb-1 text-gray-700">Last Name: </label>
                                <input
                                    name="last_name"
                                    type="text"
                                    value={newUserFormState.last_name}
                                    onChange={handleNewUserFormChange}
                                    className="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="mb-1 text-gray-700">Email: </label>
                                <input
                                    name="email"
                                    type="email"
                                    value={newUserFormState.email}
                                    onChange={handleNewUserFormChange}
                                    className="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="mb-1 text-gray-700">Location: </label>
                                <input
                                    name="location"
                                    type="text"
                                    value={newUserFormState.location}
                                    onChange={handleNewUserFormChange}
                                    className="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="mb-1 text-gray-700">Password: </label>
                                <input
                                    name="password"
                                    type="password"
                                    value={newUserFormState.password}
                                    onChange={handleNewUserFormChange}
                                    className="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>

                            <button type="submit" className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                                Add User
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
